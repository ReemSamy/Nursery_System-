const mongoose = require('mongoose');
const { AutoIncrementID } = require("@typegoose/auto-increment")
const schema = mongoose.Schema({
    _id : Number , 
    name : {type : String , required : true},
    supervisor:{type:mongoose.Types.ObjectId  , ref : "teachers"},
});
schema.plugin(AutoIncrementID, {});
mongoose.model("classes",schema); // register the schema with mongoose


