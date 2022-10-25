import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function IsLogined({ setIsLogin, nickname, userId }) {
  const logout = () => {
    axios({
      url: "http://localhost:8050/auth/logout",
      method: "post",
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      if (response.data) {
        alert("로그아웃~");
        setIsLogin(false);
        window.location = "/";
      } else {
        alert("로그아웃 실패~");
      }
    });
  };
  console.log(userId);

  return (
    <>
      <div className="loginedbox">
        <div className="user-info">
          <span>{nickname}님 안녕하세요</span>
          <button onClick={logout}>로그아웃</button>
        </div>
        <Link to={"/mypage"}>
          <button>마이 페이지</button>
        </Link>
        <Link to={"/create"}>
          <button>갤러리 생성</button>
        </Link>
      </div>
    </>
  );
}
