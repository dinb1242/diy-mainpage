import mysqlQuery from "../../../../utils/db";

export default async function ModifyUserInfo(req, res) {
    const dataObj = {
        seq: req.body.seq,
        name: req.body.name,
        birthday: req.body.birthday,
        address: req.body.address,
        telFirst: req.body.telFirst,
        telMid: req.body.telMid,
        telEnd: req.body.telLast,
        telWhole: req.body.telFirst + '-' + req.body.telMid + '-' + req.body.telLast,
        company: req.body.company,
        dept: req.body.dept,
        position: req.body.position,
        enabledYn: req.body.enabledYn,
        adminYn: req.body.adminYn
    }

    try {
        await mysqlQuery.query(`
            UPDATE tb_member
            SET
                member_name=?,
                member_birthday=?,
                member_address=?,
                member_tel=?,
                member_company=?,
                member_dept=?,
                member_position=?,
                member_enabled_yn=?,
                member_admin_yn=?
            WHERE member_seq=?
        `, [
            dataObj.name, dataObj.birthday, dataObj.address, dataObj.telWhole, dataObj.company, dataObj.dept, dataObj.position,
            dataObj.enabledYn, dataObj.adminYn, dataObj.seq
        ])
    } catch (err) {
        console.log(err);
    }

    return res.send(true);
}