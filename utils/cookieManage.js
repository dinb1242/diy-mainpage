import jwt from "./jwt";
import mysqlQuery from "./db";
import randToken from "rand-token";

/**
 * description: Refresh Token을 재갱신한다.
 */
async function renewRefreshToken(fakeRefreshToken, expLeftDay) {
    console.log(`===>Refresh Token이 ${expLeftDay}일 뒤 만료 예정입니다. 해당 토큰을 재갱신합니다.`);

    const newRefreshToken = await jwt.refreshRenewal();
    const newFakeRefreshToken = randToken.uid(50);

    await mysqlQuery.query(`
    UPDATE tb_refresh_token 
    SET 
        token_id=?,
        token_value=?,
        token_expire=?,
        token_reg_date=NOW()
    WHERE token_id='${fakeRefreshToken}'`,
        [
            newFakeRefreshToken,
            newRefreshToken,
            new Date(await jwt.decode(newRefreshToken).then(res => res.exp) * 1000)
        ]
    )

    return newFakeRefreshToken;
}

/**
 * description: 쿠키의 유효성을 검사하며, Access Token, Refresh Token의 상태에 따라 쿠키 갱신/제거를 결정한다.
 */
export default async function cookieManage(tokens, res) {
    const accessToken = tokens.accessToken;
    const fakeRefreshToken = tokens.refreshToken;
    const accessTokenStatus = await jwt.verify(accessToken);
    const userFromToken = await jwt.decode(accessToken);

    const refreshTokenFromDb = await mysqlQuery.query(`SELECT * FROM tb_refresh_token WHERE token_id='${fakeRefreshToken}'`);
    const refreshTokenStatus = await jwt.verify(refreshTokenFromDb[0].token_value);

    // Refresh Token의 유효 기간을 계산한다. (Refresh Token 재갱신 여부를 위함)
    const willRefresh = 3;
    const currentDate = new Date();
    const refreshTokenExpDate = new Date(refreshTokenFromDb[0].token_expire);
    const expLeftDay = (refreshTokenExpDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    if (accessTokenStatus === -2 || accessTokenStatus === -3) {
        console.log("===>유효하지 않거나, 만료된 Access Token입니다.");
        try {

            // Refresh Token을 검사하여 Access Token 재갱신 여부를 체크한다.
            if (refreshTokenStatus === -2 || refreshTokenStatus === -3) {
                console.log("===>Refresh Token이 만료되었습니다. Access Token 재발급을 취소합니다.");
                await mysqlQuery.query(`DELETE FROM tb_refresh_token WHERE token_id='${fakeRefreshToken}'`);
                res.setHeader("Set-Cookie", [`accessToken=; path=/; expires=-1;`, `refreshToken=; path=/; expires=-1;`]);
                res.writeHead(302, { Location: "/login" });
                res.end()
            } else {
                console.log("===>Refresh Token이 유효합니다. Access Token 재갱신을 진행합니다.");
                const newAccessToken = await jwt.accessRenewal(userFromToken, expLeftDay);

                if (expLeftDay <= willRefresh && expLeftDay >= 0) {
                    const newFakeRefreshToken = await renewRefreshToken(fakeRefreshToken, expLeftDay);
                    res.setHeader("Set-Cookie", [`accessToken=${newAccessToken}; path=/;`, `refreshToken=${newFakeRefreshToken}; path=/;`]);
                    console.log("===>Access Token과 Refresh Token이 재갱신되었습니다.");
                } else {
                    res.setHeader("Set-Cookie", `accessToken=${newAccessToken}; path=/;`);
                    console.log("===>Access Token이 재갱신되었습니다.");
                }
            }

            await mysqlQuery.end();
        } catch (err) {
            console.log("===>쿠키 재발급 여부 체크 중 오류 발생!");
            console.log(err);
        }
    } else {
        console.log("===>유효한 토큰입니다. 접근 가능한 페이지입니다.");
        console.log("===>Refresh Token 재갱신 여부를 검사합니다.");
        if (expLeftDay <= 3) {
            const newFakeRefreshToken = await renewRefreshToken(fakeRefreshToken, expLeftDay);
            res.setHeader("Set-Cookie", `refreshToken=${newFakeRefreshToken}; path=/;`);
            console.log("===>Refresh Token이 재갱신되었습니다.");
        }
    }

}