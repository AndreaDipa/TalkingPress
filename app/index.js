//DIPENDENZE
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const session = require('express-session');
const passport = require('passport');

const twitter = require('./routes/twitter');
const users = require('./routes/users');
const auth = require('./routes/auth');
const events = require('./routes/events');
const bodyParser = require('body-parser');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

//PORTA
const PORT = process.env.PORT || 5000;
//APP


//CONTROLLO SECRET KEY PER HASH
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR JWT PRIVATE KEY IS NOT DEFINE');
    process.exit(1);    
}

//CONNECT TO MONGO
mongoose.connect('mongodb://mongoserver:27017/TalkingPress', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(console.log('connected to TalkingPress db'))
    .catch(err => console.log('cant connect to mongo: ' + err.message));

path = require('path');
//DOVE TROVARE FILE STATICI PER FRONTEND
app.use(express.static(path.join(__dirname, 'public')));
//SCAMBIO DI OGGETTI JSON
app.use(express.json());
app.use(session({
    secret: 'twitter-auth-session',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        sameSite: 'Lax'
    }
}))
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req,res) => {
    res.sendFile('./public/login.html', { root: __dirname });
})





app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/twitter', twitter);

//AVVIO SERVER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})