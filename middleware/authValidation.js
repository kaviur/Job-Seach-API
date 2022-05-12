const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

function authValidation(req,res,next) {
    const bearer = req.headers.authorization
    if(bearer && bearer.startsWith('Bearer')){
        console.log(bearer)
        const token = bearer.split(" ")[1]
        console.log(token)
        
        jwt.verify(token,jwtSecret,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    error:true,
                    message:"Token inválido"
                })
            }

            console.log(decoded)
            //mando la propiedad user a la ruta con los datos del toquen decodificados
            req.user = decoded

            //________________________

            if(decoded.role === 3){
                next()
            }else{
                return res.status(403).json({
                    error:true,
                    message:"No tienes permisos para acceder a este recurso"
                })
            }

            //________________________

            //next()
        }
        )
    }else{
        return res.status(401).json({
            error:true,
            message:"Token no encontrado"
        })
    }
}

module.exports = authValidation