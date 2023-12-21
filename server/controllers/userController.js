const { handleValidationError, handleExistingRecordError, handleInternalError, handleNotFoundError, handleLoginError } = require('../helper/errorHandler');
const { User } = require('../models')
const joi = require('joi');
const { sign } = require('../helper/jwt');
const fs = require('fs');
const { hash, compare } = require('../helper/bcrypt');
const midtransClient = require('midtrans-client');
const { sendEmail } = require('../helper/nodeMailerVerify');
const sendEmailNotif = require('../helper/nodemailerNotifPremium');

exports.register = async (req, res) => {
    try {
        const newUser = req.body;

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required()
        })

        const { error } = schema.validate(newUser)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingUser = await User.findOne({
            where: {
                email: newUser.email
            }
        });

        if (existingUser) {
            return handleExistingRecordError(res, 'Email sudah terdaftar, coba ganti dengan nama lain')
        }

        const uploadedImg = req.file.path

        const result = await User.create({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            imageUrl: uploadedImg,
            role: 'basic'
        })

        await sendEmail(result);

        res.status(201).json({ message: 'register sukses', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.verifyAcc = async (req, res) => {
    try {
        const { token } = req.query;
        const data = await User.findOne({
            where: {
                verifyToken: token,
            },
        });

        data.verifyToken = null;
        data.verified = true;

        await data.save();
        res.redirect('http://localhost:3000/login');
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.login = async (req, res) => {
    try {
        const dataLogin = req.body

        const schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required()
        })

        const { error } = schema.validate(dataLogin)

        if (error) {
            return handleValidationError(res, error)
        }

        let dataUser = await User.findOne({
            where: {
                email: dataLogin.email
            }
        })

        if (!dataUser) {
            return handleNotFoundError(res, 'User')
        }

        if (!dataUser.verified) {
            return res.status(403).json({ message: 'Verifikasi email anda sebelum login' })
        }

        let comparePass = compare(dataLogin.password, dataUser.password)

        if (!comparePass) {
            return handleLoginError(res)
        }

        const { id, email, role } = dataUser

        let access_token = sign({ id, email, role })

        res.status(201).json({ data: dataUser, access_token })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.googleLogin = async (req, res) => {
    try {
        const { email, username } = req.body

        const [created] = await User.findOrCreate({
            where: {
                email,
            },
            defaults: {
                username,
                email,
                imageUrl: false,
                password: await hash('1234567'),
                role: "basic",
                verified: true
            },
            hooks: false
        });

        let token = sign({
            id: created.id,
            email: created.email,
            role: created.role
        });

        res.status(201).json({ access_token: token, data: created });
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.user.id
        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        res.status(200).json(userData)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.editUser = async (req, res) => {
    try {
        const userId = req.user.id
        const newData = req.body

        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        const oldImage = userData.imageUrl

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const updatedImg = req.file ? req.file.path : userData.imageUrl;

        const result = await User.update({
            username: newData.username,
            email: newData.email,
            imageUrl: updatedImg
        }, {
            where: {
                id: userId
            }
        })

        if (result[0] > 0) {
            if (req.file && oldImage) {
                try {
                    fs.unlinkSync(oldImage);
                } catch (unlinkError) {
                    console.error('Error deleting old image:', unlinkError);
                }
            }

            return res.status(200).json({ message: 'success', result });

        } else {

            return res.status(400).json({ message: 'Failed to update user' });

        }
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id
        const inputPassword = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return handleNotFoundError(res, 'User');
        }

        const schema = joi.object({
            oldPassword: joi.string().min(6).required(),
            newPassword: joi.string().min(6).required(),
        })

        const { error } = schema.validate(inputPassword)

        if (error) {
            return handleValidationError(res, error)
        }

        const passwordMatch = compare(inputPassword.oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid old password' })
        }

        user.password = hash(inputPassword.newPassword);
        await user.save();

        res.status(200).json({ message: 'Change password successfully' });
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.statusUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findByPk(userId);

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        if (userData.role === 'premium') {
            if (userData.premiumDate <= new Date()) {
                const updateRole = await User.update(
                    {
                        role: 'basic',
                        premiumDate: null,
                    },
                    {
                        where: {
                            id: userId,
                            role: 'premium',
                        },
                    }
                );

                const updatedStatus = await User.findByPk(userId);

                await sendEmailNotif(
                    userData.email,
                    'Premium Expired',
                    'Your premium period has ended, please visit our website to become premium again.'
                );

                const { id, email, role } = updatedStatus
                let access_token = sign({ id, email, role })

                return res.status(200).json({ message: 'Premium expired. Role reverted to basic.', data: updatedStatus, access_token });
            } else {

                return res.status(400).json({ status: 'Error', message: 'Anda masih premium.' });
            }
        }

        const updateRole = await User.update(
            {
                role: 'premium',
                premiumDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            },
            {
                where: {
                    id: userId,
                    role: 'basic',
                },
            }
        );

        const updatedStatus = await User.findByPk(userId);

        await sendEmailNotif(
            userData.email,
            'Premium Success',
            'Congratulations, your account has become Premium, enjoy various special features from our website.'
        );

        const { id, email, role } = updatedStatus
        let access_token = sign({ id, email, role })

        res.status(200).json({ message: 'Sukses menjadi premium', data: updatedStatus, access_token });
    } catch (error) {
        console.log(error);
        return handleInternalError(res);
    }
}

exports.midtransPayment = async (req, res) => {
    try {
        const userId = req.user.id
        const userData = await User.findByPk(userId)

        if (!userData) {
            return handleNotFoundError(res, 'User');
        }

        if (userData.role === 'premium') {
            return res.status(400).json({ status: 'Error', message: 'anda sudah premium' })
        }

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY_MIDTRANS,
        });

        let parameter = {
            "transaction_details": {
                "order_id": "TRANSACTION" + Math.floor(1000000 + Math.random() * 9000000),
                "gross_amount": 20000,
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "email": userData.email,
            }
        };

        const midtransToken = await snap.createTransaction(parameter)
        res.status(201).json(midtransToken)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

