import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
export default function Loginbox({
  setOnAssign,
  isLogin,
  setIsLogin,
  setNickname,
  userId,
  setUserId,
}) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  //const [onAssign, setOnAssign] = useState(false);

  function login() {
    var data = {
      email: id,
      password: pw,
    };

    axios({
      url: "http://localhost:8050/auth/login",
      method: "post",
      data: data,
      withCredentials: true,
    }).then((response) => {
      if (response.data.code === 200) {
        alert("성공");
        setUserId(response.data.user.email);
        setNickname(response.data.user.nickName);
        setIsLogin(response.data.user.userId);
      } else {
        alert("로그인 실패~");
      }
    });
  }

  return (
    <>
      <div className="loginbox">
        <form className="formbox">
          <div className="inputbox">
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              name="id"
              id="id"
              className="idInput"
              placeholder="ID"
            ></input>
            <input
              type="password"
              value={pw}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
              onChange={(e) => {
                setPw(e.target.value);
              }}
              name="pw"
              id="pw"
              className="pwInput"
              placeholder="Password"
            ></input>
          </div>
          <Button variant="contained">로그인</Button>
        </form>
        <div className="btnBox">
          <button onClick={login} className="loginBtn">
            로그인
          </button>
          <button
            className="signupBtn"
            onClick={() => {
              setOnAssign(true);
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}
