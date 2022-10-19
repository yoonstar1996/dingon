import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import axios from "axios";
const Test = (props)=>{
  const [value,setValue] = useState("");
  useEffect(async()=>{
      const data = await axios("http://localhost:8050");
      setValue(data.data.code);
      return ()=>{
        return ;
      }
  },[]);
  return(
    <>
      {value}
    </>

  );

};
function App() {
  return (
      <Test></Test> 
  );
}

export default App;
