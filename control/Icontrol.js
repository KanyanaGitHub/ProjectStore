
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/ProjectStore';

MongoClient.connect(uri, (err, client) => {
    if (err) throw err;

    const db = client.db('ProjectStore');
    const collection = db.collection('item');

    // find all documents
    collection.find({}).toArray((err, docs) => {
      console.log(docs);
    });

    // find documents with condition
    collection.find({ name: 'multimeter' },{Number: 10}).toArray((err, docs) => {
      console.log(docs);
    });
  });


