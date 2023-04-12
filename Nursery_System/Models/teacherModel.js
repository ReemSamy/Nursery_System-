const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _id : {type:mongoose.Types.ObjectId },
    fullName : {type : String , required : true},
    password : String , 
    email : String ,
    image : String
});
mongoose.model("teachers",schema);
