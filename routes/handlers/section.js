'use strict';

import Section from '../../models/section';

export class SectionHandler {
    // List all section
    list(req, res) {
        Section.find({})
            .then(sections => {
                if (!sections) {
                    return res.status(404).end();
                }
                return res.status(200).json(sections);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // List all children in section
    listChildrenInSection(req, res) {
        Section.findById(req.query.id).populate('children').select('children').then(results => {
            if (!results) {
                return res.status(404).end();
            }
            return res.status(200).json(results);
        });
    }

    // Get one section by id
    get(req, res) {
        Section.findById(req.query.id)
            .then(section => {
                if (!section) {
                    return res.status(404).end();
                }
                return res.status(200).json(section);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Add section
    add(req, res) {
        Section.create(req.body)
            .then(section => {
                return res.status(200).json(section);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update section
    update(req, res) {
        Section.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete section
    delete(req, res) {
        Section.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }
}