'use strict';

import Request from '../../models/request';

export class RequestHandler {
    // List all request
    list(req, res) {
        Request.find({})
            .populate('child')
            .populate('parents')
            .then(requests => {
                if (!requests) {
                    return res.status(404).end();
                }
                return res.status(200).json(requests);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Get one request by id
    get(req, res) {
        Request.findById(req.query.id)
            .populate('child')
            .populate('parents')
            .then(request => {
                if (!request) {
                    return res.status(404).end();
                }
                return res.status(200).json(request);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update request
    update(req, res) {
        Request.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}
