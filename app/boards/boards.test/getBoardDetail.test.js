/* Test List
 1. 공고를 필터링하여 원하는 메인 공고는 모든정보, 그 외 공고는 게시글id와 회사id를 가지는 객체배열을 반환
 2. 1번에서 받은 배열을 사용자에게 반환
    (2-1) 정상 반환
    (2-2) 비정상 반환
*/

describe('Get Board Test With util functions', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const { getBoardDetail, organizeResult } = require('../boards.service/getBoardDetail')

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    //쉬운 testData 생성을 위한 배열
    const testArr = [0, 0, 0]

    const testData = testArr.map((v, i) => {
        return {
            ['Boards.board_id']: i + 1,
            company_id: 'testCompany',
            company_region: `test ${i + 1}`,
            ['Boards.emp_title']: `test ${i + 1}`,
            ['Boards.emp_position']: `test ${i + 1}`,
            ['Boards.emp_prize']: `test ${i + 1}`,
            ['Boards.emp_skill']: `test ${i + 1}`,
            ['Boards.emp_detail']: `test ${i + 1}`
        }
    })


    it('1. Organize Result Test', async () => {
        const testBoardId = 1
        const testOranizeResult = await organizeResult(testData, testBoardId)
        const expectTestResult = {
            board_id: testBoardId,
            company_id: 'testCompany',
            company_region: `test 1`,
            emp_title: `test 1`,
            emp_position: `test 1`,
            emp_prize: `test 1`,
            emp_skill: `test 1`,
            emp_detail: `test 1`,
            Others: [{ board_id: 2, emp_title: 'test 2' }, { board_id: 3, emp_title: 'test 3' }]
        }

        expect(testOranizeResult).toStrictEqual(expectTestResult)
    })


    it('2-1. Correct GetBoardDetail Test', async () => {
        const req = {
            query: {
                board_id: 1,
                company_id: 'testCom'
            }
        }
        await db.Company.findAll.mockReturnValue(Promise.resolve(testData))

        await getBoardDetail(req, res)

        expect(res.status).toBeCalledWith(200)
    })


    it('2-2. Incorrect GetBoardDetail Test', async () => {
        const req = {
            query: {
                board_id: 1,
                company_id: 'testCom'
            }
        }
        await db.Company.findAll.mockRejectedValue('err')

        await getBoardDetail(req, res)

        expect(res.status).toBeCalledWith(400)
    })
})