'use strict';

import Agenda from '../../models/agenda';
import Child from '../../models/child';

export class AgendaHandler {
    // List all agenda
    list(req, res) {
        Agenda.find({})
            .then(results => {
                if (!results) {
                    return res.status(404).end();
                }
                return res.status(200).json(results);
            }).catch(err => {
            return res.status(400).json(err);
        });
    }

    // Get one agenda by id
    get(req, res) {
        Agenda.findById(req.query.id)
            .then(agenda => {
                if (!agenda) {
                    return res.status(404).end();
                }
                return res.status(200).json(agenda);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add agenda
    add(req, res) {
        Agenda.create(req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update agenda
    update(req, res) {
        Agenda.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                if (!result) {
                    return res.status(404).end();
                }
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}
