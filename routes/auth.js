const express = require("express")
const AuthService = require("../services/auth")
const {OnlyAuthValidation} = require("../middleware/authValidation")

function auth(app){
    const router = express.Router()
    app.use("/api/auth",router)
    const authServ = new AuthService

    router.post("/login",async (req,res)=>{
        const result = await authServ.login(req.body)

        return res.status(result.error?400:200).json(result)
    })

    router.post('/validate',OnlyAuthValidation,(req,res)=>{
        return res.json({logged:true,user:req.user})
    })

    router.post("/signup",async(req,res)=>{
        const result = await authServ.signup(req.body)

        return res.status(result.error?400:200).json(result)
    })
}

module.exports = auth