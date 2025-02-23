const express=require('express')
const app=express()
const authrouter=require('./router/authRouter')
const  mongoose=require('mongoose')
const cookieParser = require('cookie-parser');
const cors=require('cors')
require('dotenv').config()




app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json())
app.use(cookieParser()); 
app.use('api/auth',authrouter)
const PORT=process.env.PORT||3002

mongoose.connect(process.env.MONGODB_URL, {
    
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}...`)
})