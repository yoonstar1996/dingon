import React from "react"
import  Button  from "@mui/material/Button"
import StarIcon from "@mui/icons-material/Star";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from "axios"
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function GoodBtn(){
  const [like, setLike] = useState(0);
  const [dislike ,setDislike] =useState(0);
  const {postid} = useParams();
    return (
      <>
        <Button
          style={{
            borderRadius: "200px",
            width: "100px",
            paddingLeft: "25px",
            backgroundColor: "#4545AC",
            padding:"5px",
            margin:"10px"
          }}
          id="GoodBtn"
          variant="contained"
          startIcon={
            <StarIcon
              style={{ fontSize: "25px" }}
              id="Icon"
              variant="contained"
            ></StarIcon>
          }
          onClick={() => {
            setLike(like +1)
            document.getElementById("Icon").style.color = "yellow";
            axios({
              url: "/post/like",
              method: "post",
              withCredentials: true,

            }).then((response)=>{
              console.log(response.data)
            });
          }}
        >개추 {like}</Button>
        <Button 
        variant="outlined"
        color="error"
        style={{margin:"10px"}}
        startIcon={<ThumbDownIcon></ThumbDownIcon>}
        onClick={()=>{
          setDislike(dislike +1)
          axios({
            url: "/post/dislike",
            method: "post",
            withCredentials: true,
          }).then((response)=>{
            console.log(response.data)
          });
        }}
        >비추 {dislike}</Button>
      </>
    );
}