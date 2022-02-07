/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// requires module
const express = require('express');
const controller = require('../controllers/user-controller');

// router object to use
const ROUTER = express.Router();


ROUTER.post('/register', controller.create);
ROUTER.post('/login', controller.guard, controller.authenticate);
ROUTER.put('/update', controller.update);
ROUTER.delete('/delete', controller.delete);

module.exports = ROUTER;