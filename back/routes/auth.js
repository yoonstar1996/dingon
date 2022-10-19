const express = require("express");
const router = express.Router();
const {User} = require("../models");
const passport = require("passport");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const bcrypt = require("bcrypt")
router.post("/signup",isNotLoggedIn,async(req,res,next)=>{
    const { email, nickName, password } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        return res.send({ code: 400 }); // 실패
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nickName,
        password: hash,
      });
      return res.send({ code: 200 }); //성공
    } catch (error) {
      console.error(error);
      return next(error);
    }
});
router.post("/login",isNotLoggedIn,async(req,res,next)=>{
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
          console.error(authError);
          return res.send({ code: 400 });
        }
        if (!user) {
          return res.send({ code: 400 });
        }
        return req.login(user, (loginError) => {
          if (loginError) {
            console.error(loginError);
            return res.send({ code: 400 });
          }
          return res.send({ code: 200,user:{nickName:req.user.nickName, email:req.user.email} });
        });
      })(req, res, next);
});
router.post("/logout",isLoggedIn,(req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send({code:200});
});
router.post("/emailCheck",isNotLoggedIn,async(req,res,next)=>{
    try{
        const User = User.findOne({where:{email:req.body.email}});
        if(User){
            res.send({code:400});
        }
        else{
            res.send({code:200});
        }
    }
    catch(err){
        next(err);
    }
});
router.post("/nickNameCheck",isNotLoggedIn,async(req,res,next)=>{
    try{
        const User = User.findOne({where:{nickName:req.body.nickName}});
        if(User){
            res.send({code:400});
        }
        else{
            res.send({code:200});
        }
    }
    catch(err){
        next(err);
    }
});

module.exports = router;