import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Allgall.css";

export default function Allgall() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8050/gallery/all",
      method: "get",
    }).then((response) => {
      console.log(response.data.list);
      setAll(response.data.list);
    });
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="top-div">
          <div className="allSelect">갤러리 전체보기</div>
          <div className="namesort">ㄱㄴㄷ순</div>
        </div>
        <div className="mid-div">
          {all.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}
