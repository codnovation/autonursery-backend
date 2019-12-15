'use strict';

import {ClassHandler} from './class';
import {SectionHandler} from './section';
import {ChildHandler} from './child';
import {UserHandler} from './user';
import {RequestHandler} from './request';
import {EventHandler} from './event';
import {AgendaHandler} from './agenda';
import {MessageHandler} from './message';

import models from '../../models';
import Utils from './utils';

class CommonHandler {
    // Add section
    async addSection(req, res) {
        if (req.body) {
            try {
                const section = await models.Section.create(req.body);
                await models.Class
                    .findByIdAndUpdate(section.class, {'$push': {sections: section._id}}).exec();
                return res.status(200).json(section);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // // Add child
    async addChild(req, res) {
        if (req.body) {
            try {
                const child = await models.Child.create(req.body);
                await child.parents.forEach(parent => {
                    models.User
                        .findByIdAndUpdate(parent, {'$push': {children: child._id}}).exec();
                });
                await models.Section
                    .findByIdAndUpdate(child.section, {'$push': {children: child._id}}).exec();
                await models.Class
                    .findByIdAndUpdate(child.class, {'$push': {children: child._id}}).exec();
                return res.status(200).json(child);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Add request
    async addRequest(req, res) {
        if (req.body) {
            try {
                if (req.body.status) {
                    req.body.status = Utils.capitalizeWord(req.body.status);// Capitalize first char of status
                }
                const request = await models.Request.create(req.body);
                await request.parents.forEach(parent => {
                    models.User
                        .findByIdAndUpdate(parent, {'$push': {requests: request._id}}).exec(); //Might need upsert
                });
                await models.Child
                    .findByIdAndUpdate(request.child, {'$push': {requests: request._id}}).exec();
                return res.status(200).json(request);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Add message
    async addMessage(req, res) {
        if (req.body) {
            try {
                const message = await models.Message.create(req.body);
                await models.User
                    .findByIdAndUpdate(message.from, {'$push': {messages: message._id}}).exec();
                await models.User
                    .findByIdAndUpdate(message.to, {'$push': {messages: message._id}}).exec();
                return res.status(200).json(message);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Add agenda
    async addAgenda(req, res) {
        if (req.body) {
            try {
                const agenda = await models.Agenda.create(req.body);
                await models.Child
                    .findByIdAndUpdate(agenda.child, {'$push': {agendas: agenda._id}}).exec();
                return res.status(200).json(agenda);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Delete section
    async deleteSection(req, res) {
        if (req.query && req.query.id) {
            try {
                const section = await models.Section.findByIdAndRemove(req.query.id).exec();
                await models.Class
                    .findByIdAndUpdate(section.class, {'$pull': {sections: section._id}}).exec();
                await section.children.forEach(child => {
                    models.Child
                        .findByIdAndUpdate(child, {'$unset': {section: section._id}}).exec();
                });
                return res.status(200).send(`Section ${section.name} was deleted successfully`);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Delete child
    async deleteChild(req, res) {
        if (req.query && req.query.id) {
            try {
                const child = await models.Child.findByIdAndRemove(req.query.id).exec();
                await child.parents.forEach(parent => {
                    models.User
                        .findByIdAndUpdate(parent, {'$pull': {children: child._id}}).exec();
                });
                await child.requests.forEach(request => {
                    models.Request
                        .findByIdAndRemove(request).exec();
                });
                await child.agendas.forEach(agenda => {
                    models.Agenda
                        .findByIdAndRemove(agenda).exec();
                });
                await models.Class
                    .findByIdAndUpdate(child.class, {'$pull': {children: child._id}}).exec();
                await models.Section
                    .findByIdAndUpdate(child.section, {'$pull': {children: child._id}}).exec();
                return res.status(200).send(`Section ${child.firstName} ${child.lastName} was deleted successfully`);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Delete request
    async deleteRequest(req, res) {
        if (req.query && req.query.id) {
            try {
                const request = await models.Request.findByIdAndRemove(req.query.id).exec();
                await request.parents.forEach(parent => {
                    models.User
                        .findByIdAndUpdate(parent, {'$pull': {requests: request._id}}).exec();
                });
                await models.Child
                    .findByIdAndUpdate(request.child, {'$pull': {requests: request._id}}).exec();
                return res.status(200).send(`Request was deleted successfully`);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Delete message
    async deleteMessage(req, res) {
        if (req.query && req.query.id) {
            try {
                const message = await models.Message.findByIdAndRemove(req.query.id).exec();
                await models.User
                    .findByIdAndUpdate(message.from, {'$pull': {messages: message._id}}).exec();
                await models.User
                    .findByIdAndUpdate(message.to, {'$pull': {messages: message._id}}).exec();
                return res.status(200).send(`Message from user ${message.from} to ${message.to} was deleted successfully`);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Delete agenda
    async deleteAgenda(req, res) {
        if (req.query && req.query.id) {
            try {
                const agenda = await models.Agenda.findByIdAndRemove(req.query.id).exec();
                await models.Child
                    .findByIdAndUpdate(agenda.child, {'$pull': {agendas: agenda._id}}).exec();
                return res.status(200).send(`Agenda for child ${agenda.child} on ${Utils.convertDate(agenda.date)} was deleted successfully`);
            } catch (err) {
                return res.status(400).json(err);
            }
        } else {
            return res.status(500);
        }
    }

    // Get Child attendance by Day
    getAttendance(req, res) {

    }
}

module.exports = {
    CommonHandler: CommonHandler,
    ClassHandler: ClassHandler,
    SectionHandler: SectionHandler,
    ChildHandler: ChildHandler,
    UserHandler: UserHandler,
    RequestHandler: RequestHandler,
    EventHandler: EventHandler,
    AgendaHandler: AgendaHandler,
    MessageHandler: MessageHandler
};
