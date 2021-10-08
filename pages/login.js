import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import cookie from "next-cookies";
import jwt from "../utils/jwt";
import Router from "next/router";
import DiyLogo from "../public/images/banners/diy-logo.png";
import axios from "axios";
import { useDispatch } from "react-redux"
import { setUserInfo } from "../components/store/action/userAction";

export async function getServerSideProps(props) {
    const accessToken = cookie(props).accessToken;
    const accessTokenStatus = await jwt.verify(accessToken);
    
    if(accessTokenStatus !== -2 && accessTokenStatus !== -3) {
        console.log(`===>Auth Checked`);
        props.res.writeHead(304, { Location: "/" });
    }

    return {
        props: {}
    }
}

export default function Login() {
    const dispatch = useDispatch();

    const [EmailEmptyError, setEmailEmptyError] = useState(false);
    const [EmailFormatError, setEmailFormatError] = useState(false);
    const [EmailFormatYn, setEmailFormatYn] = useState(false);
    const [PasswordEmptyError, setPasswordEmptyError] = useState(false);

    const [LoginAuthError, setLoginAuthError] = useState(false);

    const formRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onLoginHandler = (event) => {
        event.preventDefault();

        let _status = true;

        // 이메일 형식을 검사한다.
        const emailRegExp = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
        if(!emailRegExp.test(emailRef.current.value)) {
            setEmailEmptyError(false);
            setEmailFormatError(true);
            _status = false;
        } else {
            setEmailFormatError(false);
        }

        if(!emailRef.current.value) {
            setEmailFormatError(false);
            setEmailEmptyError(true);
            _status = false;
        }

        if(!passwordRef.current.value) {
            setPasswordEmptyError(true);
            _status = false;
        }

        if(!_status) {
            return false;
        } else {
            axios({
                url: "/api/user/auth",
                method: "POST",
                data: {
                    username: emailRef.current.value,
                    password: passwordRef.current.value
                }
            }).then((res) => {
                if(!res.data.loginAuth) {
                    setLoginAuthError(true);
                } else {
                    console.log("===>로그인 성공");
                    console.log(res.data.username);
                    console.log(res.data.name);
                    dispatch(setUserInfo({
                        username: res.data.username,
                        name: res.data.name,
                        isLogined: true
                    }));
                    Router.push("/user/mypage");
                }
            }).catch((err) => {
                console.log("===>요청 실패");
                console.log(err);
            })
        }
    }

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-xs lg:top-40 top-20 pt-12">
                <form ref={ formRef } action="/api/user/auth" method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <div className="flex w-full justify-center mb-4">
                            <Image src={DiyLogo} alt="로고" />
                        </div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            이메일
                        </label>
                        <input name="username" ref={ emailRef } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="E-Mail" />
                        { EmailEmptyError && <p className="text-red-500 text-xs italic">이메일을 입력해주세요.</p>}
                        { EmailFormatError && <p className="text-red-500 text-xs italic">이메일을 형식에 맞게 입력하세요.</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input name="password" ref={ passwordRef } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
                        { PasswordEmptyError && <p className="text-red-500 text-xs italic">패스워드를 입력해주세요.</p>}
                    </div>

                    { LoginAuthError && 
                        <div className="mb-4 col-span-2" role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                로그인 실패
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <p><b>필수 입력란이 누락</b>되어있거나, <b>올바르지 않은 형식의 데이터가 삽입</b>되었습니다.</p>
                                <p>확인 후 다시 진행해주세요.</p>
                            </div>
                        </div>
                    }

                    <div className="flex items-center justify-between w-full">
                        <button type="submit" onClick={ onLoginHandler } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            로그인
                        </button>
                        <span className="w-24">
                            <Link href="/user/register/agree">
                                <a className="inline-block font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                    회원가입
                                </a>
                            </Link>
                            <Link href="/user/help/forgetPwd">
                                <a className="inline-block font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                    비밀번호 찾기
                                </a>
                            </Link>
                        </span>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2021 Jeong Corp. All rights reserved.
                </p>
            </div>
        </div>
    )
}
