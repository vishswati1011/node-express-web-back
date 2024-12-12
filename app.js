const  express = require('express');
const path = require('path');
const config = require("dotenv").config()
// debug('app');
const adminRouter = require('./src/routers/adminRouter.js')
const sessionRouter = require('./src/routers/sessionRouter.js');
const authRouter = require('./src/routers/authRouter.js');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = process.env.PORT || 3000
const app  = express();


// app.use is a middleware
app.use(express.static(path.join(__dirname,'public'))) //Es module
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use(session({
    secret: 'my_secret_key_app',
    resave: false,
    saveUninitialized: true, // Or true if needed
  }));

require('./src/config/passport.js')(app)

// app.use(express.static(path.join(__dirname,'/public')))   //common js to server index.html

// app.set it allow us to send variable inside the context of our application

app.set('views','./src/views')
app.set('view engine', 'ejs')
// this will print only when index.html not find in public

// app.get is allow to send response back 

app.use('/admin',adminRouter)
app.use('/sessions',sessionRouter)
app.use('/auth',authRouter)

app.get('/',(req,res)=>{
    res.render('index',{title: "Welcome to Global matrix",  data: ["a",'b','c']})
})

app.listen(PORT,()=>{
    console.log(`Listening to on port ${PORT}`)
})