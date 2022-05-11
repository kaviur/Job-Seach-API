const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    password:String,
    email:{
        type:String,
        unique:true
    },
    role:Number,
    status:Number,
    photo:String,
    cover_page:String,
    country:String,
    city:String,
    proffesion:String,
    about:String,
    aptitudes:Array,
    programming_languages:Array,
    studies:Array,
    status:Number,
    my_applications:Array,
    offers:Array,
    company:String,
    favorites:Array
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel