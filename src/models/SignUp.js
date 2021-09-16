const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
      minLength: 3
    },
    lname: {
      type: String,
      require: false,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 8
    },
    token: {
      type: String,
      require: true,
      unique: true,
    }
});
  
const SignUp = new mongoose.model("SignUp", SignUpSchema);
  
module.exports = SignUp;