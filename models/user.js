const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:String,
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:String,
    dni:String,
    role:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:1
    },
    photo:String,
    cover_page:String,
    country:String,
    city:String,
    proffesion:String,
    about:String,
    aptitudes:Array,
    experience:Array,
    programming_languages:Array,
    education:Array,
    openToWork:Number,
    my_applications:Array,
    offers:Array,
    company:String,
    favorites:Array
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel