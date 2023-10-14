const { Op } = require('sequelize')
const { db } = require('../../sequelize/models/index')


const getBoard = async (req, res) => {
    const userID = req.headers.user_id

    const search = req.query.search
    const byDistance = Boolean(req.query.distance)

    const condition = (search) ? searchLike(search) : {}

    try {

        let resResult = []
        
        const searchResult = await db.Board.findAll({
            attributes:
                ['board_id', 'company_id', 'emp_title', 'emp_position', 'emp_skill', 'emp_prize', 'company_region'],
            where: condition,
            order: [
                ['board_id', 'DESC']
            ],
            raw: true,
        })

        if(searchResult.length===0) return res.status(200).json({ success: true, message: "공고가 없네요 ! " })

        if(userID&&byDistance){

            const userRegion = await db.User.findOne({
                attributes: ['user_region'],
                where: {user_id: userID},
                raw: true
            })
            
            resResult = sortByDistance(searchResult, userRegion.user_region)
        }
        else resResult = searchResult

        res.status(200).json({ success: true, message: resResult })
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


/**
 * 임의로 설정한 거리지수에 따라 사용자와 가까운 회사순으로 정렬하는 함수
 * @param {Object[]} boards 
 * @param {string} userRegion 
 * @returns sortedArray
 */
const sortByDistance = (boards, userRegion) => {

    const distanceOption = {
        '서울': 1,
        '경기': 2,
        '인천': 3,
        '충청': 4,
        '강원': 5,
        '전라': 6,
        '경상': 7,
        '제주': 8
    }
    const sortedBoards = boards.sort((a, b) => {
        const aRegion = a.company_region
        const bRegion = b.company_region
        return (Math.abs(distanceOption[userRegion] - distanceOption[aRegion])
            - Math.abs(distanceOption[userRegion] - distanceOption[bRegion]))
    })
    return sortedBoards
}

module.exports = { getBoard, searchLike, sortByDistance}