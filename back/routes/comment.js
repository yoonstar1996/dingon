const express = require("express");
const router = express.Router();
const {Board,Comment,SubComment, User} = require("../models");
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
            res.send({code:200,list:[]});
        }
    }
    catch(err){
        next(err);
    }
});
router.post("/",isLoggedIn,async(req,res,next)=>{
    try{
        await Comment.create({content:req.body.comment,userId:req.user.id,postId:req.body.postId});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
router.post("/sub",isLoggedIn,async(req,res,next)=>{
    try{
        await SubComment.create({content:req.body.comment, userId:req.user.id, postId:req.body.postId,commentId:req.body.commentId});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
router.delete("/",isLoggedIn,async(req,res,next)=>{
    try{
        const data = await Comment.findAll({where:{userId:req.user.id, id:req.query.commentId }});
        if (data.length==0){
            res.send({code:400});
        }
        else{
            await Comment.destroy({where:{id:req.query.commentId}});
            res.send({code:200});
        }
    }
    catch(err){
        next(err);
    }
});
router.delete("/sub",isLoggedIn,async(req,res,next)=>{
    try{
        const data = await SubComment.findAll({where:{userId:req.user.id, id:req.query.commentId}});
        if(data.length==0){
            res.send({code:400 });
        }
        else{
            await SubComment.destroy({where:{id:req.query.commentId}});
            res.send({code:200});
        }
    }
    catch(err){
        next(err);
    }
});









module.exports = router;