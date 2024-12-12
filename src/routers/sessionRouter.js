const  express = require('express');
const sessionData = require('../data/sessions.json')
const {MongoClient,ObjectId} = require("mongodb")

const sessionRouter = express.Router();

sessionRouter.route('/')
    .get((req,res)=>{
        const url = process.env.MONGO_URI;
        const dbName = 'globomantics';

        (async function mongo() {
            let client;

            try{
                client = await MongoClient.connect(url);
                console.log("Connected to the mongo DB")
    
                const db = client.db(dbName);
    
                const sessions =await  db.collection('sessions').find().toArray();
                // console.log("sessions data",sessions?.[0])
                await res.render('sessions',{sessions});
    
            }catch(error){
                console.error("Error in fetch session data",error)
            }
            client.close();
        }())

    })

sessionRouter.route('/:id')
    .get((req,res)=>{
        const id = req.params.id;
        const url = process.env.MONGO_URI;
        const dbName = 'globomantics';

        (async function mongo() {
            let client;

            try{
                client = await MongoClient.connect(url);
                console.log("Connected to the mongo DB")
    
                const db = client.db(dbName);
    
                const session =await  db.collection('sessions').findOne({_id: new ObjectId(id)});
                // console.log("sessions data",sessions?.[0])
                await  res.render('session', {
                    session
                })
            }catch(error){
                console.error("Error in fetch session data",error)
            }
            client.close();
        }())
       
})

module.exports =  sessionRouter