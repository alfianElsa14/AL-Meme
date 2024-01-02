const request = require('supertest');
const CryptoJS =require("crypto-js")
const app = require('../../app');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;
const path = require('path');
const { hash } = require('../../helper/bcrypt');
const { sign } = require('../../helper/jwt');

const dummyUser = [{
    username: 'mikail',
    email: 'mikail@gmail.com',
    password: hash('1234567'),
    imageUrl: 'image.jpg',
    role: 'basic',
    verified: true,
    verifyToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
}]

let token;


beforeAll(async () => {
    try {
        const responseUsers = await queryInterface.bulkInsert(`Users`, dummyUser, null)

        const { email, role } = dummyUser[0]
        token = sign({ id: responseUsers, email, role })
    } catch (error) {
        console.log(error);
    }
})


afterAll(async () => {
    try {
        await queryInterface.bulkDelete(`Users`, null, {});
    } catch (error) {
        console.log(error);
    }
})

describe('register user', () => {
    test('success register with status 201', async () => {
        const user = {
            username: 'test',
            email: 'test@gmail.com',
            password: '1234567',
        };

         user.password = CryptoJS.AES.encrypt(user.password, process.env.DECRYPT_CRYPTO).toString()

        const imagePath = path.join(__dirname, '..', '..', 'backupPic', 'download1.jpg');

        const response = await request(app)
            .post('/api/users/register')
            .field('username', user.username)
            .field('email', user.email)
            .field('password', user.password)
            .attach('imageUrl', imagePath);

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('register sukses')
    });

    test('failed register validation with status 400', async () => {
        const user = {
            username: '',
            email: 'test@gmail.com',
            password: '1234567',
        };

        user.password = CryptoJS.AES.encrypt(user.password, process.env.DECRYPT_CRYPTO).toString()

        const imagePath = path.join(__dirname, '..', '..', 'backupPic', 'download1.jpg');

        const response = await request(app)
            .post('/api/users/register')
            .field('username', user.username)
            .field('email', user.email)
            .field('password', user.password)
            .attach('imageUrl', imagePath);

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"username" is not allowed to be empty')
    })

    test('failed register validation password length with status 400', async () => {
        const user = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123',
        };

        user.password = CryptoJS.AES.encrypt(user.password, process.env.DECRYPT_CRYPTO).toString()

        const imagePath = path.join(__dirname, '..', '..', 'backupPic', 'download1.jpg');

        const response = await request(app)
            .post('/api/users/register')
            .field('username', user.username)
            .field('email', user.email)
            .field('password', user.password)
            .attach('imageUrl', imagePath);

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"password" length must be at least 6 characters long')
    })
})

describe('login user', () => {
    test('success login with status 201', async () => {

        const user = {
            email: 'mikail@gmail.com',
            password: 'U2FsdGVkX1+gtomjXAWobL1TkMNXjvbOBTVIsuWCNhs=',
        }

        const response = await request(app).post('/api/users/login').send(user)

        token = response.body.access_token

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("access_token", expect.any(String));
    })

    test('failed login with status 404', async () => {
        const user = {
            email: 'mikl@gmail.com',
            password: 'U2FsdGVkX1+gtomjXAWobL1TkMNXjvbOBTVIsuWCNhs=',
        }

        const response = await request(app).post('/api/users/login').send(user)

        expect(response.status).toBe(404)
        expect(response.body.message).toBe("User tidak ditemukan")
    })

    test('failed login with status 400', async () => {
        const user = {
            email: 'mikail@gmail.com',
            password: 'U2FsdGVkX1/Ld3evojHvJ6bJUmDO+MPLWDPv1fKTDHk=',
        }

        const response = await request(app).post('/api/users/login').send(user)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Invalid Email or Password")
    })
})

describe('get all users', () => {
    test('success get all users with status 200', async () => {
        const response = await request(app).get('/api/users/allUsers').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0].email).toEqual(dummyUser[0].email)
    })
})

describe('get user by id', () => {
    test('success get users by id with status 200', async () => {
        const response = await request(app).get('/api/users/detailUser').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('username')
        expect(response.body).toHaveProperty('email')
        expect(response.body.username).toEqual(dummyUser[0].username)
    })
})

describe('change password user', () => {
    test('succes change password user with status 200', async () => {

        const thisPassword = {
            oldPassword: '1234567',
            newPassword: '123456789'
        }

        const response = await request(app).put('/api/users/changePassword').set('authorization', `Bearer ${token}`).send(thisPassword)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Change password successfully')
    })

    test('failed change password validation with status 400', async () => {

        const thisPassword = {
            oldPassword: '1234567',
            newPassword: ''
        }

        const response = await request(app).put('/api/users/changePassword').set('authorization', `Bearer ${token}`).send(thisPassword)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('"newPassword" is not allowed to be empty')
    })

    test('failed change password length less than 6 character with status 400', async () => {

        const thisPassword = {
            oldPassword: '1234567',
            newPassword: '123'
        }

        const response = await request(app).put('/api/users/changePassword').set('authorization', `Bearer ${token}`).send(thisPassword)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('"newPassword" length must be at least 6 characters long')

    })

    test('failed change old password match with status 401', async () => {

        const thisPassword = {
            oldPassword: '1234567423',
            newPassword: '123456789'
        }

        const response = await request(app).put('/api/users/changePassword').set('authorization', `Bearer ${token}`).send(thisPassword)

        expect(response.status).toBe(401)
        expect(response.body.message).toBe('Invalid old password')
    })
})

describe('google login', () => {
    test('succes google login with status 201', async () => {
        const newUser = {
            email: "bwindah352@gmail.com",
            username: "brando"
        }

        const response = await request(app).post(`/api/users/googleLogin`).send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('access_token')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.email).toEqual(newUser.email)
    })
})

describe('edit user', () => {
    test('success edit user with status 200', async () => {
        const newData = {
            username: 'subang',
            email: 'mikail@gmail.com'
        }

        const imagePath = path.join(__dirname, '..', '..', 'backupPic', 'download2.jpg');

        const response = await request(app)
            .put(`/api/users/editUser`)
            .set('authorization', `Bearer ${token}`)
            .field('username', newData.username)
            .field('email', newData.email)
            .attach('imageUrl', imagePath)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('success')
    })

    test('failed edit user validation error with status 400', async () => {
        const newData = {
            username: '',
            email: 'mikail@gmail.com'
        }

        const imagePath = path.join(__dirname, '..', '..', 'backupPic', 'download2.jpg');

        const response = await request(app)
            .put(`/api/users/editUser`)
            .set('authorization', `Bearer ${token}`)
            .field('username', newData.username)
            .field('email', newData.email)
            .attach('imageUrl', imagePath)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('Validation Failed')
        expect(response.body.message).toBe('"username" is not allowed to be empty')
    })
})

describe('midtrans payment token', () => {
    test('success get token from midtrans with status 201', async () => {
        const response = await request(app).post('/api/users/midtransToken').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('redirect_url')
    })
})

