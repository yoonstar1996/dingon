import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Fix.css";

export default function Fix({ userId }) {
  const [nickChange, setNickChange] = useState("");
  const [pwChange, setPwChange] = useState("");

  function fixBtn() {
    var data = {
      nickName: nickChange,
      password: pwChange,
    };

    axios({
      url: "http://localhost:8050/profile",
      method: "patch",
      data: data,
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <div className="mypage-wrapper">
        <div className="mypage-left">
          <div>
            <Link to={"/mypage"}>
              <button className="left-mypage">나의 게시글</button>
            </Link>
          </div>
          <div>
            <Link to={"/fix"}>
              <button className="left-fix">회원 정보 수정</button>
            </Link>
          </div>
        </div>
        <div className="mypage-right">
          <div className="right-title">
            <div className="my-fix">회원 정보 수정</div>
            <hr />
          </div>
          <div className="right-list">
            <div className="fix-input">
              <form className="fix-form">
                <label htmlFor="id" className="label id">
                  아이디 :
                </label>
                <input
                  disabled
                  type="text"
                  id="id"
                  className="fixid"
                  name="id"
                  value={userId}
                ></input>
                <br />

                <label htmlFor="nickname" className="label nick">
                  닉네임 :
                </label>
                <input
                  type="text"
                  placeholder="10자 이하로 입력"
                  id="nickname"
                  className="fixnick"
                  name="nickname"
                  value={nickChange}
                  onChange={(e) => {
                    setNickChange(e.target.value);
                    console.log(nickChange);
                    if (nickChange == 12345) {
                      console.log("확인");
                    }
                  }}
                ></input>
                <div className="validnick d-none colors">10자 이하로 입력</div>
                <br />

                <label htmlFor="password" className="label password">
                  비밀번호 :
                </label>
                <input
                  type="password"
                  id="password"
                  className="fixpw"
                  name="password"
                  value={pwChange}
                  onChange={(e) => {
                    setPwChange(e.target.value);
                    console.log(pwChange);
                  }}
                ></input>
              </form>
            </div>
            <hr />
            <div className="right-button">
              <button onClick={fixBtn} className="fixBtn">
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
