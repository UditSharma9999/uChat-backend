const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    user1:String,
    user2:String,
    chats: { 
        isSendByMe:String,
        message: String,
        date: Date,
    },
});

const ChatRoom = new mongoose.model("ChatRoomSchema", ChatRoomSchema);
module.exports = ChatRoom;