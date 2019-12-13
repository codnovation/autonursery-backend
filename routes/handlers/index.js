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

    async deleteMessage(req, res) {
        if (req.query && req.query.id) {
            const message = await models.Message.findByIdAndRemove(req.query.id).exec();
            await models.User
                .findByIdAndUpdate(message.from, {'$pull': {messages: message._id}}).exec();
            await models.User
                .findByIdAndUpdate(message.to, {'$pull': {messages: message._id}}).exec();
            return res.status(200).send(`Agenda from user ${message.from} to ${message.to} was deleted successfully`);
        } else {
            return res.status(500);
        }
    }

    // Delete agenda
    async deleteAgenda(req, res) {
        if (req.query && req.query.id) {
            const agenda = await models.Agenda.findByIdAndRemove(req.query.id).exec();
            await models.Child
                .findByIdAndUpdate(agenda.child, {'$pull': {agendas: agenda._id}}).exec();
            return res.status(200).send(`Agenda for child ${agenda.child} on ${Utils.convertDate(agenda.date)} was deleted successfully`);
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
