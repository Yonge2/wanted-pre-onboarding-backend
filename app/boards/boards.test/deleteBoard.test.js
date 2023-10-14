/* TestList
 1. 정상삭제
 2. 비정상 삭제
*/

describe('deleteBoard Test', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const deleteBoard = require('../boards.service/deleteBorad')

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }
    const req = {
        id: {
            code: "company",
            company_id: "jycompany"
        },
        body: {
            board_id: 1,
            company_id: "jycompany",
        }
    }

    it('Correct deleteBoard', async () => {
        await db.Board.destroy.mockReturnValue(
            Promise.resolve(true)
        )
        await deleteBoard(req, res)

        expect(res.status).toBeCalledWith(201)
    })


    it('Incorrect deleteBoard, 삭제를 완료하지 못했을 때', async () => {
        await db.Board.destroy.mockRejectedValue('err')
        await deleteBoard(req, res)

        expect(res.status).toBeCalledWith(400)
    })
})