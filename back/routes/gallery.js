const express = require("express");
const router = express.Router();
const {Board} = require("../models");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");

router.get("/",async (req,res,next)=>{
    try{
        const data = await Board.findOne({raw:true,where:{name:decodeURI(req.query.name)}});
        if (!data){
            res.send({code:400})
        }
        else{
            res.send({code:200,list:[]});
        }
    }
    catch(err){
        next(err);
    }
    
});

module.exports=router;