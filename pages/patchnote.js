import { TerminalIcon } from "@heroicons/react/outline"

export default function PatchNote(props) {
    return (
        <div className="flex flex-col items-center mt-10">
            <p className="inline-flex items-center text-3xl font-bold">
                <TerminalIcon className="w-10 mr-2" />
                패치 노트
            </p>
            <div className="mt-8 w-1/2">
                <div>
                    <p className="text-2xl font-bold border-b-2 pb-2">2021-10-14</p>
                    <div className="mt-4 px-4">
                        콘텐츠
                    </div>
                </div>
            </div>
        </div>
    )
}