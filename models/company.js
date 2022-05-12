const {mongoose} = require('../config/db')

const companySchema = new mongoose.Schema({
    company_name:String,
    identification:String,
    countries:[String],
    address:[String],
    phone:[String],
    num_employees:Number,
    about: String,
    recluiters_id:[String],
    logo:String,
    cover_page:String
})

const CompanyModel = mongoose.model('Company',companySchema)
module.exports = CompanyModel
