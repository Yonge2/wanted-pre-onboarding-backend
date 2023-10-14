/* Test List
 1. 개인사용자 접근 확인
 2. 기업 접근 확인
 3. (3-1)개인 사용자 -> 기업 접근 실패 
    (3-2)헤더 없이 보낼 때 실패
*/

describe('Middleware checkAccess test', () => {
    const { jest } = require('@jest/globals')
    const { checkAccess } = require('../boards.middleware/checkAccess')

    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    }

    it('1. Correct User->User Access', () => {
        const next = jest.fn()
        const req = {
            headers: {
                user_id: "JaeYong"
            }
        }
        checkAccess(req, res, next)

        expect(next).toBeCalledTimes(1)
    })


    it('2. Correct Company->Company Access', () => {
        const next = jest.fn()
        const req = {
            headers: {
                company_id: "jycompany"
            }
        }
        checkAccess(req, res, next)

        expect(next).toBeCalledTimes(1)
    })


    it('3-1, 3-2. Wrong Access', () => {
        const next = jest.fn()
        const reqUserAndComapny = {
            headers: {
                user_id: "JaeYong",
                company_id: "jycompany"
            }
        }
        const reqNoHeaders = {
            headers: {}
        }
        checkAccess(reqUserAndComapny, res, next)
        checkAccess(reqNoHeaders, res, next)

        expect(next).toBeCalledTimes(0)
    })
})