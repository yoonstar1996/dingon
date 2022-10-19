
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Main from "./component/Main";
import Search from "./Search/Search";
import Wholegaesipan from "./whole/all";
const Test = (props) => {
  const [value, setValue] = useState("");
  // useEffect(async()=>{
  //     const data = await axios("http://localhost:8050");
  //     setValue(data.data.code);
  //     return ()=>{
  //       return ;
  //     }
  // },[]);
  return (
    <>
      <Main />
      {/* <Search></Search> */}
      <Wholegaesipan></Wholegaesipan>
    </>
  );
};


export default App;
