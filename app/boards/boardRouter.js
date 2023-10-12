const express = require('express')
router = express.Router()

const {checkAccess} = require('./boards.middleware/checkAccess')

const createBoard = require('./boards.service/createBoard')
const {getBoard} = require('./boards.service/getBoard')
const deleteBoard = require('./boards.service/deleteBorad')
const updateBoard = require('./boards.service/updateBoard')

const getBoardDetail = require('./boards.service/getBoardDetail')

const userApply = require('./boards.service/userApply')

router.get('/', getBoard)
router.post('/', checkAccess, createBoard)
router.put('/', checkAccess, updateBoard)
router.delete('/', checkAccess, deleteBoard)

router.get('/detail', getBoardDetail)

router.post('/detail/apply', checkAccess, userApply)

module.exports = router