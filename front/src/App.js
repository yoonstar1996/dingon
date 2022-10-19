import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Main from "./component/Main";
import Sticky from "./component/Sticky";
import Allgall from "./component/Allgall";
import "./css/Sticky.css";
import "./css/Allgall.css";

const Test = (props) => {
  const [value, setValue] = useState("");
  useEffect(async () => {
    const data = await axios("http://localhost:8050");
    setValue(data.data.code);
    return () => {
      return;
    };
  }, []);
  return <>{value}</>;
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Main />
        <Sticky />
        <Allgall />
      </BrowserRouter>
    </>
  );
}

export default App;
