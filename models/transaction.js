const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
    },
    price:{
      type:Number,
       required:true,
    },
    user_sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    user_receiver: {
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    status:{
        type:String,
       required:true,
    },
});

module.exports = mongoose.model("transaction",transactionSchema);