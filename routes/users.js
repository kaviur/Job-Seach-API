const express = require("express")

function users(app) {
    const router = express.Router()
    
    app.use("/api/users",router)

    router.get("/",(req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.post("/",(req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.put("/update/:id",(req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })

    router.delete("/delete/:id",(req,res)=>{
        return res.json({
            hola:"mundo"
        })
    })
}

module.exports = users