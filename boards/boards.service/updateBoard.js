const Board = require('../../sequelize/models/board');

module.exports = updateBoard = async (req, res) => {
    const updateObj = req.body;

    const company_id = updateObj.company_id;
    const board_id = parseInt(updateObj.board_id);

    delete updateObj.board_id;
    delete updateObj.company_id;

    //개인 회원 접근 x, 다른 회사 접근 x
    if (req.id.code === 0 || req.id.company_id != company_id) {
        return res.status(401).json({ success: false, message: "접근 권한 없음" })
    }

    try {
        const updateResult = await Board.update(updateObj, {
            where: { board_id: board_id }
        })
        const isUpdate = updateResult[0];

        if (isUpdate) {
            return res.status(201).json({ success: true, message: "수정 완료" });
        }

        else {
            console.log("udpateResult : ", updateResult);
            return res.status(400).json({ success: false, message: "변경내용 다시 확인하세요" });
        }
    }
    catch (e) {
        console.log("update Err : ", e);
        return res.status(400).json({ success: true, message: "잘못된 요청" });
    }
}
