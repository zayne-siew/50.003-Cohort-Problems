import { db } from './db.js';

const collectionName = 'staff';

/**
 * Model class for staffs
 */
class Staff {
    /**
     * @param {string} id Client-side generated ID of the staff
     * @param {string} name Name of the staff
     * @param {string} dept_code Department the staff belongs to
     */
    constructor(id, name, dept_code) {
        this.id = id;
        this.name = name;
        this.dept = dept_code;
    }
}

/**
 * Returns a list of all staff in the database
 *
 * @returns The list of all staff
 */
async function all() {
    return await find({});
}

/**
 * Find a set of staff satisfying a given condition
 *
 * @param {*} p An object containing the parameters to query as keys and the relevant query parameters as values
 *
 * @returns The list of all staff that satisfy the given condition
 */
async function find(p) {
    try {
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        var staffs = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            staffs.push(new Staff(dbobj.id, dbobj.name, dbobj.dept));
        }
        return staffs;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    }
}

/**
 * Insert a list of staff into the database
 *
 * @param {Staff[]} staffs The list of staff to insert
 */
async function insertMany( staffs ) {
    try {
        const collection = db.collection(collectionName);
        await collection.insertMany(staffs);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    }
}

export { Staff, all, find, insertMany };
