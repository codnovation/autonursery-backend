import Children from '../../models/children';
import ActivitySchema from '../../models/activity';
import AgendaSchema from '../../models/agenda';
import User from '../../models/user';

/**
 * @child
 * /list:
 *   get:
 *     summary: CRUD Operations for children
 *     tags:
 *       - child
 *       - children
 */

export class ChildHandler {

    // get all
    get(req, res) {
        let children = Children.find();
        if (req.user.role === 'Teacher') {
            children = children.where({
                $or:
                    req.user.security.map(section => ({
                        'section.class': section.class,
                        'section.section_name': section.section_name
                    }))
            });
        }
        children.populate('section.class')
            .then(result => res.json(result.map(child => ({
                    _id: child._id,
                    firstName: child.firstName,
                    lastName: child.lastName,
                    parents: child.parents,
                    dateOfBirth: child.dateOfBirth ? child.dateOfBirth.toLocaleString('en-US') : undefined,
                    gender: child.gender,
                    allergies: child.allergies,
                    className: child.section && child.section.class ? child.section.class.name : undefined,
                    section: child.section ? child.section.section_name : undefined,
                    locations: child.location,
                    bloodType: child.bloodType,
                    medicalConditions: child.medicalConditions
                })
            )))
            .catch(err => console.log(err));
    }

    // get one by id
    getOne(req, res) {
        Children.findById(req.params.id).then(results => {
            res.json(
                {
                    firstName: results.firstName,
                    lastName: results.lastName,
                    parents: results.parents,
                    dateOfBirth: results.dateOfBirth.toLocaleString('en-US'),
                    gender: results.gender,
                    allergies: results.allergies,
                    section: results.section,
                    locations: results.location,
                    bloodType: results.bloodType,
                    medicalConditions: results.medicalConditions,
                }
            );
        }).catch(err => console.log(err));
    }

    // add one child to the requested parent
    add(req, res) {
        Children.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parents: req.body.parents,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            bloodType: req.body.bloodType,
            medicalConditions: req.body.medicalConditions,
            locations: req.body.locations,
            section: req.body.section,
            allergies: req.body.allergies,
            agenda: req.body.agenda,
            activity: req.body.activity,
        }).then(result => {
            console.log(req.body.parents);
            let parents = [];
            if (Array.isArray(req.body.parents)) {
                parents = req.body.parents;
            } else if (typeof (req.body.parents) === 'string') {
                parents.push(req.body.parents);
            } else {
                res.status(400).json({message: 'invalid parameter'},
                    req.body.parents, typeof (req.body.parents));
            }


            req.body.parents.forEach(id => {
                User.findByIdAndUpdate(id).then(user => {
                    console.log(user, result);
                    user.children.push(result._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).json(err);
                        }
                    });
                }).catch(err => {
                    console.log(err);
                });
            });
            res.json(result);
        }).catch(err => {
            res.json(err);
        });
    }

    // delete child by id
    deleteById(req, res) {
        Children.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // get agenda of child by child id
    getChildAgenda(req, res) {
        Children.findById(req.params.id).populate('agenda')
            .select('agenda').then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    addActivity(req, res) {
        Children.findById(req.params.id)
            .then(child => {
                ActivitySchema.create({
                    name: req.body.name,
                    description: req.body.description,
                    type: req.body.type,
                    date: req.body.date,
                }).then(activity => {
                    child.activities.push(activity._id);
                    child.save((err, updatedChild) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            Children.populate(updatedChild, {path: 'activities'}).then(some => {
                                res.json(some);
                            });
                        }
                    });
                })
            })
    }

    // add agenda to child by child id
    addAgenda(req, res) {
        console.log(req.body);
        Children.findById(req.params.id)
            .then(child => {
                AgendaSchema.create({
                    date: req.body.date,
                    breakfast: req.body.breakfast,
                    snackOne: req.body.snackOne,
                    lunch: req.body.lunch,
                    snackTwo: req.body.snackTwo,
                    nap: req.body.nap,
                    wc: req.body.wc,
                    mood: req.body.mood,
                    participation: req.body.participation,
                    more: req.body.more,
                    child: child,
                    attendance: req.body.attended
                }).then(agenda => {
                    child.currentAgenda = agenda._id;
                    child.agenda.push(agenda._id);
                    child.save((err, updatedChild) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            Children.populate(updatedChild, {path: 'agenda'}).then(some => {
                                res.json(some);
                            });
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
            console.log(err);
        })
    }

    // get photos of child by child id
    getChildPhotos(req, res) {
        Children.findById(req.params.id).populate('photos').select('photos').then(results => {
            res.json(results);
        });
    }

    // get activities of child by child id
    getChildActivities(req, res) {
        Children.findById(req.params.id).populate('activities').select('activities').then(results => {
            res.json(results);
        });
    }

    // update child information
    update(req, res) {
        Children.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parents: req.body.parents,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            section: req.body.section,
            locations: req.body.locations,
            bloodType: req.body.bloodType,
            medicalConditions: req.body.medicalConditions,
            allergies: req.body.allergies,
        }).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

}
