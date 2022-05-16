const {mongoose} = require('../config/db')

const offerSchema = new mongoose.Schema({
    authorId:String,
    title:String,
    description:String,
    publish_date: {
        type: Date,
        default: Date.now
    },
    status:{
        type:Number,
        default: 1 //1: activa, 0: inactiva
    },
    programming_languages:[String],
    categories:[String],
    countries:[String],
    salary:Number,
    mode:String,
    english_level:String,
    applicants:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        }
    ]
})

const offerModel = mongoose.model('offer', offerSchema)
module.exports = offerModel