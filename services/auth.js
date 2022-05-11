const jwt = require("jsonwebtoken")
const { jwtSecret } = require('../config')
const User = require('./users')

class Auth{
    login(data){
        return this.#createToken(data)
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

        const userData = {//puede hacerse así const{password,...userData} = user
            name:user.name,
            email:user.email,
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

    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'2d'
        })
        return token
    }
}

module.exports = Auth