import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Mypage.css";

export default function Mypage(userId, setUserId, nickname) {
  const [list, setList] = useState([]);

  const listload = () => {
    axios({
      url: "http://localhost:8050/post/my",
      meethod: "get",
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className="mypage-wrapper">
        <div className="mypage-left">
          <div className="left-mypage">
            <Link to={"/mypage"}>
              <button>나의 게시글</button>
            </Link>
          </div>
          <div className="left-fix">
            <Link to={"/fix"}>
              <button>회원 정보 수정</button>
            </Link>
          </div>
        </div>
        <div className="mypage-right">
          <div className="right-title">
            <div>나의 게시글</div>
            <hr />
          </div>
          <div className="right-list">
            <div>~~~~~</div>
          </div>
        </div>
      </div>
    </>
  );
}
