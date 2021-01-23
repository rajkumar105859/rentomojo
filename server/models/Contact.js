const mongoose = require('mongoose')

const phoneBookSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId ,
    name : {
        type : String ,
        //require : true
    } ,
    phone : {
        type : String ,

    } ,
    email : {
        type : String ,
        //require : true ,
        
    }
})

module.exports = mongoose.model("phonebook" , phoneBookSchema)