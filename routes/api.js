import { MessagesHandler } from './handlers/messagesHandler';
import { FoodHandler } from './handlers/foodHandler';
import { UserHandler } from './handlers/userHandler';
import { RequestHandler } from './handlers/requestsHandler';
import { AlbumHandler } from './handlers/albumHandler';
import { UploadHandler } from './handlers/upload';
import { ClassHandler } from './handlers/classHandler';
import { ChildHandler } from './handlers/childHandler';
import { FoodMenuHandler } from './handlers/foodMenuHandler';
import { EventHandler } from './handlers/eventHandler';
import { ActivityHandler } from './handlers/activityHandler';
import { PhotosHandler } from './handlers/photosHandler';
import { AgendaHandler } from './handlers/agendaHandler';
import { FeedsHandler } from './handlers/feedsHandler';
import { AttendanceHandler } from './handlers/attendanceHandler';

const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

// Activity APIs
const activityHandler = new ActivityHandler();
router.get('/activities', activityHandler.get);
router.get('/activities/:id', activityHandler.getOne);
router.post('/activities', activityHandler.add);
router.delete('/activities/:id', activityHandler.deleteById);
router.put('/activities/:id', activityHandler.update);

// Agenda APIs
const agendaHandler = new AgendaHandler();
router.get('/agenda', agendaHandler.get);
router.get('/agenda/:id', agendaHandler.getOne);
router.post('/agenda', agendaHandler.add);
router.delete('/agenda/:id', agendaHandler.deleteById);
router.put('/agenda/:id', agendaHandler.update);

// Attendance API
const attendanceHandler = new AttendanceHandler();
router.get('/agenda/:id/:day', attendanceHandler.getAttendanceByChild);

// Messages APIs
const messageHandler = new MessagesHandler();
router.get('/messages', messageHandler.get);
router.get('/messages/:id', messageHandler.getOne);
router.post('/messages', messageHandler.add);
router.delete('/messages/:id', messageHandler.deleteById);
router.put('/messages/:id', messageHandler.update);

// Food APIs
const foodHandler = new FoodHandler();
router.get('/food', foodHandler.get);
router.post('/food', foodHandler.add);
router.delete('/food/:name', foodHandler.deleteByName);
router.delete('/food/:id', foodHandler.deleteById);
router.put('/food/:id', foodHandler.update);

// Request APIs
const requestHandler = new RequestHandler();
router.get('/requests', requestHandler.get);
router.post('/requests', requestHandler.add);
router.put('/requests/:id', requestHandler.update);
router.delete('/requests/:id', requestHandler.deleteById);

// User APIs
const userHandler = new UserHandler();
router.get('/users', userHandler.get);
router.get('/user/:id', userHandler.getOne);
router.get('/user/:id/messages', userHandler.getUserMessages);
router.get('/user/:id/requests', userHandler.getUserRequests);
router.get('/user/:id/children', userHandler.getUserChildren);
router.post('/users', userHandler.add);
router.post('/user/:id/messages', userHandler.addMessage);
router.post('/user/:id/children', userHandler.addUserChild);
router.delete('/user/:id', userHandler.deleteById);
router.post('/user/:id/requests', userHandler.addRequest);
router.post('/user/:id', userHandler.addMessage);
router.put('/user/:id', userHandler.update);
router.post('/user/:id/resetpassword', userHandler.resetPassword);

// File Upload API
const uploadHandler = new UploadHandler();
router.post('/upload/:id', uploadHandler.upload);

// Feed API
const feedsHandler = new FeedsHandler();
router.get('/feeds/:id', feedsHandler.get);

// Albums APIs
const albumHandler = new AlbumHandler();
router.get('/albums', albumHandler.get);
router.get('/albums/:id', albumHandler.getOne);
router.get('/album/:name/photos', albumHandler.getPhotosByAlbumName);
router.post('/albums', albumHandler.add);
router.delete('/albums/:name', albumHandler.deleteByName);
router.delete('/albums/:id', albumHandler.deleteById);
router.put('/albums/:id', albumHandler.update);

// Food Menu APIs
const foodMenuHandler = new FoodMenuHandler();
router.get('/foodmenu', foodMenuHandler.get);
router.get('/foodmenu/day/:date', foodMenuHandler.getOneByDate);
router.get('/foodmenu/:id', foodMenuHandler.getOne);
router.get('/foodmenu/:id/food', foodMenuHandler.getFood);
router.post('/foodmenu', foodMenuHandler.add);
router.post('/foodmenu/:id/food', foodMenuHandler.addFoodMenuFood);
router.delete('/foodmenu/:id', foodMenuHandler.deleteById);
router.put('/foodmenu/:id', foodMenuHandler.update);

// Class APIs
const classHandler = new ClassHandler();
router.get('/classes', classHandler.get); //GET all classes
router.get('/classes/:id', classHandler.getOneById); //GET class by ID
router.get('/classes/:name', classHandler.getOneByName); //GET class by name
router.get('/classrequest/:id', classHandler.getClassRequests); //GET class requests
router.get('/schoolrequest', classHandler.getSchoolRequests); //GET school requests
router.get('/classactivity/:id', classHandler.getClassActivities); //GET class activities
router.get('/schoolactivity', classHandler.getSchoolActivities); //GET school activities
router.get('/classchild/:id', classHandler.getClassChildren); //GET children by class
router.get('/schoolchild', classHandler.getSchoolChildren); //GET children in school
router.post('/classes', classHandler.add); //Add class
router.post('/classactivity/:id', classHandler.addActivity); //Add class activities
router.post('/schoolactivity', classHandler.addActivityToSchool); //Add school activities
router.post('/class/:id/request', classHandler.addRequest); //Add class requests
router.post('/school/request', classHandler.addRequestToSchool); //Add school requests
router.post('/classchild/:id', classHandler.addChild); //Add child to class !!Might need Modification
router.delete('/classes/:id', classHandler.delete); //Delete class by ID
router.put('/classes/:id', classHandler.update); //Update class by ID

// Child APIs
const childHandler = new ChildHandler();
router.get('/children', childHandler.get);
router.get('/children/:id', childHandler.getOne);
router.get('/children/:id/agenda', childHandler.getChildAgenda);
router.post('/children', childHandler.add);
router.delete('/children/:id', childHandler.deleteById);
router.put('/children/:id', childHandler.update);
router.post('/children/:id/activities', childHandler.addActivity);
router.post('/children/:id/agenda', childHandler.addAgenda);
router.get('/children/:id/photos', childHandler.getChildPhotos);
router.get('/children/:id/activities', childHandler.getChildActivities);
router.put('/children/:id', childHandler.update)

// Event APIs
const eventHandler = new EventHandler();
router.get('/events', eventHandler.get);
router.get('/events/:id', eventHandler.getOne);
router.post('/events/:name/:description/:date', eventHandler.addWithImage);
router.delete('/events/:name', eventHandler.deleteByName);
router.delete('/events/:id', eventHandler.deleteById);
router.put('/events/:id', eventHandler.update);

// Photo APIs
const photosHandler = new PhotosHandler();
router.get('/photos', photosHandler.get);
router.post('/photos', photosHandler.add);
router.delete('/photos/', photosHandler.deleteByName);

module.exports = router;
