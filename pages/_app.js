import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import wrapper from "../components/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import Header from "next/head";

function MyApp({ Component, pageProps }) {
    const store = useStore();
    if (Component.name === "Home") {
        return (
            <PersistGate loading={null} persistor={store.__persistor}>
                <Header>
                    <title>DIY: 인공지능 블록 코딩</title>
                    <link rel="icon" href="/favicon.ico" />
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
            </Header>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </PersistGate>
    );
}

export default wrapper.withRedux(MyApp);
