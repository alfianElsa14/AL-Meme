
## AL'Meme

AL'Meme is a meme creation application by entering the input text provided and then generating the selected meme. There are also features for users with premium status, namely changing memes that have been created, and also getting meme templates for more than 50 memes.

For more up-to-date information on what's being implemented, take a look at our current [Boards](https://github.com/alfianElsa14/AL-Meme).



![screen shoot page AL'Meme](./media/Alfian%20Elsa%20Presentation.png)

## Stack

Summary of what the stack looks like now including a picture with the core tech:

* **Front-end** - React.js as the core framework, SCSS for UI, Material UI for UI component, midtrans for payment gateway, and google login with firebase.
* **Data** - All data is modeled and stored in MysqlDB.
* **API** - implements restfull api, for data passing
from server to client.
* **Auth** - Uses a JsonWebToken(JWT) that is used to store user information, and is used to determine user authority.

![Core stack](./media/stack%20client.png)

### Back-end

Express.js project with basic routes:

- Express
- Joi
- Axios
- Cors
- Bcrypt
- CryptoJS
- jsonwebtoken
- multer
- sequelize
- sequelize-cli
- nodemailer
- mysql2
- ioRedis
- midTrans
- jest & supertest

See more information about backend in [here](./server/readme.md)

### Front-end

See more information about our [Front-end, components, and routing](./client-nya/README.md)

**infrastructure architecture**

![alur client](./media/alur%20client.png)

