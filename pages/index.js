import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import MainBannder from "../public/images/banners/main_banner.jpg";

export default function Home() {
    const { isLogined } = useSelector((state) => state.user);
    console.log(isLogined);

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
                            <button className="flex transition duration-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline-block h-6 w-6 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                    />
                                </svg>
                                시작하기
                            </button>
                        </Link>
                    )}

                    {isLogined && (
                        <Link href="/diy/select">
                            <button className="flex transition duration-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline-block h-6 w-6 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                    />
                                </svg>
                                시작하기
                            </button>
                        </Link>
                    )}

                    <Link href="/about">
                        <button className="flex transition duration-500 text-black bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md p-2 pl-3 pr-3 border border-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block h-6 w-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            더 알아보기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
