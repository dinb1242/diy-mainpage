import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../components/store/action/userAction";
import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import axios from "axios";

export async function getServerSideProps(props) {
    const accessToken = cookie(props).accessToken;
    const accessTokenStatus = await jwt.verify(accessToken);
    
    if(accessTokenStatus === -2 && accessTokenStatus === -3) {
        props.res.writeHead(304, { Location: "/login" });
    }
    return {
        props: {}
    }
}

export default function Logout(props) {
    const { username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    axios({
        url: "/api/user/logout",
        method: "GET",
        data: {username: username}
    }).then((res) => {
        if(res.data.success) {
            dispatch(setUserInfo({
                username: "",
                name: "",
                isLogined: false
            }))
            console.log("===>정상적으로 로그아웃 되었습니다.");
        } else {
            console.log("===>로그아웃 실패!");
        }
    }).catch((err) => {
        console.log("===>로그아웃 중 오류가 발생하였습니다.");
        console.log(err)
    })
    
    return (
        <div className="flex justify-center items-center mt-10 w-screen">
            성공적으로 로그아웃 되었습니다.
        </div>
    )
}