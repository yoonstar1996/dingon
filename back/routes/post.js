const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const {v4:uuidv4} = require("uuid");
const {Post,User,Postmedia,Board} = require("../models");
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
    console.log("sdsds");
    try{
        console.log(req.file);
        res.send({code:200, url:"http://localhost:8050/"+req.file.path});
    }
    catch(err){
        next(err);
    }
});




module.exports = router;