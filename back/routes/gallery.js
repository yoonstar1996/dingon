const express = require("express");
const router = express.Router();
const {Board} = require("../models");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../models");

router.get("/",async (req,res,next)=>{
    try{
        const data = await Board.findOne({raw:true,where:{name:decodeURI(req.query.name)}});
        if (!data){
            res.send({code:400})
        }
        else{
            const query = `select * from posts inner join boards on posts.boardId = boards.id where boards.name="${decodeURI(req.query.name)}" `;
            const data = await sequelize.query(query,{type:QueryTypes.SELECT});
            res.send({code:200,cnt:data.length});
        }
    }
    catch(err){
        next(err);
    }
    
});
router.get("/list",async(req,res,next)=>{
    try{
        const query = `select *,posts.id as postId from posts inner join boards on posts.boardId = boards.id inner join users on users.id = posts.userId where boards.name="${decodeURI(req.query.name)}" ORDER BY posts.createdAt DESC LIMIT 10 OFFSET ${(req.query.page-1)*10}`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        data.forEach(ele=>{
            let flag;
            flag = ele.content.search(/.*?<img.*?/g);
            console.log(ele.content);
            if (flag==-1){
                ele.img=false;
            }
            else{
                ele.img=true;
            }
        });
        res.send({code:200,list:data});
    }
    catch(err){
        next(err);
    }
});

router.get("/all",async(req,res)=>{
    try{
        const query = `select name from boards order by name`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        res.send({code:200,list:data});
    }
    catch(err){
        next(err);
    }
});

router.get("/check", isLoggedIn, async(req,res)=>{
    console.log("aaaaaa")
    try{
        const name = decodeURI(req.query.name);
        console.log("name:",name);
        const data = await Board.findAll({where:{name:name}});
        console.log(data);
        if(data.length==0){
            res.send({code:200});
        }
        else{
            res.send({code:400});
        }
    }
    catch(err){
        next(err);
    }
});

router.post("/add",isLoggedIn,async(req,res,next)=>{
    try{
        const name = req.body.name;
        const data = await Board.create({name:name});
        res.send({code:200});
    }
    catch(err){
        next(err);
    }
});
module.exports=router;