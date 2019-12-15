'use strict';

import User from '../../models/user';
import bcrypt from "bcryptjs";

export class UserHandler {
    // List all user
    list(req, res) {
        User.find({})
            .populate('children')
            .populate('requests')
            .populate('messages')
            .then(results => {
                if (!results) {
                    return res.status(404).end();
                }
                return res.status(200).json(results);
            })
            .catch(err => {
                res.json(err);
            });
    }

    // Get one user by id
    get(req, res) {
        User.findById(req.query.id)
            .populate('children')
            .populate('requests')
            .populate('messages')
            .then(user => {
                if (!user) {
                    return res.status(404).end();
                }
                return res.status(200).json(user);
            })
            .catch(err => {
                res.json(err);
            });
    }

    // Add user
    add(req, res) {
        User.create(req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Update user
    update(req, res) {
        User.findByIdAndUpdate(req.query.id, req.body)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Delete user
    delete(req, res) {
        User.findByIdAndRemove(req.query.id)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    }

    // Reset password
    resetPassword(req, res) {
        bcrypt.genSalt((saltError, salt) => {
            if (saltError) {
                res.status(500).json({msg: saltError});
            }

            bcrypt.hash(req.body.password, salt, (hashError, hash) => {
                if (hashError) {
                    res.status(500).json({msg: hashError});
                }

                User.findByIdAndUpdate(req.query.id, {
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

    // Forgot password
    forgotPassword(req, res) {

    }
}
