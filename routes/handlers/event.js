'use strict';

import Event from '../../models/event';

export class EventHandler {
    // List all event
    list(req, res) {
        Event.find({}).then(results => {
            res.json(results);
        });
    }

    // Get one event by id
    get(req, res) {
        Event.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add event
    add(req, res) {
    }

    // Update event
    update(req, res) {
    }

    // Delete event
    delete(req, res) {
    }
}
