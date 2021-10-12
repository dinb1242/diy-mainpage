import NavBarLink from "./NavBarLink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { changeUsermode } from "./store/action/userAction";

import DiyLogo from "../public/images/banners/diy-logo.png";
import { useState } from "react";

export default function NavBar() {
    const { username, name, isLogined, isAdmin } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();

    const onAdminChangeHandler = () => {
        dispatch(changeUsermode({
            adminMode: false
        }))
    }

    return (
        <nav className="shadow-md flex items-center justify-between flex-wrap bg-gray-50 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLink href="/admin/main">
                    <a>
                        <Image
                            className="cursor-pointer"
                            src={DiyLogo}
                            alt="로고"
                        />
                    </a>
                </NavBarLink>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className=" lg:flex-grow">
                    <NavBarLink href="/admin/main">
                        <a className="block mt-4 lg:px-8 lg:py-2 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4">
                            관리자 메인
                        </a>
                    </NavBarLink>
                    <NavBarLink href="/admin/user/manage">
                        <a className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            회원 관리
                        </a>
                    </NavBarLink>
                    <NavBarLink href="/admin/user/statistics">
                        <a className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            회원 통계
                        </a>
                    </NavBarLink>
                </div>

                {!isLogined && (
                    <NavBarLink href="/login">
                        <div className="text-sm">
                            <a className="block lg:border lg:border-black lg:rounded lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                                로그인
                            </a>
                        </div>
                    </NavBarLink>
                )}
                {isLogined && (
                    <div className="flex flex-row items-center">
                        <span className="mr-4 hidden lg:inline-block">
                            <span className="text-blue-500">{name}</span>님,
                            환영합니다.
                        </span>
                    </div>
                )}
                {isAdmin == 1 && (
                    <NavBarLink href="/">
                        <a onClick={onAdminChangeHandler} className="block lg:px-4 lg:py-2 bg-yellow-500 rounded text-white mt-4 lg:inline-block lg:mt-0 hover:text-yellow-200 mr-4 cursor-pointer">
                            관리자 페이지 나가기
                        </a></NavBarLink>

                )}
            </div>
        </nav>
    );
}
