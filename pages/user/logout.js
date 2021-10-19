import { useSelector, useDispatch } from "react-redux";
import { deleteUserInfo } from "../../components/store/action/userAction";
import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";

export async function getServerSideProps(props) {
    // const accessToken = cookie(props).accessToken;
    // const accessTokenStatus = await jwt.verify(accessToken);

    // if (accessTokenStatus === -2 && accessTokenStatus === -3) {
    //     props.res.writeHead(304, { Location: "/login" });
    // }
    let invalid = false;
    if(props.req.__NEXT_INIT_QUERY.invalid) {
        invalid = true;
    }
    return {
        props: {
            invalid: invalid
        },
    };
}

export default function Logout(props) {
    console.log(props.invalid);
    const { username, logId, seq } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    axios({
        url: "/api/user/logout",
        method: "POST",
        data: {
            seq: seq,
            username: username,
            logId: logId
        },
    })
        .then((res) => {
            if (res.data.success) {
                dispatch(deleteUserInfo());
                console.log("===>로그아웃 되었습니다.");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    return (
        <div className="flex flex-col justify-center items-center mt-10 w-screen h-96">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            {props.invalid &&
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold mb-2">로그아웃 성공</p>
                    <p className="text-xl mb-8">세션이 종료되어 로그아웃 되었습니다. 다시 로그인해주세요.</p>
                </div>
            }
            {!props.invalid &&
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold mb-8">로그아웃 성공</p>
                </div>
            }
            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white">메인 페이지로 이동</button>
            </Link>
        </div>
    );
}
