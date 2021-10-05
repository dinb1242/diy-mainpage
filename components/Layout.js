import Header from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div>
            <Header>
                <title>DIY: 인공지능 블록 코딩</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css" rel="stylesheet" />
            </Header>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}