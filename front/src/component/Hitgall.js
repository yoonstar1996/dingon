import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Hitgall() {
  const [hit, setHit] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8050/search/hit",
      method: "get",
    }).then((response) => {
      console.log(response.data.list);
      console.log(hit);
      setHit(response.data.list);
    });
  }, []);

  return (
    <>
      <div className="refresh">
        <div>실시간 힛갤</div>
        <button
          onClick={() => {
            axios({
              url: "http://localhost:8050/search/hit",
              method: "get",
            }).then((response) => {
              console.log(response.data.list);
              setHit(response.data.list);
            });
          }}
        >
          새로고침
        </button>
      </div>
      {hit.map((result) => {
        <div>{result}</div>;
      })}
    </>
  );
}
