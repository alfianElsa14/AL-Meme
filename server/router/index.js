const express = require('express')
const router = express.Router()
const userRouter = require('./userRoute')
const memeRouter = require('./memeRouter')
const myMemeRouter = require('./myMemeRouter')
const likeRouter = require('./likeRouter')
const commentRouter = require('./commentRouter')

router.use('/users', userRouter)
router.use('/memes', memeRouter)
router.use('/myMemes', myMemeRouter)
router.use('/likes', likeRouter)
router.use('/comments', commentRouter)


module.exports = router
