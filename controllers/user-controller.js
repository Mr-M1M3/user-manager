/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const CONFIG = require('../config/config');
const mongoose = require('mongoose');
const USER_SCHEMA = require('../database/models/user-model');
const TOKEN_SCHEMA = require('../database/models/token-model');
const is_valid_password = require('../validators/password-validator');
const Database = require('../database/database');
const encrypt = require('../utils/encrypt');
const salt = require('../utils/salt');

// handling exception that might happen
if (!CONFIG.DATABASE_STRING) {
    throw new Error(`Expected DATABASE_STRING in CONFIG file`);
}

// module scaffolding
const controller = {};

// initializing database
const database = new Database(CONFIG.DATABASE_STRING, USER_SCHEMA, 'User');
const token_database = new Database(CONFIG.DATABASE_STRING, TOKEN_SCHEMA, 'Token');
token_database.init();
database.init();

// controller for creating user
controller.create = (req, res, next) => {
    const USER = {}; // empty user object to append user data later so that only required fields get inserted to database
    USER.name = req.body.name;
    USER.email = req.body.email;

    database.get({
        email: USER.email
    }).then(data => { // after getting data from the database

        if (data.length > 0) { // if user with same email exists

            res.status(401).send('user exists');

        } else { // if no user exists with that email

            if (is_valid_password(req.body.password)) { //validates password
                USER.password = encrypt(req.body.password); // if validation succeeds appends it user object
                // adds user to database;
                database.add(USER).then(data => {
                    res.status(201).send('record added'); // successfully added data to database 
                }).catch(error => { // if any error happens
                    if (error instanceof mongoose.Error.ValidationError) { // if error caused for invalid data
                        res.status(400).send('invalid data');
                    } else {
                        next(error); // if caused for other reason error handler middleware
                    }
                });
            } else {
                res.status(400).send('invalid password'); //if invalid password,  response with a status of 401
            }
        }
    }).catch(error => {
        next(error); //calls error handler middleware
    });
}

// controller for authenticating
controller.authenticate = (req, res, next) => {
    const EMAIL = req.body.email;
    const PASSWORD = encrypt(req.body.password);
    database.get({
        email: EMAIL,
        password: PASSWORD
    }).then(data => {
        if (data.length == 0) {
            res.status(401).send('invalid email or password');
        } else if (data.length > 1) {
            next('multiple user with same email');
        } else {
            const TOKEN = salt(24); //generates random token
            const ENCRYPTED_TOKEN = encrypt(TOKEN); // encrypts that token
            token_database.add({
                token: ENCRYPTED_TOKEN,
                id: data[0]._id
            }); // adds token to token database 
            // makes response ready
            const RESPONSE = {};
            RESPONSE.name = data[0].name;
            RESPONSE.email = data[0].email;

            res.cookie('session', TOKEN, {
                maxAge: CONFIG.SESSION_MAX_AGE
            }); //sets session cookie
            res.send(RESPONSE); // sends response
        }
    }).catch(error => {
        next(error);
    })
}

controller.guard = (req, res, next) => {
    if (req.body.email || req.body.password) { // IF REQ body contains email or password
        next();
    } else {
        let token = req.cookies.session; // grabs token that came with the request
        token = encrypt(token);
        if (!token) { // if no tokens found
            next();
        } else {

            token_database.get({
                token: token
            }).then(data => {
                if (data.length == 0) { // if request does have a token but invalid
                    next();
                } else {
                    database.get({
                        _id: data[0].id
                    }).then(data => { // if token  is valid
                        // makes response ready
                        const RESPONSE = {};
                        RESPONSE.name = data[0].name;
                        RESPONSE.email = data[0].email;
                        // sends response
                        res.send(RESPONSE);
                    }).catch(error => {
                        next(error);
                    })
                }
            }).catch(error => {
                next(error);
            })
        }
    }
}

// controller for updating data
controller.update = (req, res, next) => {
    // extracting current data from request
    const CURRENT_CREDENTIALS = {};
    CURRENT_CREDENTIALS.email = req.body.current_email;
    CURRENT_CREDENTIALS.password = encrypt(req.body.current_password);
    database.get(CURRENT_CREDENTIALS).then(data => { // gets data with the current credentials
        if (data.length == 0) { // if no records found
            res.status(401).send('auth failed');
        } else { // if any records found
            // extracting update from request body
            const UPDATE = {};
            UPDATE.name = req.body.new_name ? req.body.new_name : data[0].name;
            UPDATE.email = req.body.new_email ? req.body.new_email : data[0].email;
            if (req.body.new_password) { // if user want to update password
                if (is_valid_password(req.body.new_password)) { // validates password
                    UPDATE.password = encrypt(req.body.new_password); // if valid
                } else {
                    res.status(400).send('invalid data'); // if invalid password
                    return; // stopping this middleware from executing anymore to prevent ERR_HTTP_HEADERS_SENT
                }
            }
            database.update({
                _id: data[0].id
            }, UPDATE).then(data => { // querying database to update data
                // taking an empty object and passes the data it should send as response to prevent accidentally leakage of sensitive data
                const RESPONSE = {};
                RESPONSE.name = data.name;
                RESPONSE.email = data.email;
                res.send(RESPONSE); // sends updated data as response
            }).catch(error => {
                if (error instanceof mongoose.Error.ValidationError) { // if error caused for invalid data
                    res.status(401).send('invalid data');
                } else {
                    next(error); // if caused for other reason error handler middleware
                }
            });
        }
    })
}

// controller for deleting data
controller.delete = (req, res, next) => {
    // extracting credential
    const CREDENTIALS = {};
    CREDENTIALS.email = req.body.email;
    CREDENTIALS.password = encrypt(req.body.password);
    database.get(CREDENTIALS).then(data => {
        if (data.length == 0) {
            res.status(401).send('auth failed');
        } else {
            database.delete({ _id: data[0].id }).then(() => { //deletes user
                token_database.deleteMany({ id: data[0].id }).then(del_count => { //deletes token
                    res.send('deleted');
                }).catch(error => {
                    next(error);
                });
            }).catch(error => {
                next(error);
            });
        }
    }).catch(error => {
        next(error);
    })
}

// exports module
module.exports = controller;