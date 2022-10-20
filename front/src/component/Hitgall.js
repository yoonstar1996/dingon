import axios from "axios";
import React from "react";

export default function Hitgall() {
  axios({
    url: "http://localhost:8050/search/hit",
    method: "get",
  }).then((response) => {
    console.log(response.data);
  });
  return (
    <>
      <div>하이</div>
    </>
  );
}
