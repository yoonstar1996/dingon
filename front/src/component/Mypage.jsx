import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../css/Mypage.css";

export default function Mypage(userId, setUserId, nickname) {
  useEffect(() => {
    axios({
      url: "http://localhost:8050/post/my",
      method: "get",
      withCredentials: true,
    }).then((data) => {
      setList(data.data.list);
      console.log(data.data.list);
    });
  }, []);

  const columns = [
    { id: "number", label: "번호", minWidth: 40 },
    { id: "title", label: "제목", minWidth: 200 },
    {
      id: "time",
      label: "작성일",
      minWidth: 100,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "clicked",
      label: "조회수",
      minWidth: 50,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "like",
      label: "추천",
      minWidth: 30,
      align: "center",
      format: (value) => value.toFixed(2),
    },
  ];
  const { name } = useParams();
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    setPage(1);
    axios
      .get(`http://localhost:8050/gallery?name=${encodeURIComponent(name)}`)
      .then((data) => {
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
      <div className="mypage-wrapper">
        <div className="mypage-left">
          <div className="left-mypage">
            <Link to={"/mypage"}>
              <button>나의 게시글</button>
            </Link>
          </div>
          <div className="left-fix">
            <Link to={"/fix"}>
              <button>회원 정보 수정</button>
            </Link>
          </div>
        </div>
        <div className="mypage-right">
          <div className="right-title">
            <div>나의 게시글</div>
            <hr />
          </div>
          <div className="right-list">
            <TableContainer sx={{ maxHeight: 800 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        overflow={column.overflow}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.length !== 0 &&
                    list.map((v, key) => {
                      let date = new Date(v.createdAt);
                      return (
                        <TableRow
                          align="center"
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={v.id}
                        >
                          <TableCell>{v.id}</TableCell>
                          <TableCell>
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: "300px",
                                overflow: "hidden",
                              }}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                }}
                                to={"/post/" + name + "/" + v.postId}
                              >
                                {v.title}
                              </Link>
                            </div>
                          </TableCell>

                          <TableCell>
                            {date.getFullYear() +
                              "-" +
                              date.getMonth() +
                              "-" +
                              date.getDay() +
                              " " +
                              date.getHours() +
                              ":" +
                              date.getMinutes()}
                          </TableCell>
                          <TableCell align="center">{v.clicked}</TableCell>
                          <TableCell align="center">200</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
