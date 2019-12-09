'use strict';

import Child from '../../models/child';
import Children from "../../old/models/children";

export class ChildHandler {
    // List all children in nursery
    list(req, res) {
        Child.find({})
            .then(children => {
                if (!children) {
                    return res.status(404).end();
                }
                return res.status(200).json(children);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // List all children in class
    listInClass(req, res) {

    }

    // List all children in section
    listInSection(req, res) {

    }

    // Get one child by id
    get(req, res) {
        Child.findById(req.query.id)
            .then(child => {
                if (!child) {
                    return res.status(404).end();
                }
                return res.status(200).json(child);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add child
    add(req, res) {
    }

    // Update child
    update(req, res) {
        Child.findByIdAndUpdate(req.params.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete child
    delete(req, res) {
        Child.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}