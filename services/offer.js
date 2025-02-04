const offerModel = require('../models/offer')

class OfferService {
    async getAllOffer() {
        try {
            return await offerModel.find()
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al obtener las ofertas"
            }
        }
    }

    async getOfferForSalaryHigherThan(salary) {
        try {
            return await offerModel.find({ salary: { $gte: salary } })
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al obtener las ofertas"
            }
        }
    }

    // async getOfferWithFilters(category,level,country,programmingLanguages,vmode) {
    //     try {
    //         return await offerModel.find({ $or: [{ categories: category }, { english_level: level }, { countries: country }, { programming_languages: programmingLanguages }, { mode: vmode }] })
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error,
    //             message: "Error al obtener las ofertas"
    //         }
    //     }
    // }

    async getOfferWithFilters(category, level, country, programmingLanguages, vmode) {
        if(!category && !level && !country && !programmingLanguages && !vmode){
            return await offerModel.find()
        }
        const filters = {
            $and: []
        }
        if (category) {
            filters.$and.push({ categories: category })
        }
        if (level) {
            filters.$and.push({ english_level: level })
        }
        if (country) {
            filters.$and.push({ countries: country })
        }
        if (programmingLanguages) {
            filters.$and.push({ programming_languages: programmingLanguages })
        }
        if (vmode) {
            filters.$and.push({ mode: vmode })
        }
        return await offerModel.find(filters)
    }


    async getOfferById(id) {
        try {
            return await offerModel.findById(id)
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al obtener la oferta"
            }
        }
    }

    async createOffer(data,recruiterId) {
        try {
            return await offerModel.create({...data,authorId:recruiterId})
            
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al crear la oferta"
            }
        }
    }

    //info de las ofertas que publicó un reclutador junto con la info de los postulantes que aplicaron a la oferta
    async getOfferForRecruiter(idRecruiter){
        try{
            const offer = await offerModel.find({authorId:idRecruiter}).populate("applicants","name email")
            return offer
        }catch(error){
            return {
                success:false,
                error:error,
                message:"Error al obtener las ofertas"
            }
        }
    }

    async getOfferForPostulant(idApplicant){
        try{
            const offer = await offerModel.find({applicants:idApplicant})
            return offer
        }catch(error){
            return {
                success:false,
                error:error,
                message:"Error al obtener las ofertas"
            }
        }
    }

    //verificar si un postulante ya aplicó a una oferta
    async checkIfApplicant(idOffer, idApplicant) {
        const offer = await offerModel.findById(idOffer)
        const applicant = offer.applicants.find(applicant => applicant.toString() === idApplicant.toString())
        //const applicant = offer.applicants.find(applicant.toString() === idApplicant.toString())
        return applicant
    }

    //agregar un aplicante a la oferta
    async addApplicant(idOffer, idApplicant) {
        try {
            return await offerModel.findByIdAndUpdate(idOffer, { $push: { applicants: idApplicant } }, { new: true })
            //return await offerModel.findByIdAndUpdate(idOffer, {  applicants: {idApplicant} }, { new: true })
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al agregar el postulante"
            }
        }
    }

    //desaplicar de una oferta
    async unApply(idOffer, idApplicant) {
        try {
            return await offerModel.findByIdAndUpdate(idOffer, { $pull: { applicants: idApplicant } }, { new: true })
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al desapilar el postulante"
            }
        }
    }
            

    //eliminar una oferta sólo si es el autor o admin
    async deleteOffer(idOffer, idCreator, role) {
        try{
            const offer = await offerModel.findById(idOffer)
            if(offer.authorId.toString() === idCreator.toString() || role === 3){
                //const deletedOffer = await offerModel.findByIdAndDelete(idOffer)  
                return await offerModel.findByIdAndDelete(idOffer)
            }else{
                return {
                    success:false,
                    error:true,
                    message:"No tienes permisos para eliminar esta oferta"
                }
            }
        }catch(error){
            return {
                success:false,
                error:error,
                message:"Error al eliminar la oferta"
            }
        }
    }

    async updateOffer(idOffer, data, idCreator, role) {
        try {
            const offer = await offerModel.findById(idOffer)
            if (offer.authorId.toString() === idCreator.toString() || role === 3) {
                return await offerModel.findByIdAndUpdate(idOffer, data, { new: true })
            } else {
                return {
                    success: false,
                    error: true,
                    message: "No tienes permisos para actualizar esta oferta"
                }
            }
        } catch (error) {
            return {
                success: false,
                error: error,
                message: "Error al actualizar la oferta"
            }
        }
    }
}

module.exports = OfferService