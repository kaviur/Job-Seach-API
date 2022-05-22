const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required: true,
        lowercase: true
    },
    lastName:{
        type:String,
        trim: true,
    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength: 5
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim: true,
        validate:{
            validator: function(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            }
        }
    },
    dni:{
        type:String,
        trim: true,
        required: true,
        unique:true
    },
    phone:{
        type:String,
        trim: true,
        unique:true
    },
    role:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:1
    },
    photo:{
        type:String,
        trim: true
    },
    cover_page:{
        type:String,
        trim: true
    },
    country:{
        type:String,
        trim: true
    },
    city:{
        type:String,
        trim: true
    },
    english_level:{
        type:String,
        trim: true
    },
    level_of_experience:{//junior, mid, senior, expert, etc
        type:String,
        trim: true
    },
    profession:{
        type:String,
        trim: true
    },
    about:{
        type:String,
        trim: true
    },
    aptitudes:[
        {
            type:String,
            trim: true
        }
    ],//desarrollador, diseñador, etc
    hardSkills:[
        {
            type:String,
            trim: true
        }
    ],
    softSkills:[
        {
            type:String,
            trim: true
        }
    ],
    mode:{
        type:String,
        trim: true
    },
    experience:{//El postulante describe su experiencia anterior
        type:String,
        trim: true
    },
    honors:{
        type: String,
        trim: true
    },
    programming_languages:[
        {
            type:String,
            trim: true
        }
    ],
    portafolio:{
        type:String,
        trim: true
    },
    tools:[
        {
            type:String,
            trim: true
        }
    ],
    education:[
        {
            type:String,
            trim: true
        }
    ],
    openToWork:{
        type:Boolean,
        default:true
    },
    my_applications:[//ids de las ofertas a las que se ha postulado un usuario de tipo postulante
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"offer"
        }
    ],//de aquí en adelante son campos del usuario de tipo reclutador
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    favorites:[//los perfiles de aspirantes favoritos de un usuario de tipo reclutador
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel