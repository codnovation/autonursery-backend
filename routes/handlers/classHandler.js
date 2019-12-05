import Class from '../../models/class';
import RequestSchema from '../../models/requests';
import ActivitySchema from '../../models/activity';
import Children from '../../models/children';

/**
 * @class
 * /list:
 *   get:
 *     summary: CRUD Operations for class
 *     tags:
 *       - class
 */

export class ClassHandler {

  // get all
  get(req, res) {
    Class.find({}).then(results => {
      res.json(results);
    });
  }

  // get one class by id
  getOneById(req, res) {
    Class.findById(req.params.id).then(results => {
      res.json(results);
    });
  }

  // get one class by name
  getOneByName(req, res) {
    Class.find({}).then(results => {
      res.json(results);
    });
  }

  // add class
  add(req, res) {
    Class.create({
      className: req.body.className,
      classNumber: req.body.classNumber,
      sections: req.body.sections
    }).then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
  }

// TODO: test
  update(req, res) {
    Class.findByIdAndUpdate(req.params.id, req.body).then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
  }

  // delete one by id
  delete(req, res) {
    Class.findByIdAndRemove(req.params.id).then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
  }

  // delete one by name
  deleteByName(req, res) {
    Class.findOneAndRemove({ className: req.params.name }).then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
  }

  // add request to the whole class
  addRequest(req, res) {
    Class.findById(req.params.id).then(cls => {
      RequestSchema.create({
        status: req.body.status,
        priority: req.body.priority,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
      }).then(request => {
        cls.requests.push(request._id);
        cls.save((err, updatedClass) => {
          if (err) {
            res.status(500).send(err);
          } else {
            Class.populate(updatedClass, { path: 'requests' }).then(some => {
              res.json(some);
            });
          }
        });
      });
    }).catch(err => {
      res.send(err);
    });
  }

// TODO: test
  addRequestToSchool(req, res) {
    Class.find({})
    .then(classes => {
      RequestSchema.create({
        status: req.body.status,
        priority: req.body.priority,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
      }).then(request => {
        classes.forEach(cls => {
          cls.requests.push(request._id);
          cls.save((err, updatedClass) => {
            if (err) {
              res.status(500).send(err);
            } else {
              Class.populate(updatedClass, { path: 'requests' }).then(some => {
                res.json(some);
              });
            }
          });
        });
      })
    })
  }

  // get requests of requested class
  getClassRequests(req, res) {
    Class.findById(req.params.id).populate('requests').select('requests').then(results => {
    res.json(results);
  });
  }

// TODO: Test
  getSchoolRequests(req, res) {
    Class.find({}).populate('requests').select('requests').then(results => {
    res.json(results);
  });
  }

  // TODO: update and delete class and school requests

  addActivity(req, res) {
    Class.findById(req.params.id)
    .then(cls => {
      ActivitySchema.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        date: req.body.date,
      }).then(activity => {
        cls.activities.push(activity._id);
        cls.save((err, updatedClass) => {
          if (err) {
            res.status(500).send(err);
          } else {
            Class.populate(updatedClass, { path: 'activities' }).then(some => {
              res.json(some);
            });
          }
        });
      })
    })
  }

  // add activity to the whole school
  addActivityToSchool(req, res) {
    Class.find({})
    .then(cls => {
      ActivitySchema.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        date: req.body.date,
      }).then(activity => {
        cls.activities.push(activity._id);
        cls.save((err, updatedClass) => {
          if (err) {
            res.status(500).send(err);
          } else {
            Class.populate(updatedClass, { path: 'activities' }).then(some => {
              res.json(some);
            });
          }
        });
      });
    });
  }

  // get all activities of requested class by class id
  getClassActivities(req, res) {
    Class.findById(req.params.id).populate('activities').select('activities').then(results => {
    res.json(results);
  });
  }

// TODO: Test
  getSchoolActivities(req, res) {
    Class.find({}).populate('activities').select('activities').then(results => {
    res.json(results);
  });
  }

  // add child to class
  addChild(req, res) {
    Class.findById(req.params.id)
    .then(cls => {
      Children.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        parents: user._id,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        //class: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
        section: req.body.section,
        //allergies: [req.body.allergies],
      }).then(child => {
        cls.children.push(child._id);
        cls.save((err, updatedClass) => {
          if (err) {
            res.status(500).send(err);
          } else {
            Class.populate(updatedClass, { path: 'children' }).then(some => {
              res.json(some);
            });
          }
        });
      })
    })
  }

  // get children of selected class by class id
  getClassChildren(req, res) {
    Class.findById(req.params.id).populate('children').select('children').then(results => {
    res.json(results);
  });
  }

  // get children in the school
  getSchoolChildren(req, res) {
    Class.find({}).populate('children').select('children').then(results => {
    res.json(results);
  });
  }
}
