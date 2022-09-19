const MongoClient = require('mongodb').MongoClient;

const dbUrl =
  'mongodb+srv://almog567:almog567765@backend-proj.34a6uke.mongodb.net/instabook?retryWrites=true&w=majority';

const dbName = 'instabook';
let dbConn = null;

module.exports = {
  getCollection,
};

async function getCollection(collectionName) {
  try {
    console.log('trying to get collection');
    const db = await connect();
    console.log('connected');
    const collection = await db.collection(collectionName);
    console.log('got collection');
    return collection;
  } catch (err) {
    // logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(dbUrl);
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log('cant connect to db');
    // logger.error('Cannot Connect to DB', err);
    throw err;
  }
}
