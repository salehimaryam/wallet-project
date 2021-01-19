const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true,
        default: 0,
        
    },
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref :"User",
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Wallet",walletSchema);