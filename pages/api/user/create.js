import MysqlQuery from "../../../utils/db";
import Bcrypt from "bcryptjs";

export default async function Register(req, res) {
    const dataObj = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        telFront: req.body.tel_front,
        telMid: req.body.tel_mid,
        telEnd: req.body.tel_end,
        telWhole: req.body.tel_front + req.body.tel_mid + req.body.tel_end,
        company: req.body.company,
        dept: req.body.dept,
        position: req.body.position
    }

    try {
        const saltRounds = 10;
        dataObj.password = Bcrypt.hashSync(dataObj.password, saltRounds);
        dataObj.telWhole = Bcrypt.hashSync(dataObj.telWhole, saltRounds);

        const results = await MysqlQuery.query(
            `INSERT INTO tb_member(
                member_username,
                member_password,
                member_name, 
                member_birthday, 
                member_gender, 
                member_address, 
                member_tel,
                member_company,
                member_dept,
                member_position) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [dataObj.username, dataObj.password, dataObj.name, dataObj.birthday,
            dataObj.gender, dataObj.address, dataObj.telWhole, dataObj.company, dataObj.dept, dataObj.position]
        )

        await MysqlQuery.end();

        console.log("===>쿼리 성공!");
        console.log(results);

        res.status(200).redirect("/user/register/complete");
    } catch(err) {
        console.log("===>쿼리 중 에러가 발생하였습니다.");
        console.log(err);
        res.status(500).json({
            code: "500",
            success: false,
            msg: "회원가입 쿼리 중 오류가 발생하였습니다.",
            err: err
        })
    }
    //res.status(200).json({success: true})
}