/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const CONFIG = require('../config/config');

// handling exception that might happen
if(!(CONFIG.PASSWORD_VALIDATOR_REGEXP instanceof RegExp)){
    throw new Error('PASSWORD_VALIDATOR_REGEXP must be valid RegExp');
}

// the actual function which validates password;
function is_valid_password(password){
    const PASSWORD_VALIDATOR_REGEXP = CONFIG.PASSWORD_VALIDATOR_REGEXP;
    return PASSWORD_VALIDATOR_REGEXP.test(password);
};

// exports module
module.exports = is_valid_password;