import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Loginbox({
  setOnAssign,
  isLogin,
  setIsLogin,
  setNickname,
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
    }).then((response) => {
      if (response.data.code === 200) {
        alert("성공");
        setIsLogin(true);
        setNickname(response.data.user.nickName);
      } else {
        alert("로그인 실패~");
      }
    });
  }
  return (
    <>
      <div className="loginbox">
        <form className="formbox">
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
            onChange={(e) => {
              setPw(e.target.value);
            }}
            name="pw"
            id="pw"
            className="pwInput"
            placeholder="PW"
          ></input>
        </form>
        <div>
          <button onClick={login} className="loginBtn">
            로그인
          </button>
        </div>
        <div>
          <button
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
