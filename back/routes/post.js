const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const {v4:uuidv4} = require("uuid");
const {Post,User,Postmedia} = require("../models");
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
        const data = await Post.create({boardId:1,title:req.body.title,content:req.body.content});
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