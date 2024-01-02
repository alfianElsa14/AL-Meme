const { handleInternalError, handleValidationError, handleNotFoundError } = require('../helper/errorHandler')
const { Comment, Meme, User } = require('../models')
const joi = require('joi')
const redisClient = require('../helper/redisClient');

exports.addComment = async (req, res) => {
    try {
        const theComment = req.body
        const { memeId } = req.params
        const userId = req.user.id


        const schema = joi.object({
            comment: joi.string().required()
        })

        const { error } = schema.validate(theComment)

        if (error) {
            return handleValidationError(res, error)
        }

        const dataMeme = await Meme.findByPk(memeId)

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const result = await Comment.create({
            userId,
            memeId,
            comment: theComment.comment
        })

        const redisKey = `getComments:${memeId}`
        const cachedCommentExist = await redisClient.exists(redisKey);

        if (cachedCommentExist) {
            await redisClient.del(redisKey);
        }

        res.status(201).json({ message: "sukses", theComment })
    } catch (error) {
        
        return handleInternalError(res)
    }
}

exports.getAllComment = async (req, res) => {
    try {
        const { memeId } = req.params

        const redisKey = `getComments:${memeId}`
        const cachedComment = await redisClient.get(redisKey)

        if (cachedComment) {
            const comments = JSON.parse(cachedComment)
            return res.status(200).json({ message: 'cached', comments })
        }

        const dataComment = await Comment.findAll({
            where: {
                memeId
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt', 'premiumDate', 'verifyToken', 'verified']
                    }
                },
                {
                    model: Meme,
                    attributes: {
                        exclude: ['otherId', 'text1', 'text2', 'text3', 'text4', 'text5', 'createdAt', 'updatedAt']
                    }
                }
            ]
        })

        await redisClient.set(redisKey, JSON.stringify(dataComment), 'EX', 3600)

        res.status(200).json(dataComment)
    } catch (error) {
        
        return handleInternalError(res)
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const userId = req.user.id
        const dataComment = await Comment.findOne({
            where: {
                id: commentId,
                userId
            },
            include: [
                {
                    model: Meme
                }
            ]
        })

        if (!dataComment) {
            return handleNotFoundError(res, 'Comment');
        }

        const result = await Comment.destroy({
            where: {
                id: commentId,
                userId
            }
        })

        const redisKey = `getComments:${dataComment.Meme.id}`
        const cachedCommentExist = await redisClient.exists(redisKey);

        if (cachedCommentExist) {
            await redisClient.del(redisKey);
        }

        res.status(200).json({ message: "sukses delete", dataComment })
    } catch (error) {
        
        return handleInternalError(res)
    }
}

