import React from "react";
import "../css/MainBoard.css";
const MainBoard = ({ title, className, data }) => {
  if (data) {
    var list = data.posts.map((value) => {
      return (
        <div key={value.id} className="boxPost">
        작성자 : {value.nickName}ㅣ {value.title} {value.createdAt}
        </div>
      );
    });
  }
  return (
    <>
      <div className={`mainBoardsBox ${className} boardTitle`}>
        {title}  갤러리
        {list}
      </div>
    </>
  );
};

export default MainBoard;
