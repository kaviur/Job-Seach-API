const {mongoose} = require('../config/db')

const offerSchema = new mongoose.Schema({
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    description:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    portafolio:{
        type: String,
        trim: true
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    status:{
        type:Number,
        default: 1 //1: activa, 0: inactiva
    },
    programming_languages:[
        {
            type:String,
            trim: true,
            lowercase: true
        }
    ],
    categories:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ],
    tools:[
        {
            type:String,
            trim: true
        }
    ],
    countries:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ],
    salary:{
        type:Number,
        required: true
    },
    mode:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    english_level:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,
    },
    applicants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    ],
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }
})

const offerModel = mongoose.model('offer', offerSchema)
module.exports = offerModel