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

const auths = require('./middleware/auth');
const chat = require('./routes/chat');

const events = require('./routes/events');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const expressWs = require('express-ws')(app);


//PORTA
const PORT = process.env.PORT || 5000;


//CONTROLLO SECRET KEY PER HASH
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR JWT PRIVATE KEY IS NOT DEFINE');
    process.exit(1);    
}

//CONNECT TO MONGO
mongoose.connect('mongodb://mongoserver:27017/TalkingPress', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(console.log('connected to TalkingPress db'))
    .catch(err => console.log('cant connect to mongo: ' + err.message));

app.use(session({
    secret: 'twitter-auth-session',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        sameSite: 'Lax'
    }
}))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/twitter', twitter);
app.use('/chat', chat);
app.use(auths, express.static(path.join(__dirname, 'private')));

app.get('/logout', auths, (req, res) => {
    res.clearCookie('x-auth-token').redirect('/index.html')
})

//AVVIO SERVER
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})