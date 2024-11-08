const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
// const jwt_decode = require("jwt-decode");


const router = express.Router(); 


router.post("/register", asyncHandler(async (req,res) => {
   

  const {name, email, password} = req.body;

  if(!name || !email || !password){
    res.status(200).json({msg: "All fields are required"});
  }

  try {
    let user = await User.findOne({ email });
    if(user) {
      return res.status(200).json({msg: "User already exists"});
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { 
        id: user.id
      
    };
    const id = user.id;
    jwt.sign(payload, process.env.Secret, {expiresIn: 360000}, (err,token) => {
      if (err) throw err; 
      res.status(200).json({ success: true, token, id});
      // var decoded = jwt_decode(token);
      console.log(token, id);
    });
  } catch (err) { 
    res.status(500).json(err);
  }
}));

router.post("/login", asyncHandler(async (req, res) => {
   

  const { email, password } = req.body;
  if(!email || !password){
    res.status(200).json({msg: "All fields are required"});
  }
  try {
    let user = await User.findOne({ email });
    if(!user) return res.status(200).json({msg: "Invalid credentials"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(200).json({msg: "Invalid credentials"});

    const payload = {  id: user.id  };
    const id = user.id;
    jwt.sign(payload, process.env.Secret, (err, token) => {
      console.log(token);
      if (err) throw err;  
      res.cookie("token", token, { httpOnly: true , sameSite: "none", secure: true });  
      res.status(200).json({ success: true, token, id});
    });

  } catch (err) { 
    res.status(500).json(err.message);
  }
}));

// router.get('/me', async (req, res) => {

//   console.log(req.body.id);
//   try {
//     const user = await User.findById(req.body.id).select('-password');
//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;