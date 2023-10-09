const { db } = require('../../sequelize/models/index')

module.exports = updateBoard = async (req, res) => {
    const updateObj = req.body

    const headerCompany_id = req.id.company_id
    const bodyCompany_id = updateObj.company_id
    const board_id = parseInt(updateObj.board_id)

    delete updateObj.board_id
    delete updateObj.company_id

    //개인 회원 접근 x, 다른 회사 접근 x
    if (req.id.code === 'user' || headerCompany_id != bodyCompany_id) {
        return res.status(401).json({ success: false, message: "접근 권한 없음" })
    }

    try {
        const updateResult = await db.Board.update(updateObj, {
            where: { 
                board_id: board_id,
                company_id: headerCompany_id
            }
        })
        const isUpdate = updateResult[0]

        if (isUpdate) {
            return res.status(201).json({ success: true, message: "해당 공고 수정 완료." })
        }

        else {
            console.log("udpateResult : ", updateResult)
            return res.status(400).json({ success: false, message: "변경내용 없음. 변경내용 다시 확인하세요." })
        }
    }
    catch (e) {
        console.log("update Err : ", e)
        return res.status(400).json({ success: true, message: "잘못된 요청, 변경내용 다시 확인하세요." })
    }
}
