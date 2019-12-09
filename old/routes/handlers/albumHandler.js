'use strict';

import Album from '../../models/album';

/**
 * @albums
 * /list:
 *   get:
 *     summary: CRUD Operations for Albums
 *     tags:
 *       - albums
 */

export class AlbumHandler {

    // get all
    get(req, res) {
        Album.find({}).populate('photos').then(results => {
            res.json(results);
        });
    }

    // get one by id - photo objects will be expanded
    getOne(req, res) {
        Album.findById(req.params.id).populate('photos').select('photos').then(results => {
            res.json(results);
        });
    }

    // add album
    add(req, res) {
        Album.create({
            name: req.body.name,
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }

    // get one by name - photo objects will be expanded
    getPhotosByAlbumName(req, res) {
        Album.findOne({name: req.params.name}).populate('Photo').select('Photo').then(results => {
            res.json(results);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // delete by name
    deleteByName(req, res) {
        Album.findOneAndRemove({name: req.params.name}).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // delete by id
    deleteById(req, res) {
        Album.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // update by id
    update(req, res) {
        Album.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

}
