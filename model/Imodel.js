const mongoose = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/ProjectStore';
mongoose.connect(url);

const db = mongoose.connection;
db.once('open', () => {
    console.log('connection :', url);
});

db.on('error', (err) => {
    console.error('connection error :', err);
});

const itemSchema = new mongoose.Schema({
    ItemName: {type: String, required: true},
    ItemNum: {type: Number,default: 0}
});

module.exports = mongoose.model('item',itemSchema)
