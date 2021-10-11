import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookieManage from "../../utils/cookieManage";
import cookie from "next-cookies";
import Link from "next/link";

export async function getServerSideProps(props) {
    console.log("===>쿠키 확인");
    await cookieManage(cookie(props), props.res);

    return {
        props: {},
    };
}

export default function SelectDiy(props) {
    const notify = () => toast.info("현재 이용할 수 없는 버전입니다.");

    return (
        <div className="flex justify-center items-center flex-col mt-10 w-screen">
            <p className="text-2xl font-bold mb-8">버전 선택</p>
            <div className="flex flex-col">
                <Link href="/diy/open?ver=1" as="/diy/open">
                    <div className="relative select-none cursor-pointer mb-4 transition duration-150 px-5 py-2 rounded-xl hover:text-white hover:ring-4 hover:ring-offset-2 flex flex-col shadow-md bg-gray-50 hover:bg-blue-500 w-96 backdrop">
                        <span className="font-bold text-lg">
                            CodeB Ver.1.0 for K-Mooc
                        </span>
                        <span>케이무크 버전 예시 텍스트</span>
                    </div>
                </Link>

                <div
                    onClick={notify}
                    className="relative select-none cursor-pointer mb-4 transition duration-150 px-5 py-2 rounded-xl hover:text-white hover:ring-4 hover:ring-offset-2 flex flex-col shadow-md bg-gray-50 hover:bg-gray-500 w-96 backdrop"
                >
                    <span className="font-bold text-lg">CodeB 2.0</span>
                    <span>예시 텍스트</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 absolute top-5 right-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <div
                    onClick={notify}
                    className="relative select-none cursor-pointer mb-4 transition duration-150 px-5 py-2 rounded-xl hover:text-white hover:ring-4 hover:ring-offset-2 flex flex-col shadow-md bg-gray-50 hover:bg-gray-500 w-96 backdrop"
                >
                    <span className="font-bold text-lg">CodeB 3.18</span>
                    <span>예시 텍스트</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 absolute top-5 right-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
            </div>
            <ToastContainer position="bottom-left" hideProgressBar={true} />
        </div>
    );
}