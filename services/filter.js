const filterModel = require('../models/filter')

class filterService{
    async getAllFilter(){
        try {
            return await filterModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            return await filterModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createFilter(data){
        try {
            return await filterModel.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFilter(id){
        try{
            return await filterModel.findByIdAndDelete(id)
        }catch(error){
            console.log(error)
        }
    }

    async updateFilter(id,data){
        try {
            return await filterModel.findByIdAndUpdate(id,data,{new:true})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = filterService