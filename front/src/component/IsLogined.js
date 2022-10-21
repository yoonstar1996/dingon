import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export default function IsLogined({ isLogin, setIsLogin, nickname }) {
  const logout = () => {
    axios({
      url: "http://localhost:8050/auth/logout",
      method: "post",withCredentials: true 
    }).then((response) => {
      console.log(response.data);
      if (response.data) {
        alert("로그아웃~");
        setIsLogin(false);
      } else {
        alert("로그아웃 실패~");
      }
    });
  };
  return (
    <>
      <div className="loginedbox">
        <div className="user-info">
          <span>{nickname}님 안녕하세요</span>
          <button onClick={logout}>로그아웃</button>
        </div>
        <button>글작성</button>
      </div>
    </>
  );
}
