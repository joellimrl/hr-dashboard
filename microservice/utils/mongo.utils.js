var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function initMongo() {
  const client = await mongoClient.connect();
  return client.db("hr-dashboard");
}

export async function find(collectionName) {
  const db = await initMongo();
  const response = db
    .collection(collectionName)
    .find({})
    .toArray();
  return response;
}

export async function findOne(collectionName, query) {
  const db = await initMongo();
  const response = db.collection(collectionName).findOne(query);
  return response;
}

export async function insertEmployee(collectionName, body) {
  const db = await initMongo();
  try {
    db.collection(collectionName).insertOne(body);
  } catch (e) {
    console.log(e);
    throw e;
  }
  return;
}
