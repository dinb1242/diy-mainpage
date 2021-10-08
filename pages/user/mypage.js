import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import cookieManage from "../../utils/cookieManage";

export async function getServerSideProps(props) {
    console.log("===>쿠키 확인");
    await cookieManage(cookie(props), props.res);

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