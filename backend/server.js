const express=require('express')
const app=express()
const authrouter=require('./router/authRouter')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cors=require('cors')
require('dotenv').config()


app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use('api/auth',authrouter)
const PORT=process.env.PORT||3002
app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}...`)
})