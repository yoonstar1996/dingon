import React from "react";
import "../css/MainBoard.css";
import { Link } from "react-router-dom"
const MainBoard = ({ title, className, data }) => {
  if (data) {
    var list = data.posts.map((value,i) => {
      let date = new Date(value.createdAt);
      let sendDate = new String(date.getFullYear()).substr(2,2)+'년'+(parseInt(date.getMonth())+1)+'월'+date.getDate()+"일";         
        if(date.getHours()<12){
            sendDate+="오전"+date.getHours()+"시";
        }
        else{
            sendDate+='오후'+(parseInt(date.getHours())-12)+"시";
        }
        sendDate+=+date.getMinutes()+"분";
      return (
        <Link to={"/post/"+title+"/"+value.id} style={{ textDecoration: 'none'}}>
          <div style={{display:"flex", alignItems:"space-between",marginLeft:"10px",textAlign:"left",marginBottom:"5px"}} key={value.id} className="boxPost">
             <div style={{fontSize:"11px",color:"black"}}>닉네임:<span style={{fontWeight:"700"}}>{value.nickName}</span></div> <div style={{fontSize:"11px",color:"black"}}>제목:<span  style={{fontWeight:"700"}}>   {value.title}</span></div><div style={{fontSize:"11px",color:"black"}}>조회수: <div style={{fontWeight:"700"}}>{value.clicked}</div></div>  <div style={{fontSize:"11px",color:"black"}}> 작성일:<div style={{fontWeight:"700"}}>{sendDate}    </div></div>
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