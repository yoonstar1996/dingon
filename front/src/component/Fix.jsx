import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Fix.css";

export default function Fix({ userId }) {
  const [idInput, setIdInput] = useState(userId);
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
            <div>회원 정보 수정</div>
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
                  name="id"
                  value={idInput}
                ></input>
                <br />

                <label htmlFor="nickname" className="label nick">
                  닉네임 :
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={nickChange}
                  onChange={(e) => {
                    setNickChange(e.target.value);
                  }}
                ></input>
                <br />

                <label htmlFor="password" className="label">
                  비밀번호 :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={pwChange}
                  onChange={(e) => {
                    setPwChange(e.target.value);
                  }}
                ></input>
                <br />
              </form>
            </div>
            <hr />
            <div className="right-button">
              <button onClick={fixBtn}>수정하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
