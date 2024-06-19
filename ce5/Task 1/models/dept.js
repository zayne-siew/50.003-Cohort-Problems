import { db } from './db.js';

const collectionName = 'dept';

class Dept {
    constructor(code) {
        this.code = code;
    }
}

/**
 * Return all departments in the database
 *
 * @returns The list of all departments
 */
async function all() {
    return await find({});
}

/**
 * Find a set of departments satisfying a given condition
 *
 * @param {*} p An object containing the parameters to query as keys and the relevant query parameters as values
 *
 * @returns The list of all departments that satisfy the given condition
 */
async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var depts = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            const dept = new Dept(dbobj.code);
            depts.push(dept);
        }
        return depts;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    }
}

/**
 * Insert a list of departments into the database
 *
 * @param {Dept[]} depts The list of departments to insert
 */
async function insertMany(depts) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(depts);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    }
}

module.exports = { Dept, all, find, insertMany };
