//로그인 인증 방법 대신, 기업 회원과 개인 회원 구분을 위한 임의 인증 미들웨어
//간단하게 body나 header에 id 값을 넣어 판단한다.
module.exports = checkAccess = (req, res, next)=>{
    
    //user code = 0, employer code = 1
    const user = req.headers.user_id || req.body.user_id;
    const employer = req.headers.company_id || req.body.company_id;

    //개인 회원
    if(user&&!employer) {
        req.id = {
            code : 'user',
            user_id: user
        }
        next();
    }
    //기업 회원
    else if(employer&&!user){
        req.id = {
            code : 'employer',
            company_id: employer
        }
        next();
    }
    else{
        return res.status(401).json({success: false, message: "잘못된 인증 정보, headers나 body를 확인하세요."});
    }
}