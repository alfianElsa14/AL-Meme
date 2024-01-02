const { handleInternalError, handleValidationError, handleNotFoundError } = require('../helper/errorHandler');
const { myMeme, Meme, User } = require('../models')
const joi = require('joi');

exports.getMyMeme = async (req, res) => {
    try {
        const memeData = await myMeme.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: Meme
                },
            ]
        })
        res.status(200).json(memeData)
    } catch (error) {

        return handleInternalError(res)
    }
}

exports.getMyMemeById = async (req, res) => {
    try {
        const { myMemeId } = req.params
        const userId = req.user.id
        const dataMeme = await myMeme.findOne({
            where: {
                id: myMemeId,
                userId
            },
            include: [
                {
                    model: Meme
                },
            ]
        })

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        res.status(200).json(dataMeme)

    } catch (error) {

        return handleInternalError(res)
    }
}

exports.addMyMeme = async (req, res) => {
    try {
        const { memeId } = req.params
        const newData = req.body
        const userId = req.user.id

        const dataMeme = await Meme.findByPk(memeId)

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const schema = joi.object({
            title: joi.string().required(),
            imageUrl: joi.string().required(),
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const result = await myMeme.create({
            userId: userId,
            memeId: memeId,
            title: newData.title,
            imageUrl: newData.imageUrl
        })

        res.status(201).json({ message: 'sukses', result })
    } catch (error) {

        return handleInternalError(res)
    }
}


exports.editMyMeme = async (req, res) => {
    try {
        const { myMemeId } = req.params
        const userId = req.user.id
        const newData = req.body

        const dataMeme = await myMeme.findOne({
            where: {
                id: myMemeId,
                userId
            },
            include: [
                {
                    model: Meme
                }
            ]
        })

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const schema = joi.object({
            title: joi.string().required(),
            imageUrl: joi.string().required(),
        })

        const { error } = schema.validate(newData)

        if (error) {
            return handleValidationError(res, error)
        }

        const resultEdit = await myMeme.update({
            title: newData.title,
            imageUrl: newData.imageUrl,
        }, {
            where: {
                id: myMemeId,
                userId: userId,
                memeId: dataMeme.Meme.id
            }
        })

        res.status(201).json({ message: 'sukses', resultEdit })
    } catch (error) {

        return handleInternalError(res)
    }
}


exports.deleteMyMeme = async (req, res) => {
    try {
        const { myMemeId } = req.params
        const dataMeme = await myMeme.findByPk(myMemeId)
        const userId = req.user.id

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const result = await myMeme.destroy({
            where: {
                id: myMemeId,
                userId
            }
        })

        res.status(200).json({ message: 'sukses delete', dataMeme })
    } catch (error) {

        return handleInternalError(res)
    }
}