import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ReactFullPage from "@fullpage/react-fullpage";
import { ChipIcon, CodeIcon, CubeIcon, DocumentReportIcon } from "@heroicons/react/outline"

import MainBannder from "../public/images/banners/main_banner.jpg";
import Router from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(props) {
    return {
        props: {}
    }
}

export default function Home() {
    const { isLogined } = useSelector((state) => state.user);

    return (
        <ReactFullPage
            navigation
            licenseKey={process.env.FULLPAGE_KEY}
            scrollingSpeed={1000}
            render={({ state, fullpageApi }) => {
                return (
                    <ReactFullPage.Wrapper>
                        <div className="section">
                            <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
                                <Image
                                    className="object-cover filter blur-sm scale-105"
                                    src={MainBannder}
                                    alt="메인 배너"
                                    layout="fill"
                                    loading="eager"
                                />

                                <div
                                    id="main-banner-conatiner"
                                    className="flex justify-center items-center flex-col z-0 text-white select-none"
                                >
                                    <p className="text-3xl mb-4 animate-fade-in-down">
                                        딥아이를 시작해보세요.
                                    </p>
                                    <p className="text-2xl text-center font-light mb-4 animate-fade-in-down">
                                        딥아이는 블록코딩 + 파이썬 기반의 머신러닝 학습을 위한 도구입니다.
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

                                        {/* <Link href="/about"> */}
                                            <button onClick={()=>{alert("준비 중입니다.")}} className="flex transition duration-500 text-black bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md p-2 pl-3 pr-3 border border-gray-600">
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
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="relative flex flex-col items-center justify-center min-h-screen py-2 select-none">
                                <Image
                                    className="absolute object-cover scale-x-110 -scale-y-1 2xl:-translate-x-20 filter blur"
                                    src={MainBannder}
                                    alt="메인 배너"
                                    layout="fill"
                                    loading="eager"
                                />
                                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 z-10 w-2/3 text-white">
                                    <div className="flex flex-col items-center">
                                        <CubeIcon className="w-16 text-yellow-400" />
                                        <p className="text-2xl lg:text-3xl font-bold">블록 코딩</p>
                                        <p className="text-center text-lg mt-4">
                                            딥아이는 파이썬을 기반으로 한 블록코딩 툴입니다.
                                        </p>
                                        <p className="hidden md:block text-center text-lg">
                                            미리 만들어 놓은 블록을 제공함으로써 프로그래밍 언어에 대한 장벽을 없애고, 
                                            <br/>
                                            문제해결 방식에 초점을 맞추었습니다.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <CodeIcon className="w-16 text-blue-400" />
                                        <p className="text-2xl lg:text-3xl font-bold">파이썬</p>
                                        <p className="text-center text-lg mt-4">
                                            딥아이 툴의 좌측은 블록 코딩, 우측은 파이썬 코드가 출력됩니다. 
                                        </p>
                                        <p className="hidden md:block text-center text-lg">
                                            블록 코딩을 하는 동시에 파이썬 코드 또한 쉽게 익힐 수 있습니다.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <DocumentReportIcon className="w-16 text-pink-200" />
                                        <p className="text-2xl lg:text-3xl font-bold">데이터 사이언스</p>
                                        <p className="text-center text-lg mt-4">
                                            데이터 분석을 위한 Numpy, Pandas, Matplotlib 등의 라이브러리를 지원합니다.
                                        </p>
                                        <p className="hidden md:block text-center text-lg">
                                            이를 통해 다양한 데이터 분석이 가능하며, 데이터 분석 및 머신러닝을 위한 전처리를 학습할 수 있습니다. 
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <ChipIcon className="w-16 text-gray-300" />
                                        <p className="text-2xl lg:text-3xl font-bold">머신러닝 / 딥러닝   </p>
                                        <p className="hidden md:block text-center text-lg mt-4">
                                            딥아이는 머신러닝 학습에 특화되어있습니다. 
                                        </p>
                                        <p className="text-center text-lg mt-4 md:mt-0">
                                            머신러닝 라이브러리인 Scikit-Learn를 통해 다양한 형태의 모델을 개발해보세요.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex flex-row col-span-2 items-center justify-center">
                                        {/* <Link href="/about"> */}
                                            <a onClick={()=>{alert("준비 중입니다.")}} className="cursor-pointer transition duration-500 border-t border-b text-2xl px-4 py-2 hover:border-t-0 hover:border-b-0 hover:rounded  hover:-translate-y-3 hover:bg-blue-50 hover:bg-opacity-20">
                                                더 알아보기
                                            </a>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactFullPage.Wrapper>
                );
            }}
        >
        </ReactFullPage>
    );
}