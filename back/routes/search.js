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

router.get("/hit",async(req,res,next)=>{
    try{
        const query = `select boards.name, COUNT(posts.id) as COUNT from boards inner join posts group by boards.name ORDER BY COUNT DESC LIMIT 10`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        res.send(data);
    }
    catch(err){
        next(err);
    }

});

module.exports = router;