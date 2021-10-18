import { BeakerIcon, EmojiHappyIcon, ThumbUpIcon } from "@heroicons/react/outline"

export default function PatchNote(props) {
    return (
        <div className="relative flex flex-col items-center mt-10">
            <p className="inline-flex items-center text-3xl font-bold">
                <BeakerIcon className="w-10 mr-2" />
                패치 노트
            </p>
            <div className="mt-8 w-1/2">
                <div>
                    <p className="text-2xl font-bold border-b-2 pb-2">2021-10-14</p>
                    <div className="mt-4 px-4">
                        <p className="text-lg font-bold">첫 번째 릴리즈! <EmojiHappyIcon className="w-6 inline-block"/></p>
                        <p className="text-base ml-2 mb-2">
                            기존 딥아이의 메인 페이지를 새로운 디자인으로 리뉴얼하였습니다!
                            <br/>
                            메인 페이지는 풀 페이지로 동작합니다.
                        </p>
                        <p className="text-lg font-bold">딥아이 버전 선택</p>
                        <p className="text-base ml-2 mb-2">
                            K-MOOC 운영을 위한 D.I.Y 1.0 버전부터, 그 이후 버전인 CodeB까지 사용 가능합니다.
                            <br/>
                            (이후 버전에 대한 운영 계획은 미정입니다.)
                        </p>
                        <p className="text-lg font-bold">관리자 모드 (Beta)</p>
                        <p className="text-base ml-2 mb-2">
                            본 사이트는 관리자 페이지를 따로 두지 않는 대신, 관리자 모드 활성화 여부를 통해
                            <br/>
                            방문자 및 가입 통계, 가입된 회원에 대한 인증과 같은 동작을 빠르게 수행할 수 있습니다.
                            <br/>
                            <b>이제 더 이상 직접 데이터베이스에 접근하여 인증 여부를 조작하지 않아도 됩니다. <ThumbUpIcon className="w-6 inline-block mb-2" /></b>
                            <br />
                            <b>(SSR로 동작하며, 아직 성능 최적화는 이루어지지 않았습니다. 초기 로딩 속도는 느릴지도 모릅니다...)</b>
                        </p>
                        <p className="text-lg font-bold">알아두세요!</p>
                        <p className="text-base ml-2 mb-2">
                            본 사이트는 모바일 페이지에 대한 설계를 고려하지 않았습니다.
                            <br/>
                            (사유는 딥아이 툴이 모바일 환경에서는 정상 동작하지 않기 때문입니다.)
                            <br/>
                            현재까지는 데스크탑/노트북 해상도에 중점을 맞추어 개발 중입니다.
                            <br/>
                            추후 필요 시, 모바일 페이지 최적화를 수행하려고 합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}