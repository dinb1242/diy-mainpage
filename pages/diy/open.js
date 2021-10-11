import Router from "next/router"

export default function DiyVersion(props) {
    console.log(Router.query.ver);
    switch(Router.query.ver) {
        case "1":
            return (
                <div className="w-screen h-screen">
                    <iframe className="w-full h-full" src="http://133.186.201.75:54080" />
                </div>
            )

        case "2":
            return (
                <div>
                    딥아이 2버전
                </div>
            )

        case "3":
            return (
                <div>
                    딥아이 3버전
                </div>
            )

        default:
            return (
                <div>
                    지원하지 않는 딥아이 버전입니다.
                </div>
            )
    }
}