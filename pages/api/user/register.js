import MysqlQuery from "../db";

export default async function Register(req, res) {
    console.log(req.body)

    // TODO: 비밀번호 Encryption할 것.
    try{
        const results = await MysqlQuery.query(
            "INSERT INTO test_table(username, password) VALUES(?, ?)",
            [req.body.username, req.body.password]
        )

        await MysqlQuery.end();

        console.log("===>쿼리 성공!");
        console.log(results);
    } catch(err) {
        console.log("===>쿼리 중 에러가 발생하였습니다.");
        console.log(err);
    }

    res.redirect("/user/register/complete");
    //res.status(200).json({success: true})
}