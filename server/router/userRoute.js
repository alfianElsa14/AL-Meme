const express = require('express')
const upload = require('../middleware/multer')
const { register, login, getAllUsers, getUserById, editUser, changePassword, statusUser, midtransPayment, googleLogin, verifyAcc } = require('../controllers/userController')
const { authentication } = require('../middleware/auth')
const router = express.Router()

router.post('/register', upload.single('imageUrl'), register)
router.get("/verifyAcc", verifyAcc)
router.post('/login', login)
router.post('/googleLogin', googleLogin)
router.use(authentication)
router.get('/allUsers', getAllUsers)
router.get('/detailUser', getUserById)
router.put('/editUser', upload.single('imageUrl'), editUser)
router.put('/changePassword', changePassword)
router.patch('/statusUser', statusUser)
router.post('/midtransToken', midtransPayment)

module.exports = router
