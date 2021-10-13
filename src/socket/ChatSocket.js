const Chat = require('../models/Chat');

module.exports = {
    start: function (socket, io) {
        socket.on("chats", async ({ MyEmail, OtherUserEmail }) => {
            console.log("Email is: " + MyEmail);
            console.log("Email is: " + OtherUserEmail);

            const uid = MyEmail>OtherUserEmail?MyEmail+"_"+OtherUserEmail:OtherUserEmail+"_"+MyEmail;

            // let id1 = MyEmail + "_" + OtherUserEmail;
            // let id2 = OtherUserEmail + "_" + MyEmail;
            console.log("uid",uid);
            let find = await Chat.find({ "user.uid": uid });


            console.log('find//===>',find);
            // console.log('find2',find2);
            if (find != undefined ) {
                let RenderArr = []

                if (find.length != 0) {
                    let z = [];
                    z.push(find);
                    for (let i = 0; i < find.length; i++) {
                        z.map(item => {
                            RenderArr.push(item[i]);
                        })
                    }
                }

                

                // console.log( 'RenderArr /===> '+ RenderArr );
                
                // io.emit("chats", { arr });
                let arr = RenderArr.reverse();
                console.log("arr ==>" , arr);
                io.to(socket.id).emit("messages", { arr  });
            }
        })
    }
};
