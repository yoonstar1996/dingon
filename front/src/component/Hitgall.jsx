import axios from "axios";
import React, { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link, useParams } from "react-router-dom";

export default function Hitgall() {
  const [hit, setHit] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios({
      url: "http://localhost:8050/search/hit",
      method: "get",
    }).then((response) => {
      console.log(response.data);
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
              setHit(response.data.list);
            });
          }}
        >
          <RefreshIcon />
        </button>
      </div>
      <hr />
      <ol className="HitList">
        {hit.map((item) => (
          <Link key={item.name} to={`/gallery/${item.name}`}>
            <li>{item.name}</li>
          </Link>
        ))}
      </ol>
    </>
  );
}
