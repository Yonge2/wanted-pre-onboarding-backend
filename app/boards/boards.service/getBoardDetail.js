const { db } = require('../../sequelize/models/index')


const getBoardDetail = async (req, res) => {

    const board_id = parseInt(req.query.board_id)
    const company_id = encodeURI(req.query.company_id)

    try {
        const findResult = await db.Company.findAll({
            where: { company_id: company_id },
            include: [{
                model: db.Board,
                required: true,
            }],
            raw: true
        })

        const resObj = await organizeResult(findResult, board_id)

        res.status(200).json({ success: true, message: resObj })
    }
    catch (e) {
        console.log("getBoardDetail Err : ", e)
        res.status(400).json({ success: false, message: "잘못된 요청." })
    }
}


/**
 * 상세페이지와 해당 회사의 다른 게시물을 하나의 객체로 정리하는 함수
 * 
 * @param {Array} findResult 해당 회사의 모든 게시물
 * @param {number} board_id 상세페이지 게시물 번호
 */
const organizeResult = async (findResult, board_id) => {

    let resDetail = {}
    const resOthers = []

    findResult.forEach((result) => {

        if (result['Boards.board_id'] === board_id) {
            resDetail = {
                board_id: board_id,
                company_id: result['company_id'],
                company_region: result['company_region'],
                emp_title: result['Boards.emp_title'],
                emp_position: result['Boards.emp_position'],
                emp_prize: result['Boards.emp_prize'],
                emp_skill: result['Boards.emp_skill'],
                emp_detail: result['Boards.emp_detail']
            }
        }

        else {
            resOthers.push({
                board_id: result['Boards.board_id'],
                emp_title: result['Boards.emp_title']
            })
        }
    })

    resDetail.Others = resOthers

    return resDetail
}

module.exports = { getBoardDetail, organizeResult }