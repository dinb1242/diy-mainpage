import cookie from "next-cookies";
import jwt from "../../utils/jwt";
import cookieManage from "../../utils/cookieManage";

export async function getServerSideProps(props) {
    console.log("===>SSR 호출!");

    const token = cookie(props).accessToken;
    await cookieManage(token);
    const tokenStatus = jwt.verify(token);

    console.log("===>accessToken: ", token);

    if(tokenStatus === -2 || tokenStatus === -3) {
        console.log("===>만료된 토큰");
        props.res.writeHead(304, { Location: "/login" });
        props.res.end();
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