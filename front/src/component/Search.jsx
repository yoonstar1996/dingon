import axios from "axios";
import "../css/Search.css";
import { useState } from "react";
const Search = () => {
  const [name, setText] = useState("");
  return (
    <>
      <div className="wrap">
        <div className="Search">
          <div className="logo">여기는 로고</div>
          <div className="searchengine">
            <form>
              <input
                type="text"
                placeholder="검색"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setText(e.target.value);
                }}
              ></input>
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
        </div>
      </div>
    </>
  );
};

export default Search;
