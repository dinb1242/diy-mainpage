import mysqlQuery from "../../../utils/db";

export default async function Logout(req, res) {
    try {
        await mysqlQuery.query('UPDATE tb_access_history SET log_logout_date=? WHERE log_id=?',
        [
            new Date(),
            req.body.logId
        ])
    await mysqlQuery.query("DELETE FROM tb_refresh_token WHERE token_member_seq=?",
        [
            req.body.seq
        ])
        res.setHeader("Set-Cookie", [
            `refreshToken=; path=/; expires=-1;`,
            `accessToken=; path=/; expires=-1;`,
        ]);
        return res.json({ success: true });
    } catch (err) {}
}
