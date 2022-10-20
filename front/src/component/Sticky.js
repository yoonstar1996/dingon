import React, { useState, useEffect } from "react";
import AssignModal from "./AssignModal";
import Hitgall from "./Hitgall";
import Loginbox from "./Loginbox";
import IsLogined from "./IsLogined";
import "../css/Sticky.css";
import "../css/IsLogined.css";

export default function Sticky({ isLogin, setIsLogin, nickname, setNickname }) {
  const [onAssign, setOnAssign] = useState(false);

  let [hit, setHit] = useState([]);
  // useEffect(() => {
  //   axios.get("/search/hit").then((response) => {
  //     setHit(response.data);
  //   });
  // }, []);
  console.log(onAssign);
  return (
    <>
      {onAssign ? <AssignModal senddata={setOnAssign} /> : <></>}
      <div className="content-right">
        {isLogin ? (
          <IsLogined
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            nickname={nickname}
          />
        ) : (
          <Loginbox
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            setNickname={setNickname}
          />
        )}
        <div className="hitgall">
          <div className="refresh">
            <div>실시간 힛갤</div>
            <button>새로고침</button>
          </div>
          <Hitgall />
        </div>
      </div>
    </>
  );
}
