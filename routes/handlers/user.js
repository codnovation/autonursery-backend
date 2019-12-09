'use strict';

import User from '../../models/user';

export class UserHandler {
    // List all user
    list(req, res) {
        User.find({}).then(results => {
            res.json(results);
        });
    }

    listInClass(req, res) {
    }

    // Get one user by id
    get(req, res) {
        User.findById(req.query.id).then(results => {
            res.json(results);
        });
    }

    // Add user
    add(req, res) {
    }

    // Update user
    update(req, res) {
    }

    // Delete user
    delete(req, res) {
    }

    // Reset password
    resetPassword(req, res) {

    }

    // Forgot password
    forgotPassword(req, res) {

    }
}
