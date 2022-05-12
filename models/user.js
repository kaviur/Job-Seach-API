const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    password:String,
    email:{
        type:String,
        unique:true
    }
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel