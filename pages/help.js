import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline"

export default function Help(props) {
    return (
        <div className="relative flex flex-col items-center mt-10 mb-10">
            <p className="inline-flex items-center text-3xl font-bold">
                <QuestionMarkCircleIcon className="w-10 mr-2" />
                도움말
            </p>
            <div className="mt-10 md:w-2/5">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>비밀번호를 잊어버렸어요.</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                                K-Mooc 이용자라면, 본 K-Mooc 게시판에 문의글을 연락 받으실 이메일, 분실한 비밀번호의 계정과 함께 작성해주세요.
                                <br/><br/>
                                확인 후, 작성해주신 이메일 주소를 통해 임시 비밀번호를 발급 조치하도록 하겠습니다.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>강의가 종료되면 가입한 계정도 사라지나요?</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                                강의가 종료되면 기존에 가입된 내역은 모두 소멸 처리하고 있습니다.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}