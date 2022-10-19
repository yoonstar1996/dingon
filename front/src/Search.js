import axios from "axios";
import "./Search.css";
import { userState } from "react";
const Search = () => {
  //   const [text, setText] = userState("");
  return (
    <>
      <div className="wrap">
        <div className="Search">
          <div className="logo">
            <div className="icon">여기는 로고</div>
            <div className="gaesipan">여기는 전체 게시판</div>
          </div>
          <div className="Searchengine">
            <div className="Searchinput">
              <input
                type="text"
                placeholder="검색"
                onChange={(e) => {
                  console.log(e.target.value);
                  //   setText(e.target.value);
                }}
              ></input>
            </div>
            <div className="Searchbtn">
              <button
                type="button"
                onClick={() => {
                  //   console.log(textvalue);
                }}
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
