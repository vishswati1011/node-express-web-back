const  express = require('express');
const path = require('path');
const config = require("dotenv").config()
// debug('app');
const adminRouter = require('./src/routers/adminRouter.js')
const sessionRouter = require('./src/routers/sessionRouter.js')

const PORT = process.env.PORT || 3000
const app  = express();


// app.use is a middleware
app.use(express.static(path.join(__dirname,'public'))) //Es module


// app.use(express.static(path.join(__dirname,'/public')))   //common js to server index.html

// app.set it allow us to send variable inside the context of our application

app.set('views','./src/views')
app.set('view engine', 'ejs')
// this will print only when index.html not find in public

// app.get is allow to send response back 

app.use('/admin',adminRouter)
app.use('/sessions',sessionRouter)
app.get('/',(req,res)=>{
    res.render('index',{title: "Welcome to Global matrix",  data: ["a",'b','c']})
})

app.listen(PORT,()=>{
    console.log(`Listening to on port ${PORT}`)
})