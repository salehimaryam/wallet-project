const transactions = require('../models/transaction');
const wallets = require('../models/Wallet')
const users = require('../models/User');

exports.decrease = async (req,res) => {
     try{
      let{price}=req.body;
      const user = await users.findById(req.user.id);
      const sender = await users.findById(user.id);
      const wallet = await wallets.findOne({user_id:user.id});
      if(price <= wallet.amount){
      await transactions.create({
        title: 'descrease',
        price:price,
        user_sender:sender,
        type:'decrease',
        status:'acsepted'
      });
      await wallet.update({amount:wallet.amount-price});
      // const amount  = wallet.amount;
      res.status(200).send("ok");
      }else{
        res.status(500).send("موجودی کافی نیست");
      }
     }catch(err){
      res.status(500).send(err);
     }
}

exports.increase = async (req,res) => {
  let {price} = req.body;
  const user = req.user;
  const sender = await users.findById(user.id);
  const wallet = await wallets.findOne({user_id:user.id});
  await transactions.create ({
    title: 'increase',
    price:price,
    user_sender:sender,
    type:'charge',
    status:'acsepted'
  });

  await wallet.update({amount:wallet.amount+price});
  // const amount  = wallet.amount;
  res.status(200).send("ok");
  try{
    
  }catch(err){
    res.status(500).send(err);
  }
}

exports.transfer =async(req,res) => {
     
  try{
    let {price} = req.body;
    const user = await users.findById(req.user.id);
    const reciever_id = req.body.reciever_id;
    const reciever = await users.findById(reciever_id);
    ;

    if(!reciever) {
      res.status(404).send("کاربر یافت نشد")
    }
    const wallet = await wallets.findOne({user_id:user.id});
    if(price <= wallet.amount){
      await transactions.create ({
        title: 'transfer',
        price:price,
        user_sender:user,
        user_receiver:reciever,
        type:'transfer',
        status:'acsepted'
      });
      const reciever_wallet = await wallets.findOne({user_id:reciever._id});
      await wallet.update({amount:wallet.amount-price});
      await reciever_wallet.update({amount:reciever_wallet.amount+price});
      // const amount  = wallet.amount;
      // const reciever_amount  = reciever_wallet.amount;
      res.status(200).send("ok");
    }else{
      res.status(500).send("موجودی کافی نیست");
    }
  }catch(err){
    res.status(500).send(err);
  }
}