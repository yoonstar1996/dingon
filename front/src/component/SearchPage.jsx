import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ErrorPage from "./ErrorPage";
import ImageIcon from '@mui/icons-material/Image';
import Best from "./Button/Best";
import "../css/Board.css";
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
export const SearchPage = (props) => {
    const columns = [
        { id: "number", label: "번호", minWidth: 100 },
        { id: "title", label: "제목", minWidth: 300 },
        {
            id: "name",
            label: "이름",
            minWidth: 10,
            align: "center",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "time",
            label: "작성일",
            minWidth: 50,
            align: "center",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "clicked",
            label: "갤러리",
            minWidth: 5,
            align: "center",
            format: (value) => value.toFixed(2),
        },
        {
            id: "like",
            label: "추천",
            minWidth: 5,
            align: "center",
            format: (value) => value.toFixed(2),
        },
    ];
    const { content } = useParams();
    const [list, setList] = useState([]);

    useEffect(() => {
        axios({
            url: "http://localhost:8050/search/board",
            method: "get",
            params:{name:content},
            withCredentials: true,
          }).then((data) => {
            setList(data.data.list);
            console.log(data.data.list);
          });

    }, []);
    return (
        <>
            <TableContainer sx={{ maxHeight: 800 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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
                    let sendDate =
                      date.getFullYear() +
                      "-" +
                      (parseInt(date.getMonth()) + 1) +
                      "-" +
                      date.getDate() +
                      " ";
                    if (date.getHours() < 12) {
                      sendDate += date.getHours() + ":";
                    } else {
                      sendDate += parseInt(date.getHours()) - 12 + ":";
                    }
                    sendDate += +date.getMinutes();
                    console.log(date.getDate());
                    return (
                      <TableRow
                        align="center"
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={v.id}
                      >
                        <TableCell>{v.postId}</TableCell>
                        <TableCell>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              width: "300px",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            {v.img && <ImageIcon />}
                            <Link
                              style={{ textDecoration: "none" }}
                              to={"/post/" + content + "/" + v.postId}
                            >
                              {v.title}{" "}
                              <span style={{ color: "purple" }}>
                                [{v.commentCount}]
                              </span>
                            </Link>
                          </div>
                        </TableCell>

                        <TableCell align="center">{v.nickName}</TableCell>
                        <TableCell>{sendDate}</TableCell>
                        <TableCell align="center">{v.clicked}</TableCell>
                        <TableCell align="center">{v.like}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
};
