"use strict";

var PORT = process.env.PORT || 7777;
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./config');

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if( jwt_payload != void(0) ) return done(false, jwt_payload);
    done();
}));

mongoose.connect('mongodb+srv://suteki1:cyberia@suteki1-o2opv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); // {useMongoClient: true} );
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
require('./router')(app);
require('./sockets')(io);


server.listen(PORT, '0.0.0.0', () => {
    console.log("Server started at port " + PORT);
});
