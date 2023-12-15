const express = require('express')
const { authentication, authorizationEditMeme } = require('../middleware/auth')
const { getMyMeme, addMyMeme, deleteMyMeme, getMyMemeById, editMyMeme } = require('../controllers/myMemeController')
const router = express.Router()

router.use(authentication)
router.get('/', getMyMeme)
router.post('/addMyMeme/:memeId', addMyMeme)
router.put('/editMyMeme/:myMemeId', authorizationEditMeme, editMyMeme)
router.delete('/deleteMyMeme/:myMemeId', deleteMyMeme)
router.get('/:myMemeId', getMyMemeById)

module.exports = router