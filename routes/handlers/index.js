'use strict';

import {ClassHandler} from './class';
import {SectionHandler} from './section';
import {ChildHandler} from './child';
import {UserHandler} from './user';
import {RequestHandler} from './request';
import {EventHandler} from './event';
import {AgendaHandler} from './agenda';
import {MessageHandler} from './message';

class CommonHandler {

    // List all children in class
    listChildrenInClass(req, res) {

    }

    // List all children in section
    listChildrenInSection(req, res) {

    }

    // Add child
    addChild(req, res) {
    }

    // Get Child attendance by Day
    getAttendance(req, res) {

    }

    // Delete agenda
    deleteAgenda(req, res) {
    }

    // List sections in class
    listSectionsInClass(req, res) {

    }

    //List teachers of class
    listTeachersInClass(req, res) {
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
