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
        const data = await Post.create({title:req.body.title,content:req.body.content});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
router.post("/img",isLoggedIn,upload.single("files"),async(req,res)=>{
    console.log("sdsds");
    try{
        const data = await Post.create({
            userId:req.user.id,
            content: req.body.content
        });
        console.log(req.file.path);
        res.send({code:200, url:"http://localhost:8050/"+req.file.path});
    }
    catch(err){
        next(err);
    }
});




module.exports = router;