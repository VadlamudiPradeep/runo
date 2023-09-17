let mongoose = require("mongoose");

let Schema  = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
   email:{
    type:String,
    require:true
   },
    phone:{
        type:String , 
        require:true,
    },
    age:{
        type:String ,
        require:true,
    },
    pincode:{
        type:String,
        require:true,
    },
    aadhar:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('User' , userSchema)