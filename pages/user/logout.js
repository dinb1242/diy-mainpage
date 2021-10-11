import { useSelector, useDispatch } from "react-redux";
import { deleteUserInfo } from "../../components/store/action/userAction";
import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps(props) {
    const accessToken = cookie(props).accessToken;
    const accessTokenStatus = await jwt.verify(accessToken);

    if (accessTokenStatus === -2 && accessTokenStatus === -3) {
        props.res.writeHead(304, { Location: "/login" });
    }
    return {
        props: {},
    };
}

export default function Logout(props) {
    const { username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    axios({
        url: "/api/user/logout",
        method: "POST",
        data: {
            username: username,
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <p className="text-2xl font-bold mb-8">로그아웃 성공</p>
            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white">메인 페이지로 이동</button>
            </Link>
        </div>
    );
}
