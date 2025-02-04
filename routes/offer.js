const express = require("express")
const OfferService = require("../services/offer")
const {isTheCreator,isRecruiter,isPostulant} = require("../middleware/authValidation")

function offers(app) {
    const router = express.Router()
    const offerServ = new OfferService()
    app.use("/api/offer", router)

    router.get("/", async (_req, res) => {
        const resOffer = await offerServ.getAllOffer()
        return res.json(resOffer)
    })

    //info de las ofertas que publicó un reclutador junto con la info de los postulantes que aplicaron a la oferta
    router.get("/recruiterOffers",isRecruiter, async(req,res)=>{
        console.log(req.user)
        const {id} = req.user
        
        const resOffer = await offerServ.getOfferForRecruiter(id)
        return res.json(resOffer)
    })

    router.get("/applicantOffers",isPostulant, async(req,res)=>{
        console.log(req.user)
        const {id} = req.user
        
        const resOffer = await offerServ.getOfferForPostulant(id)
        return res.json(resOffer)
    })
    
    router.get("/id/:id", async (req, res) => {
        const { id } = req.params
        const resOffer = await offerServ.getOfferById(id)
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

    //crear una oferta sólo si es reclutador o admin
    router.post("/", isRecruiter,async(req,res)=>{
        const resOffer = await offerServ.createOffer(req.body,req.user.id)
        return res.json(resOffer)
    })

    //aplicar a una oferta
    router.put("/addApplicant",isPostulant,async (req,res)=>{
        const {id} = req.user
        const ifUserAlreadyApplied = await offerServ.checkIfApplicant(req.body.idOffer,id)
        
        if(ifUserAlreadyApplied){
            return res.status(400).json({
                success:false,
                error:true,
                message:"Ya habías aplicado a esta oferta antes"
            })
        }
        const resOffer = await offerServ.addApplicant(req.body.idOffer,id)
        return res.json(resOffer)
    })

    //desaplicar de una oferta
    router.put("/unApply",isPostulant,async (req,res)=>{
        const {id} = req.user
        const resOffer = await offerServ.unApply(req.body.idOffer,id)
        return res.json(resOffer)
    })

    //modificar una oferta sólo si es el creador o admin
    router.put("/:idOffer/:author",isTheCreator, async(req,res)=>{
        const {body,params:{idOffer},user:{id},user:{role}} = req
        const resOffer = await offerServ.updateOffer(idOffer,body,id,role)
        return res.json(resOffer)
    })

    router.delete("/delete/:idOffer/:author",isTheCreator, async(req,res)=>{
        const {params:{idOffer},user:{id},user:{role}} = req
        const resOffer = await offerServ.deleteOffer(idOffer,id,role)
        return res.json(resOffer)
    })
}

module.exports = offers