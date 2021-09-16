const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    _id: String,
    text: String,
    createdAt: Date,
    user: {
        uid:String,
        _id:String,
        OtherUserEmail: String,
        // _id: String,
        // myEmail:String,
        // OtherEmail:String
    },
});

const Chat = new mongoose.model("ChatSchema", ChatSchema);
module.exports = Chat;