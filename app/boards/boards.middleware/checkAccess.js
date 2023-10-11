/**
 * 로그인 인증 방법 대신, 간단하게 header에 id 값을 넣어 기업 회원과 개인 회원 구분을 위한 임의 인증 미들웨어
 * @param {*} req req.headers.user_id || req.headers.company_id
 * @param {*} res 잘못된 값 받았을 때의 응답 객체
 * @param {*} next 기업/개인 판단 후 callback
 */
const checkAccess = (req, res, next) => {

    const user = req.headers.user_id
    const company = req.headers.company_id

    //개인 회원
    if (user && !company) {
        req.id = {
            code: 'user',
            user_id: user
        }
        next();
    }
    //기업 회원
    else if (company && !user) {
        req.id = {
            code: 'company',
            company_id: company
        }
        next();
    }
    else {
        return res.status(401).json({ success: false, message: "잘못된 인증 정보, headers를 확인하세요." });
    }
}

module.exports = {checkAccess}