# Frontend Doc

![tech stack frontend](../media/stack%20client.png)

### Router


| Route                  | Page              | Protected       |
| ---------------------- | ----------------- | --------------- |
| /                      | Home              | Yes              |
| /login                 | Login             | No              |
| /register              | Register          | No              |
| /memeDetail/:memeId        | Meme detail / Generate Meme   | Yes              |
| /profile               | Profile           | Yes             |
| /bePremium                  | Be Premium              | Yes             |
| /editProfile              | Edit Profile          | Yes             |
| /editMeme/:myMemeId         | Edit Meme           | Yes             |
| /changePassword                  | Change password             | Yes             |

---

## Setup locally

1. Install dependencies:

```
npm install
```

2. Start the application:

```
npm run start
```

---

## Testing

To run tests, use the following command:

```
npm test
```