import "../css/Gaesi.css";
import { useState } from "react";
import React from "react";
const Gaesi = () => {
  return (
    <>
      <div className="wrap">
        <div className="content">
          <div>
            <h2>
              <a href="/">Dingon</a>
            </h2>
            <hr></hr>
          </div>
          <div className="input_from">
            <div className="input">
              <input type="text" placeholder="제목" name="title"></input>
              <br></br>
              <input
                type="password"
                placeholder="비밀번호"
                name="password"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Gaesi;
