const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='Harryisagoodboy'; //this is used to sign the JWT token

//ROUT 1:create a user using:POST "/api/auth/createuser" doesn't require authentication
router.post("/createuser",[
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be min 5 characters").isLength({ min: 5 }),
  ],async (req, res) => {
    let success=false
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check whether the user exists already with same email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10); //return promise so use await
      const secPass=await bcrypt.hash(req.body.password,salt) ;

      //crete a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
            id:user.id
        }
      }
       const authtoken= jwt.sign(data,JWT_SECRET); //sync method so no await
       //res.json(user); 
       success=true;
       res.json({
        success,
        authtoken,
        user: {
          name: user.name,
          email: user.email,
          createdAt: user.date
        }
      });
      
        //authtoken can be converted to data again
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);
//ROUTE 2:Authenticate a user using POST "/api/auth/login" no login required
router.post("/login",[
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
   ],async (req, res) => {
    let success=false
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
          success=false
            return res.status(400).json({success,error:"please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success=false
            return res.status(400).json({success,error:"please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
          }
           const authtoken= jwt.sign(data,JWT_SECRET); 
           success=true
           res.json({
            success,
            authtoken,
            user: {
              name: user.name,
              email: user.email,
              createdAt: user.date, // assuming `date` field exists in your schema
            },
          });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval server error occurred");
      }
}
);
 //ROUTE 3:Get logged in user detail using POST "/api/auth/getuser" login required
 router.post("/getuser",fetchuser,async (req, res) => {

 try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
 } catch (error) {
    console.error(error.message);
    res.status(500).send("Interval server error occurred");
  }
})
module.exports = router;
