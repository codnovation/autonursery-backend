'use strict';

import Child from '../../models/child';

export class ChildHandler {
    // List all children in nursery
    list(req, res) {
        Child.find({}).then(results => {
            res.json(results);
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
        Child.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add child
    add(req, res) {
    }

    // Update child
    update(req, res) {
    }

    // Delete child
    delete(req, res) {
    }
}