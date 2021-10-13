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

export default async function GetUserList(req, res) {
    let filter = req.body.filter;
    let sortBy = req.body.sortBy;
    let descYn = req.body.descYn === "true" ? "DESC" : "ASC";
    let userListResults = null;

    // filter가 한글일 경우, 컬럼에 맞게 매핑하는 작업 수행
    const KoreanRegExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    if (KoreanRegExp.test(sortBy)) {
        switch (sortBy) {
            case "번호":
                sortBy = "member_seq";
                break;
            case "아이디":
                sortBy = "member_username";
                break;
            case "이름":
                sortBy = "member_name";
                break;
            case "생년월일":
                sortBy = "member_birthday";
                break;
            case "성별":
                sortBy = "member_gender";
                break;
            case "회사(학교)":
                sortBy = "member_company";
                break;
            case "부서(학과)":
                sortBy = "member_dept";
                break;
            case "직급(신분)":
                sortBy = "member_position";
                break;
            case "가입 일자":
                sortBy = "member_reg_date";
                break;
            case "인증 여부":
                sortBy = "member_enabled_yn";
                break;
            case "관리자 여부":
                sortBy = "member_admin_yn";
                break;
            case "상태":
                sortBy = "member_status";
                break;
            default:
                break;
        }
    }

    console.log("===>Filter", filter);
    console.log("===>sort by: ", sortBy);

    // 초기 상태일 경우 allUser로 검색한다.
    if (!filter || filter === "") {
        filter = "allUser";
    }

    // 필터 조건에 따른 쿼리를 생성한다.
    if (filter === "allUser") {
        userListResults = await mysqlQuery.query(`
        SELECT
            member_seq,
            member_username,
            member_name,
            DATE_FORMAT(member_birthday, '%Y-%m-%d') as member_birthday,
            member_gender,
            member_address,
            member_tel,
            member_company,
            member_dept,
            member_position,
            DATE_FORMAT(member_reg_date, '%Y-%m-%d %H:%i:%s') AS member_reg_date,
            member_enabled_yn,
            member_admin_yn,
            member_status
        FROM tb_member
        ORDER BY member_seq
    `)
    } else if (filter === "commonUser") {
        userListResults = await mysqlQuery.query(`
            SELECT
                member_seq,
                member_username,
                member_name,
                DATE_FORMAT(member_birthday, '%Y-%m-%d') as member_birthday,
                member_gender,
                member_address,
                member_tel,
                member_company,
                member_dept,
                member_position,
                DATE_FORMAT(member_reg_date, '%Y-%m-%d %H:%i:%s') AS member_reg_date,
                member_enabled_yn,
                member_admin_yn,
                member_status
            FROM tb_member
            WHERE member_admin_yn=0
            ORDER BY member_seq
        `)
    } else if (filter === "adminUser") {
        userListResults = await mysqlQuery.query(`
        SELECT
            member_seq,
            member_username,
            member_name,
            DATE_FORMAT(member_birthday, '%Y-%m-%d') as member_birthday,
            member_gender,
            member_address,
            member_tel,
            member_company,
            member_dept,
            member_position,
            DATE_FORMAT(member_reg_date, '%Y-%m-%d %H:%i:%s') AS member_reg_date,
            member_enabled_yn,
            member_admin_yn,
            member_status
        FROM tb_member
        WHERE member_admin_yn=1
        ORDER BY member_seq
    `)
    } else if(filter === "userByFilter") {
        userListResults = await mysqlQuery.query(`
            SELECT
                member_seq,
                member_username,
                member_name,
                DATE_FORMAT(member_birthday, '%Y-%m-%d') as member_birthday,
                member_gender,
                member_address,
                member_tel,
                member_company,
                member_dept,
                member_position,
                DATE_FORMAT(member_reg_date, '%Y-%m-%d %H:%i:%s') AS member_reg_date,
                member_enabled_yn,
                member_admin_yn,
                member_status
            FROM tb_member
            ORDER BY ${sortBy} ${descYn}
        `)
    }
    return res.send(userListResults);
}