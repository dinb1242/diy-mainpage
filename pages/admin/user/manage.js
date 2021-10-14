import { ClipboardListIcon } from "@heroicons/react/outline"
import cookieManage from "../../../utils/cookieManage";
import cookie from "next-cookies"
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react'
import { CogIcon, SelectorIcon, CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"
import { Fragment, useState } from 'react'
import { setDefaultLocale, registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";
import Router from "next/router"
import { Listbox, Popover, Switch } from "@headlessui/react"
import jsonSort from "../../../utils/jsonSort";

const cols = [
    { name: '번호' },
    { name: '아이디' },
    { name: '이름' },
    { name: '생년월일' },
    { name: '성별' },
    { name: '회사(학교)' },
    { name: '부서(학과)' },
    { name: '직급(신분)' },
    { name: '가입 일자' },
    { name: '인증 여부' },
    { name: '관리자 여부' },
    { name: '상태' },
]

export async function getServerSideProps(props) {

    await cookieManage(cookie(props), props.res);

    if (props.query.length === 0) {
        props.query["filter"] = "allUser";
    }

    const { data } = await axios({
        url: "http://localhost:3000/api/admin/user/userlist",
        method: "POST",
        data: props.query.length !== 0 ? props.query : {}
    })

    return {
        props: {
            userList: data
        }
    };
}

export default function UserManage(props) {
    // 현재 필터 셀렉트에서 선택된 값을 담을 State
    const [selected, setSelected] = useState(cols[0])

    // 오름차순 내림차순 스위치 State
    const [enabled, setEnabled] = useState(false);

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
        adminYn: "",
        searchData: ""
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

    // 정렬 기능을 구현한다. (일반 유저, 관리자, 그 외 테이블 정렬)
    const onFilterDataHandler = (event) => {
        event.preventDefault();
        const currentTarget = event.target.id;

        if (currentTarget === "allUser") {
            Router.replace({
                pathname: Router.basePath,
                query: { filter: "allUser" },
            }, "/admin/user/manage")
        } else if (currentTarget === "commonUser") {
            Router.replace({
                pathname: Router.basePath,
                query: { filter: "commonUser" },
            }, "/admin/user/manage")
        } else if (currentTarget === "adminUser") {
            Router.replace({
                pathname: Router.basePath,
                query: { filter: "adminUser" },
            }, "/admin/user/manage")
        } else if (currentTarget === "userByFilter") {
            Router.replace({
                pathname: Router.basePath,
                query: { filter: "userByFilter", sortBy: selected.name, descYn: enabled },
            }, "/admin/user/manage")
        }
    }

    // 검색 시, 엔터 동작에 대한 이벤트
    const onSearchEnterHandler = (event) => {
        if(event.key === "Enter") {
            onSearchDataHandler();
        }
    }

    // 검색 기능을 구현한다.
    const onSearchDataHandler = () => {
        // 현재 sortBy 및 Search Data Input에 대한 내용을 API에 전송한다.
        Router.replace({
            pathname: Router.basePath,
            query: { filter: "searchByData", sortBy: selected.name, willSearch: Inputs.searchData }
        }, "/admin/user/manage");
    }

    // 일괄 회원 승인
    const enableAllUsers = () => {
        const confirmYn = confirm("일괄 승인 처리 하시겠습니까?");
        if(confirmYn) {
            axios({
                url: "/api/admin/user/enable-all"
            }).then((res) => {
                if(res.data.success) {
                    alert(`${res.data.modifiedUserCounts}명이 일괄 승인 처리되었습니다.`);
                    Router.replace({
                        pathname: Router.basePath
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            return false;
        }
    }

    const notYet = () => {
        alert("미구현 기능입니다.");
    }

    return (
        <div className="flex flex-col justify-start items-start lg:items-center mt-16">

            <div className="relative flex items-center left-1/3 lg:left-0">
                <ClipboardListIcon className="inline-block w-10 h-10 mr-2" />
                <span className="text-4xl font-bold">회원 관리(개발 중)</span>
            </div>

            {/* 상단 메뉴 바 */}
            <div className="flex flex-col items-center justify-center gap-y-4 lg:flex-row lg:justify-between lg:w-3/4 w-full mt-12">
                {/* 좌측 바 */}
                <div className="flex lg:mb-0 lg:flex-row lg:justify-start lg:items-center">
                    <button id="allUser" onClick={onFilterDataHandler} className="bg-gray-50 shadow hover:bg-gray-100 px-4 py-2 rounded mr-2">전체 회원</button>
                    <button id="commonUser" onClick={onFilterDataHandler} className="bg-gray-50 shadow hover:bg-gray-100 px-4 py-2 rounded mr-2">일반 회원</button>
                    <button id="adminUser" onClick={onFilterDataHandler} className="bg-blue-200 shadow hover:bg-blue-300 px-4 py-2 rounded">관리자</button>
                </div>

                {/* 중앙 바 */}
                <div className="flex lg:mb-0 lg:justify-center lg:items-center">
                    <button onClick={ enableAllUsers } className="bg-green-100  hover:bg-green-200 px-4 py-2 rounded text-black">일괄 인증 승인</button>
                </div>

                {/* 우측 바 */}
                <div className="flex justify-end items-center">
                    <span className="text-sm text-center mr-2">내림차순 On/Off</span>
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? 'bg-blue-600' : 'bg-blue-200'}
                        relative mr-4 inline-flex flex-shrink-0 h-[24px] w-[50px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span
                            aria-hidden="true"
                            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                    </Switch>
                    <Listbox value={selected} onChange={setSelected}>
                        <div className="relative w-44">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white hover:bg-gray-50 active:bg-gray-100 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full text-sm py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {cols.map((col, colIdx) => (
                                        <Listbox.Option
                                            key={colIdx}
                                            className={({ active }) =>
                                                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                                                cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-gray-50`
                                            }
                                            value={col}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`${selected ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                    >
                                                        {col.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    <button id="userByFilter" onClick={onFilterDataHandler} className="bg-gray-50 drop-shadow hover:bg-gray-100 px-5 py-2 rounded mr-4 text-sm lg:text-base">정렬</button>
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button
                                    className={`
                ${open ? '' : 'text-opacity-90'}
                text-black group bg-gray-50 text-sm lg:text-base hover:bg-gray-100 drop-shadow px-5 py-2 rounded inline-flex items-center hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                    <span>검색</span>
                                    <ChevronDownIcon
                                        className={`${open ? '' : 'text-opacity-70'}
                                        ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute z-10 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="relative flex flex-col bg-white p-7">
                                                <input name="searchData" type="text" placeholder={ `[${selected.name}]에 대한 검색` } onKeyDown={ onSearchEnterHandler } onChange={ onInputChange } value={Inputs.searchData} />
                                                <button onClick={ onSearchDataHandler } className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow">검색</button>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                </div>
            </div>

            <table className="table-fixed mt-8 text-center border-separate">
                <thead>
                    <tr>
                        <th className="w-16">번호</th>
                        <th className="w-32">아이디</th>
                        <th className="w-20">이름</th>
                        <th className="w-32">생년월일</th>
                        <th className="w-8">성별</th>
                        <th className="w-48">주소</th>
                        <th className="w-40">휴대번호</th>
                        <th className="w-40">회사(학교)</th>
                        <th className="w-40">부서(학과)</th>
                        <th className="w-32">직급(신분)</th>
                        <th className="w-48">가입 일자</th>
                        <th className="w-20">인증 여부</th>
                        <th className="w-28">관리자 여부</th>
                        <th className="w-8">상태</th>
                        <th className="w-32">변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.userList.map((user) => {
                            return (
                                <tr className="border-b border-gray-300" key={user.member_seq}>
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
                                        <select name="enabledYn" onChange={onInputChange} defaultValue={Inputs.enabledYn}>
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
                    border: 1px;
                    padding: 10px;
                }
            `}</style>
        </div>
    )
}