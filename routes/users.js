const express = require("express")
const {isAdmin, isTheCreator} = require("../middleware/authValidation")
const UserService = require("../services/users")

function users(app){

    const router = express.Router()
    const userServ = new UserService()
    
    app.use("/api/users",router)

    //solo el admin puede ver todos los usuarios registrados
    router.get("/",isAdmin, async (req,res)=>{

        console.log(req.user)
        const users = await userServ.getAll()

        return res.json(users)
    })

    router.get("/:id",async (req,res)=>{

        const user = await userServ.getById(req.params.id)

        return res.json(user)
    })

    router.post("/",async (req,res)=>{
        const user = await userServ.create(req.body)
        return res.json(user)
    })

    //sólo puede modificar si el parámetro id es igual al id del usuario que está logueado o si es admin
    router.put("/update/:id/",async (req,res)=>{
        const user = await userServ.update(req.params.id,req.body)
        return res.json(user)
    })

    //sólo el admin puede inactivar un usuario
    router.put("/inactive/:id/",isAdmin, async (req,res)=>{
        const user = await userServ.update(req.params.id,req.body)
        return res.json(user)
    })
    
    //sólo puede eliminar si el parámetro id es igual al id del usuario que está logueado o si es admin
    router.delete("/delete/:id",async (req,res)=>{
        const user = await userServ.delete(req.params.id)
        return res.json(user)
    })
}

module.exports = users