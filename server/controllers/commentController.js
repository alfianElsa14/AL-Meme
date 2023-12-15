const { handleInternalError, handleValidationError, handleNotFoundError } = require('../helper/errorHandler')
const { Comment, Meme, User } = require('../models')
const joi = require('joi')

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

        if(!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const result = await Comment.create({
            userId,
            memeId,
            comment: theComment.comment
        })

        res.status(201).json({message: "sukses", theComment})
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllComment = async (req, res) => {
    try {
        const { memeId } = req.params
        const dataComment = await Comment.findAll({
            where: {
                memeId
            },
            include: [
                {
                    model: User
                },
                {
                    model: Meme
                }
            ]
        })
        
        res.status(200).json(dataComment)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const dataComment = await Comment.findByPk(commentId)

        if(!dataComment) {
            return handleNotFoundError(res, 'Comment');
        }

        const result = await Comment.destroy({
            where: {
                id: commentId
            }
        })

        res.status(200).json({message: "sukses delete", dataComment})
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

