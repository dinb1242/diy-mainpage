import mysqlQuery from "../../../utils/db";

/**
 * Description: 회원가입 시 유저 아이디 중복 여부를 체크하는 API
 */
export default async function UsernameCheck(req, res) {
    console.log("===>View로부터 전달받은 데이터");
    console.log(req.body);

    try {
        // DB로부터 중복 유저 아이디 검색
        const result = await mysqlQuery.query(
            "SELECT member_username FROM tb_member WHERE member_username=?",
            [req.body.username]
        );
        console.log("===>쿼리 성공");
        console.log(result[0]);
        
        if(!result[0] || result[0] === "") {
            console.log("===>일치하는 유저가 없습니다.");
            return res.status(200).json({usernameUsable: true});
        } else {
            console.log("===>일치하는 유저가 있습니다.");
            return res.status(200).json({usernameUsable: false});
        }
    } catch (err) {
        console.log("===>중복 검사 중 오류 발생!");
        console.log(err);
    }
}
