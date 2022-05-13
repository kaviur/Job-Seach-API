const {mongoose} = require('../config/db')

const offerSchema = new mongoose.Schema({
    title:String,
    description:String,
    publish_date: Date,
    status:Number,
    programming_languages:[String],
    categories:[String],
    countries:[String],
    salary:Number,
    mode:String,
    english_level:String,
    applicants:[String]
})

const offerModel = mongoose.model('offer', offerSchema)
module.exports = offerModel