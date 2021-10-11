import mysqlQuery from "../../../utils/db";

export default async function Logout(req, res) {
    try {
        // DB에서 사용자 지우는 작업도 해야함.
        mysqlQuery.query("DELETE FROM tb_refresh_token WHERE token_member=?",
        [
            req.body.username
        ])
        res.setHeader("Set-Cookie", [
            `refreshToken=; path=/; expires=-1;`,
            `accessToken=; path=/; expires=-1;`,
        ]);
        return res.json({ success: true });
    } catch (err) {}
}
