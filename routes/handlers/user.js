'use strict';

import User from '../../models/user';

export class UserHandler {
    // List all user
    list(req, res) {
        User.find({})
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

    //List teachers of class
    listInClass(req, res) {
    }

    // Get one user by id
    get(req, res) {
        User.findById(req.query.id)
            .populate('children')
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
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            role: req.body.role
        })
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

    }

    // Forgot password
    forgotPassword(req, res) {

    }
}
