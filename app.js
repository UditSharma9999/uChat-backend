const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// const Chat = require('./src/models/Chat');
// const SignUp = require('./src/models/SignUp');
const ChatRoomsSoket = require('./src/socket/ChatRoomsSoket');
const ChatSocket = require('./src/socket/ChatSocket')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('Connection Secure....');
}).catch((e) => {
  console.log(e);
});

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

io.on("connection", socket => {
  ChatRoomsSoket.start(socket,io);
  ChatSocket.start(socket,io);
  // socket.broadcast.to().emit()
})

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use('/Router/Chat', require('./src/Router/Chat'));
app.use('/Router/user', require('./src/Router/user'));
app.use('/Router/search', require('./src/Router/search'));
app.use('/Router/signup', require('./src/Router/signup'));
app.use('/Router/signin', require('./src/Router/signin'));
app.use('/Router/isSignUp', require('./src/Router/isSignUp'));
app.use('/Router/chatroom', require('./src/Router/chatroom'));


server.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000/`)
})
