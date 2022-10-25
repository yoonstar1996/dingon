import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Show.css";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import axios from "axios";
import Button from "@mui/material/Button";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Hidden } from "@mui/material";
const Show = ({ isLogin }) => {
  const PaginationBox = styled.div`
    a:link {
      color: black;
    }
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
      color: #4545ac;
      font-size: 1rem;
    }
    ul.pagination li.active a {
      color: white;
    }
    ul.pagination li.active {
      background-color: #4545ac;
    }
    ul.pagination li a:hover,
    ul.pagination li a.active {
      color: white;
    }
  `;
  const { name, id } = useParams();
  const [cont, setCont] = useState("");
  const content = useRef();

  const [userId, setUserId] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState([
    { name: "병신을보면 짖는개", comment: "wdewedwewef" },
    { name: "재매이햄", comment: "wefwefwfewfe" },
  ]);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios({
      url: "http://localhost:8050/post/content",
      method: "get",
      params: { postId: id },
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      console.log(response.data.postId);
      setUserId(response.data.userId);
      let date = new Date(response.data.createdAt);
      let sendDate =
        date.getFullYear() +
        "." +
        (parseInt(date.getMonth()) + 1) +
        "." +
        date.getDate() +
        " ";
      if (date.getHours() < 12) {
        sendDate += date.getHours() + ":";
      } else {
        sendDate += parseInt(date.getHours()) - 12 + ":";
      }
      sendDate += +date.getMinutes();
      setTime(sendDate);
      setCont(response.data);

      let new_div = document.createElement("div");
      new_div.innerHTML = response.data.content;

      content.current.innerHTML = response.data.content;
      let userNickname = response.data.userId;
      content.current.innerHTML += `<input
              value=${userNickname}
            ></input>`;
    });
  }, []);
  useEffect(() => {
    setPage(1);
    axios({
      url: "http://localhost:8050/comment/list",
      method: "get",
      params: { page: page, postId: id },
      withCredentials: true,
    }).then((response) => {
      console.log("댓글정보", response.data);
      setComment(response.data.list);
    });
  }, [page]);
  return (
    <>
      <div className="wrap">
        <div className="content">
          <div className="headBar">
            <h1 className="t">
              <Link style={{ textDecoration: "none" }} to={"/gallery/" + name}>
                {name} 갤러리
              </Link>
            </h1>
            <div className="fixButton">
              {isLogin === userId ? (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/gallery/made/" + id}
                >
                  <Button style={{ background: "#4545AC" }} variant="contained">
                    수정
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="headInfo">
            <div className="contentTitle">
              <div>
                <h4 style={{ marginTop: 0, marginBottom: "10px" }}>
                  {cont.title}
                </h4>
              </div>
              <div className="info">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <VisibilityIcon />
                  <div>{cont.clicked}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <SentimentVerySatisfiedIcon />
                  <div>200</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <InsertCommentIcon />
                  <div>{cont.commentCount}</div>
                </div>
              </div>
            </div>
          </div>
          <div ref={content} className="get_content"></div>
          <div>전체 댓글 {cont.commentCount}개</div>
          <div className="comment">
            {comment.map((value, key) => {
              return (
                <>
                  <div
                    style={{
                      fontSize: "small",
                      padding: "2px",
                      paddingRight: 0,
                      paddingLeft: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "30%" }}>{value.name}</div>
                    <div
                      style={{
                        width: "60%",
                        overflow: "hidden",
                        wordBreak: "break-all",
                      }}
                    >
                      {value.comment}
                    </div>
                    <div style={{ width: "10%", display: "flex" }}>
                      {isLogin ? (
                        <ButtonGroup size="small">
                          <Button variant="text">수정</Button>
                          <Button variant="text">삭제</Button>
                        </ButtonGroup>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <hr style={{ backgroundColor: "#e2e2e2" }} />
                </>
              );
            })}
          </div>
        </div>
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
    </>
  );
};

export default Show;
