const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models/index');
const { sign } = require('../../helper/jwt');
const { hash } = require('../../helper/bcrypt');
const { queryInterface } = sequelize;

const dummyUser = [
    {
        username: 'kankuro',
        email: 'kankuro@gmail.com',
        password: hash('1234567'),
        imageUrl: 'image.jpg',
        role: 'premium',
        verified: true,
        verifyToken: null,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

const memesData = [
    {
        otherId: '181913649',
        title: 'Drake Hotline Bling',
        imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
        width: 1200,
        height: 1200,
        boxCount: 2,
        captions: 1177250,
        status: 'basic',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

let token;
let memeId;
let myMemeId;


beforeAll(async () => {
    try {

        const responseMeme = await queryInterface.bulkInsert(`Memes`, memesData, null)

        const responseUsers = await queryInterface.bulkInsert(`Users`, dummyUser, null);

        const myMemeData = [
            {
                userId: responseUsers,
                memeId: responseMeme,
                title: 'Drake Hotline Bling',
                imageUrl: 'https://i.imgflip.com/89fhsy.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]

        const responseMyMeme = await queryInterface.bulkInsert(`myMemes`, myMemeData, null)

        const { email, role } = dummyUser[0]
        token = sign({ id: responseUsers, email, role })
        myMemeId = responseMyMeme
        memeId = responseMeme
    } catch (error) {
        console.log(error);
    }
})


afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`myMemes`, null, {});
        await queryInterface.bulkDelete(`Memes`, null, {});
        await queryInterface.bulkDelete(`Users`, null, {});
    } catch (error) {
        console.log(error);
    }
})

describe('get all my meme', () => {
    test('succes get all my meme with status 200', async () => {

        const response = await request(app).get('/api/myMemes').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('userId')
        expect(response.body[0]).toHaveProperty('memeId')
        expect(response.body[0]).toHaveProperty('title')
        expect(response.body[0]).toHaveProperty('imageUrl')

    })
})

describe('get my meme by id', () => {
    test('success get my meme by id with status 200', async () => {

        const response = await request(app).get(`/api/myMemes/${myMemeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('userId')
        expect(response.body).toHaveProperty('memeId')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('imageUrl')
    })

    test('failed get my meme by id with status 404', async () => {

        const response = await request(app).get(`/api/myMemes/2137123`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })
})

describe('add my meme', () => {
    test('success add my meme with status 201', async () => {

        const newMyMeme = {
            title: 'test ajah',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).post(`/api/myMemes/addMyMeme/${memeId}`).set('authorization', `Bearer ${token}`).send(newMyMeme)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('sukses')
        expect(response.body.result).toHaveProperty('id')
        expect(response.body.result).toHaveProperty('userId')
        expect(response.body.result).toHaveProperty('memeId')
        expect(response.body.result).toHaveProperty('title')
        expect(response.body.result).toHaveProperty('imageUrl')
    })

    test('failed add my meme not found with status 404', async () => {
        const newMyMeme = {
            title: 'test ajah',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).post(`/api/myMemes/addMyMeme/128192`).set('authorization', `Bearer ${token}`).send(newMyMeme)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })

    test('failed add my meme validation error with status 400', async () => {
        const newMyMeme = {
            title: '',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).post(`/api/myMemes/addMyMeme/${memeId}`).set('authorization', `Bearer ${token}`).send(newMyMeme)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"title" is not allowed to be empty')
    })
})

describe('edit my meme', () => {
    test('success edit my meme with status 201', async () => {

        const newDataMeme = {
            title: 'new data',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).put(`/api/myMemes/editMyMeme/${myMemeId}`).set('authorization', `Bearer ${token}`).send(newDataMeme)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('sukses')

    })

    test('failed edit my meme not found with status 404', async () => {
        const newDataMeme = {
            title: 'new data',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).put(`/api/myMemes/editMyMeme/126176`).set('authorization', `Bearer ${token}`).send(newDataMeme)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })

    test('failed edit my meme validation error with status 400', async () => {
        const newDataMeme = {
            title: '',
            imageUrl: 'https://i.imgflip.com/89fhsy.jpg'
        }

        const response = await request(app).put(`/api/myMemes/editMyMeme/${myMemeId}`).set('authorization', `Bearer ${token}`).send(newDataMeme)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"title" is not allowed to be empty')
    })
})

describe('delete my meme', () => {
    test('success delete my meme with status 200', async () => {

        const response = await request(app).delete(`/api/myMemes/deleteMyMeme/${myMemeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('sukses delete')
        expect(response.body.dataMeme).toHaveProperty('title')
        expect(response.body.dataMeme).toHaveProperty('imageUrl')
    })

    test('failed delete my meme not found with status 404', async () => {
        const response = await request(app).delete(`/api/myMemes/deleteMyMeme/999999`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })
})