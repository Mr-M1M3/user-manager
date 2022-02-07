/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 5, 2022
 */

// modules
const CONFIG = require('../config/config');

// handling exception that might happen
if(!(CONFIG.NAME_VALIDATOR_REGEXP instanceof RegExp)){
    throw new Error('NAME_VALIDATOR_REGEXP must be valid RegExp');
}

// the actual function which validates name;
function is_valid_name(name){
    const NAME_VALIDATOR_REGEXP = CONFIG.NAME_VALIDATOR_REGEXP;
    return NAME_VALIDATOR_REGEXP.test(name);
};

// exports module
module.exports = is_valid_name;