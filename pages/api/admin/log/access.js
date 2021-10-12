import mysqlQuery from "../../../../utils/db";

function dateLeftPad(MonOrDate) {
    if (MonOrDate >= 10) { return MonOrDate; } 
    
    return `0${MonOrDate}`
}

function getDateYyyyMmDd(date) {
    const year = date.getFullYear().toString();
    const month = dateLeftPad(date.getMonth());
    const day = dateLeftPad(date.getDate());

    return `${year}-${month}-${day}`;
}

// 일일 사용자가 접속한 로그를 가져온다. (단, 중복 사용자의 경우 집계에서 제외한다.)
export default async function GetAccessLog(req, res) {
    // 전체 접속자에 대한 합을 구한다.
    await mysqlQuery.query(`
        CREATE OR REPLACE VIEW count_all_log_date AS
            SELECT DISTINCT(log_member_seq), DATE_FORMAT(log_login_date, '%Y-%m-%d') as date
            FROM tb_access_history
    `)

    const allCounts = await mysqlQuery.query(`
        SELECT COUNT(*) AS all_counts FROM count_all_log_date
    `)

    // 7일 이내 접속자의 수에 대한 집계 쿼리를 수행한다.
    await mysqlQuery.query(`
        CREATE OR REPLACE VIEW count_log_date AS
            SELECT DISTINCT(log_member_seq), DATE_FORMAT(log_login_date, '%Y-%m-%d') as date
            FROM tb_access_history
            WHERE DATE_FORMAT(log_login_date, '%Y-%m-%d') BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();
    `)

    const accessLogsFor7Days = await mysqlQuery.query(`
        SELECT date, COUNT(*) as counts
        FROM count_log_date
        GROUP BY date
    `)

    return res.json({
        allCounts: allCounts[0].all_counts,
        accessLogsFor7Days: accessLogsFor7Days
    })
}