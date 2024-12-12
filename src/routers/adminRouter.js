const express = require("express");
const {MongoClient} = require("mongodb")
const adminRouter = express.Router();
const sessionData = require('../data/sessions.json')

adminRouter.route('/').get((req,res)=>{

    const url = process.env.MONGO_URI;
    const dbName = 'globomantics';

    (async function mongo() {
        let client;
        try{
            client = await MongoClient.connect(url);
            console.log("Connected to the mongo DB")

            const db = client.db(dbName);

            const response =await  db.collection('sessions').insertMany(sessionData);
            await res.json(response);



        }catch(error){
            console.error("error in add data",error)
        }
        
    }())

})

module.exports = adminRouter;
