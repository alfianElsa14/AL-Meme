const express = require('express')
const { authentication } = require('../middleware/auth')
const { getLike, addLike, removeLike } = require('../controllers/likeController')
const router = express.Router()

router.use(authentication)
router.get('/getLike/:memeId', getLike)
router.post('/AddLike/:memeId', addLike)
router.delete('/removeLike/:memeId', removeLike)

module.exports = router