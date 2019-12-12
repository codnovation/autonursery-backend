'use strict';

import {ClassHandler} from './class';
import {SectionHandler} from './section';
import {ChildHandler} from './child';
import {UserHandler} from './user';
import {RequestHandler} from './request';
import {EventHandler} from './event';
import {AgendaHandler} from './agenda';
import {MessageHandler} from './message';

import models from '../../models/index';

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

    // Get Child attendance by Day
    getAttendance(req, res) {

    }

    // Delete agenda
    deleteAgenda(req, res) {
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
