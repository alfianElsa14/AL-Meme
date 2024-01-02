const express = require('express')
const { getAllMeme, getMemeById, generateMeme, textMemeById } = require('../controllers/memeController')
const { authentication } = require('../middleware/auth')
const router = express.Router()

router.use(authentication)
router.get('/', getAllMeme)
router.get('/detailMeme/:memeId', getMemeById)
router.post('/textMeme/:memeId', textMemeById)
router.post('/generateMeme/:memeId', generateMeme)

module.exports = router