const express = require("express");
const router = express.Router();
const {Board} = require("../models");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

router.get("/board",async(req,res,next)=>{
    const info = req.query.name;
    try{
        const query = `select name from boards where name "${info}%"`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        res.send({code:200,list:data});
    }
    catch(err){
        next(err);
    }

});