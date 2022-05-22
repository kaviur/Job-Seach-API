const {mongoose} = require('../config/db')

const filterSchema = mongoose.Schema({
    categories:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ],
    programming_languages:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
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
    mode:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ],
    english_level:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ],
    level_of_experience:[
        {
            type:String,
            trim: true,
            required: true,
            lowercase: true
        }
    ]
})

const offerModel = mongoose.model('filter',filterSchema)
module.exports = offerModel