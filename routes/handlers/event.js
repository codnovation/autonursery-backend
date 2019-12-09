'use strict';

import Event from '../../models/event';
import Class from "../../models/class";

export class EventHandler {
    // List all event
    list(req, res) {
        Event.find({})
            .then(events => {
                if (!events) {
                    return res.status(404).end();
                }
                return res.status(200).json(events);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Get one event by id
    get(req, res) {
        Event.findById(req.query.id)
            .then(event => {
                if (!event) {
                    return res.status(404).end();
                }
                return res.status(200).json(event);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add event
    add(req, res) {
        Event.create(req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update event
    update(req, res) {
        Event.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete event
    delete(req, res) {
        Event.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}
