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



// io.on("connection", socket => {
//   console.log("a user connected");

//   socket.on("chat message", async ({ MyEmail }) => {
//     console.log("Email is: "+ MyEmail);

//     if (MyEmail.length) {

//       let findEmail = await Chat.find({ "user.myEmail": `${MyEmail}`.trim() });
//       let _findEmail = await Chat.find({ "user.OtherEmail": `${MyEmail}`.trim() });
//       console.log('findEmail',findEmail);
//       console.log("_findEmail",_findEmail);
//       // OtherEmail

//       let EmailArray = []

//       if ((findEmail.length != 0 && findEmail != undefined) ||(_findEmail.length != 0 && _findEmail != undefined)) {

//         let Arr = [];
//         if(findEmail != undefined && _findEmail != undefined){
//           for (let i = 0; i < findEmail.length; i++) {
//             Arr.push(findEmail[i])
//           }
//           for (let i = 0; i < _findEmail.length; i++) {
//             Arr.push(_findEmail[i]);
//           }
//         }else{
//           let x = findEmail==undefined?findEmail:_findEmail;
//           for (let i = 0; i < findEmail.length; i++) {
//             Arr.push(x);
//           }
//         }

//         console.log("ARR",Arr)

//         for (let i = 0; i < Arr.length; i++) {
//           let Str = `${Arr[i].user._id}`
//           console.log(Str);

//           if(MyEmail!=Str.split("_")[0]){
//             EmailArray.push(Str.split("_")[0])
//           }
//           if(MyEmail!=Str.split("_")[1]){
//             EmailArray.push(Str.split("_")[1])
//           }
//         }
//         console.log("EmailArray",EmailArray);
//       }

//       const filteredArr = EmailArray.reduce((acc, current) => {
//         const x = acc.find(item => item === current);
//         if (!x) {
//           return acc.concat([current]);
//         } else {
//           return acc;
//         }
//       }, []);

//       var filteredEmailArray = filteredArr.filter(function (x) {
//         return x !== undefined;
//       });
//       console.log('filteredEmailArray',filteredEmailArray);

//       let arr = []

//       for (let i = 0; i < filteredEmailArray.length; i++) {

//         let findData = await SignUp.find({ "email": filteredEmailArray[i] });
//         console.log('findData',findData)

//         if (findData[0] != undefined) {
//           arr.push(findData[0])
//         }
//       }
      
//       if (arr.length != 0 || arr.length > 0) {
//         console.log("undef",arr);
//         console.log("Emit messages");
//         io.emit("messages", { arr });
//       }
//     }

//     //=======================================================//
//     // let Arr = []
//     // let Details = []

//     // let find = await Chat.find({ "user.myEmail": `${MyEmail}`.trim() });

//     // let EmailArray = []
//     // if (find.length != 0) {
//     //   for (let i = 0; i < find.length; i++) {
//     //     let Str = `${find[i].user._id}`

//     //     EmailArray.push(Str.split("_")[1])
//     //   }
//     // }

//     // const filteredArr = EmailArray.reduce((acc, current) => {
//     //   const x = acc.find(item => item === current);
//     //   if (!x) {
//     //     return acc.concat([current]);
//     //   } else {
//     //     return acc;
//     //   }
//     // }, []);

//     // var filtered = filteredArr.filter(function (x) {
//     //   return x !== undefined;
//     // });


//     // if (OtherUserEmailId.length != 0) {
//     //   let len = filtered.length - OtherUserEmailId.length;
//     //   if (len != 0) {
//     //     console.log(len)
//     //     console.log('filtered.length',filtered.length)
//     //     console.log('OtherUserEmailId.length',OtherUserEmailId.length)

//     //     let a = filtered.splice(-len);

//     //     for (let i = 0; i <a.length ; i++) {
//     //       Arr.push(a[i])
//     //     }
//     //   }

//     //   // console.log(Arr.length)
//     //   console.log("Arr",Arr) // Email's

//     //   for (let i = 0; i < Arr.length; i++) {
//     //     let _find = await SignUp.find({"email": Arr[i] });
//     //     Details.push(_find[0]);
//     //   }
//     // }

//     // // console.log(Details);
//     // // console.log(Details.length);

//     // if(Arr.length!=0 || Arr.length>0){
//     //   // console.log("undef",Arr);
//     //   console.log("Emit messages");
//     //   io.emit("messages", { Details ,Arr});
//     // }
//     // // else{
//     // //   // io.emit("messages", { Details, Arr });
//     // // }
//   });
// });


server.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000/`)
})