const { handleNotFoundError, handleInternalError, handleExistingRecordError } = require('../helper/errorHandler')
const { Like, Meme, User } = require('../models')
const redisClient = require('../helper/redisClient');

exports.getLike = async (req, res) => {
    try {
        const { memeId } = req.params

        const redisKey = `getLikes:${memeId}`
        const cachedLike = await redisClient.get(redisKey)

        if (cachedLike) {
            const likes = JSON.parse(cachedLike)
            const countLike = likes.length
            return res.status(200).json({
                message: 'cached',
                like: countLike,
                dataLike: likes
            })
        }

        const dataLike = await Like.findAll({
            where: {
                memeId
            },
            include: [
                {
                    model: User
                }
            ]
        })

        await redisClient.set(redisKey, JSON.stringify(dataLike), 'EX', 3600)

        const likeCount = dataLike.length
        res.status(200).json({ like: likeCount, dataLike })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.addLike = async (req, res) => {
    try {
        const { memeId } = req.params
        const userId = req.user.id

        const dataMeme = await Meme.findByPk(memeId)

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const existingLike = await Like.findOne({
            where: {
                userId,
                memeId
            }
        });

        if (existingLike) {
            return handleExistingRecordError(res, 'Meme ini sudah anda like')
        }

        const result = await Like.create({
            userId,
            memeId
        })

        const redisKey = `getLikes:${memeId}`

        const cachedLikeExist = await redisClient.exists(redisKey);

        if (cachedLikeExist) {
            await redisClient.del(redisKey);
            console.log('Cached cleared success');
        }

        res.status(201).json({ message: 'sukses Like', dataMeme })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.removeLike = async (req, res) => {
    try {
        const { memeId } = req.params
        const userId = req.user.id

        const dataMeme = await Meme.findByPk(memeId)

        if (!dataMeme) {
            return handleNotFoundError(res, 'Meme');
        }

        const deletedRows = await Like.destroy({
            where: {
                userId,
                memeId
            }
        });

        if (deletedRows > 0) {
            
            const redisKey = `getLikes:${memeId}`

            const cachedLikeExist = await redisClient.exists(redisKey);

            if (cachedLikeExist) {
                await redisClient.del(redisKey);
                console.log('Cached cleared success');
            }

            res.status(200).json({ message: 'Sukses Unlike', dataMeme });
        } else {
            res.status(404).json({ message: 'Anda belum memberikan like pada meme ini.' });
        }
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

