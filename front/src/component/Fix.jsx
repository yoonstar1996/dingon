import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Fix.css";

export default function Fix({ userId }) {
  const [nickChange, setNickChange] = useState("");
  const [pwChange, setPwChange] = useState("");
  const [length, setLength] = useState(true);
  const [fixBtnAble, setFixBtnAble] =useState(false);
  function fixBtn() {
    var data = {
      nickName: nickChange,
      password: pwChange,
    };
    if (nickChange === "") {
      alert("닉네임을 입력하세용");
      return;
    } else if (nickChange.length <= 10) {
      console.log("10자 이하");
    } else if (nickChange.length > 10) {
      return;
    }
    if (pwChange === "") {
      alert("비밀번호를 입력하세용");
      return;
    } else if (pwChange.length < 8) {
      console.log("8자 이하");
    } else if (pwChange.length > 8) {
      return;
    }

    axios({
      url: "http://localhost:8050/profile",
      method: "patch",
      data: data,
      withCredentials: true,
    }).then((response) => {
      console.log("수정완료", response.data);
      window.location.replace("/");
    });
  }

  const nickConfirm = ()=>{
    if(nickChange === ""){
      alert("내용을 입력해주세요.");
      return false;
    }
    axios({
      url: "http://localhost:8050/auth/nickNameCheck",
      method: "post",
      withCredentials: true,
      data : {nickName: nickChange }
    }).then((result)=>{
      console.log(result.data);
      console.log("code", result.data.code);
      if(result.data.code === 400){
        alert("이미 존재하는 닉네임입니다.")
        setFixBtnAble(false);
      }
      else if(result.data.code === 500){
        alert("서버상 문제가 발생했습니다.")
        setFixBtnAble(false);
      }
      else {
        alert("사용 가능한 닉네임입니다.")
        setFixBtnAble(true);
      }
    })
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
                  maxLength={10}
                  type="text"
                  placeholder="10자 이하로 입력"
                  id="nickname"
                  className="fixnick"
                  name="nickname"
                  value={nickChange}
                  onChange={(e) => {
                    setNickChange(e.target.value);
                    if (e.target.value.length < 10) {
                      setLength(true);
                    } else {
                      setLength(false);
                    }
                  }
                  
                }
                ></input>

                <button 
                  className="nickConfirm"
                  onClick={nickConfirm} 
                  type="button" 
                >중복확인</button>

                <div className={length ? "d-none" : "color"}>
                  10자 이하로 입력
                </div>
                <br />

                <label htmlFor="password" className="label password">
                  비밀번호 :
                </label>
                <input
                  type="password"
                  placeholder="변경 할 비밀번호"
                  id="password"
                  className="fixpw"
                  name="password"
                  value={pwChange}
                  onChange={(e) => {
                    setPwChange(e.target.value);
                  }}
                ></input>
              </form>
            </div>
            <hr />
            <div className="right-button">
              <button 
              onClick={fixBtn} className="fixBtn"
              disabled={!fixBtnAble}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
