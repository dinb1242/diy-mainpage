import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import MainBannder from "../public/images/banners/main_banner.jpg";

export default function Home() {
    const { isLogined } = useSelector((state) => state.user);
    console.log(isLogined)

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
            <Image
                className="object-cover"
                src={MainBannder}
                alt="메인 배너"
                layout="fill"
                loading="eager"
            />

            <div
                id="main-banner-conatiner"
                className="flex justify-center items-center flex-col z-0 text-white"
            >
                <p className="text-3xl mb-4 animate-fade-in-down">
                    딥아이를 시작해보세요.
                </p>
                <p className="text-xl mb-4 animate-fade-in-down">
                    예제 텍스트입니다.
                </p>
                <div
                    id="main-banner-btn"
                    className="flex flex-row w-96 justify-center space-x-5 animate-fade-in-up"
                >
                    {!isLogined && (
                        <Link href="/login">
                            <button className="transition duration-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                                시작하기
                            </button>
                        </Link>
                    )}

                    {isLogined && (
                        <Link href="/user/mypage">
                            <button className="transition duration-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                                시작하기
                            </button>
                        </Link>
                    )}

                    <Link href="/about">
                        <button className="transition duration-500 text-black bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                            더 알아보기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
