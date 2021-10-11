import Header from "next/head";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";
import Footer from "./Footer";

import { useSelector } from "react-redux";

function Layout({ children }) {
    const { adminMode } = useSelector((state) => state.user);
    return (
        <div>
            {!adminMode && <NavBar />}
            {adminMode && <AdminNavBar />}
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
