'use strict';

import Agenda from '../../models/agenda';
import Children from '../../models/children';

/**
 * @agenda
 * /list:
 *   get:
 *     summary: CRUD Operations for Agendas
 *     tags:
 *       - agenda
 */

let emptyresults = {
    "breakfast": "Empty",
    "snackOne": "Empty",
    "lunch": "Empty",
    "snackTwo": "Empty",
    "nap": "Empty",
    "mood": "Empty",
    "participation": "Empty",
    "date": "Empty",
    "wc": "Empty",
    "attended": "Yes"
};

export class AgendaHandler {

    // get all
    get(req, res) {
        Agenda.find({}).populate('activities').then(results => {
            res.json(results);
        });
    }

    // add one agenda
    add(req, res) {
        Agenda.create(req.body).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }

    // get one agenda by id
    getOne(req, res) {
        Agenda.findById(req.params.id).then(results => {
            if (!results) {
                res.json(emptyresults);
            } else {
                res.json(results);
            }
        }).catch(err => {
            res.json(emptyresults);
        });
    }

    // delete one agenda by id
    deleteById(req, res) {
        Children.findOne({agenda: req.params.id}).populate('agenda').then(child => {
            child.agenda = child.agenda.filter(a => {
                return a._id !== req.params.id;
            });
            if (child.currentAgenda === req.params.id) {
                if (child.agenda.length <= 0) child.currentAgenda = undefined;
                else child.currentAgenda = child.agenda[child.agenda.length - 1];
            }
            return child.save((r) => {
                Agenda.findByIdAndRemove(req.params.id).then(result => {
                    res.json(result);
                }).catch(err => {
                    res.json(err);
                });
            });
        })
            .catch(err => {
                console.log(err);
            });
    }

    // update agenda
    update(req, res) {
        Agenda.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }
}
