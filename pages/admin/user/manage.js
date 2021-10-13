import { ClipboardListIcon } from "@heroicons/react/outline"
import cookieManage from "../../../utils/cookieManage";
import cookie from "next-cookies"
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react'
import { CogIcon } from "@heroicons/react/solid"
import { Fragment, useState, useMemo } from 'react'
import { setDefaultLocale, registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router"

export async function getServerSideProps(props) {
    await cookieManage(cookie(props), props.res);

    const { data } = await axios({
        url: "http://localhost:3000/api/admin/user/userlist",
        method: "POST"
    })

    return {
        props: {
            userList: data
        }
    };
}

export default function UserManage(props) {
    let [isOpen, setIsOpen] = useState(false)

    // DB에서 가져온 유저 정보에 대한 State
    const [Inputs, setInputs] = useState({
        seq: "",
        username: "",
        name: "",
        birthday: "",
        gender: "",
        address: "",
        tel: "",
        telFirst: "",
        telMid: "",
        telLast: "",
        company: "",
        dept: "",
        position: "",
        enabledYn: "",
        adminYn: ""
    })

    const onInputChange = (event) => {
        const { value, name } = event.target;
        setInputs({
            ...Inputs,
            [name]: value
        })
    }

    function closeModal() {
        setIsOpen(false)
    }

    async function saveModifiedData() {
        console.log("===>데이터 전달");
        axios({
            url: "/api/admin/user/modify",
            method: "POST",
            data: Inputs
        }).then((res) => {
            console.log(res);
        })

        setIsOpen(false);
        Router.replace(Router.asPath);
    }

    async function openModal(event) {
        event.preventDefault();
        // DB에서 유저 정보를 가져온 후, State에 저장한다.
        const { data: user } = await axios({
            url: "/api/admin/user",
            method: "POST",
            data: { seq: event.target.id }
        })
        const telWhole = user.member_tel.split('-');

        setInputs({
            ...Inputs,
            seq: event.target.id,
            username: user.member_username,
            name: user.member_name,
            birthday: user.member_birthday,
            gender: user.member_gender,
            address: user.member_address,
            telFirst: telWhole[0],
            telMid: telWhole[1],
            telLast: telWhole[2],
            company: user.member_company,
            dept: user.member_dept,
            position: user.member_position,
            enabledYn: user.member_enabled_yn,
            adminYn: user.member_admin_yn
        })

        setIsOpen(true)
    }

    const notYet = () => {
        alert("미구현 기능입니다.");
    }

    return (
        <div className="flex flex-col justify-start items-start lg:items-center mt-16">

            <div className="relative flex items-center left-1/3 lg:left-0">
                <ClipboardListIcon className="inline-block w-10 h-10 mr-2" />
                <span className="text-4xl font-bold">회원 관리</span>
            </div>

            <div className="mt-4 w-4/5">
                <button>일괄 인증 승인</button>
            </div>
    
            <table className="table-auto mt-8 text-center" style={{ width: "1680px" }}>
                <thead>
                    {/* {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                            <th>변경</th>
                        </tr>
                    ))} */}
                    <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>생년월일</th>
                            <th>성별</th>
                            <th>주소</th>
                            <th>휴대번호</th>
                            <th>회사(학교)</th>
                            <th>부서(학과)</th>
                            <th>직급(신분)</th>
                            <th>가입 일자</th>
                            <th>인증 여부</th>
                            <th>관리자 여부</th>
                            <th>상태</th>
                            <th>변경</th>
                        </tr>
                </thead>
                <tbody>
                        {
                            props.userList.map((user) => {
                                return (
                                    <tr key={user.member_seq}>
                                        <td>{user.member_seq}</td>
                                        <td>{user.member_username}</td>
                                        <td>{user.member_name}</td>
                                        <td>{user.member_birthday}</td>
                                        <td>{user.member_gender}</td>
                                        <td>{user.member_address}</td>
                                        <td>{user.member_tel}</td>
                                        <td>{user.member_company}</td>
                                        <td>{user.member_dept}</td>
                                        <td>{user.member_position}</td>
                                        <td>{user.member_reg_date}</td>
                                        {user.member_enabled_yn == 1 ?
                                            <td>인증</td> :
                                            <td>미인증</td>
                                        }
                                        {user.member_admin_yn == 1 ?
                                            <td>예</td> :
                                            <td>아니오</td>
                                        }
                                        <td>{user.member_status}</td>
                                        <td>
                                            <button id={user.member_seq} onClick={openModal} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">변경</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>

            {/* 회원 관리 버튼 클릭 시 모달창 */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center bg-opacity-50 bg-black">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* 모달 콘텐츠가 브라우저 정중앙에 보이도록 하는 트릭. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-bold leading-6 flex items-center text-gray-900"
                                >
                                    <CogIcon className="inline-block w-6 h-6 mr-1" />
                                    회원 관리
                                </Dialog.Title>
                                <hr className="mt-2" />
                                <div className="mt-2 grid grid-cols-2 px-4 gap-2">
                                    <div className="flex flex-col">
                                        <p className="font-bold">아이디</p>
                                        <p className="mt-2">{Inputs.username}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">이름</p>
                                        <input name="name" type="text" value={Inputs.name} onChange={onInputChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">생년월일</p>
                                        <input
                                            name="birthday"
                                            className=""
                                            id="birthday"
                                            type="date"
                                            placeholder="생년월일"
                                            value={Inputs.birthday}
                                            onChange={onInputChange}
                                            min="1900-12-31"
                                            max={new Date().getFullYear() + "-12-31"}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">주소</p>
                                        <input name="address" type="text" value={Inputs.address} onChange={onInputChange} />
                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <p className="font-bold">휴대번호</p>
                                        <div className="flex flex-row">
                                            <select
                                                name="telFirst"
                                                className="block w-20 mt-0 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                                onChange={onInputChange}
                                                defaultValue={Inputs.telFirst}
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
                                                name="telMid"
                                                className="mt-0 block text-center w-16 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                                id="tel-mid"
                                                type="text"
                                                placeholder="1234"
                                                maxLength="4"
                                                pattern="[0-9]+"
                                                value={Inputs.telMid}
                                                onChange={onInputChange}
                                            />
                                            <span className="font-bold"> - </span>
                                            <input
                                                name="telLast"
                                                className="mt-0 block text-center w-16 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                                id="tel-end"
                                                type="text"
                                                placeholder="5678"
                                                maxLength="4"
                                                value={Inputs.telLast}
                                                onChange={onInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">회사(학교)</p>
                                        <input name="company" type="text" value={Inputs.company} onChange={onInputChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">부서(학과)</p>
                                        <input name="dept" type="text" value={Inputs.dept} onChange={onInputChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">직급(신분)</p>
                                        <input name="position" type="text" value={Inputs.position} onChange={onInputChange} />
                                    </div>
                                    <div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">인증 여부</p>
                                        <select name="enableYn" onChange={onInputChange} defaultValue={Inputs.enabledYn}>
                                            <option value="0">미인증</option>
                                            <option value="1">인증</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold">관리자 여부</p>
                                        <select name="adminYn" onChange={onInputChange} defaultValue={Inputs.adminYn}>
                                            <option value="0">회원</option>
                                            <option value="1">관리자</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="inline-block mt-4 px-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={saveModifiedData}
                                    >
                                        저장
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex ml-2 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="button"
                                        className="absolute right-10 ml-2 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-gray-200 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={notYet}
                                    >비밀번호 변경</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <style jsx>{`
                td {
                    padding: 10px;
                }
            `}</style>
        </div>
    )
}