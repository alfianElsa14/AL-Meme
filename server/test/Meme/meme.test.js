const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models/index');
const { sign } = require('../../helper/jwt');
const { hash } = require('../../helper/bcrypt');
const { queryInterface } = sequelize;

const dummyUser = [{
    username: 'rohingya',
    email: 'rohingya@gmail.com',
    password: hash('1234567'),
    imageUrl: 'image.jpg',
    role: 'basic',
    verified: true,
    verifyToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
}]

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
    },

    {
        otherId: '284929871',
        title: 'They don`t know',
        imageUrl: 'https://i.imgflip.com/4pn1an.png',
        width: 671,
        height: 673,
        boxCount: 2,
        captions: 35250,
        status: 'premium',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

let token;
let memeId

beforeAll(async () => {
    try {
        const responseMeme = await queryInterface.bulkInsert(`Memes`, memesData, null)

        const responseUser = await queryInterface.bulkInsert(`Users`, dummyUser, null)

        const { email, role } = dummyUser[0]

        token = sign({ id: responseUser, email, role })
        memeId = responseMeme
    } catch (error) {
        console.log(error);
    }
})


afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Memes`, null, {});
        await queryInterface.bulkDelete(`Users`, null, {});
    } catch (error) {
        console.log(error);
    }
})

describe('get all meme', () => {
    test('success get all meme with status 200', async () => {

        const response = await request(app).get('/api/memes?page=1').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('rows')
        expect(response.body.rows[0].title).toEqual(memesData[0].title)
    })
})

describe('get meme by id', () => {

    test('success get meme by id with status 200', async () => {
        const response = await request(app).get(`/api/memes/detailMeme/${memeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('meme')
        expect(response.body).toHaveProperty('resultImage')
    })

    test('failed get meme by id with status 404', async () => {
        const response = await request(app).get('/api/memes/detailMeme/999999999').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })
})