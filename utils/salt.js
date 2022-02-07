/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */
// modules
const crypto = require('crypto');

// the actual function that generates things
function generate_random_string(bytes){
    bytes = bytes ? bytes : 16;
    return crypto.randomBytes(bytes).toString('base64');
}

// exports module
module.exports = (generate_random_string);