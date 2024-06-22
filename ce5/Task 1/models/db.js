import { MongoClient } from 'mongodb';

const connection_str = 'mongodb://localhost:27017/';
const dbName = 'echo'; // rename dbName to 'echo'

const client = new MongoClient(connection_str);

try {
    var db = client.db(dbName);
} catch (error) {
    console.error("database connection failed. " + error);
}

async function cleanup() {
    await client.disconnect();
}

export { db, cleanup };
