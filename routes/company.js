const express = require("express")
const CompanyService = require("../services/company")

function companies(app) {
    const router = express.Router()
    const companyServ = new CompanyService()
    app.use("/api/company", router)

    router.get("/", async (_req, res) => {
        const resCompanies = await companyServ.getAllCompany()
        return res.json(resCompanies)
    })

    router.post("/", async(req,res)=>{
        const rescompany = await companyServ.createCompany(req.body)
        return res.json(rescompany)
    })

    router.put("/:id", async(req,res)=>{
        const {body,params:{id}} = req
        const rescompany = await companyServ.updateCompany(id,body)
        return res.json(rescompany)
    })

    router.delete("/:id", async(req,res)=>{
        const {params:{id}} = req
        const rescompany = await companyServ.deleteCompany(id)
        return res.json(rescompany)
    })
}

module.exports = companies