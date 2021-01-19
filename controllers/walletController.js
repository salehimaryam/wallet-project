const wallets = require("../models/Wallet");
const transactions = require("../models/transaction");
const users = require("../models/User");

 exports.authWallet = async (req,res)=>{
    const user = await users.findById(req.user.id);
    if(user) {
      const wallet = await wallets.findOne({"user_id": user.id});
      return res.status(200).send(JSON.stringify(wallet.populate()));
    } else {
      return res.status(404).send('کاربر یافت نشد');
    }

 }

  exports.authTransactions = async(req,res) =>{
    const user = await users.findById(req.user.id);
    if(user) {
      const transactionsList = await transactions.find({'user_sender': user._id});
      return res.status(200).send(transactionsList);
    } else {
      return res.status(404).send('کاربر یافت نشد');
    }
  }

  exports.userWallet = async (req,res)=>{
    const user = await users.findById(req.params.id);
    if(user) {
      const wallet = await wallets.findOne({"user_id": user.id});
      return res.status(200).send(JSON.stringify(wallet.populate()));
    } else {
      return res.status(404).send('کاربر یافت نشد');
    }
 }

  exports.userTransactions = async(req,res) =>{
    const user = await users.findById(req.params.id);
    if(user) {
      const transactionsList = await transactions.find({'user_sender': user._id});
      return res.status(200).send(transactionsList);
    } else {
      return res.status(404).send('کاربر یافت نشد');
    }
  }

  exports.wallets = async(req,res) => {
    const walletsList = await wallets.find({});
    return res.status(200).send(walletsList);
  }

  exports.transactions = async(req,res) => {
    const transactionsList = await transactions.find({});
    return res.status(200).send(transactionsList);
  }