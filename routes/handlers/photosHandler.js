import Photo from '../../models/photo';

/**
 * @photo
 * /list:
 *   get:
 *     summary: CRUD Operations for photo
 *     tags:
 *       - photo
 */


export class PhotosHandler {

    // get all
    get(req, res) {
        Photo.find({}).then(results => {
            res.json(results);
        });
    }

    // add photo
    add(req, res) {
        Photo.create({
            name: req.body.name,
            url: req.body.url,
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }

    // delete photo by name
    deleteByName(req, res) {
        Photo.findOneAndRemove({name: req.params.name}).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // update photo by id
    update(req, res) {
        Photo.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }
}
