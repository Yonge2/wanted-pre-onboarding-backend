/* Test List
 1. 정상 생성
 2. 비정상 생성
*/

describe('CreateBoard Test', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const createBoard = require('../boards.service/createBoard')

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const req = {
        id: {
            code: "company",
            company_id: "jycompany"
        },
        body: {
            company_id: "jycompany",
            emp_position: "백엔드 주니어 개발자",
            emp_prize: 100000,
            emp_skill: "java",
            emp_title: "[원티드] 백엔드 주니어 개발자 채용",
            emp_detail: "모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다 모집합니다"
        }
    }

    it('Correct CreateBoard', async () => {

        await db.Company.findOne.mockReturnValue(
            Promise.resolve({
                company_id: "jycompany",
                company_region: "서울"
            })
        )
        await db.Board.create.mockReturnValue(
            Promise.resolve(true)
        )
        await createBoard(req, res)

        expect(res.status).toBeCalledWith(201)
    })


    it('Incorrect CreateBoard, 생성 중, err를 반환할 때', async () => {

        await db.Company.findOne.mockReturnValue(
            Promise.resolve({
                company_id: "jycompany",
                company_region: "서울"
            })
        )
        await db.Board.create.mockRejectedValue('err')
        await createBoard(req, res)

        expect(res.status).toBeCalledWith(400)
    })
})