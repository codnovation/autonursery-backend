'use strict';

import Request from '../../models/request';

export class RequestHandler {
    // List all request
    list(req, res) {
        Request.find({}).then(results => {
            res.json(results);
        });
    }

    // Get one request by id
    get(req, res) {
        Request.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add request
    add(req, res) {
    }

    // Update request
    update(req, res) {
    }

    // Delete request
    delete(req, res) {
    }
}
