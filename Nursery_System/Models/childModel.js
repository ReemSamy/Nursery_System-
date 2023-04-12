const mongoose = require('mongoose');
const { AutoIncrementID } = require("@typegoose/auto-increment");

const Schema = mongoose.Schema;
const childSchema = new Schema({
   _id:Number,
    fullName : String,
    age : Number,
    level : String ,
    address : {
      city:String,
      street: String, 
      building:String
    },
    class:{ type: Schema.Types.Number, ref: 'classes' } //refrence to the class [relations between Child and Class]
  });
  childSchema.plugin(AutoIncrementID,{ field: '_id' }) // That will make the  id auto incremented
  
  
  // Export the childSchema model
  module.exports = mongoose.model('childs', childSchema); // that will make an entity in the mongodb 