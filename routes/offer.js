const express = require("express")
const OfferService = require("../services/offer")

function offers(app) {
    const router = express.Router()
    const offerServ = new OfferService()
    app.use("/api/offer", router)

    router.get("/", async (_req, res) => {
        const resOffer = await offerServ.getAllOffer()
        return res.json(resOffer)
    })

    router.get("/salary/:salary", async(req,res)=>{
        const {salary} = req.params
        const resOffer = await offerServ.getOfferForSalaryHigherThan(salary)
        return res.json(resOffer)
    })

    router.post("/search", async(req,res)=>{
        const {category,level,country,programmingLanguages,mode} = req.body
        const resOffer = await offerServ.getOfferWithFilters(category,level,country,programmingLanguages,mode)
        return res.json(resOffer)
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
        const resOffer = await offerServ.createOffer(req.body)
        return res.json(resOffer)
    })

    router.put("/:id", async(req,res)=>{
        const {body,params:{id}} = req
        const resOffer = await offerServ.updateOffer(id,body)
        return res.json(resOffer)
    })

    router.delete("/:id", async(req,res)=>{
        const {params:{id}} = req
        const resOffer = await offerServ.deleteOffer(id)
        return res.json(resOffer)
    })
}

module.exports = offers