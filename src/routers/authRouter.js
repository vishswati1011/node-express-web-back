const express = require("express");
const {MongoClient} = require("mongodb");
const passport = require("passport");

const authRouter = express.Router()

authRouter.route('/signUp').post((req,res)=>{

    const {username,password} = req.body;

    console.log("called",req.body)

    const url = process.env.MONGO_URI;
    const dbName = 'globomantics';

    (async function addUser(){
        let client;
        try{
            client = await MongoClient.connect(url);
            const db= client.db(dbName)
            const user = {username,password};
            const results =await db.collection('users').insertOne(user);
            console.log(results,"-----")
            req.login(results,()=>{
                res.redirect('/auth/profile');
            })

        }catch(error){
            console.error("Error in sing-up user",error)
        }
        // client.close();
    })()
})

authRouter.route('/signIn')
    .get((req, res) => {
        res.render('signin');
    })
    .post(
        passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/', // Or render an error message
            failureFlash: true // Optional: Flash error message
        })
    );
authRouter.route('/profile').get((req,res)=>{
    res.json(req.user);
})
module.exports = authRouter;