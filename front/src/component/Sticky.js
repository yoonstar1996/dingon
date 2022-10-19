import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hitgall from "./Hitgall";

export default function Sticky() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  function login() {
    var data = {
      id: setId,
      pw: setPw,
    };

    axios({
      url: "/auth/login",
      method: "post",
      data: data,
    }).then((response) => {
      if (response.data.success) {
        window.location.href = "/";
      } else {
        alert("로그인 실패~");
      }
    });
  }

  function signuplink() {
    window.location.href = "/asign";
  }

  let [hit, setHit] = useState([]);
  useEffect(() => {
    axios.get("/search/hit").then((response) => {
      setHit(response.data);
    });
  }, []);

  return (
    <>
      <div className="content-right">
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
              type="text"
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
            <button onClick={signuplink}>회원가입</button>
          </div>
        </div>
        <div className="hitgall">
          <div className="refresh">
            <div>실시간 힛갤</div>
            <button>새로고침</button>
          </div>
          <Hitgall hits={hit} />
        </div>
      </div>
    </>
  );
}
