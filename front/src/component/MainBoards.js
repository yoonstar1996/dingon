import React, { useState, useEffect } from "react";
import MainBoard from "./MainBoard";
import "../css/MainBoards.css";
import axios from "axios";

const MainBoards = () => {
  // const [nick, setNick] = useState("");
  // const [name, setName] = useState(""); //board name
  // const [createdat, setCreatedat] = useState("");
  // const [clicked, setClicked] = useState("");

  let [hot, setHot] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8050/search/top4").then((response) => {
      // console.log(response.data);
      setHot(response.data.list);
      
    });
  }, []);

  return (
    <>
    <div className="MainBoardsDiv" style={{position: "relative", height: "620px"}}>
      <MainBoard
        className="box1"
        title="핫게시판 : "
        data={hot.length !== 0 && hot[0]}
      ></MainBoard>
      {/* 여기서 사용한 className 은 클래스명 준 것 아님.. */}
      <MainBoard
        className="box2"
        title="핫게시판 : "
        data={hot.length !== 0 && hot[1]}
      ></MainBoard>
      <MainBoard
        className="box3"
        title="핫게시판 : "
        data={hot.length !== 0 && hot[2]}
      ></MainBoard>
      <MainBoard
        className="box4"
        title="핫게시판 : "
        data={hot.length !== 0 && hot[3]}
      ></MainBoard>
    </div>
    </>
  );
};
export default MainBoards;
