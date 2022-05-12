const jwt = require("jsonwebtoken")
const { jwtSecret } = require('../config')
const bcrypt = require("bcrypt")
const User = require('./users')

class Auth{
    async login(data){
        const {email,password} = data
        const userServ = new User()
        const user = await userServ.getByEmail(email)

        if(user && await this.#compare(password,user.password)){
            return this.#getUserData(user)
        }

        return {
            error:true,
            message:"Las credenciales no coinciden"
        }

    }

    async signup(data){
        if(data.password){
            data.password = await this.#encrypt(data.password)
        }

        const userServ = new User()
        
        const user = await userServ.create(data)
        if(user.error){
            return user
        }

        return this.#getUserData(user)
    }

    #getUserData(user){
        const userData = {//puede hacerse así const{password,...userData} = user
            name:user.name,
            email:user.email,
            role:user.role,
            id:user.id
        }

        const token = this.#createToken(userData)
        return {
            user:userData,
            token
        }
    }

    async #encrypt(string){
        try {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)

            return hash
            
        } catch (e) {
            console.log(e);
        }
    }

    async #compare(string,hash){
        return await bcrypt.compare(string,hash)
    }

    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'2d'
        })
        return token
    }
}

module.exports = Auth