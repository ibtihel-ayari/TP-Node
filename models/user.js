//create model of user 
const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const userSchema =new mongoose.Schema({
    username: String,
    password : String

})

userSchema.pre('save', async function (next){
    const user =this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password)
    }
    next();
}
)
const User =mongoose.model('User', userSchema)
module.exports = User;