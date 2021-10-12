import mysqlQuery from "../../../utils/db";
import bcrypt from "bcryptjs"

function dateLeftPad(MonOrDate) {
    if (MonOrDate >= 10) { return MonOrDate; } 
    
    return `0${MonOrDate}`
}

function getDateYyyyMmDd(date) {
    const year = date.getFullYear().toString();
    const month = dateLeftPad(date.getMonth());
    const day = dateLeftPad(date.getDate());

    return `${year}-${month}-${day}`;
}

export default async function GetUserList(req, res) {
    const userListResults = await mysqlQuery.query(`
        SELECT
            member_seq,
            member_username,
            member_name,
            member_birthday,
            member_gender,
            member_address,
            member_tel,
            member_company,
            member_dept,
            member_position,
            member_reg_date,
            member_enabled_yn,
            member_admin_yn,
            member_status
        FROM tb_member
    `)

    userListResults.map((value) => {
        value.member_birthday = getDateYyyyMmDd(value.member_birthday);
    })

    console.log(userListResults[0].member_tel);
    console.log(bcrypt.decodeBase64(userListResults[0].member_tel));

    return res.send(userListResults);
}