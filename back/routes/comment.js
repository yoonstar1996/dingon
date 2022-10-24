const express = require("express");
const router = express.Router();
const {Board} = require("../models");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");
router.get("/list",async(req,res,next)=>{
    try{
        const query = `select  comments.id ,users.id as userId, comments.content, comments.createdAt, users.nickName from comments inner join posts on posts.id = comments.postId inner join users on users.id = comments.userId where posts.id="${req.query.postId}" ORDER BY posts.createdAt DESC LIMIT 10 OFFSET ${(req.query.page-1)*20}`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        res.send({code:200,list:data});
    }
    catch(err){
        next(err);
    }
});
router.get("/sublist",async(req,res,next)=>{
    try{
        const query = `select users.id as userId, subcomments.content, subcomments.createdAt, subcomments.id, users.nickName from subcomments inner join users on users.id=subcomments.userId  where subcomments.commentId = "${req.query.commentId}" order by subcomments.createdAt DESC  `;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        if(data.length>=1){
            res.send({code:200,list:data});
        }
        else{
            res.send({code:400});
        }
    }
    catch(err){
        next(err);
    }
});










module.exports = router;