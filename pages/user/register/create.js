import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/router";

import DatePicker from "react-datepicker";
import { setDefaultLocale, registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";

import DiyLogo from "../../../public/images/banners/diy-logo.png";

function RegisterCreate(props) {
    const [Birthday, setBirthday] = useState("");

    const router = useRouter();

    if(router.query.agreeYn === "Y") {
        return (
            <div className="flex justify-center items-center mt-10">
                <form className="flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <Image src={DiyLogo} alt="로고" />
                    <div className="grid grid-cols-3 gap-4 lg:w-3/4 m-auto my-8">
                        <div className="border-t-4 border-green-500 pt-4">
                            <p className="uppercase text-green-500 font-bold">Step 1</p>
                            <p className="font-semibold">약관 동의</p>
                        </div>
                        <div className="border-t-4 border-green-500 pt-4">
                            <p className="uppercase text-green-500 font-bold">Step 2</p>
    
                            <p className="font-semibold">정보 입력</p>
                        </div>
                        <div className="border-t-4 border-gray-200 pt-4">
                            <p className="uppercase text-gray-400 font-bold">Step 3</p>
    
                            <p className="font-semibold">완료</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold mb-4">정보 입력</p>
    
                    <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                        <div className="mb-2">
                            <label className="font-bold" htmlFor="username">이메일</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="username@example.com" />
                        </div>
    
                        <div>
                        </div>
    
                        <div className="mb-2">
                            <label className="font-bold" htmlFor="password">비밀번호</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="조건 입력" />
                        </div>
    
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="confirmPassword">비밀번호 확인</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="재입력" />
                        </div>
    
                        <div className="col-span-2">
                            <hr className="mb-4" />
                        </div>
    
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="name">이름</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="홍길동" />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="birthday">생년월일</label>
                            <input type="hidden" value={Birthday == null ? "" : Birthday} />
                            <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="birthday" placeholderText="생년월일 입력" selected={Birthday} onChange={(Birthday) => setBirthday(Birthday)} locale="ko" dateFormat="yyyy-MM-dd" />
                        </div>
                        <div className="mb-4">
                            <p className="font-bold mb-2">성별</p>
                            <div className="ml-2">
                                <input className="form-radio mr-1" type="radio" id="male" name="gender" value="1" />
                                <label className="mr-2" htmlFor="male">남자</label>
                                <input className="form-radio mr-1" type="radio" id="female" name="gender" value="2" />
                                <label htmlFor="female">여자</label>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="address">주소(API)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="서울특별시, 인천광역시" />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="tel">전화번호</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tel" type="text" placeholder="010-1234-5678" />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="company">소속(학교)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" placeholder="인하공전" />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="dept">부서(학과)</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dept" type="text" placeholder="컴퓨터시스템공학과" />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="position">직책</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" placeholder="대학생" />
                        </div>
    
                        <div className="col-span-2">
                            <div className="flex justify-center space-x-4 flex-row">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">회원가입</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">뒤로 가기</button>
                            </div>
                        </div>
                    </div>
    
                </form>
            </div>
        )
    } else {
        return (
            <div>
                Error
            </div>
        )
    }
}

export default RegisterCreate