/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// require modules
const express = require('express');
const CONFIG = require('./config/config');
const user = require('./routers/user');
const cookie_parser = require('cookie-parser');

// handling exception that might happen
if(!CONFIG.PORT){
    throw new Error(`Expected PORT number at CONFIG file`);
}

// initialize server
const server = express();

// parsers
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookie_parser());

// routes
server.use('/user', user);

// 404 handler
server.use((req, res, next) => {
    res.status(404).send('not found');
});

// handling errors
server.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('internal server error');
})

// listens to server
server.listen(CONFIG.PORT, (error) => {
    if(error){
        console.error(error.message);
    }else{
        console.log(`Server listening at port ${CONFIG.PORT}`);
    }
})