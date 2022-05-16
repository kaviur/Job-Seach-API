const express = require("express")
const cors = require("cors")
const { port } = require("./config")
const {connection} = require("./config/db")

//Importing routes
const users = require("./routes/users")
const auth = require("./routes/auth")
const companies = require("./routes/company")
const offers = require("./routes/offer")
const filters = require("./routes/filter")

connection()

const app = express()

//Middleware de JSON
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))

//Using routes
users(app)
auth(app)
companies(app)
offers(app)
filters(app)

app.listen(port,()=>{
    console.log("Listening: http://localhost:"+port)
})