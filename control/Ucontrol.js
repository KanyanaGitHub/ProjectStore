const users = require('../model/Umodel.js');

function getUserId(us, pw) {
    return new Promise((resolve, reject) => {
        users.findOne({user:us, password:pw},(err,data)=>{
            if(err) {resolve("");}
            if (data){resolve(data.id);}
            else {resolve("");}
        });
    });
}

function getUsers(in_json){
    return new Promise((resolve, reject) => {
        users.find(in_json,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function updateUser(filter, newData){
    return new Promise((resolve, reject) => {
        users.updateOne(filter, newData,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

function createUser(newUser){
    return new Promise((resolve, reject) => {
        users.create(newUser,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}

function deleteUser(in_json){
    return new Promise((resolve, reject) => {
        users.deleteOne(in_json,(err,data)=>{
            if (err) reject(err);
            else resolve(data);
        })
    })
}





module.exports = {
    getUserId,
    getUsers,
    updateUser,
    createUser
};
