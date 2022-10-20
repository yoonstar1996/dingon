import axios from "axios";
import React from "react";
import "../css/Allgall.css";

export default function Allgall() {
  axios({
    url: "http://localhost:8050/",
    method: "get",
  }).then((response) => {
    console.log(response.data);
  });
  return (
    <>
      <div className="wrapper">
        <div className="top-div">
          <div className="allSelect">갤러리 전체보기</div>
          <div className="namesort">ㄱㄴㄷ순</div>
        </div>
        <div className="mid-div">
          <div>~~갤러리</div>
        </div>
      </div>
    </>
  );
}
