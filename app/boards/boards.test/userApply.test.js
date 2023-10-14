/* Test List
 1. 정상 지원
 2. 비정상 지원
    (2-1) 중복 지원
    (2-2) 없는 공고 지원
    (2-3) 그외 잘못된 지원
*/
describe('userApply Test', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const userApply = require('../boards.service/userApply')

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }

    const req = {
        id: {
            code: "user",
            company_id: "Lee"
        },
        body: {
            board_id: 1,
            company_id: "jycompany"
        }
    }

    it('1. UserApply : return status 201', async () => {
        await db.UserApply.create.mockReturnValue(Promise.resolve(true))

        await userApply(req, res)

        expect(res.status).toBeCalledWith(201)
    })


    it('2-1. Incorrect UserApply : 중복지원', async () => {
        await db.UserApply.create.mockRejectedValue({ name: "SequelizeUniqueConstraintError" })

        await userApply(req, res)

        expect(res.json).toBeCalledWith({ success: false, message: "중복 요청, 이미 지원한 공고 입니다." })
    })


    it('2-2. Incorrect UserApply : 존재하지 않는 공고 지원', async () => {
        await db.UserApply.create.mockRejectedValue({ name: "SequelizeForeignKeyConstraintError" })

        await userApply(req, res)

        expect(res.json).toBeCalledWith({ success: false, message: "해당 공고 없음. 올바른 공고로 다시 지원해주세요." })
    })


    it('2-3. Incorrect UserApply : 그 외 잘못된 지원', async () => {
        await db.UserApply.create.mockRejectedValue({ name: "etc" })

        await userApply(req, res)

        expect(res.json).toBeCalledWith({ success: false, message: "잘못된 요청, 지원요청을 다시 확인해주세요." })
    })
})