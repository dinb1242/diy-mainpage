import storage from "redux-persist/lib/storage/session";

export default function Logout(req, res) {
    // DB에서 사용자 지우는 작업도 해야함.
    console.log("===>로그아웃 API");
    console.log(req.query);
    res.setHeader("Set-Cookie", [`refreshToken=; path=/; expires=-1;`, `accessToken=; path=/; expires=-1;`]);
    return res.send({success: true});
}