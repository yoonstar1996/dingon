import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Allgall.css";
import { Link } from "react-router-dom";
export default function Allgall() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8050/gallery/all",
      method: "get",
    }).then(response => {
      setAll(response.data.list);
    });
  }, []);


    return (
      <>
      <div className="wrapper">
        <div className="top-div">
          <div className="allSelect">갤러리 전체보기</div>
          {/* <div className="namesort">ㄱㄴㄷ순</div> */}
        </div>
        <div className="mid-div">
          {all.map(item => (
            <div key={item.name}>
              <Link to={`/gallery/${item.name}`}>
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
