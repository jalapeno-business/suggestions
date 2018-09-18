const MongoClient = require('mongodb');
const dummyData = require('./zagat-data.json');

const url = 'mongodb://kaycheez:kevinisk00l@ds046867.mlab.com:46867/zagat-info';

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      console.log('error to the db');
    } else {
      console.log('success to the db');
      const db = client.db('zagat-info');
      db.collection('restaurants').insertMany(dummyData, (error) => {
        if (error) {
          console.log('error', error);
        } else {
          console.log('success!');
          client.close();
        }
      });
    }
  },
);
