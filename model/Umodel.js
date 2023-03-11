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

const userSchema = new mongoose.Schema({
    ID: {type: String, required: true},
    password: {type: String, required: true},
    yourItem: { type: Object, default: {} }
});

module.exports = mongoose.model('user',userSchema)
