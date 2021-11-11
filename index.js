const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoUser = "CRUD";
const mongoPass = "CRUD1234";
const ObjectId = require('mongodb').ObjectId
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://CRUD:CRUD1234@cluster0.ow7sc.mongodb.net/CRUD?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

// Database 



client.connect(err => {
  const collection = client.db("CRUD").collection("CRUDPractice");

  // C = Create Operation 
app.post("/addProduct",(req , res)=>{
  const product = req.body
  collection.insertOne(product)
  .then(result => {
    res.redirect("/")
  })
    
})

// R = Read Operation  
app.get("/products", (req , res)=>{
  collection.find({})
  .toArray((err , doc)=>{
    res.send(doc)
  })
})


app.delete("/delete/:id",(req , res) =>{
  collection.deleteOne({ _id : ObjectId(req.params.id)})
  .then(result =>{
    res.send(result.deletedCount > 0)
  })
})

// U = Update Operation 

app.get("/product/:id",(req, res)=>{
  collection.find({_id : ObjectId(req.params.id)})
  .toArray((err , doc)=>{
    res.send(doc[0])
  })
})

app.patch("/update/:id",(req , res)=>{
  collection.updateOne({_id :ObjectId(req.params.id)},
{$set:{price : req.body.price , quantity: req.body.quantity}})
.then(result => {
 res.send(result.matchedCount > 0)
})
})

});




app.listen(4000,()=>{
    console.log("Express Working")
})