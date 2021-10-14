import mysqlQuery from "../../../../utils/db";

export default async function EnableAllUser(req, res) {

    try {
        const modifiedUserCounts = await mysqlQuery.query(`
            SELECT COUNT(*) as counts
            FROM tb_member
            WHERE member_enabled_yn=0
        `)
        await mysqlQuery.query('UPDATE tb_member SET member_enabled_yn=1');

        return res.json({success: true, modifiedUserCounts: modifiedUserCounts[0].counts});
    } catch (err) {
        console.log(err);
        return res.json({success: false});
    }
}