import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Allgall.css";
import { Link, useParams } from "react-router-dom";
export default function Allgall() {
  const [all, setAll] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios({
      url: "http://localhost:8050/gallery/all",
      method: "get",
    }).then((response) => {
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
            <Link key={item.name} to={`/gallery/${item.name}`}>
              <div>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
