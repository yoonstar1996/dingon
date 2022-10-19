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


router.post("/uploads",isLoggedIn,upload.array("files"),async(req,res)=>{
    try{
        const data = await Post.create({
            userId:req.user.id,
            content: req.body.content
        });
        for (let i=0 ; i<req.files.length;i++){
            let type='img';
            if(path.extname(req.files[i].path)=='.jpeg'||path.extname(req.files[i].path)=='.jpg'||path.extname(req.files[i].path)=='.png'||path.extname(req.files[i].path)=='.gif'){
                type='img';
            }
            else{
                type="video";
            }
            await Postmedia.create({
                postId: data.dataValues.id,
                src: '/'+req.files[i].path,
                type:type
            });
        }
    }
    catch(err){
        next(err);
    }
});




module.exports = router;