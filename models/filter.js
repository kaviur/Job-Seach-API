const {mongoose} = require('../config/db')

const filterSchema = mongoose.Schema({
    categories:[String],
    programming_languages:[String],
    mode:[String],
    english_level:[String]
})

const offerModel = mongoose.model('filter',filterSchema)
module.exports = offerModel