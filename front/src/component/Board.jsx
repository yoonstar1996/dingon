import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ErrorPage from "./ErrorPage";

import "../css/Board.css"
const PaginationBox = styled.div`
  a:link{
    color:black;
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
    color: #4545AC;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #4545AC;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: white;
  }
`;
export const Board = (props) => {
  const columns = [
    { id: 'number', label: '번호', minWidth: 100 },
    { id: 'title', label: '제목', minWidth: 300 },
    {
      id: 'name',
      label: "이름",
      minWidth: 10,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'time',
      label: "작성일",
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'clicked',
      label: '조회수',
      minWidth: 5,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'like',
      label: '추천',
      minWidth: 5,
      align: 'center',
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
  }, [page, total,name]);
  return (
    <>
      {!err ? (
        <div style={{ width: "100%" }} className="boardBox">
          <h1 style={{ textAlign: "center" }}>
          <Link onClick={()=>{setPage(1)}} style={{textDecoration:"none"}}to={"/gallery/"+name}>{name} 갤러리</Link>
          </h1>
          {props.isLogin ? (
            <div style={{ textAlign: "right" }}>
              <Link style={{ textDecoration: 'none' }} to={"/postmade/" + name}>
                <Button style={{ background: "#4545AC" }} variant="contained" >글 작성</Button>
              </Link>
            </div>
          ) : null}
          {total == 0 ? (
            <div style={{ backgroundColor: "white", textAlign: "center" }}>
              게시글이 없어요! 게시글을 추가해 보세요
            </div>
          ) : (
            ""
          )}
          <hr style={{background:"#4545AC",height:"1px",marginTop:"8px",width:"100%"}} />
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
                    let sendDate = date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate() + " ";
                    if (date.getHours() < 12) {
                      sendDate +=  date.getHours() + ":";
                    }
                    else {
                      sendDate +=   (parseInt(date.getHours()) - 12) + ":";
                    }
                    sendDate += +date.getMinutes() ;
                    console.log(date.getDate());
                    return (
                      <TableRow align="center" hover role="checkbox" tabIndex={-1} key={v.id}>
                        <TableCell>
                          {v.postId}
                        </TableCell>
                        <TableCell>
                          <Link style={{ textDecoration: 'none' }} to={"/post/" + name + "/" + v.postId}>
                            {v.title} <span style={{color:"purple"}}>[{v.commentCount}]</span>
                          </Link>
                        </TableCell>

                        <TableCell align="center" >
                          {v.nickName}
                        </TableCell>
                        <TableCell>
                          {sendDate}
                        </TableCell>
                        <TableCell align="center">
                          {v.clicked}
                        </TableCell>
                        <TableCell align="center">
                          200
                        </TableCell>
                      </TableRow>


                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
        <ErrorPage></ErrorPage>
      )}
    </>
  );
};
