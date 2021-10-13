import mysqlQuery from "../../../utils/db";

export default async function GetUser(req, res) {
    const userResult = await mysqlQuery.query(`
        SELECT
            member_seq,
            member_username,
            member_name,
            DATE_FORMAT(member_birthday, '%Y-%m-%d') as member_birthday,
            member_gender,
            member_address,
            member_tel,
            member_company,
            member_dept,
            member_position,
            DATE_FORMAT(member_reg_date, '%Y-%m-%d %H:%i:%s') AS member_reg_date,
            member_enabled_yn,
            member_admin_yn,
            member_status
        FROM tb_member
        WHERE member_seq=?
    `, [req.body.seq])

    return res.send(userResult[0]);
}