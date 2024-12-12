const { MongoClient } = require('mongodb');
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {

    const url = process.env.MONGO_URI;
    const dbName = 'globomantics';
    (async function validateUser() {
        let client;
        try{
            client = await MongoClient.connect(url);

            const db = client.db(dbName);

            const user = await db.collection('users').findOne({username});

            if(user && user.password){
                done(null,user);
            }else{
                done(null,false)
            }
        }catch(error){
            done(error,false)
        }
        
    })()
}));
