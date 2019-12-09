'use strict';

import Event from '../../models/event';

/**
 * @event
 * /list:
 *   get:
 *     summary: CRUD Operations for event
 *     tags:
 *       - event
 */

export class EventHandler {

    // get all
    get(req, res) {
        Event.find({}).sort({date: 'desc'}).then(results => {
            res.json(results);
        });
    }

    // add event with image
    addWithImage(req, res, next) {
        let uploadFile = req.files.file;
        const fileName = req.files.file.name;
        uploadFile.mv(
            `${__dirname}/storage/events/${fileName}`,
            (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({
                    file: `/${uploadFile.name}`,
                });
            }
        );
        Event.create({
            name: req.params.name,
            description: req.params.description,
            date: req.params.date,
            image: `/events/${fileName}`
        }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }

    // get one event
    getOne(req, res) {
        Event.findById(req.params.id).then(results => {
            res.json(results);
        });
    }

    // add event
    add(req, res) {
        Event.create({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            image: req.body.image
        }).then(result => {
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }

    // delete by name
    deleteByName(req, res) {
        Event.findOneAndRemove({name: req.params.name}).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // delete by id
    deleteById(req, res) {
        Event.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // update event details
    update(req, res) {
        Event.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

}
