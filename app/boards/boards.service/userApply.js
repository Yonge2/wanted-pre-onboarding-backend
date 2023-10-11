const { db } = require('../../sequelize/models/index')

module.exports = userApply = async (req, res) => {
    const user_id = req.id.user_id

    if (req.id.code === 'company') {
        return res.status(401).json({ success: false, message: "잘못된 접근, 개인회원으로 지원하세요." })
    }

    const applyInfo = {
        user_id: user_id,
        board_id: req.body.board_id,
        company_id: req.body.company_id
    }

    try {
        await db.UserApply.create(applyInfo)
        return res.status(201).json({ success: true, message: `${user_id}님의 지원이 완료 되었습니다 !` })
    }
    catch (e) {
        const errMessage = errMessageHandler(e)
        return res.status(400).json({ success: false, message: errMessage })
    }
}


/**
 * err.name으로 판별하여 응답 에러 메시지를 생성
 * @param {Object} err catch로 받은 error 객체
 * @returns errMessage
 */
const errMessageHandler = (err) => {
    if (err.name === "SequelizeUniqueConstraintError") {
        return "중복 요청, 이미 지원한 공고 입니다."
    }
    else if (err.name === "SequelizeForeignKeyConstraintError") {
        return "해당 공고 없음. 올바른 공고로 다시 지원해주세요."
    }
    else {
        return "잘못된 요청, 지원요청을 다시 확인해주세요."
    }
}