# ✨ Full Stack Realtime Chat App ✨

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client

### Setup .env file

```js
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Environment variable description
| Name | Description |
| ------ | ------ |
| NODE_ENV | Application environment(development,production) |
| HOST | Url of this application |
| PORT | Application running port |
| JWT_SECRET | Secret for Json web token|
| MONGODB_URI | Url of mongodb |
| CLOUDINARY_CLOUD_NAME | Cloud name of cloudinary service |
| CLOUDINARY_API_KEY | API key of cloudinary service |
| CLOUDINARY_API_SECRET | API secret of cloudinary service |


### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
