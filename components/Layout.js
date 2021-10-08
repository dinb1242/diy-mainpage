import Header from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div>
            <Header>
                <title>DIY: 인공지능 블록 코딩</title>
                <link rel="icon" href="/favicon.ico" />
            </Header>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;