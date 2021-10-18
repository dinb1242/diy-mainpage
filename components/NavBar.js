import NavBarLink from "./NavBarLink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { changeUsermode } from "./store/action/userAction";

import DiyLogo from "../public/images/banners/diy-logo.png";

export default function NavBar() {
    const { username, name, isLogined, isAdmin } = useSelector(
        (state) => state.user
    );

    const dispatch = useDispatch();

    const onAdminChangeHandler = () => {
        dispatch(changeUsermode({
            adminMode: true
        }))
    }

    return (
        <nav className="shadow-md flex items-center justify-between flex-wrap bg-gray-50 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLink href="/">
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
                    <NavBarLink href="/">
                        <a className="block mt-4  lg:px-8 lg:py-2 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4">
                            홈
                        </a>
                    </NavBarLink>
                    <NavBarLink href="/diy/select">
                        <a className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            시작하기
                        </a>
                    </NavBarLink>
                    {/* <NavBarLink href="/about"> */}
                        <a onClick={() => {alert("준비 중입니다.")}} className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            더 알아보기
                        </a>
                    {/* </NavBarLink> */}
                    <NavBarLink href="/patchnote">
                        <a className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            패치 노트
                        </a>
                    </NavBarLink>

                    <NavBarLink href="/help">
                        <a className="block lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                            도움말
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
                        <NavBarLink href="/user/logout">
                            <div className="text-sm">
                                <a className="block lg:border lg:border-black lg:rounded lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                                    로그아웃
                                </a>
                            </div>
                        </NavBarLink>
                    </div>
                )}
                {isAdmin == 1 && (
                    <NavBarLink href="/admin/main">
                        <a onClick={ onAdminChangeHandler } className="block lg:px-4 lg:py-2 text-yellow-500 lg:bg-yellow-500 lg:rounded lg:text-white mt-4 lg:inline-block lg:mt-0 hover:text-yellow-200 mr-4 cursor-pointer">
                            관리자 페이지
                        </a>
                    </NavBarLink>
                )}
            </div>
        </nav>
    );
}
