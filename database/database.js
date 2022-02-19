/*
 * Project: JSON Hero
 * Author Abir SHeikh
 * Date: Feb 3, 2022
 */

// modules
const mongoose = require('mongoose');


class Database {
    constructor(DATABASE_STRING, SCHEMA, NAME) { // constructs properties to use them later on methods
        this.DATABASE_STRING = DATABASE_STRING;
        this.SCHEMA = SCHEMA;
        this.NAME = NAME;
    };

    //initialize database
    async init() {
        try {
            const DATABASE_STRING = this.DATABASE_STRING;
            const CONN = mongoose.createConnection(DATABASE_STRING);
            this.MODEL = CONN.model(this.NAME, this.SCHEMA);
        } catch (error) {
            console.log(`Database connection failed`);
        }
    }

    // writes record database
    add(data) {
        return new Promise(async (accept, reject) => { // returns a promise
            try {
                const doc = new this.MODEL(data);
                await doc.save();
                accept('record added'); // which will be resolved if data added successfully
            } catch (error) {
                reject(error); // and will be rejected if any error occurs
            };
        });
    };
    // get data from database
    get(filter) {
        const MODEL = this.MODEL; //saves model
        return new Promise(async (accept, reject) => { //returns a promise
            try {
                const docs = await MODEL.find(filter).select({
                    password: 0,
                    __v: 0
                });
                accept(docs); // which resolves on documents found
            } catch (error) {
                reject(error); // if any error
            }
        });
    };
    // updates data
    update(filter, data) {
        const MODEL = this.MODEL;
        return new Promise(async (accept, reject) => { //returns a promise
            try {
                const UPDATE = await MODEL.findByIdAndUpdate(filter, data, {
                    new: true,
                    runValidators: true
                }).select({
                    password: 0,
                    __v: 0
                });
                accept(UPDATE); //which resolves on updated data
            } catch (error) { // if any error occurs
                reject(error);
            }
        });
    };
    // deletes data
    delete(id) {
        const MODEL = this.MODEL;
        return new Promise(async (accept, reject) => {
            try {
                await MODEL.findByIdAndDelete(id);
                accept('deleted');
            } catch (error) {
                reject(error);
            }
        })
    };
    deleteMany(condition) { // deletes many data
        const MODEL = this.MODEL;
        return new Promise(async (accept, reject) => {
            try {
                const deleted_count = await MODEL.deleteMany(condition);
                accept(deleted_count.deletedCount);
            } catch (error) {
                reject(error);
            }
        })
    }
};

// exports the database class
module.exports = Database;