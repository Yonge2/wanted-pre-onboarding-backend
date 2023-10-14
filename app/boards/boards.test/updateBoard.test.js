/* Test List
 1. 정상 수정
 2. 비정상 수정
    (2-1) 수정 내용 없을 떄
    (2-2) 게시글 작성자와 수정 요청자가 다를 때
    (2-3) 없는 속성 값을 수정 요청할 때
*/

describe('deleteBoard Test', () => {
    const { jest } = require('@jest/globals')
    jest.mock('../../sequelize/models/index')
    const { db } = require('../../sequelize/models/index')

    const updateBoard = require('../boards.service/updateBoard')

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }


    it('1. Correct updateBoard', async () => {
        const req = {
            id: {
                code: "company",
                company_id: "jycompany"
            },
            body: {
                board_id: 1,
                company_id: "jycompany",
                emp_title: "변경된 제목",
            }
        }

        await db.Board.update.mockReturnValue(
            Promise.resolve([true])
        )

        await updateBoard(req, res)
        expect(res.status).toBeCalledWith(201)

    })


    it('2-1. Incorrect updateBoard-1, 수정내용이 없을 때', async () => {
        const req = {
            id: {
                code: "company",
                company_id: "jycompany"
            },
            body: {
                board_id: 1,
                company_id: "jycompany",
                emp_title: "변경된 제목",
            }
        }

        await db.Board.update.mockReturnValue(
            Promise.resolve([false, false, false])
        )
        await updateBoard(req, res)

        expect(res.status).toBeCalledWith(400)
    })


    it('2-2. Incorrect updateBoard-2, 작성자와 수정요청자가 다를 때', async () => {
        const req = {
            id: {
                code: "company",
                company_id: "jycompany"
            },
            body: {
                board_id: 1,
                company_id: "wanted",
                emp_title: "변경된 제목",
            }
        }
        await db.Board.update.mockRejectedValue('err')

        await updateBoard(req, res)

        expect(res.status).toBeCalledWith(401)
    })


    it('2-3. Incorrect updateBoard-3, 없는 속성값을 요청하는 등 비정상 수정 요청', async () => {
        const req = {
            id: {
                code: "company",
                company_id: "jycompany"
            },
            body: {
                board_id: 1,
                company_id: "wanted",
                emp_title: "변경된 제목",
            }
        }
        await db.Board.update.mockRejectedValue('err')

        await updateBoard(req, res)

        expect(res.status).toBeCalledWith(400)
    })
})