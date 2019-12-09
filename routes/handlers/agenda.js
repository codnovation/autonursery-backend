'use strict';

import Agenda from '../../models/agenda';

export class AgendaHandler {
    // List all agenda
    list(req, res) {
        Agenda.find({}).then(results => {
            res.json(results);
        });
    }

    // Get one agenda by id
    get(req, res) {
        Agenda.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    getAttendance(req, res) {

    }

    // Add agenda
    add(req, res) {
    }

    // Update agenda
    update(req, res) {
    }

    // Delete agenda
    delete(req, res) {
    }
}
