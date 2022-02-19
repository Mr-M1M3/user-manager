/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const mongoose = require('mongoose');
const CONFIG = require('../../config/config');
const is_valid_email = require('../../validators/email-validator');
const is_valid_name = require('../../validators/name-validator');

// handling exception that might happen
 if(!(CONFIG.EMAIL_VALIDATOR_REGEXP instanceof RegExp)){
    throw new Error(`EMAIL_VALIDATION_REGEXP at CONFIG file must be valid RegExp`);
}
// schema for user
const USER_SCHEMA = new mongoose.Schema({ 
    name: { //name of user must be defined and a type of string
        type: String,
        required: true,
        validate: {
            validator: is_valid_name
        }
    },
    email: { // email is required and validated by the regexp of config file
        type: String,
        required: true,
        validate: {
            validator: is_valid_email
        }
    },
    password: { // no need to validate password as it will be received hashed
        type: String,
        required: true
    }
});

// exports model of the user schema
module.exports = USER_SCHEMA;
