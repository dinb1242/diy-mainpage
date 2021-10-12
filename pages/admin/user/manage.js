import { ClipboardListIcon } from "@heroicons/react/outline"
import cookieManage from "../../../utils/cookieManage";
import cookie from "next-cookies"
import axios from "axios";

export async function getServerSideProps(props) {
    await cookieManage(cookie(props), props.res);

    const { data } = await axios({
        url: "http://localhost:3000/api/admin/userlist",
        method: "POST"
    })

    return {
        props: {
            userList: data
        }
    };
}

export default function UserManage(props) {
    console.log(props.userList);

    return (
        <div className="flex flex-col justify-center items-center mt-16">
            
            <div className="flex items-center">
                <ClipboardListIcon className="inline-block w-10 h-10 mr-2" />
                <span className="text-4xl font-bold">회원 관리</span>
            </div>

            <table className="table-auto mt-8 text-center">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>성별</th>
                        <th>주소</th>
                        <th>휴대번호</th>
                        <th>회사(학교)</th>
                        <th>부서(학과)</th>
                        <th>직급(신분)</th>
                        <th>가입 일자</th>
                        <th>인증 여부</th>
                        <th>관리자 여부</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.userList.map((user) => {
                            return (
                                <tr>
                                    <td>{user.member_seq}</td>
                                    <td>{user.member_username}</td>
                                    <td>{user.member_name}</td>
                                    <td>{user.member_birthday}</td>
                                    <td>{user.member_gender}</td>
                                    <td>{user.member_address}</td>
                                    <td>Null</td>
                                    <td>{user.member_company}</td>
                                    <td>{user.member_dept}</td>
                                    <td>{user.member_position}</td>
                                    <td>{user.member_reg_date}</td>
                                    <td>{user.member_enables_yn}</td>
                                    <td>{user.member_admin_yn}</td>
                                    <td>{user.member_status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}