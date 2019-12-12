"use strict";

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressSession from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';
import authCheckMiddleware from './middleWare/auth-check';

const fileUpload = require('express-fileupload');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const config = require('./config');

// connect to the database and load models
const app = express();
require('./models').connect(config.dbUri);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); // Encode URL
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload());

app.use(expressSession({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 14400}
}));

// pass the passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

// Static Route (directory path)
app.use(express.static(`${__dirname}/routes/handlers/storage`));

// Cross-Origin
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers',
        'Origin, Content-Type, ContentType, Accept, X-CSRF-TOKEN, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// API routes
const apiRoutes = require('./routes/api');

// Authentication and Authorization Routes
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
    res.send("Hello, This is AutoNursery's Server");
});

app.use('/auth', authRoutes);
app.use('/api', authCheckMiddleware); // Auth middleware (passport)
app.use('/api', apiRoutes);


// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 3000));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});