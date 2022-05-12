const offerModel = require('../models/offer')

class OfferService{
    async getAllOffer(){
        try {
            return await offerModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            return await offerModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createOffer(data){
        try {
            return await offerModel.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOffer(id){
        try{
            return await offerModel.findByIdAndDelete(id)
        }catch(error){
            console.log(error)
        }
    }

    async updateOffer(id,data){
        try {
            return await offerModel.findByIdAndUpdate(id,data,{new:true})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = OfferService