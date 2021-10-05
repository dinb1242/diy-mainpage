import DiyLogo from "../../../public/images/banners/diy-logo.png";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/outline"

export default function RegisterComplete() {
    return (
        <div className="flex justify-center items-center mt-10 w-screen">
            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4 :w-3/6 lg:w-2/5">
                <Image src={DiyLogo} alt="로고" />
                <div className="grid grid-cols-3 gap-4 lg:w-3/4 m-auto my-8 break-words">
                    <div className="border-t-4 border-green-500 pt-4">
                        <p className="uppercase text-green-500 font-bold">Step 1</p>

                        <p className="font-semibold">약관 동의</p>
                    </div>
                    <div className="border-t-4 border-green-500 pt-4">
                        <p className="uppercase text-green-500 font-bold">Step 2</p>

                        <p className="font-semibold">정보 입력</p>
                    </div>
                    <div className="border-t-4 border-green-500 pt-4">
                        <p className="uppercase text-green-500 font-bold">Step 3</p>

                        <p className="font-semibold">완료</p>
                    </div>
                </div>
                <CheckCircleIcon className="text-green-500 w-16 mb-2" />
                <p className="text-xl font-bold mb-4">회원가입이 완료되었습니다.</p>
                <p className="font-bold text-base">관리자 인증 후 로그인이 가능합니다.</p>
                <p className="text-base">사용자 인증은 최대 1-2일 정도 소요될 수 있습니다.</p>

                <Link href="/">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4">확인</button>
                </Link>
            </div>
        </div>
    )
}