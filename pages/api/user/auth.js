import MysqlQuery from "../../../utils/db";
import jwt from "../../../utils/jwt";
import Bcrypt from "bcryptjs";
import randToken from "rand-token";

// DB Select 테스트
export default async (req, res) => {
    try {
        const user = await MysqlQuery.query(`SELECT * FROM tb_member WHERE member_username='${req.body.username}'`);

        console.log("===>로그인 유저 쿼리 성공");

        if(Bcrypt.compareSync(req.body.password, user[0].member_password)) {
            // 전달받은 Access Token, Refresh Token을 저장한다.
            const jwtToken = await jwt.sign(user[0]);
            const fakeRefreshToken = randToken.uid(100);

            await MysqlQuery.query(`INSERT INTO tb_refresh_token(token_id, 
                    token_value, 
                    token_member, 
                    token_expire) 
                VALUES(?, ?, ?, ?)`, 
                [fakeRefreshToken, jwtToken.refreshToken, user[0].member_username, new Date(await jwt.decode(jwtToken.refreshToken).then(res => res.exp)*1000)]);
            res.setHeader("Set-Cookie", `accessToken=${jwtToken.accessToken}; path=/;`);
            res.setHeader("Set-Cookie", `refreshToken=${fakeRefreshToken}; path=/;`);
            res.status(200).redirect("/user/mypage");
        } else {
            res.status(403).end("Password is not correct");
        }

        await MysqlQuery.end();
    } catch(err) {
        console.log("===>로그인 유저 쿼리 중 에러가 발생하였습니다.");
        console.log(err);
    }
}