import Header from "next/head";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import Footer from "./Footer";
import Router from "next/router";

import { useSelector } from "react-redux";

function Layout({ children }) {

    const { adminMode } = useSelector((state) => state.user);

    const currentPath = Router.pathname.split('/')[1];

    if(adminMode && currentPath === "admin") {
        // 어드민 페이지 접근
        return (
            <div>
                <AdminNavBar />
                <main>{ children }</main>
                <Footer />
            </div>
        )
    } else if(adminMode && currentPath !== "admin") {
        // 관리자 모드 해제 후 일반 페이지 접근 가능
        return (
            <div>
                <AdminNavBar />
                <main>관리자 모드 해제 후 접근 가능합니다.</main>
                <Footer />
            </div>
        )
    } else if(!adminMode && currentPath === "admin") {
        // 관리자가 아닌 상태에서 어드민 페이지 접근 불가
        return (
            <div>
                <NavBar />
                <main>접근 권한이 없습니다.</main>
                <Footer />
            </div>
        )
    } else if(!adminMode && currentPath !== "admin") {
        // 관리자가 아닌 상태에서 일반 페이지인 경우 접근 가능
        return (
            <div>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </div>
        );
    }
}

export default Layout;
