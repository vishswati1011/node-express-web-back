const  express = require('express');
const sessionData = require('../data/sessions.json')

const sessionRouter = express.Router();

sessionRouter.route('/')
    .get((req,res)=>{
        res.render('sessions',{sessions: sessionData})
    })

sessionRouter.route('/:id')
    .get((req,res)=>{
        const id = req.params.id;
        res.render('session', {
            session: sessionData[id]
        })
})

module.exports =  sessionRouter