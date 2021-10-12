import mysqlQuery from "../../../utils/db";

export default async function GetStatistics(req, res) {

    const allRegisterResults = await mysqlQuery.query(`SELECT COUNT(*) AS counts FROM tb_member`);
    const allRegisterCounts = allRegisterResults[0].counts;

    const genderResults = await mysqlQuery.query(`
        SELECT 
            member_gender, COUNT(*) AS counts
        FROM tb_member
        GROUP BY member_gender;
    `);

    genderResults.map((value) => {
        if(value.member_gender === "M") {
            value.member_gender = "남성";
        } else {
            value.member_gender = "여성";
        }
    })

    await mysqlQuery.query(`
        CREATE OR REPLACE VIEW reg_view AS
            SELECT DATE_FORMAT(member_reg_date, '%Y-%m-%d') AS date, COUNT(*) AS count
            FROM tb_member
            GROUP BY DATE_FORMAT(member_reg_date, '%Y-%m-%d');
    `)

    const registerResults = await mysqlQuery.query(`
        SELECT *
        FROM reg_view
        WHERE date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
    `)

    return res.json({
        allCounts: allRegisterCounts,
        gender: genderResults,
        register: registerResults
    });
}