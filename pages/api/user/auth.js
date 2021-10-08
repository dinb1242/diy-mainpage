import mysqlQuery from "../../../utils/db";
import jwt from "../../../utils/jwt";
import bcrypt from "bcryptjs";
import randToken from "rand-token";

// DB Select 테스트
export default async function Auth(req, res) {
    try {
        const user = await mysqlQuery.query(`SELECT * FROM tb_member WHERE member_username='${req.body.username}'`);

        if(!user || user == "") {
            console.log("===>존재하지 않는 유저 또는 잘못된 정보");

            return res.json({loginAuth: false});
        }

        if(bcrypt.compareSync(req.body.password, user[0].member_password)) {

            // 전달받은 Access Token, Refresh Token을 저장한다.
            const jwtTokens = await jwt.sign(user[0]);
            const fakeRefreshToken = randToken.uid(100);
            
            await mysqlQuery.query(`INSERT INTO tb_refresh_token(token_id, 
                    token_value, 
                    token_member, 
                    token_expire) 
                VALUES(?, ?, ?, ?)`, 
                [fakeRefreshToken, jwtTokens.refreshToken, user[0].member_username, new Date(await jwt.decode(jwtTokens.refreshToken).then(res => res.exp)*1000)]);

            await mysqlQuery.end();
            res.setHeader("Set-Cookie", [`accessToken=${jwtTokens.accessToken}; path=/;`, `refreshToken=${fakeRefreshToken}; path=/;`]);
            return res.json({
                loginAuth: true,
                username: user[0].member_username,
                name: user[0].member_name
            });
        } else {
            await mysqlQuery.end();
            return res.json({loginAuth: false});
        }

    } catch(err) {
        console.log("===>로그인 유저 쿼리 중 에러가 발생하였습니다.");
        console.log(err);
    }
}