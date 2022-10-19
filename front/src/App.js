import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import axios from "axios";
import Main from './component/Main';
const Test = (props)=>{
  const [value,setValue] = useState("");
  // useEffect(async()=>{
  //     const data = await axios("http://localhost:8050");
  //     setValue(data.data.code);
  //     return ()=>{
  //       return ;
  //     }
  // },[]);
  return(
    <>
      <Main/>
    </>

  );

};
function App() {
  return (
      <Test></Test> 
  );
}

export default App;
