import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DatePicker from "react-datepicker";
import { setDefaultLocale, registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";

import DiyLogo from "../../../public/images/banners/diy-logo.png";
import axios from "axios";

function RegisterCreate(props) {
    const router = useRouter();

    // 입력 데이터 유효성 검사 Boolean 로직을 정의한다.
    const [EmailEmptyError, setEmailEmptyError] = useState("");
    const [EmailFormatError, setEmailFormatError] = useState("");
    const [EmailFormatYn, setEmailFormatYn] = useState("");
    const [EmailConfirmError, setEmailConfirmError] = useState("");
    const [EmailCheckYn, setEmailCheckYn] = useState("");

    const [PasswordEmptyError, setPasswordEmptyError] = useState("");
    const [PasswordFormatError, setPasswordFormatError] = useState("");
    const [PasswordFormatYn, setPasswordFormatYn] = useState("");
    const [PasswordConfirmError, setPasswordConfirmError] = useState("");
    const [PasswordCheckYn, setPasswordCheckYn] = useState("");

    const [NameEmptyError, setNameEmptyError] = useState("");
    const [BirthdayEmptyError, setBirthdayEmptyError] = useState("");
    const [BirthdayFormatError, setBirthdayFormatError] = useState("");
    const [GenderEmptyError, setGenderEmptyError] = useState("");
    const [AddressEmptyError, setAddressEmptyError] = useState("");
    const [TelEmptyError, setTelEmptyError] = useState("");

    const [FormError, setFormError] = useState(false);

    // 입력 폼 데이터를 저장한다.
    const formRef = useRef(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const nameRef = useRef(null);
    const birthRef = useRef(null);
    const [Gender, setGender] = useState(null);
    const addressRef = useRef(null);
    const telFrontRef = useRef(null);
    const telMidRef = useRef(null);
    const telEndRef = useRef(null);

    // 중복 체크를 검사한다.
    const onUsernameCheck = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        if(email === "") {
            setEmailEmptyError(true);
        } else {
            setEmailEmptyError(false);
        }

        if (email !== "" && !EmailEmptyError && !EmailFormatError) {
            axios({
                url: "/api/user/check",
                data: { username: email },
                method: "POST",
            })
                .then((res) => {
                    console.log("===>중복 체크 요청 성공");
                    console.log(res);

                    if (res.data.usernameUsable) {
                        setEmailCheckYn(true);
                        setEmailConfirmError(false);
                    } else {
                        setEmailCheckYn(false);
                        setEmailConfirmError(false);
                    }
                })
                .catch((err) => {
                    console.log("===>중복 체크 중 오류 발생");
                    console.log(err);
                });
        }
    };

    // 이메일 유효성을 검사한다.
    const onEmailValHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;

        if (EmailCheckYn) {
            setEmailCheckYn(false);
        }

        // 이메일 공백을 검사한다.
        if (!value) {
            setEmailEmptyError(true);
            setEmailFormatError(false);
            setEmailFormatYn(false);
            return false;
        } else {
            setEmailEmptyError(false);
        }

        // 이메일의 정규식을 체크한다.
        const emailRegExp = new RegExp(
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
        );

        if (emailRegExp.test(value)) {
            setEmailFormatError(false);
            setEmailFormatYn(true);
        } else {
            setEmailFormatError(true);
            setEmailFormatYn(false);
        }
    };

    // 패스워드 공백 여부를 체크한다.
    const onPasswordValHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        const currentPassword = passwordRef.current.value;
        const currentConfirmPassword = passwordConfirmRef.current.value;

        // 패스워드 공백을 검사한다.
        if (!currentPassword || currentPassword == "") {
            setPasswordEmptyError(true);
            setPasswordFormatError(false);
            setPasswordFormatYn(false);
            setPasswordCheckYn(false);
            setPasswordConfirmError(true);
            return false;
        } else {
            setPasswordEmptyError(false);
        }

        // 패스워드의 정규식을 체크한다.
        const passwordRegExp = new RegExp(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
        );

        if (passwordRegExp.test(currentPassword)) {
            setPasswordFormatError(false);
            setPasswordFormatYn(true);
        } else {
            setPasswordFormatError(true);
            setPasswordFormatYn(false);
        }

        setPasswordConfirmError(currentConfirmPassword !== currentPassword);

        if (currentConfirmPassword === currentPassword) {
            setPasswordCheckYn(true);
        } else {
            setPasswordCheckYn(false);
        }
    };

    // 이름 유효성 검사
    const onNameValHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;
        // 공백을 검사한다.
        if (!value) {
            setNameEmptyError(true);
        } else {
            setNameEmptyError(false);
        }
    };

    // 생일 유효성 검사
    const onBirthValHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const yearLastIndex = value.indexOf("-");
        const year = value.substring(0, yearLastIndex);

        if (year.length != 4) {
            console.log("===>올바르지 않은 년도");
            setBirthdayFormatError(true);
        } else {
            setBirthdayFormatError(false);
        }
        // 공백을 검사한다.
        if (!value) {
            setBirthdayFormatError(false);
            setBirthdayEmptyError(true);
        } else {
            setBirthdayEmptyError(false);
        }
    };

    // 성별 유효성 검사
    const onGenderValHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;
        // 공백을 검사한다.
        if (!value) {
            setGenderEmptyError(true);
        } else {
            setGenderEmptyError(false);
            setGender(value);
        }
    };

    // 주소 유효성 검사
    const onAddressValHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;
        // 공백을 검사한다.
        if (!value) {
            setAddressEmptyError(true);
        } else {
            setAddressEmptyError(false);
        }
    };

    // 휴대번호 유효성 검사
    const onTelValHandler = (event) => {
        event.preventDefault();
        const telFront = telFrontRef.current.value;
        const telMid = telMidRef.current.value;
        const telEnd = telEndRef.current.value;

        if (!telFront || !telMid || !telEnd) {
            setTelEmptyError(true);
        }

        if (telFront === "010") {
            if (telMid.length === 4 && telEnd.length === 4) {
                setTelEmptyError(false);
            }
        } else {
            if (telMid.length >= 3 && telEnd.length >= 4) {
                setTelEmptyError(false);
            }
        }
    };

    // 폼 전송
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let _status = true;

        if (!EmailCheckYn || EmailCheckYn === "") {
            setEmailConfirmError(true);
            _status = false;
        } else {
            setEmailConfirmError(false);
        }

        console.log(
            EmailEmptyError,
            EmailFormatError,
            PasswordEmptyError,
            PasswordFormatError,
            PasswordConfirmError,
            NameEmptyError,
            BirthdayEmptyError,
            BirthdayFormatError,
            GenderEmptyError,
            AddressEmptyError,
            TelEmptyError
        );

        if (
            EmailEmptyError ||
            EmailEmptyError === "" ||
            EmailFormatError ||
            EmailFormatError === "" ||
            PasswordEmptyError ||
            PasswordEmptyError === "" ||
            PasswordFormatError ||
            PasswordFormatError === "" ||
            PasswordConfirmError ||
            PasswordConfirmError === "" ||
            NameEmptyError ||
            NameEmptyError === "" ||
            BirthdayEmptyError ||
            BirthdayEmptyError === "" ||
            BirthdayFormatError ||
            BirthdayFormatError === "" ||
            GenderEmptyError ||
            GenderEmptyError === "" ||
            AddressEmptyError ||
            AddressEmptyError === "" ||
            TelEmptyError ||
            TelEmptyError === "" ||
            EmailConfirmError ||
            EmailConfirmError === "" ||
            !EmailCheckYn ||
            EmailCheckYn === ""
        ) {
            _status = false;
        }

        if (!_status) {
            console.log("Status");
            console.log(_status);
            setFormError(true);
            return false;
        } else {
            setFormError(false);
            formRef.current.submit();
        }
    };

    if (router.query.agreeYn === "Y") {
        return (
            <div className="flex justify-center items-center mt-10">
                <form
                    ref={formRef}
                    action="/api/user/create"
                    method="POST"
                    className="flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-6/12"
                >
                    <Image src={DiyLogo} alt="로고" />
                    <div className="grid grid-cols-3 gap-4 lg:w-3/4 m-auto my-8">
                        <div className="border-t-4 border-green-500 pt-4">
                            <p className="uppercase text-green-500 font-bold">
                                Step 1
                            </p>
                            <p className="font-semibold">약관 동의</p>
                        </div>
                        <div className="border-t-4 border-green-500 pt-4">
                            <p className="uppercase text-green-500 font-bold">
                                Step 2
                            </p>

                            <p className="font-semibold">정보 입력</p>
                        </div>
                        <div className="border-t-4 border-gray-200 pt-4">
                            <p className="uppercase text-gray-400 font-bold">
                                Step 3
                            </p>

                            <p className="font-semibold">완료</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold mb-4">정보 입력</p>

                    <div className="w-full mb-4">
                        <p className="float-left text-red-500 text-xs italic">
                            * 표시는 필수 입력란입니다.
                        </p>
                    </div>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-4 w-full">
                        <div className="mb-2">
                            <label className="font-bold" htmlFor="username">
                                <span className="text-red-500">*</span>이메일
                            </label>
                            <div className="flex flex-row items-center">
                                <input
                                    ref={emailRef}
                                    onChange={onEmailValHandler}
                                    name="username"
                                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    id="username"
                                    type="text"
                                    placeholder="username@example.com"
                                />
                                <button
                                    onClick={onUsernameCheck}
                                    className="w-28 text-sm ml-2 border border-gray-400 bg-gray-200 rounded py-1 hover:bg-gray-300 active:bg-gray-400"
                                >
                                    중복 체크
                                </button>
                            </div>
                            {EmailEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    이메일을 입력해주세요.
                                </p>
                            )}
                            {EmailFormatError && (
                                <p className="text-red-500 text-xs italic">
                                    올바른 이메일 형식이 아닙니다.
                                </p>
                            )}
                            {EmailFormatYn && (
                                <p className="text-green-500 text-xs italic">
                                    올바른 이메일 형식입니다.
                                </p>
                            )}
                            {EmailConfirmError && (
                                <p className="text-red-500 text-xs italic">
                                    이메일 중복 체크를 진행해주세요.
                                </p>
                            )}
                            {EmailCheckYn && (
                                <p className="text-green-500 text-xs italic">
                                    사용할 수 있는 이메일입니다.
                                </p>
                            )}
                            {EmailCheckYn === false && (
                                <p className="text-red-500 text-xs italic">
                                    사용할 수 없는 이메일입니다.
                                </p>
                            )}
                        </div>

                        <div></div>

                        <div className="mb-2">
                            <label className="font-bold" htmlFor="password">
                                <span className="text-red-500">*</span>패스워드
                            </label>
                            <input
                                ref={passwordRef}
                                onChange={onPasswordValHandler}
                                name="password"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="password"
                                type="password"
                                placeholder="영문/숫자/특수문자 혼합 8~16글자"
                            />
                            {PasswordFormatError && (
                                <p className="text-red-500 text-xs italic">
                                    올바르지 않은 패스워드 형식입니다.
                                </p>
                            )}
                            {PasswordFormatError && (
                                <p className="text-red-500 text-xs italic">
                                    영문/숫자/특수문자 혼합 8~16글자
                                </p>
                            )}
                            {PasswordEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    패스워드를 입력해주세요.
                                </p>
                            )}
                            {PasswordFormatYn && (
                                <p className="text-green-500 text-xs italic">
                                    사용할 수 있는 패스워드입니다.
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                className="font-bold"
                                htmlFor="confirmPassword"
                            >
                                <span className="text-red-500">*</span>패스워드
                                확인
                            </label>
                            <input
                                onChange={onPasswordValHandler}
                                ref={passwordConfirmRef}
                                name="confirmPassword"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="confirmPassword"
                                type="password"
                                placeholder="패스워드를 다시 입력하세요."
                            />
                            <p className="text-red-500 text-xs italic hidden">
                                패스워드 확인을 진행해주세요.
                            </p>
                            {PasswordCheckYn && (
                                <p className="text-green-500 text-xs italic">
                                    패스워드가 일치합니다.
                                </p>
                            )}
                            {PasswordConfirmError && (
                                <p className="text-red-500 text-xs italic">
                                    패스워드가 일치하지 않습니다.
                                </p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <hr className="mb-4" />
                        </div>

                        <div className="mb-4">
                            <label className="font-bold" htmlFor="name">
                                <span className="text-red-500">*</span>이름
                            </label>
                            <input
                                ref={nameRef}
                                onChange={onNameValHandler}
                                name="name"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="name"
                                type="text"
                                placeholder="홍길동"
                            />
                            {NameEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    이름을 입력해주세요.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="birthday">
                                <span className="text-red-500">*</span>생년월일
                            </label>
                            <input
                                ref={birthRef}
                                onChange={onBirthValHandler}
                                onChange={onBirthValHandler}
                                name="birthday"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="birthday"
                                type="date"
                                placeholder="생년월일"
                            />
                            {BirthdayEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    생년월일을 입력해주세요.
                                </p>
                            )}
                            {BirthdayFormatError && (
                                <p className="text-red-500 text-xs italic">
                                    올바른 년도가 아닙니다.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <p className="font-bold mb-2">
                                <span className="text-red-500">*</span>성별
                            </p>
                            <div className="ml-2">
                                <input
                                    className="form-radio mr-1"
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="1"
                                    onChange={onGenderValHandler}
                                />
                                <label className="mr-2" htmlFor="male">
                                    남자
                                </label>
                                <input
                                    className="form-radio mr-1"
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="2"
                                    onChange={onGenderValHandler}
                                />
                                <label htmlFor="female">여자</label>
                            </div>
                            {GenderEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    성별을 선택하세요.
                                </p>
                            )}
                        </div>
                        <div></div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="address">
                                <span className="text-red-500">*</span>주소(API)
                            </label>
                            <input
                                ref={addressRef}
                                onChange={onAddressValHandler}
                                name="address"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="address"
                                type="text"
                                placeholder="서울특별시, 인천광역시"
                            />
                            {AddressEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    주소를 입력해주세요.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <span className="text-red-500">*</span>
                            <span className="font-bold">휴대번호</span>
                            <div className="flex flex-row items-center">
                                <select
                                    ref={telFrontRef}
                                    onChange={onTelValHandler}
                                    name="tel_front"
                                    className="block w-20 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                    <option value="0">없음</option>
                                </select>
                                <input
                                    ref={telMidRef}
                                    onChange={onTelValHandler}
                                    name="tel_mid"
                                    className="mt-0 block text-center w-16 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    id="tel-mid"
                                    type="text"
                                    placeholder="1234"
                                    maxLength="4"
                                    pattern="[0-9]+"
                                />
                                <span className="font-bold"> - </span>
                                <input
                                    ref={telEndRef}
                                    onChange={onTelValHandler}
                                    name="tel_end"
                                    className="mt-0 block text-center w-16 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    id="tel-end"
                                    type="text"
                                    placeholder="5678"
                                    maxLength="4"
                                />
                            </div>
                            {TelEmptyError && (
                                <p className="text-red-500 text-xs italic">
                                    휴대번호를 모두 입력해주세요.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="company">
                                소속(학교)
                            </label>
                            <input
                                name="company"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="company"
                                type="text"
                                placeholder="인하공전"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="dept">
                                부서(학과)
                            </label>
                            <input
                                name="dept"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="dept"
                                type="text"
                                placeholder="컴퓨터시스템공학과"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold" htmlFor="position">
                                직책
                            </label>
                            <input
                                name="position"
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                id="position"
                                type="text"
                                placeholder="대학생"
                            />
                        </div>

                        <div></div>

                        {FormError && (
                            <div className="mb-4 col-span-2" role="alert">
                                <div className="flex bg-red-500 text-white font-bold rounded-t px-4 py-2">
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
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    입력 데이터 오류
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <p>
                                        <b>필수 입력란이 누락</b>되어있거나,{" "}
                                        <b>
                                            올바르지 않은 형식의 데이터가 삽입
                                        </b>
                                        되었습니다.
                                    </p>
                                    <p>확인 후 다시 진행해주세요.</p>
                                </div>
                            </div>
                        )}

                        <div className="col-span-2">
                            <div className="flex justify-center space-x-4 flex-row">
                                <button
                                    onClick={onSubmitHandler}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    회원가입
                                </button>
                                <Link href="/user/register/agree">
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                        뒤로 가기
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center py-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <p className="text-2xl font-bold mb-8">만료된 페이지입니다.</p>
                <div className="space-x-4">
                    <Link href="/">
                        <button className="bg-blue-500 rounded px-4 py-2 text-white hover:bg-blue-600">
                            메인 페이지로 이동
                        </button>
                    </Link>
                    <Link href="/user/register/agree">
                        <button className="bg-gray-300 rounded px-4 py-2 text-black hover:bg-gray-400">
                            회원가입 초기 페이지로 이동
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default RegisterCreate;
