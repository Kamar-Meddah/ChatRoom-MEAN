const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Store = session.Store;
const MongooseStore = require('mongoose-express-session')(Store);
const server = require('http').Server(app);
const io = require('socket.io')(server);
mongoose.connect(require('./config/dbconfig'), { useMongoClient: true});
mongoose.Promise = require('bluebird');

//database model
const messages = mongoose.model('messages', {name:'String',contenu:'String',date:{ type: 'Date', default: Date.now }});

//middlewares
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    rolling: false,
    saveUninitialized: true,
    store: new MongooseStore({
     connection: mongoose
    })
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/')); 

io.on('connection',(socket) =>{
//post Requests 
app.post('/',(req,res)=>{
    req.session.user=req.body.name
    res.json();
})

app.post('/chat',(req,res)=>{
    messages.create({'name':req.body.name,'contenu':req.body.contenu},(v)=>{
        socket.broadcast.emit('nvmsg', {'name':req.body.name,'contenu':req.body.contenu});
    })
    res.json();
})

app.post('/ch',(req,res)=>{
    res.json({'user':req.session.user});
})

app.get('/chat',(req,res)=>{       
     messages.find({}).exec().then(data=>{
       res.json(data)
     })
})

});

//server port default=80*/
server.listen(80);
