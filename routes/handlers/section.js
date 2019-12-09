'use strict';

import Section from '../../models/section';

export class SectionHandler {
    // List all section
    list(req, res) {
        Section.find({}).then(results => {
            res.json(results);
        });
    }

    listInClass(req, res) {

    }

    // Get one section by id
    get(req, res) {
        Section.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add section
    add(req, res) {
    }

    // Update section
    update(req, res) {
    }

    // Delete section
    delete(req, res) {
    }
}