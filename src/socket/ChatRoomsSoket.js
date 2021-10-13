const Chat = require('../models/Chat');
const SignUp = require('../models/SignUp');

module.exports = {
    start: function (socket, io) {
        socket.on("chat room", async ({ MyEmail }) => {
            // console.log("Email is: " + MyEmail);

            if (MyEmail.length) {

                let findEmail = await Chat.find({ "user._id": `${MyEmail}`.trim() });
                let _findEmail = await Chat.find({ "user.OtherUserEmail": `${MyEmail}`.trim() });
                // console.log('findEmail', findEmail);
                // console.log("_findEmail", _findEmail);

                let EmailArray = []

                if ((findEmail.length != 0 && findEmail != undefined) || (_findEmail.length != 0 && _findEmail != undefined)) {

                    let Arr = [];
                    if (findEmail != undefined && _findEmail != undefined) {
                        for (let i = 0; i < findEmail.length; i++) {
                            Arr.push(findEmail[i])
                        }
                        for (let i = 0; i < _findEmail.length; i++) {
                            Arr.push(_findEmail[i]);
                        }
                    } else {
                        let x = findEmail == undefined ? findEmail : _findEmail;
                        for (let i = 0; i < findEmail.length; i++) {
                            Arr.push(x);
                        }
                    }

                    // console.log("ARR", Arr)

                    for (let i = 0; i < Arr.length; i++) {
                        let Str = `${Arr[i].user.uid}`
                        // console.log(Str);

                        if (MyEmail != Str.split("_")[0]) {
                            EmailArray.push(Str.split("_")[0])
                        }
                        if (MyEmail != Str.split("_")[1]) {
                            EmailArray.push(Str.split("_")[1])
                        }
                        // console.log("EmailArray", EmailArray);
                    }
                }

                const filteredArr = EmailArray.reduce((acc, current) => {
                    const x = acc.find(item => item === current);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                // console.log(EmailArray)

                var filteredEmailArray = filteredArr.filter(function (x) {
                    return x !== undefined;
                });
                // console.log('filteredEmailArray', filteredEmailArray);

                let array = []

                for (let i = 0; i < filteredEmailArray.length; i++) {

                    let findData = await SignUp.find({ "email": filteredEmailArray[i] });
                    // console.log('findData', findData)

                    if (findData[0] != undefined) {
                        array.push(findData[0])
                    }
                }

                if (array.length != 0 || array.length > 0) {
                    // console.log("undef", arr);
                    // console.log("Emit messages");
                    // socket.broadcast.to(MyEmail).emit( "users", { arr });
                    // console.log(socket.id)
                    // console.log("chatroom arr", arr);
                    let arr = array.reverse();
                    io.to(socket.id).emit("users", { arr })
                    // io.emit("users", { arr });
                }
            }
        });
    }
};
