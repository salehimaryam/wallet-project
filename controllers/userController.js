const path = require('path');
const users = require('../models/User');
const wallets = require('../models/Wallet');
const jwt = require('jsonwebtoken');
const bcrypt =  require("bcrypt")

exports.register = async(req,res)=>{
    try{
   
      let { fullname, email, password,role } = req.body;
     const user = await users.findOne({email})
    if(user)
    {
        res.send("کاربری با این ایمیل وجود دارد");
    }
    else{
      password = await bcrypt.hash(password,10);
      const user = await users.create({fullname,email,password,role});
      await wallets.create({amount: 0, user_id: user._id});
      res.status(200).send("ثبت نام با موفقیت انجام شد");
    }

} catch(err){
  console.log(err);
}
}

exports.login = async (req,res) => {
  try{
    const user = await users.findOne({email:req.body.email});
    if(user){
     const hashed = await bcrypt.hash(req.body.password , 10);
     const validPassword = await bcrypt.compare(req.body.password,user.password);
      if(validPassword){
     const token = jwt.sign({email:user.email,fullname:user.fullname,id:user._id},'jhhjhjhlhijdhlcjdjkchdscdkc');
        return res.json({'token':token});
      }else{
        res.status(400).json({error:"Invalid Password"});
      }
    }else{
      res.status(401).json({error:"User does not exist"});
    }
  } catch(err){
   console.log(err);
  }
}
exports.showUser = (req,res) => {
  const usersList = users.find({});
  res.status(200).send(usersList);
}

exports.usersList = async(req, res) => {
  const usersList = await users.find({});
  res.status(200).send(usersList);
}
exports.userDetails = async(req, res) => {
  const user = await users.findById(req.params.id);
  res.status(200).send(user.populate());
}