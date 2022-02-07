/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */
// modules
const crypto = require('crypto');
const CONFIG = require('../config/config');

if(!CONFIG.PASSWORD_SALT){
    throw new Error("PASSWORD_SALT expected in CONFIG");
}

// actual function that encrypt things
function encrypt(Q){
    const DATA_TO_ENCRYPT = CONFIG.PASSWORD_SALT + Q + CONFIG.PASSWORD_SALT;
    return crypto.createHash('sha256').update(DATA_TO_ENCRYPT).digest('hex');
}

// exports module
module.exports = encrypt;