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
  return (
    <>
      <div className="wrap">
        <div className="content">
          <div className="title_head">
            <h2>작성글 수정</h2>
          </div>
          <div className="warning">
            <ErrorOutlineIcon></ErrorOutlineIcon>
            {"음란물 배포 및, 혐오스런 내용을 담으면 7일간 갤질 못한다"}
          </div>
          <div className="warning">
            <ErrorOutlineIcon></ErrorOutlineIcon>
            {"일단 수정할거면 개추"}
          </div>
          <hr></hr>
          <div className="title">
            <TextField
              fullWidth
              type="text"
              placeholder="제목 수정"
              onChange={Settitle}
            ></TextField>
          </div>
          <div className="main_content">
            <label>게시글</label>
            <ReactQuill
              placeholder="게시글 수정"
              theme="snow"
              style={{ height: "450px", overflow: "scroll" }}
              onChange={Setcontent}
              value={content}
            ></ReactQuill>
          </div>
        </div>
        <div className="modify_btn">
          <button id="delete">삭제</button>
          <button id="modify">수정</button>
        </div>
      </div>
    </>
  );
};
export default Gaesi;
