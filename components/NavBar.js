import NavBarLink from "./NavBarLink"
import Image from "next/image";

import DiyLogo from "../public/images/banners/diy-logo.png";

export default function NavBar() {
    return (
        <nav className="shadow-md flex items-center justify-between flex-wrap bg-gray-50 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavBarLink href="/">
                    <a>
                        <Image className="cursor-pointer" src={DiyLogo} alt="로고" />
                    </a>
                </NavBarLink>
            </div>

            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto font-semibold">
                <div className="text-sm lg:flex-grow">
                    <NavBarLink href="/">
                        <a className="block mt-4 lg:border lg:border-black lg:rounded lg:px-8 lg:py-2 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4">
                            홈
                        </a>
                    </NavBarLink>
                    <a className="block lg:border lg:border-black lg:rounded lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                        더 알아보기
                    </a>
                </div>
                <div className="text-sm">
                    <a className="block lg:border lg:border-black lg:rounded lg:px-4 lg:py-2  mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 cursor-pointer">
                        로그인
                    </a>
                </div>
            </div>
        </nav>
    )
}