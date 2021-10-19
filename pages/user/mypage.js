import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import cookieManage from "../../utils/cookieManage";

export async function getServerSideProps(props) {
    const result = await cookieManage(cookie(props), props.res);
    if(!result) {
        return {
            redirect: {
                destination: "/user/logout?invalid=true"
            }
        }
    } else {
        console.log("===>토큰이 유효함!");
    }

    return {
        props: {}
    }
}

export default function MyPage(props) {
    return (
        <div>
            My Page
        </div>
    )
}