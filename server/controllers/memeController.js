const { handleInternalError, handleNotFoundError } = require('../helper/errorHandler');
// const redisClient = require('../helper/redisClient');
const { Meme } = require('../models')
const axios = require("axios");

exports.getAllMeme = async (req, res) => {
    try {

        const role = req.user.role
        const page = req.query.page || 1;
        const pageSize = 20;

        const offset = (page - 1) * pageSize;

        let dataMeme;

        if (role !== 'premium') {
            dataMeme = await Meme.findAndCountAll({
                where: {
                    status: 'basic'
                },
                attributes: {
                    exclude: ['text1', 'text2', 'text3', 'text4', 'text5', 'createdAt', 'updatedAt']
                },
                limit: pageSize,
                offset: offset,
            });
        } else {
            dataMeme = await Meme.findAndCountAll({
                attributes: {
                    exclude: ['text1', 'text2', 'text3', 'text4', 'text5', 'createdAt', 'updatedAt']
                },
                limit: pageSize,
                offset: offset,
            });
        }

        const previousData = page > 1 ? await Meme.findAll({
            attributes: {
                exclude: ['text1', 'text2', 'text3', 'text4', 'text5', 'createdAt', 'updatedAt']
            },
            limit: offset,
        }) : [];

        const allDataMeme = previousData.concat(dataMeme.rows);

        res.status(200).json({
            count: dataMeme.count + (page - 1) * pageSize,
            rows: allDataMeme,
        });
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getMemeById = async (req, res) => {
    try {
        const { memeId } = req.params
        const meme = await Meme.findByPk(memeId)

        if (!meme) {
            return handleNotFoundError(res, 'Meme');
        }

        res.status(200).json(meme)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}


exports.generateMeme = async (req, res) => {
    try {
        const { memeId } = req.params
        const { text0, text1, text2, text3, text4, text5 } = req.body;

        const USERNAME = process.env.USERNAME_IMGFLIP
        const PASSWORD = process.env.PASSWORD_IMGFLIP
        const arrText = []

        if (text0) {
            arrText.push({ text: text0 });
        }
        if (text1) {
            arrText.push({ text: text1 });
        }
        if (text2) {
            arrText.push({ text: text2 });
        }
        if (text3) {
            arrText.push({ text: text3 });
        }
        if (text4) {
            arrText.push({ text: text4 });
        }
        if (text5) {
            arrText.push({ text: text5 });
        }


        const dataMeme = await Meme.findByPk(memeId)

        const otherMemeId = dataMeme.otherId

        const result = await axios.post(
            'https://api.imgflip.com/caption_image',
            null,
            {
                params: {
                    template_id: otherMemeId,
                    username: USERNAME,
                    password: PASSWORD,
                    boxes: arrText
                },
            }
        );

        const resultImage = result.data;
        res.status(201).json(resultImage)

    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

