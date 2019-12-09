'use strict';

import handlers from './handlers';

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message.",
        // user values passed through from auth middleware
        user: req.user
    });
});

// Class APIs
const Class = new handlers.ClassHandler();
router.get('/classes', Class.list); //List all classes
router.get('/class', Class.get);
router.post('/class', Class.add);
router.put('/class', Class.update);
router.delete('/class', Class.delete); //might be changed

// Section APIs
const Section = new handlers.SectionHandler();
router.get('/sections', Section.list); //List all sections
router.get('/class/section', Section.listInClass); //List all sections in class
router.get('/section', Section.get);
router.post('/section', Section.add);
router.put('/section', Section.update);
router.delete('/section', Section.delete); //might be changed

// Child APIs
const Child = new handlers.ChildHandler();
router.get('/children', Child.list); //List all children
router.get('/class/children', Child.listInClass); //List all children in class
router.get('/class/section/children', Child.listInSection); //List all children in section
router.get('/child', Child.get);
router.post('/child', Child.add);
router.put('/child', Child.update);
router.delete('/child', Child.delete); //might be changed

// User APIs
const User = new handlers.UserHandler();
router.get('/users', User.list); //List all users
router.get('/class/teachers', User.listInClass); //List all sections in class
router.get('/user', User.get);
router.post('/user', User.add);
router.put('/user', User.update);
router.delete('/user', User.delete); //might be changed

// Request APIs
const Request = new handlers.RequestHandler();
router.get('/requests', Request.list); //List all requests
router.get('/request', Request.get);
router.post('/request', Request.add);
router.put('/request', Request.update);
router.delete('/request', Request.delete); //might be changed

// Event APIs
const Event = new handlers.EventHandler();
router.get('/events', Event.list); //List all events
router.get('/event', Event.get);
router.post('/event', Event.add);
router.put('/event', Event.update);
router.delete('/event', Event.delete); //might be changed

// Agenda APIs
const Agenda = new handlers.AgendaHandler();
router.get('/agendas', Agenda.list); //List all agendas
router.get('/agenda', Agenda.get);
router.get('/attendance', Agenda.getAttendance); // Attendance API
router.post('/agenda', Agenda.add);
router.put('/agenda', Agenda.update);
router.delete('/agenda', Agenda.delete); //might be changed

// Message APIs
const Message = new handlers.MessageHandler();
router.get('/messages', Message.list); //List all messages
router.get('/message', Message.get);
router.post('/message', Message.add);
router.put('/message', Message.update);
router.delete('/message', Message.delete); //might be changed

module.exports = router;