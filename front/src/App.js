import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search/Search";
import wholegaesipan from "./whole/all";
import Wholegaesipan from "./whole/all";

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
    <div>
      {/* <Search></Search> */}
      <Wholegaesipan></Wholegaesipan>
    </div>
  );
}

export default App;
