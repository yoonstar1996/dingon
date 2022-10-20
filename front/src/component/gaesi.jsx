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
              <p>
                수정 삭제 하기
                <br></br>
                음란물, 차별 ,비하, 혐오 및 초상권 침해 게시물은 민, 형사상의
                책임을 질 수 있습니다.
              </p>
              <hr></hr>

              <label for="text">제목</label>
              <input type="text" placeholder="제목" name="title"></input>
              <br></br>
              <div className="content_btn">
                <button></button>
                <button></button>
              </div>
              <label>글쓰기</label>
              <input
                type="text"
                placeholder="내용"
                name="content"
                id="content"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Gaesi;
