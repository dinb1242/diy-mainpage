import MysqlQuery from "../db";

// DB Select 테스트
export default async (req, res) => {
    console.log(req.body);

    try {
        console.log(MysqlQuery);
        const results = await MysqlQuery.query("SELECT * FROM test_table");
        await MysqlQuery.end();

        console.log("===>쿼리 성공");
        console.log(results);

        results.map((value, index) => {
            console.log(value, index);
        })
    } catch(err) {
        console.log("===>쿼리 중 에러가 발생하였습니다.");
        console.log(err);
    }

    res.status(200).json({success: true});
}