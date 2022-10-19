import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MainBoards from "./MainBoards";
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
      <MainBoards title="베스트 게시판 : "></MainBoards>
      <MainBoards title="베스트 게시판 : "></MainBoards>
      <MainBoards title="베스트 게시판 : "></MainBoards>
      <MainBoards title="베스트 게시판 : "></MainBoards>
    </>
  );
}

export default App;
