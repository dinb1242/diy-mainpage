import mysqlQuery from "../../../../utils/db";
import bcrypt from "bcryptjs";

export default async function ModifyUserInfo(req, res) {
    const dataObj = {
        seq: req.body.seq,
        name: req.body.name,
        birthday: req.body.birthday,
        address: req.body.address,
        telFirst: req.body.telFirst,
        telMid: req.body.telMid,
        telEnd: req.body.telLast,
        telWhole:
            req.body.telFirst + "-" + req.body.telMid + "-" + req.body.telLast,
        company: req.body.company,
        dept: req.body.dept,
        position: req.body.position,
        enabledYn: req.body.enabledYn,
        adminYn: req.body.adminYn,
        modifiedPassword: req.body.modifiedPassword,
    };

    try {
        // 비밀번호 변경일 경우
        if (dataObj.modifiedPassword !== "") {
            const hashedModifiedPw = bcrypt.hashSync(dataObj.modifiedPassword, 10);
            await mysqlQuery.query(
                `
            UPDATE tb_member
            SET
                member_password=?
            WHERE member_seq=?
        `,
                [
                    hashedModifiedPw,
                    dataObj.seq
                ]
            );
        } else {
            await mysqlQuery.query(
                `
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
        `,
                [
                    dataObj.name,
                    dataObj.birthday,
                    dataObj.address,
                    dataObj.telWhole,
                    dataObj.company,
                    dataObj.dept,
                    dataObj.position,
                    dataObj.enabledYn,
                    dataObj.adminYn,
                    dataObj.seq,
                ]
            );
        }
        return res.json({success: true});
    } catch (err) {
        console.log(err);
        return res.json({success: false});
    }
}
