import Router from "next/router";
import { useSelector } from "react-redux";
import AdminNavBar from "../../components/AdminNavBar";

export default function AdminMain() {
    const { username, name, isLogined, isAdmin, adminMode } = useSelector(
        (state) => state.user
    );

    // 로그인되어있으나 관리자가 아닌 경우
    if (!isAdmin && isLogined) {
        return (
            <div>
                <p className="text-2xl">접근 제한 페이지</p>
            </div>
        );
    } else if (!isAdmin && !isLogined) {
        Router.push("/login");
        return (
            <div>
                <p className="text-2xl">접근 제한 페이지</p>
            </div>
        );
    } else if (isAdmin && !isLogined) {
        Router.push("/login");
        return <div>로그인 필요</div>;
    } else if (isAdmin && isLogined && !adminMode) {
        return (
            <div>
                관리자 모드가 아닙니다.
            </div>
        );
    } else {
        return (
            <div>
                어드민 메인 페이지
            </div>
        )
    }
}
