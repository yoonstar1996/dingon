const express = require("express");
const router = express.Router();
const {Board, User} = require("../models");
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
        const query = `select boards.name, COUNT(posts.id) as COUNT from boards inner join posts on posts.boardId=boards.id group by boards.name ORDER BY COUNT DESC LIMIT 10`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        res.send({code:200,list:data});
    }
    catch(err){
        next(err);
    }

});
router.get("/top4",async(req,res,next)=>{
    try{
        const query = `select boards.name,boards.id, COUNT(posts.id) as COUNT from boards inner join posts on posts.boardId=boards.id group by boards.name ORDER BY COUNT DESC LIMIT 4`;
        const data = await sequelize.query(query,{type:QueryTypes.SELECT});
        // console.log("실행")
        for (let i=0; i< data.length; i++){
            const query2 = `select posts.createdAt, posts.userId, posts.clicked, posts.title, posts.id from posts where boardId ="${data[i].id} LIMIT 10"`;
            const data2 = await sequelize.query(query2,{type:QueryTypes.SELECT});
            data2.sort((a,b)=>{
                return b.createdAt-a.createdAt;
            });
            console.log(data2);
            for (let j=0 ;j <data2.length; j++){
                const temp = await User.findOne({where:{id:data2[j].userId}});
                data2[j].nickName = temp.nickName;
                const query = `select count(*) as count from comments where postId="${data2[j].id}"`;
                const response = await sequelize.query(query,{type:QueryTypes.SELECT});
                const query2 = `select count(*) as count from subcomments where postId="${data2[j].id}"`;
                const response2 = await sequelize.query(query2,{type:QueryTypes.SELECT});
                data2[j].commentCount = response[0].count + response2[0].count;
            }
            data[i].posts=[];
            for (let j=0 ; j<data2.length;j++){
                data[i].posts.push(data2[j]);
            }
        }
        console.log(data);
        res.send({list:data,code:200});

    }
    catch(err){
        next(err);
    }
});

module.exports = router;