const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const Contact = require('./models/Contact')
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb+srv://rentomojo:NKIrPzJU5rHMkbA0@rentomojo.uiaxp.mongodb.net/rentomojo?retryWrites=true&w=majority" ,{
    useNewUrlParser : true ,
    useUnifiedTopology : true
})
.then(()=>{
    console.log("DataBase Connnected successfully")
})
.catch((err)=>{
    console.log(err)
})


app.get("/" , (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.get("/contacts" ,(req,res)=>{
    Contact.find().limit(10)
    .then(result=>{
        //console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
} )
app.post("/add" , (req,res)=>{
    const contact = new Contact({
        _id : new mongoose.Types.ObjectId ,
        name : req.body.name ,
        phone : req.body.phone ,
        email : req.body.email
    })
    contact.save()
    .then((result)=>{
        //console.log(result)
        res.status(200).json({msg : "Contact saved done"})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"});
    })
})

app.get("/search" , (req,res)=>{
    const name = req.query.name
    const email = req.query.email
    console.log(name)
    if(name){
        Contact.find({name : name}).limit(10)
        .then((result)=>{
            res.status(200).send(result);
        })
    }
    else{
        Contact.find({email : email}).limit(10)
        .then((result)=>{
        res.status(200).send(result);
    })
    }
})
app.delete("/delete/:id" , (req,res)=>{
    const id = req.params.id ;
    Contact.remove({_id : id} , (err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send('error occured');
        }
        else{
            console.log(result)
            res.status(200).json({msg:"successfully deleted"});
        }
    })
})


app.put("/modify/:id" , (req,res)=>{
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const id = req.params.id
    Contact.update({_id : id} ,{$set : {name : name , phone : phone , email : email}})
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"contact successfully updated"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred"});
    })
})


app.listen(PORT , ()=>{
    console.log("Server connected successfully on port  "+PORT)
})
