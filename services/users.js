const UserModel = require('../models/user')

class Users{
    async getAll(){
        try {
            const users = await UserModel.find()

            return users

        } catch (error) {
            console.log(error);
        }
    }

    async create( data ){
        try {
            const user = await UserModel.create(data)

            return user

        } catch (error) {
           console.log(error);
           
           if(error.code===11000){
               const message = `El correo ${error.keyValue.email} ya tiene una cuenta registrada`

               return {
                   error:true,
                   message
               }
           }
        }
    }

    async getByEmail(email){
        try{
            return await UserModel.findOne({email})
        }catch(error){
            console.log(error)
        }
    }


    async update(id, data){
        try {
            const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        try {
            const user = await UserModel.findByIdAndDelete(id)
            return user
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Users