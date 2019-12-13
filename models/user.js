'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User model schema
const User = new mongoose.Schema({
    lastName: String,
    firstName: String,
    dateOfBirth: Date,
    gender: String,
    phoneNumber: Number,
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: {unique: true}
    },
    password: String,
    role: {
        type: String,
        enum: ['Teacher', 'Parent', 'Admin'],
        default: 'Parent'
    },
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Request'}],
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Child'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
User.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
User.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) {
        return next();
    }


    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }

            // replace a password string with hash value
            user.password = hash;

            return next();
        });
    });
});


module.exports = mongoose.model('User', User);
