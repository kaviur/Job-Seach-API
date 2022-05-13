const {mongoose} = require('../config/db')

const companySchema = new mongoose.Schema({
    user_id:String,
    company_name:String,
    identification:String,
    countries:[String],
    cities:[String],
    address:[String],
    phone:[String],
    num_employees:Number,
    about: String,
    categories:[String],
    programming_languages:[String],
    recluiters_id:[String],
    logo:String,
    cover_page:String
})

const CompanyModel = mongoose.model('Company',companySchema)
module.exports = CompanyModel
