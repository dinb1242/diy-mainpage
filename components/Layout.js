import Header from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;