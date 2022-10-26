import axios from "axios";
import "../css/Search.css";
import { useState } from "react";
import Input from "@mui/material/Input";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Search = () => {
  const [name, setText] = useState("");

  return (
    <>
      <div className="wrap">
        <div className="Search">
          <Link style={{ cursor: "pointer" }} to="/">
            <div className="logo">
              <img src="/img/logo2.png" />
            </div>
          </Link>
          <div className="searchengine">
            <form>
              <Input
                type="text"
                placeholder="검색"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setText(e.target.value);
                }}
              ></Input>
              <button
                onClick={() => {
                  axios({
                    url: "/search/board",
                    method: "get",
                    data: "name",
                  });
                }}
              >
                검색
              </button>
            </form>
          </div>
          <div className="logo2">
                <img src="/img/owl2.gif"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
