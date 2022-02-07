/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// module scaffolding
const CONFIG = {};

// defines a port to listen at
CONFIG.PORT = process.env.PORT ? process.env.PORT : 8080;

// defines the database string
CONFIG.DATABASE_STRING = 'mongodb://0.0.0.0:27017/JSON_HERO';

// defines the regexp to use to validate email
CONFIG.EMAIL_VALIDATOR_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// defines password validation regexp
CONFIG.PASSWORD_VALIDATOR_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// defines validator for names
CONFIG.NAME_VALIDATOR_REGEXP = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

// things to add around user password
CONFIG.PASSWORD_SALT = '_';
console.log(`\nUsing salt: ${CONFIG.PASSWORD_SALT}\nRemember that, changing salt will prevent users from logging in.\nIf you are sure that you haven't specified any salt then you might want to specify one and restart the server \nas server will generate a salt automatically. \n`);

// defines session expiry date in milliseconds
CONFIG.SESSION_MAX_AGE = 604800000;

// exports module
module.exports = CONFIG;