const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add your username "]
    },
    email:{
        type:String,
        required:[true,"Please add your email id"],
        unique:[true,"Email id is already used"]
    },
    password:{
        type:String,
        required:[true,"plese give your pass"]
    },
},
    {
        timestamps:true,
    
});
module.exports = mongoose.model("User",userSchema)