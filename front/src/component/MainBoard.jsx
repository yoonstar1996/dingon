import React from "react";
import "../css/MainBoard.css";
import { Link } from "react-router-dom"
const MainBoard = ({ title, className, data }) => {
  if (data) {
    var list = data.posts.map((value) => {
      return (
        <Link to={"/post/"+title+"/"+value.id} style={{ textDecoration: 'none'}}>
          <div key={value.id} className="boxPost">
            작성자 : {value.nickName}ㅣ {value.title} {value.createdAt}
          </div>
        </Link>

      );
    });
  }
  return (
    <>
      <div className={`mainBoardsBox ${className} `}>
        <Link to={"/gallery/" + title} style={{ textDecoration: 'none'}}>
          <div className="boardTitle"> {title} 갤러리</div>
        </Link>
        {list}
      </div>
    </>
  );
};

export default MainBoard;