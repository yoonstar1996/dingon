import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Main from "./component/Main";
import Sticky from "./component/Sticky";
import Search from "./component/Search";
import ScrollToTop from "./component/ScrollToTop";

import Footer from "./component/Footer";

import Gaesi from "./component/gaesi";
import Allgall from "./component/Allgall";
const App = (props) => {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [value, setValue] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8050/auth/isLoggedIn", { withCredentials: true })
      .then((data) => {
        console.log(data.data);
        if (data.data.code === 200) {
          console.log("success");
          setIsLogin(data.data.userId);
          setNickName(data.data.nickName);
          setUserId(data.data.email);
        }
      });
  });
  // useEffect(async()=>{
  //     const data = await axios("http://localhost:8050");
  //     setValue(data.data.code);
  //     return ()=>{
  //       return ;
  //     }
  // },[]);
  return (
    <>
      <BrowserRouter>
        <div className="body">
          <div className="searchandLogo">
            <Search />
          </div>
          <div className="dividebar"></div>
          <div className="container">
            <div className="main">
              <Main isLogin={isLogin} setIsLogin={setIsLogin} userId={userId} />
            </div>
            <div className="sticky">
              <Sticky
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                nickname={nickName}
                setNickname={setNickName}
                userId={userId}
                setUserId={setUserId}
              />
            </div>
          </div>
          <div>
            <ScrollToTop></ScrollToTop>
            <Allgall></Allgall>
          </div>
          <div className="Footer">
            <hr />
            <Footer></Footer>
          </div>
        </div>
        {/* <div>
        <Gaesi></Gaesi>
      </div> */}
      </BrowserRouter>
    </>
  );
};

export default App;
