import React from "react";
import "../css/MainBoard.css";
const MainBoard = ({ title, className, data }) => {
  if (data) {
    var list = data.posts.map((value) => {
      return (
        <div key={value.id} className="boxPost">
         작성자 : {value.nickName} {value.title} {value.createdAt}
          <hr></hr>
        </div>
        // 작성자 : {value.nickName}
      );
    });
  }
  return (
    <>
      <div className={`mainBoardsBox ${className} `}>
        <div className="boardTitle">  {data.name} 갤러리</div>

        {list}
      </div>
    </>
  );
};

export default MainBoard;