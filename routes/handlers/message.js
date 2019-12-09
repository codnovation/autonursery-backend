'use strict';

import Message from '../../models/message';
import Messages from "../../old/models/messages";

export class MessageHandler {
    // List all message
    list(req, res) {
        Message.find({})
            .sort({date: 'desc'})
            .then(messages => {
                if (!messages) {
                    return res.status(404).end();
                }
                return res.status(200).json(messages);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Get one message by id
    get(req, res) {
        Message.findById(req.query.id)
            .then(message => {
                if (!message) {
                    return res.status(404).end();
                }
                return res.status(200).json(message);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add message
    add(req, res) {
        Message.create(req.body)
            .then(message => {
                return res.status(200).json(message);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update message
    update(req, res) {
        Messages.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete message
    delete(req, res) {
        Messages.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}
