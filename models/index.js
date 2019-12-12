'use strict';

import mongoose from 'mongoose';

import Agenda from "./agenda";
import Child from "./child";
import Class from "./class";
import Event from "./event";
import Message from "./message";
import Request from "./request";
import Section from "./section";
import User from "./user";

module.exports = {
    connect: (uri) => {
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        // plug in the promise library:
        mongoose.Promise = global.Promise;

        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);

        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err}`);
            process.exit(1);
        });
        require('./user');
    },
    Agenda: Agenda,
    Child: Child,
    Class: Class,
    Event: Event,
    Message: Message,
    Request: Request,
    Section: Section,
    User: User
};
