'use strict';

import Class from '../../models/class';

export class ClassHandler {
    // List all classes
    list(req, res) {
        Class.find({}).then(results => {
            res.json(results);
        });
    }

    // Get one class by id
    get(req, res) {
        Class.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add class
    add(req, res) {
    }

    // Update class
    update(req, res) {
    }

    // Delete class
    delete(req, res) {
    }
}
