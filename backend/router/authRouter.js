const express=require('express')
const app=express()
const { signup, login, logout }=require('../controller/authcontroller')



app.post('/signup',signup)
app.post('/login',login)
app.post('/logout',logout)