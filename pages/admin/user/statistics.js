import axios from "axios";
import cookie from "next-cookies"
import cookieManage from "../../../utils/cookieManage"
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Sector } from "recharts"
import { useState } from "react"
import { ChartPieIcon, UserGroupIcon } from "@heroicons/react/outline"

export async function getServerSideProps(props) {
    await cookieManage(cookie(props), props.res);

    const { data } = await axios({
        url: "http://localhost:3000/api/admin/statistics",
        method: "POST"
    })

    return {
        props: {
            data: data
        }
    }
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.member_gender}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}명`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(비율 ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function UserStatistics(props) {

    const [ActiveIndex, setActiveIndex] = useState(0);

    const onPieEnterHandler = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative px-24 h-full">
            <div className="flex items-center justify-center mt-16 mb-8">
                <ChartPieIcon className="w-10 h-10 mr-2" />
                <span className="text-4xl font-bold">회원 통계</span>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-6 lg:grid-rows-1">
                <div className="lg:col-start-3 lg:col-end-5 flex flex-row justify-center items-center h-16 bg-gray-50">
                    <UserGroupIcon className="w-8 h-8 mr-2" />
                    <span className="text-2xl font-bold">전체 가입자 수: </span>
                    <span className="text-2xl ml-4">{props.data.allCounts}명</span>
                </div>
                <div className="flex flex-col justify-center items-center lg:col-start-2 lg:col-end-4 h-96 py-10">
                    <p className="text-3xl font-bold">성별 통계</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={ActiveIndex}
                                activeShape={renderActiveShape}
                                data={props.data.gender}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="counts"
                                onMouseEnter={onPieEnterHandler}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center items-center lg:col-start-4 lg:col-end-6 h-96">
                <p className="text-3xl font-bold">가입 통계</p>
                    <ResponsiveContainer width="100%" height="70%">
                        <BarChart
                            data={props.data.register}
                            margin={{
                                top: 15,
                                right: 30,
                                left: 20,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="가입 수" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}