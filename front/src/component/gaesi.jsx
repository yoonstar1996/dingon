import "../css/Gaesi.css";
import { useState, useRef, useMemo } from "react";
import React from "react";
import { TextField } from "@mui/material";
import { TextareaAutosizeProps } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useParams } from "react-router-dom";
const Gaesi = () => {
  const [title, Settitle] = useState(""); // 콘텐츠 타이틀
  const [content, Setcontent] = useState(""); // 콘텐츠 저장하기
  const quillRef = useRef();
  console.log(title);
  console.log(content);
  const ImageHandler = () => {
    console.log("이미지 버튼 클릭시 이게 실행이 된다");

    const modify_input = document.createElement("input");
    // 이거는 이미지 저장하는 DOM 만들기
    modify_input.setAttribute("type", "file");
    //이거는 type 속성 만들어 주기
    modify_input.setAttribute("accept", "image/*");
    //얘는 속성 이미지라고 선언 해주기
    modify_input.click();
    //click 하면 위에서 만든 버튼 click 함
  };
  return (
    <>
      <div className="wrap">
        <div className="content">
          <button id="delete">삭제</button>
          <button id="modify">수정</button>
        </div>
      </div>
    </>
  );
};
export default Gaesi;
