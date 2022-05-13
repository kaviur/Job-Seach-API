const express = require("express")
const OfferService = require("../services/offer")

function offers(app) {
    const router = express.Router()
    const offerServ = new OfferService()
    app.use("/api/offer", router)

    router.get("/", async (_req, res) => {
        const resCompanies = await offerServ.getAllOffer()
        return res.json(resCompanies)
    })

    // router.get("/salary/:min_salary/", async (_req, res) => {

    //     const { salary } = req.params;
    //     //console.log(categoria);
    //     try {
    //         const planesFiltradosCat = await offerServ.getBySalary(salary);
    //         //res.send(planesFiltradosCat);
    //         return res.status(200).json(planesFiltradosCat)
    //     } catch (err) {
    //         res.status(400).send(err);
    //     }
    // })

    router.post("/", async(req,res)=>{
        const rescompany = await offerServ.createOffer(req.body)
        return res.json(rescompany)
    })

    router.put("/:id", async(req,res)=>{
        const {body,params:{id}} = req
        const rescompany = await offerServ.updateOffer(id,body)
        return res.json(rescompany)
    })

    router.delete("/:id", async(req,res)=>{
        const {params:{id}} = req
        const rescompany = await offerServ.deleteOffer(id)
        return res.json(rescompany)
    })
}

module.exports = offers