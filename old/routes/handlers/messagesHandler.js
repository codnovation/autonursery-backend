'use strict';

import Messages from '../../models/messages';

/**
 * @message
 * /list:
 *   get:
 *     summary: CRUD Operations for message
 *     tags:
 *       - message
 */

export class MessagesHandler {

    // get all
    get(req, res) {
        Messages.find({}).sort({date: 'desc'}).then(results => {
            res.json(results);
        });
    }

    // get one message by id
    getOne(req, res) {
        Messages.findById(req.params.id).then(results => {
            res.json(results);
        }).catch(err => {
            res.send(err);
        });
    }

    // add message
    add(req, res) {
        Messages.create({
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            sender: req.body.sender, // TODO: Check how.
            rcvr: req.body.rcvr
        }).then(message => {
            res.json(message);
        }).catch(err => {
            res.send(err);
        });
    }

    // delete message by id
    deleteById(req, res) {
        Messages.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // update message by id
    update(req, res) {
        Messages.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            date: req.body.date,
            description: req.body.description,
            rcvr: req.body.rcvr
        }).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }
}
