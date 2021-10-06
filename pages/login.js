import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

import DiyLogo from "../public/images/banners/diy-logo.png";

export default function Login() {

    const [EmailEmptyError, setEmailEmptyError] = useState(false);
    const [PasswordEmptyError, setPasswordEmptyError] = useState(false);

    const formRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onLoginHandler = (event) => {
        event.preventDefault();

        let _status = true;

        if(!emailRef.current.value) {
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
            formRef.current.submit();
        }
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className="relative w-full max-w-xs lg:top-40 top-20">
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
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input name="password" ref={ passwordRef } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
                        { PasswordEmptyError && <p className="text-red-500 text-xs italic">패스워드를 입력해주세요.</p>}
                    </div>
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