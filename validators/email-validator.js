/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const CONFIG = require('../config/config');

// handling exception that might happen
if(!(CONFIG.EMAIL_VALIDATOR_REGEXP instanceof RegExp)){
    throw new Error('EMAIL_VALIDATOR_REGEXP must be valid RegExp');
}

// the actual function which validates email;
function is_valid_email(email){
    const EMAIL_VALIDATOR_REGEXP = CONFIG.EMAIL_VALIDATOR_REGEXP;
    return EMAIL_VALIDATOR_REGEXP.test(email);
};

// exports module
module.exports = is_valid_email;