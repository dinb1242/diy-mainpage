import DiyLogo from "../../../public/images/banners/diy-logo.png";
import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import Swal from "sweetalert2"

export default function RegisterAgree(props) {


    const agreementText =
        `개인정보보호법에 따라 DIY에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
								
    1. 수집하는 개인정보
    이용자는 회원가입을 하지 않으면 딥아이 서비스를 회원과 동일하게 이용할 수 없습니다. 이용자가 딥아이 서비스를 이용하고자 할때 딥아이는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
    
    회원가입 시점에 딥아이가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
    - 회원 가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 성별, 주소, 소속’을 필수항목으로 수집합니다.
    
    2. 수집한 개인정보의 이용
    딥아이의 회원관리, 서비스 개발・제공 및 향상등 아래의 목적으로만 개인정보를 이용합니다.
    
    - 회원 가입 의사의 확인, 연령 확인 및 이용자 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
    - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
    - 법령 및 딥아이 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
    - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.
    - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
    - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.
    - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
    
    3. 개인정보의 보관기간
    딥아이는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
    
    4. 개인정보 수집 및 이용 동의를 거부할 권리
    이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.`

    const [AgreeYn, setAgreeYn] = useState("N");
    const onAgreeYnHandler = (event) => {
        const { name, value } = event.target;
        setAgreeYn(value);
    }

    const agreeAlertRef = useRef(null);

    const onNextStepHandler = () => {
        if (AgreeYn === "Y") {
            Router.push({
                pathname: "/user/register/create",
                query: { agreeYn: "Y" }
            }, "/user/register/create");
        } else {
            agreeAlertRef.current.className = "mb-4"
            return false
        }
    }

    return (
        <div className="flex justify-center items-center mt-10 w-screen">
            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-4/6 lg:w-3/5">
                <Image src={DiyLogo} alt="로고" />
                <div className="grid grid-cols-3 gap-4 lg:w-2/4 m-auto my-8 break-words">
                    <div className="border-t-4 border-green-500 pt-4">
                        <p className="uppercase text-green-500 font-bold">Step 1</p>

                        <p className="font-semibold">약관 동의</p>
                    </div>
                    <div className="border-t-4 border-gray-200 pt-4">
                        <p className="uppercase text-gray-400 font-bold">Step 2</p>

                        <p className="font-semibold">정보 입력</p>
                    </div>
                    <div className="border-t-4 border-gray-200 pt-4">
                        <p className="uppercase text-gray-400 font-bold">Step 3</p>

                        <p className="font-semibold">완료</p>
                    </div>
                </div>
                <p className="text-2xl font-bold mb-4">약관 동의</p>
                <textarea className="form-textarea w-full h-96 mb-8" value={agreementText} readOnly />

                <div className="mb-4 hidden" role="alert" ref={ agreeAlertRef }>
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        약관 동의
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>약관 동의 후, 회원가입을 진행할 수 있습니다.</p>
                    </div>
                </div>

                <div className="mb-4">
                    <input className="form-radio mr-1" type="radio" id="agreeY" name="agreeYn" value="Y" onChange={onAgreeYnHandler} />
                    <label className="mr-6" htmlFor="agreeY">동의합니다.</label>
                    <input className="form-radio mr-1" type="radio" id="agreeN" name="agreeYn" value="N" onChange={onAgreeYnHandler} />
                    <label htmlFor="agreeN">동의하지 않습니다.</label>
                </div>

                <div className="flex justify-center space-x-4 flex-row">

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded" onClick={onNextStepHandler}>다음</button>
                    <Link href="/">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">취소</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}