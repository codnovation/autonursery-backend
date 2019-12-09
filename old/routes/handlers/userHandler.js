'use strict';

import bcrypt from 'bcryptjs';

import User from '../../models/user';
import Children from '../../models/children';
import RequestSchema from '../../models/requests';
import Messages from '../../models/messages';

/**
 * @user
 * /list:
 *   get:
 *     summary: CRUD Operations for user
 *     tags:
 *       - user
 */

export class UserHandler {

    resetPassword(req, res) {
        bcrypt.genSalt((saltError, salt) => {
            if (saltError) {
                res.status(500).json({msg: saltError});
            }

            bcrypt.hash(req.body.password, salt, (hashError, hash) => {
                if (hashError) {
                    res.status(500).json({msg: hashError});
                }

                User.findByIdAndUpdate(req.params.id, {
                    password: hash
                }).then(user => {
                    if (!user) {
                        return res.status(404).end();
                    }

                    return res.status(200).json(user);
                });
            });
        });
    }

    // get all
    get(req, res) {
        User.find({}).populate('messages').populate('requests').populate('children')
            .then(results => {
                res.json(
                    results
                );
            });
    }

    // get user by id
    getOne(req, res) {
        User.findById(req.params.id).populate('messages')
            .populate('requests').populate('children')
            .populate('security.class')
            .then(user => {
                if (!user) {
                    return res.status(404).end();
                }
                return res.status(200).json(user);
            });
    }

    // get user by name
    getOneByName(req, res) {
        User.findOne({name: req.params.name}).then(user => {
            if (!user) {
                return res.status(404).end();
            }
            return res.status(200).json(user);
        });
    }

    // get one by phone number
    getOneByPhoneNumber(req, res) {
        User.findOne({phoneNumber: req.params.phoneNumber}).then(user => {
            if (!user) {
                return res.status(404).end();
            }
            return res.status(200).json(user);
        });
    }

    // get one by email
    getOneByEmail(req, res) {
        User.findOne({email: req.params.email}).then(user => {
            if (!user) {
                return res.status(404).end();
            }
            return res.status(200).json(user);
        });
    }

    // get one by role
    getOneByRole(req, res) {
        User.findOne({role: req.params.role}).then(user => {
            if (!user) {
                return res.status(404).end();
            }
            return res.status(200).json(user);
        });
    }

    // get user messages
    getUserMessages(req, res) {
        User.findById(req.params.id).populate({path: 'messages', options: {sort: {date: -1}}})
            .select('messages').then(results => {
            res.json(results);
        });
    }

    // get user requests
    getUserRequests(req, res) {
        User.findById(req.params.id).populate({path: 'requests', options: {sort: {date: -1}}})
            .select('requests').then(results => {
            res.json(results);
        });
    }

    // get user children
    getUserChildren(req, res) {
        User.findById(req.params.id).populate('children').select('children')
            .then(results => {
                console.log(results);
                res.json({
                    children: results.children.map(child => {
                        if (child.currentAgenda) {
                            child.agenda = [child.currentAgenda];
                        }
                        return child;
                    })
                });
            });
    }

    // add children to user (parent)
    addUserChild(req, res) {
        console.log(req.params, req.body);
        User.findById(req.params.id).then(user => {
            Children.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                parents: req.params.id,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                bloodType: req.body.bloodType,
                medicalConditions: req.body.medicalConditions,
                locations: req.body.locations,
                section: req.body.section,
                allergies: req.body.allergies,
                agenda: req.body.agenda,
                activity: req.body.activity,
            }).then(child => {
                user.children.push(child._id);
                user.save((err, updatedUser) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        User.populate(updatedUser, {path: 'children'}).then(some => {
                            res.json(some);
                        });
                    }
                });
            });
        });
    }

    // delete user by id
    deleteById(req, res) {
        User.findByIdAndRemove(req.params.id).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

    // add user
    add(req, res) {
        User.create({
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }

//Needs modification
// TODO: add request also to child

    addRequest(req, res) {
        User.findById(req.params.id)
            .then(user => {
                RequestSchema.create({
                    status: req.body.status,
                    priority: req.body.priority,
                    title: req.body.title,
                    description: req.body.description,
                    date: req.body.date,
                    rcvr: req.params.id
                }).then(request => {
                    user.requests.push(request._id);
                    user.save((err, updatedUser) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            User.populate(updatedUser, {path: 'requests'}).then(some => {
                                res.json(some);
                            });
                        }
                    });
                });
            });
    }

    // add message to user (send message)
    addMessage(req, res) {
        User.findById(req.params.id)
            .then(user => {
                Messages.create({
                    title: req.body.title,
                    description: req.body.description,
                    date: req.body.date,
                    rcvr: req.params.id // TODO: Check how.
                }).then(message => {
                    user.messages.push(message._id);
                    user.save((err, updatedUser) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            User.populate(updatedUser, {path: 'message'}).then(some => {
                                res.json(some);
                            });
                        }
                    });
                });
            });
    }

    // update user by id
    update(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.json(result);
        })
            .catch(err => {
                res.json(err);
            });
    }

}
