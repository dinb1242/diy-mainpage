import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import wrapper from "../components/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { useStore, useSelector } from "react-redux";
import Header from "next/head";
import App from "next/app";
import axios from "axios";

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    appProps.pageProps["pathname"] = appContext.router.pathname;

    return { ...appProps }
}

function MyApp({ Component, pageProps }) {
    // 로그인 되어있지 않은 사용자일 경우, 쿠키를 삭제한다. (로그인 후 페이지를 나갔을 때에는 쿠키는 남아있으나, Global State는 ""이기 때문.)
    const { seq, username, logId, isLogined } = useSelector(state => state.user);
    if(!isLogined) {
        axios({
            url: "/api/user/logout",
            method: "POST",
            data: {
                seq: seq,
                username: username,
                logId: logId
            },
        })
    }

    const store = useStore();
    if (pageProps.pathname === "/") {
        return (
            <PersistGate loading={null} persistor={store.__persistor}>
                <Header>
                    <title>DIY: 인공지능 블록 코딩</title>
                    <link rel="icon" href="/favicon.ico" />
                    <style>
                        @import
                        url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
                    </style>
                </Header>
                <Component {...pageProps} />
            </PersistGate>
        );
    }
    return (
        <PersistGate loading={null} persistor={store.__persistor}>
            <Header>
                <title>DIY: 인공지능 블록 코딩</title>
                <link rel="icon" href="/favicon.ico" />
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
                </style>
            </Header>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </PersistGate>
    );
}

export default wrapper.withRedux(MyApp);
