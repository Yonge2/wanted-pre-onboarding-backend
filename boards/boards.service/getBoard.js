const { Op } = require('sequelize')
const { db } = require('../../sequelize/models/index')


module.exports = getBoard = async (req, res) => {

    const search = req.query.search

    const condition = (search) ? searchLike(search) : {}

    try {

        const searchResult = await db.Board.findAll({
            attributes:
                ['board_id', 'company_id', 'emp_title', 'emp_position', 'emp_skill', 'emp_prize', 'company_region'],
            where: condition,
            raw: true,
        })

        res.status(200).json({ success: true, message: searchResult })
    }
    catch (e) {

        console.log("getBoard Err : ", e)
        res.status(400).json({ success: false, mesaage: "잘못된 요청" })
    }
}


/**
 * 문자로 검색 : 그 문자를 포함한 쿼리결과 반환,
 * 숫자로 검색 : 검색한 숫자 이상의 채용보상금을 가진 쿼리결과 반환
 * @param {string} query.search 
 *
 */
const searchLike = (search) => {

    const isNumber = parseInt(search)

    if (!isNaN(isNumber)) {
        return {
            emp_prize: {
                [Op.gte]: isNumber
            }
        }
    }
    return {
        [Op.or]: [
            {
                emp_title: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                emp_position: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                emp_skill: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                company_id: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                company_region: {
                    [Op.like]: `%${search}%`
                }
            }
        ]
    }
}