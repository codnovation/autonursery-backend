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

// Common APIs
const Common = new handlers.CommonHandler();
router.get('/attendance', Common.getAttendance); // Attendance API
router.post('/child', Common.addChild);
router.delete('/agenda', Common.deleteAgenda); //might be changed


// Class APIs
const Class = new handlers.ClassHandler();
router.get('/classes', Class.list); //List all classes
router.get('/class', Class.get);
router.get('/class/teachers', Class.listTeachersInClass); //List all sections in class
router.get('/class/section', Class.listSectionsInClass); //List all sections in class
router.get('/class/children', Class.listChildrenInClass); //List all children in class
router.post('/class', Class.add);
router.put('/class', Class.update);
router.delete('/class', Class.delete); //might be changed

// Section APIs
const Section = new handlers.SectionHandler();
router.get('/sections', Section.list); //List all sections
router.get('/section', Section.get);
router.get('/class/section/children', Section.listChildrenInSection); //List all children in section
router.post('/section', Section.add);
router.put('/section', Section.update);
router.delete('/section', Section.delete); //might be changed

// Child APIs
const Child = new handlers.ChildHandler();
router.get('/children', Child.list); //List all children
router.get('/child', Child.get);
router.put('/child', Child.update);
router.delete('/child', Child.delete); //might be changed

// User APIs
const User = new handlers.UserHandler();
router.get('/users', User.list); //List all users
router.get('/user', User.get);
router.post('/user', User.add);
router.put('/user', User.update);
router.delete('/user', User.delete); //might be changed

// Password APIs
router.get('/password/forgot', User.forgotPassword); //Forgot password
router.put('/password/reset', User.resetPassword); // Reset Password

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
router.post('/agenda', Agenda.add);
router.put('/agenda', Agenda.update);

// Message APIs
const Message = new handlers.MessageHandler();
router.get('/messages', Message.list); //List all messages
router.get('/message', Message.get);
router.post('/message', Message.add);
router.put('/message', Message.update);
router.delete('/message', Message.delete); //might be changed

module.exports = router;