import axios from "axios";
import Router from "next/router";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import cookieManage from "../../utils/cookieManage";
import cookie from "next-cookies";
import { PresentationChartLineIcon, UsersIcon, UserIcon } from "@heroicons/react/outline"

export async function getServerSideProps(props) {
    await cookieManage(cookie(props), props.res);

    const { data } = await axios({
        url: "http://localhost:3000/api/admin/log/access",
        method: "POST"
    })

    return {
        props: { data: data }
    }
}

export default function AdminMain(props) {
    const { username, name, isLogined, isAdmin, adminMode } = useSelector(
        (state) => state.user
    );
    return (
        <div className="px-24 h-auto">
            <div className="flex items-center justify-center mt-16 mb-8">
                <PresentationChartLineIcon className="w-10 h-10 mr-2" />
                <span className="text-4xl font-bold">개요</span>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-6 lg:grid-rows-6 w-full h-auto">
                <div className="lg:col-start-2 lg:col-end-4 flex flex-col justify-center items-center bg-gray-50">
                    <div className="flex items-center">
                        <UsersIcon className="inline-block w-8 h-8 mr-2" />
                        <span className="text-2xl font-bold">전체 방문자 수: </span>
                        <span className="text-2xl ml-4">{props.data.allCounts}명</span>
                    </div>
                    <p>*중복 제외 로그인 횟수 기준</p>
                </div>
                <div className="col-start-4 col-end-6 flex flex-col justify-center items-center bg-gray-50">
                    <div className="flex items-center">
                        <UserIcon className="inline-block w-8 h-8 mr-2" />
                        <span className="text-2xl font-bold">오늘 방문자 수: </span>
                        <span className="text-2xl ml-4">{props.data.accessLogsFor7Days[props.data.accessLogsFor7Days.length - 1].counts}명</span>
                    </div>
                    <p>*중복 제외 로그인 횟수 기준</p>
                </div>
                <div className=" mt-4 col-start-2 col-end-6 row-span-2 lg:row-span-5 h-60 lg:h-96 divide-x-2 flex flex-col items-center">
                    <p className="text-xl font-bold">7일 기준 접속자 통계</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={props.data.accessLogsFor7Days}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="접속자 수" dataKey="counts" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
