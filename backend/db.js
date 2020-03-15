export const client = require('mongodb').MongoClient;
export const ObjectId = require('mongodb').ObjectId;

let DB_USER = process.env.DB_USER;
let DB_PASS = process.env.DB_PASS;
let DB_HOST = process.env.DB_HOST;

export const db_url = 'mongodb://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST;
export const db_name = "maddealz";