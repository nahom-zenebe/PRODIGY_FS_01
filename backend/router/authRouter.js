const express=require('express')
const app=express()
const { signup, login, logout }=require('../controller/authcontroller')
const {authmiddleware ,adminmiddleware,managermiddleware}=require('../middleware/authmiddleware')

app.post('/signup',signup)
app.post('/login',login)
app.post('/logout',logout)