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
import Agenda from "../../models/agenda";

class CommonHandler {

    // Add child
    addChild(req, res) {
        models.Child
            .create(req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
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
