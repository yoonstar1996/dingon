const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const {v4:uuidv4} = require("uuid");
const {Post,User,Postmedia,Board} = require("../models");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, uuidv4() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024*1024*1024 },
});

router.post("/uploads",isLoggedIn,async(req,res,next)=>{
    try{
        const num=await Board.findOne({raw:true,where:{name:req.body.board}});
        const data = await Post.create({userId:req.user.id,boardId:num.id,title:req.body.title,content:req.body.content});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
router.post("/img",isLoggedIn,upload.single("files"),async(req,res,next)=>{
    try{
        console.log(req.file);
        res.send({code:200, url:"http://localhost:8050/"+req.file.path});
    }
    catch(err){
        next(err);
    }
});
router.get("/content",async(req,res,next)=>{
    try{
        //post:{content, clicked, createdAt,nickName, title,userId}}
        const num = await Post.findOne({where:{id:req.query.postId}});
        await Post.update({clicked:num.clicked+1},{where:{id:req.query.postId}});
        const query = `select posts.title, posts.content, posts.clicked, posts.createdAt, users.nickName, users.id as userId from posts inner join users on posts.userId=users.id where posts.id="${req.query.postId}"`;
        const data = await sequelize.query(query,QueryTypes.SELECT);
        res.send(data[0][0]);
    }
    catch(err){
        next(err);
    }
});
router.patch("/update",isLoggedIn,async(req,res,next)=>{
    try{
        const post = await Post.findOne({raw:true,where:{id:req.body.postId}});
        if(req.user&&post.userId!=req.user.id){
            return res.send({code:400});
        }
        const data = await Post.update({title:req.body.title,content:req.body.content},{where:{id:req.body.postId}});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
router.delete("/delete",isLoggedIn,async(req,res,next)=>{
    try{
        const post = await Post.findOne({raw:true,where:{id:req.query.postId}});
        if(req.user&&post.userId!=req.user.id){
            return res.send({code:400});
        }
        await Post.destroy({where:{id:req.query.postId}});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
module.exports = router;