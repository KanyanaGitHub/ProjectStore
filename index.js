
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require("express-session");

const app = express();
const PORT = 3000;

const oneDay = 1000 * 60 * 60 *24;
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: {maxAge: oneDay},
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.use(cookieParser());

const myusername = 'admin'
const mypassword = '1234'

var session;

app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){
        res.send("Walcome User <a> hraf=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/login.html',{root:__dirname});
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session);
        res.sendFile('model/main.html',{root:__dirname});
    }
    else{
        res.sendFile('views/login.html',{root:__dirname});
    }
});

/*app.get('/regigter',(req,res) => {
    session = req.session;
    if(session.register){
        res.sendFile('views/register.html',{root:__dirname});
    }
    else{
        res.sendFile('views/login.html',{root:__dirname});
    }
});*/

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

app.get('*',(req, res) => {
    res.send('404 not found');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
