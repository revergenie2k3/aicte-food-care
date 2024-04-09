var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");
const bodyParser=require('body-parser');

var app=Express(); 
app.use(cors());
app.use(bodyParser.json());
var CONNECTION_STRING="mongodb+srv://smoggysai555:saisharan@cluster0.bxrdtjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME="Food-Care";
var database;
app.listen(5038,()=>{

Mongoclient.connect(CONNECTION_STRING, (error, client)=>{
database=client.db (DATABASENAME);
console.log("Mongo DB Connection Successful");
});
})
app.get('/api/foodcare/displayDish', (request, response)=>{
    database.collection ("Ingredients").find({}).toArray((error, result)=>{
        console.log(result);
    response.json(result);
    });
    })

app.post('/api/foodcare/addDish', (request, response)=>{ 
    console.log(request.body);
        
    database.collection("Ingredients").insertOne({
        food:request.body.name,
        rice:request.body.rice,
        wheat:request.body.wheat,
        mushroom:request.body.mushroom,
        Oil:request.body.oil,
        salt:request.body.salt,
        maggi:request.body.maggi,
        ghee:request.body.ghee,
        coriander:request.body.corriander,
        tomato:request.body.tomato
    });
    response.json("Added Succesfully");
    })
    
