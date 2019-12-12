'use strict';

import Class from '../../models/class';

export class ClassHandler {
    // List all classes
    list(req, res) {
        Class.find({})
            .then(results => {
                if (!results) {
                    return res.status(404).end();
                }
                return res.status(200).json(results);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // List all children in class
    listChildrenInClass(req, res) {
        Class.findById(req.query.id).populate('children').select('children').then(results => {
            if (!results) {
                return res.status(404).end();
            }
            return res.status(200).json(results);
        });
    }

    // List sections in class
    listSectionsInClass(req, res) {
        Class.findById(req.query.id).populate('sections').select('sections').then(results => {
            if (!results) {
                return res.status(404).end();
            }
            return res.status(200).json(results);
        });
    }

    //List teachers of class
    listTeachersInClass(req, res) {
        Class.findById(req.query.id).populate('teachers').select('teachers').then(results => {
            if (!results) {
                return res.status(404).end();
            }
            return res.status(200).json(results);
        });
    }

    // Get one class by id
    get(req, res) {
        Class.findById(req.query.id)
            .then(result => {
                if (!result) {
                    return res.status(404).end();
                }
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add class
    add(req, res) {
        Class.create(req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update class
    update(req, res) {
        Class.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete class
    delete(req, res) {
        Class.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}
