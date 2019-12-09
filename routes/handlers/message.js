'use strict';

import Message from '../../models/message';

export class MessageHandler {
    // List all message
    list(req, res) {
        Message.find({}).then(results => {
            res.json(results);
        });
    }

    // Get one message by id
    get(req, res) {
        Message.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add message
    add(req, res) {
    }

    // Update message
    update(req, res) {
    }

    // Delete message
    delete(req, res) {
    }
}
