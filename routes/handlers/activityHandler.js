import Activity from '../../models/activity';

/**
 * @activity
 * /list:
 *   get:
 *     summary: CRUD Operations for Activities
 *     tags:
 *       - activity
 */

export class ActivityHandler {

  // get all
  get(req, res) {
    Activity.find({}).sort({ date: 'desc' }).then(results => {
      res.json(results);
    });
  }

  // Add one Activity
  add(req, res) {
    Activity.create(req.body).then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
  }

  // get one activity by id
  getOne(req, res) {
    Activity.findById(req.params.id).then(results => {
      res.json(results);
    });
  }

  // delete activity by name
  deleteByName(req, res) {
    Activity.findOneAndRemove({ name: req.params.name }).then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
  }

  // delete one by id
  deleteById(req, res) {
    Activity.findByIdAndRemove(req.params.id).then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
  }

  // update by id
  update(req, res) {
    Activity.findByIdAndUpdate(req.params.id, req.body).then(result => {
      res.json(result);
    }).catch(err => {
      res.json(err);
    });
  }

}
