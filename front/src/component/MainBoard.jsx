import React from "react";
import "../css/MainBoard.css";
import { Link } from "react-router-dom"
const MainBoard = ({ title, className, data }) => {
  if (data) {
    var list = data.posts.map((value,i) => {
      return (
        <Link to={"/post/"+title+"/"+value.id} style={{ textDecoration: 'none'}}>
          <div style={{marginLeft:"10px",textAlign:"left",marginBottom:"0px"}} key={value.id} className="boxPost">
             <span style={{fontSize:"11px",color:"black"}}>닉네임:<span style={{fontWeight:"700"}}>{value.nickName}</span></span> <span style={{fontSize:"11px",color:"black"}}>제목:{value.title}</span>{value.createdAt}
          </div>
        </Link>

      );
    });
  }
  return (
    <>
      <div className={`mainBoardsBox ${className} `}>
        <Link to={"/gallery/" + title} style={{ textDecoration: 'none'}}>
          <div className="boardTitle"> {title}갤러리</div>
        </Link>
        {list}
      </div>
    </>
  );
};

export default MainBoard;