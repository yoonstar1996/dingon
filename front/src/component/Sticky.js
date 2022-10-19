import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AssignModal from "./AssignModal";
import Hitgall from "./Hitgall";

export default function Sticky({check}) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [onAssign,setOnAssign]=useState(false);
  
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
      console.log(response.data);
      if (response.data.code===200) {
        alert("성공")
        check(true)
        // window.location.href = "/";
      } else {
        alert("로그인 실패~");
      }
    });
  }

  

  let [hit, setHit] = useState([]);
  // useEffect(() => {
  //   axios.get("/search/hit").then((response) => {
  //     setHit(response.data);
  //   });
  // }, []);
  console.log(onAssign);
  return (
    <>
      {onAssign ? <AssignModal senddata={setOnAssign}/>:<></>}
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
            <button onClick={()=>{
              setOnAssign(true)
            }}>회원가입</button>
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
