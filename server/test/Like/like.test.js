const request = require('supertest');
const app = require('../../app');
const { sequelize, Meme } = require('../../models/index');
const { sign } = require('../../helper/jwt');
const { hash } = require('../../helper/bcrypt');
const { queryInterface } = sequelize;

const dummyUser = [
    {
        username: 'jika',
        email: 'jika@gmail.com',
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
        otherId: '135256802',
        title: 'Epic Handshake',
        imageUrl: 'https://i.imgflip.com/28j0te.jpg',
        width: 900,
        height: 645,
        boxCount: 3,
        captions: 199000,
        status: 'basic',
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

let token;
let memeId;
let memeId2;
let memeId3;

beforeAll(async () => {
    try {

        const responseMeme = await queryInterface.bulkInsert(`Memes`, memesData, null)

        const responseUsers = await queryInterface.bulkInsert(`Users`, dummyUser, null);

        const likeData = [
            {
                userId: responseUsers,
                memeId: responseMeme,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]

        await queryInterface.bulkInsert(`Likes`, likeData, null)

        const newMeme = await Meme.create({
            otherId: '135256263',
            title: 'Epic salaman',
            imageUrl: 'https://i.imgflip.com/28j0te.jpg',
            width: 1000,
            height: 1000,
            boxCount: 3,
            captions: 199800,
            status: 'premium',
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const newMeme2 = await Meme.create({
            otherId: '135256233',
            title: 'Epic stest 3',
            imageUrl: 'https://i.imgflip.com/28j0te.jpg',
            width: 1009,
            height: 1001,
            boxCount: 3,
            captions: 199700,
            status: 'premium',
            createdAt: new Date(),
            updatedAt: new Date()
        })


        const { email, role } = dummyUser[0]
        token = sign({ id: responseUsers, email, role })
        memeId = responseMeme
        memeId2 = newMeme.id
        memeId3 = newMeme2.id
    } catch (error) {
        console.log(error);
    }
})


afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Likes`, null, {});
        await queryInterface.bulkDelete(`Memes`, null, {});
        await queryInterface.bulkDelete(`Users`, null, {});
    } catch (error) {
        console.log(error);
    }
})

describe('get like', () => {
    test('success get like by meme id with status 200', async () => {
        const response = await request(app).get(`/api/likes/getLike/${memeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('like')
        expect(response.body).toHaveProperty('dataLike')
        expect(Array.isArray(response.body.dataLike)).toBe(true);
    })
})

describe('add like', () => {
    test('success add like with status 201', async () => {
        const response = await request(app).post(`/api/likes/addLike/${memeId2}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('sukses Like')
        expect(response.body).toHaveProperty('dataMeme')
    })

    test('failed add like meme not found with status 404', async () => {
        const response = await request(app).post(`/api/likes/addLike/99999`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })

    test('failed add like existing like with status 400', async () => {
        const response = await request(app).post(`/api/likes/addLike/${memeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme ini sudah anda like')
    })
})

describe('remove like', () => {
    test('success delete like with status 200', async () => {
        const response = await request(app).delete(`/api/likes/removeLike/${memeId}`).set('authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Sukses Unlike')
        expect(response.body).toHaveProperty('dataMeme')
    })

    test('failed delete like meme not found with status 404', async () => {
        const response = await request(app).delete(`/api/likes/removeLike/99999`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })

    test('failed delete like with status 404', async () => {
        const response = await request(app).delete(`/api/likes/removeLike/${memeId3}`).set('authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Anda belum memberikan like pada meme ini.')
    })
})