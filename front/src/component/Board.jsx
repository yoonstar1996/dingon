import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
export const Board = (props) => {
  const { name } = useParams();
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios.get(
      `http://localhost:8050/gallery?name=${encodeURIComponent(name)}`
    ).then((data) => {
      if (data.data.code == 400) {
        setErr(true);
      } else {
        setTotal(data.data.cnt);
      }
    });
  }, [name]);
  useEffect(() => {
    if (err == false && total != 0) {
      axios
        .get(
          `http://localhost:8050/gallery/list?page=${page}&name=${encodeURI(
            name
          )}`
        )
        .then((data) => {
          setList(data.data.list);
          console.log(data.data.list);
        });
    }
    if (total == 0) {
      setList([]);
    }
  }, [page, total]);
  return (
    <>
      {!err ? (
        <div style={{ width: "100%" }} className="boardBox">
          <h1 style={{ textAlign: "center" }}>
            {name} 갤러리에 오신 것을 환영합니다
          </h1>
          {props.isLogin ? <Link to={"/postmade/" + name}><span>글작성</span></Link> : null}
          {total == 0 ? (
            <div style={{ backgroundColor: "white", textAlign: "center" }}>
              게시글이 없어요! 게시글을 추가해 보세요
            </div>
          ) : (
            ""
          )}
          {list.length !== 0 &&
            list.map((v) => {
              return (
                <Link to={"/postmade/"+name+"/"+ v.id}>
                  <div>
                    제목:{v.title} 조회수:{v.clicked} 생성일:{v.createdAt}{" "}
                  </div>
                </Link>
              );
            })}
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
      ) : (
        <div
          style={{ height: "100%", width: "100%", textAlign: "center" }}
          className="errorBox"
        >
          {" "}
          <h1 style={{ textAlign: "center" }}>게이야 그런 건 없다... </h1>
        </div>
      )}
    </>
  );
};
