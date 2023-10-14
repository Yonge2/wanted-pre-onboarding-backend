/* Test List
 1. 검색을 위한 where절 조건문 반환하는 함수
    (1-1) string으로 검색할 떄
    (1-2) number로 검색할 때
 2. 사용자와 가까운 회사 순 정렬 함수
 3. 공고 GET
    (3-1) 정상 GET
    (3-2) 비정상 GET
*/

describe('Get Board Test With util functions', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const { getBoard, searchLike, sortByDistance } = require('../boards.service/getBoard')
    const { Op } = require('sequelize')

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    it('1-1. SearchLike Test by string', () => {
        const searchString = "test"
        const testStringResult = searchLike(searchString)

        const expectStringTest = {
            [Op.or]: [
                { emp_title: { [Op.like]: `%${searchString}%` } },
                { emp_position: { [Op.like]: `%${searchString}%` } },
                { emp_skill: { [Op.like]: `%${searchString}%` } },
                { company_id: { [Op.like]: `%${searchString}%` } },
                { company_region: { [Op.like]: `%${searchString}%` } }
            ]
        }

        expect(testStringResult).toStrictEqual(expectStringTest)
    })


    it('1-2. SearchLike Test by number', () => {
        const searchNumber = 10
        const testNumberResult = searchLike(searchNumber)

        const expectNumberTest = {
            emp_prize: { [Op.gte]: 10 }
        }

        expect(testNumberResult).toStrictEqual(expectNumberTest)
    })


    it('2. Sort By Distance Test', () => {
        const testUserRegion = "경기"
        const testArr = [{ idx: 1, company_region: "경기" }, { idx: 2, company_region: "제주" },
        { idx: 3, company_region: "충청" }, { idx: 4, company_region: "경상" }]
        //경기와 가까운 순으로 정렬 -> [경기, 충청, 경상, 제주]
        const expectResultIdx = [1, 3, 4, 2]
        const sortedArr = sortByDistance(testArr, testUserRegion)

        sortedArr.map((value, index) => {
            expect(value.idx).toBe(expectResultIdx[index])
        })
    })


    it('3-1. Correct GetBoard Test', async () => {
        const req = {
            headers: {
                user_id: undefined
            },
            query: {
                serach: undefined,
                distance: undefined
            },
        }
        await db.Board.findAll.mockReturnValue(Promise.resolve(true))
        await getBoard(req, res)

        expect(res.status).toBeCalledWith(200)
    })

    it('3-2. Incorrect GetBoard Test', async () => {
        const req = {
            headers: {
                user_id: undefined
            },
            query: {
                serach: undefined,
                distance: undefined
            },
        }
        await db.Board.findAll.mockRejectedValue('err')
        await getBoard(req, res)

        expect(res.status).toBeCalledWith(400)
    })
})