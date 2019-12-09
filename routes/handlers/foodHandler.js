'use strict';

import Food from '../../models/food';

/**
 * @food
 * /list:
 *   get:
 *     summary: CRUD Operations for food
 *     tags:
 *       - food
 */

export class FoodHandler {

    // get all
    get(req, res) {
        Food.find({}).then(results => {
            res.json(results);
        });
    }

    // add food
    add(req, res) {
        Food.create({
            name: req.body.name,
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }

    // delete by name
    deleteByName(req, res) {
        Food.findOneAndRemove({name: req.params.name}).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // delete by id
    deleteById(req, res) {
        Food.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // update by id
    update(req, res) {
        Food.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

}
