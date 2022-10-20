import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Main from "./component/Main";
import Sticky from "./component/Sticky";
import Search from "./component/Search";
import Footer from "./component/Footer";
const App = (props) => {
  const [value, setValue] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);
  // useEffect(async()=>{
  //     const data = await axios("http://localhost:8050");
  //     setValue(data.data.code);
  //     return ()=>{
  //       return ;
  //     }
  // },[]);
  return (
    <>
      <div className="body">
        <div className="searchandLogo">
          <Search />
        </div>
        <div className="dividebar"></div>
        <div className="container">
          <div className="main">
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </div>
          <div className="sticky">
            <Sticky />
          </div>
        </div>
        <div className="Footer">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default App;
