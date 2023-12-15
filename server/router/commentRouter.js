const express = require('express')
const { authentication } = require('../middleware/auth')
const { addComment, getAllComment, deleteComment } = require('../controllers/commentController')
const router = express.Router()

router.use(authentication)
router.post('/addComment/:memeId', addComment)
router.get('/getComment/:memeId', getAllComment)
router.delete('/deleteComment/:commentId', deleteComment)

module.exports = router