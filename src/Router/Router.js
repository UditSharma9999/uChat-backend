// const express = require('express');
// const jwt = require('jsonwebtoken');

// const router = express.Router();



// const SignUp = require('./SignUp');
// const ChatRoom = require('./ChatRoom');
// const Chat = require('./Chat');
// // const parent = require('./parentSchema');

// router.post('/signup', async (req, res) => {
//     // console.log("req:", req.body);

//     const find = await SignUp.find({ email: req.body.email });

//     if (find[0] == undefined) {

//         let signUp = new SignUp({
//             name: `${req.body.name}`.trim(),
//             lname: `${req.body.lname}`.trim(),
//             email: `${req.body.email}`.trim(),
//             password: `${req.body.password}`.trim()
//         });

//         const id = signUp._id;
//         const token = jwt.sign({ _id: id }, "mySecretKeyforTheUserAuthentication");
//         signUp.token = token;
//         signUp.save();
//         return res.json({ "message": token }).end();
//     } else {
//         return res.json({ message: 'Account already exist!' }).end();
//     }
// });


// router.post('/isSignUp', async (req, res) => {
//     const find = await SignUp.find({ token: req.body.token });
//     return res.json({ message: find });
// });

// router.post('/signin', async (req, res) => {
//     console.log("req:", req.body);
//     if (req.body.email != '' && req.body.password != '') {

//         const find = await SignUp.find({ email: req.body.email });
//         if (find[0] != undefined) {

//             try {
//                 console.log(find[0]);
//                 console.log(find[0].email);
//                 let email = `${find[0].email}`.trim();
//                 let password = `${find[0].password}`.trim();
//                 if (password === req.body.password && email === req.body.email) {
//                     return res.json({ message: find, validation: "true" });
//                 }
//             } catch (error) {
//                 console.log(error);
//                 return res.json({ message: error });
//             }
//         } else {
//             return res.json({ message: "error" });
//         }
//         res.end();
//     }
// })


// router.post('/search', async (req, res) => {
//     if(req.body.email!= undefined){
//         const find = await SignUp.find({"email":`${req.body.email}`.trim()});
//         res.send({ message: find });
//     }else{
//         const find = await SignUp.find();
//         res.send({ message: find });
//     }
//     res.end();
// })

// router.post('/users', async (req, res) => {
//     // console.log('/users/', req.body);
//     let arr = []
//     if (req.body.email != '') {
//         for (let i = 0; i < req.body.email.length; i++) {
//             // console.log("req.body.email",req.body.email[i])

//             let find = await SignUp.find({ email: req.body.email[i] });

//             if (find[0] != undefined) {
//                 // console.log("In /user", find[0]);
//                 arr.push(find[0])
//             }
//         }
//         // console.log('arr',arr);
//         return res.json({ message: arr });
//     }
//     res.end();
// })


// router.post('/chatroom', async (req, res) => {
//     // console.log('req.body', req.body);
//     let find = await Chat.find({ "user.myEmail": `${req.body.email}`.trim() });
//     // console.log('find', find);

//     let EmailArray = []

//     if (find.length != 0) {
//         for (let i = 0; i < find.length; i++) {
//             let Str = `${find[i].user._id}`
//             // console.log(Str);
//             EmailArray.push(Str.split("_")[1])
//         }
//     }

//     const filteredArr = EmailArray.reduce((acc, current) => {
//         const x = acc.find(item => item === current);
//         if (!x) {
//             return acc.concat([current]);
//         } else {
//             return acc;
//         }
//     }, []);

//     var filtered = filteredArr.filter(function (x) {
//         return x !== undefined;
//     });

//     // console.log(filtered);
//     // console.log("Filt", filteredArr);
//     // console.log(" EmailArray", EmailArray);
//     res.send({ 'EmailArray':filtered });
//     res.end();
// })


// //  //// ===================>old chat api 
// // router.post('/chat', async (req, res) => {
// //     console.log('req.body in chat ==>', req.body);
// //     if (req.body.chats.message != null && req.body.chats.message != undefined) {
// //         console.log("chats ==>",req.body);
// //         const chat = new ChatRoom({
// //             user1:req.body.user1,
// //             user2:req.body.user2,// my
// //             chats: req.body.chats,
// //         })
// //         chat.save();
// //     }
// //     res.end();
// // })


// router.post('/Chat', async (req, res) => {
//     // console.log(req.body);
//     if (req.body[0] != undefined) {
//         // console.log(req.body);
//         if (req.body[0].text != undefined && req.body[0].text != "") {
//             const chat = new Chat({
//                 _id: req.body[0]._id,
//                 text: req.body[0].text,
//                 createdAt: req.body[0].createdAt,
//                 user: req.body[0].user
//             })
//             chat.save();
//         }
//     }
//     if (req.body.myid != undefined && req.body.otherData != undefined) {
//         let id1 = req.body.myid + "_" + req.body.otherData;
//         let id2 = req.body.otherData + "_" + req.body.myid;
//         let find1 = await Chat.find({ "user._id": id1 }).sort("createdAt");
//         let find2 = await Chat.find({ "user._id": id2 }).sort("createdAt");
//         // console.log('find1',find1);
//         // console.log('find2',find2);

//         let RenderArr = []

//         if (find1.length != 0) {
//             let z = [];
//             z.push(find1);
//             for (let i = 0; i < find1.length; i++) {
//                 z.map(item => {
//                     RenderArr.push(item[i]);
//                 })
//             }
//         }

//         if (find2.length != 0) {
//             let z = [];
//             z.push(find2);
//             for (let i = 0; i < find2.length; i++) {
//                 z.map(item => {
//                     RenderArr.push(item[i]);
//                 })
//             }
//         }
//         res.send({ 'RenderArr': RenderArr })
//     }
//     res.end();
// });




// module.exports = router;



//=================================================//

// const app = require('express')();

// app.use('/Chat',require('./Chat'));
// app.use('/user',require('./user'));
// app.use('/search',require('./search'));
// app.use('/signup',require('./signup'));
// app.use('/signin',require('./signin'));
// app.use('/isSignUp',require('./isSignUp'));
// app.use('/chatroom',require('./chatroom'));

