const request = require('supertest');
const app = require('../../app');
const { sequelize, Meme } = require('../../models/index');
const { sign } = require('../../helper/jwt');
const { hash } = require('../../helper/bcrypt');
const { queryInterface } = sequelize;

const dummyUser = [
    {
        username: 'botol',
        email: 'botol@gmail.com',
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
        otherId: '102156234',
        title: 'Mocking Spongebob',
        imageUrl: 'https://i.imgflip.com/1otk96.jpg',
        width: 502,
        height: 353,
        boxCount: 2,
        captions: 407750,
        status: 'basic',
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

let token;
let memeId;
let comment;
let commentId;

beforeAll(async () => {
    try {

        const responseMeme = await queryInterface.bulkInsert(`Memes`, memesData, null)

        const responseUsers = await queryInterface.bulkInsert(`Users`,
            dummyUser, null);

        const commentData = [
            {
                userId: responseUsers,
                memeId: responseMeme,
                comment: 'testt 1123',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]

        const responseComment = await queryInterface.bulkInsert(`Comments`, commentData, null)

        const { email, role } = dummyUser[0]
        token = sign({ id: responseUsers, email, role })
        memeId = responseMeme
        comment = commentData
        commentId = responseComment
    } catch (error) {
        console.log(error);
    }
})


afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Comments`, null, {});
        await queryInterface.bulkDelete(`Memes`, null, {});
        await queryInterface.bulkDelete(`Users`, null, {});
    } catch (error) {
        console.log(error);
    }
})

describe('get all comment', () => {
    test('success get all comment by meme id with status 200', async () => {
        const response = await request(app).get(`/api/comments/getComment/${memeId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0].comment).toEqual(comment[0].comment)
    })
})

describe('add comment', () => {
    test('success add comment with status 201', async () => {
        const newComment = {
            comment: 'test lagi nih'
        }

        const response = await request(app).post(`/api/comments/addComment/${memeId}`).set('authorization', `Bearer ${token}`).send(newComment)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('sukses')
        expect(response.body).toHaveProperty('theComment')
        expect(response.body.theComment.comment).toEqual(newComment.comment)
    })

    test('failed add comment validation error with status 400', async () => {
        const newComment = {
            comment: ''
        }

        const response = await request(app).post(`/api/comments/addComment/${memeId}`).set('authorization', `Bearer ${token}`).send(newComment)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"comment" is not allowed to be empty')
    })

    test('failed add comment meme not found with status 404', async () => {
        const newComment = {
            comment: 'test lagi ajah'
        }

        const response = await request(app).post(`/api/comments/addComment/9999999`).set('authorization', `Bearer ${token}`).send(newComment)

        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Meme tidak ditemukan')
    })
})

describe('delete comment', () => {
    test('success delete comment with status 200', async () => {
        const response = await request(app).delete(`/api/comments/deleteComment/${commentId}`).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('sukses delete')
        expect(response.body).toHaveProperty('dataComment')
        expect(response.body.dataComment.comment).toEqual(comment[0].comment)
    })

    test('failed delete comment not found with status 404', async () => {
        const response = await request(app).delete(`/api/comments/deleteComment/99999`).set('authorization', `Bearer ${token}`)

        console.log(response, '<<<< wayaaannsahs');
        expect(response.status).toBe(404)
        expect(response.body.status).toBe('Error')
        expect(response.body.message).toBe('Comment tidak ditemukan')
    })
})




