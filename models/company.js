const {mongoose} = require('../config/db')

const companySchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    company_name:{
        type: String,
        trim: true,
        required: true
    },
    identification:{
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    countries:[{
        type:String,
        trim: true,
        lowercase: true
    }],
    cities:[{
        type:String,
        trim: true,
        lowercase: true
    }],
    address:[{
        type:String,
        trim: true,
        lowercase: true
    }],
    phone:[{
        type:String,
        trim: true,
        unique:true
    }],
    num_employees:{
        type: Number,
        default: 0,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    categories:[{
        type:String,
        trim: true,
        lowercase: true
    }],
    programming_languages:[{
        type:String,
        trim: true,
        lowercase: true
    }],
    recluiters_id:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    logo:{
        type:String,
        trim: true
    },
    cover_page:{
        type:String,
        trim: true
    }
})

const CompanyModel = mongoose.model('Company',companySchema)
module.exports = CompanyModel
