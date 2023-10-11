const Board = require('../../sequelize/models/board')

module.exports = deleteBoard = async (req, res) => {
    const deleteObj = req.body

    const headersCompany_id = req.id.company_id
    const bodyCompany_id = deleteObj.company_id
    const board_id = parseInt(deleteObj.board_id)

    //개인 회원 접근 x, 다른 회사 접근 x
    if (req.id.code === 'user' || headersCompany_id != bodyCompany_id) {
        return res.status(401).json({ success: false, message: "접근 권한 없음" })
    }

    try {
        const deleteResult = await Board.destroy({
            where: {
                board_id: board_id
            }
        });
        console.log("deleteResult", deleteResult)
        return res.status(201).json({ success: true, message: "해당공고 삭제완료" })
    }
    catch (e) {
        console.log("deleteBoard Err : ", e)
        return res.status(400).json({ success: false, message: "잘못된 요청" })
    }
}