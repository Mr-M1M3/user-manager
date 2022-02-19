/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const mongoose = require('mongoose');
const CONFIG = require('../../config/config');

if(typeof CONFIG.SESSION_MAX_AGE != 'number'){
    throw Error('Expected max age of session storage in milliseconds');
}

// token schema
const TOKEN_SCHEMA = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    expiresAt:{
        type: Date,
        default: new Date(new Date().valueOf() + CONFIG.SESSION_MAX_AGE),
        expires: 60

    }
}, {
    timestamps: true
});

// exports this schema 
module.exports = TOKEN_SCHEMA;