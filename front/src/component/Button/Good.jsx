import React from "react"
import  Button  from "@mui/material/Button"
import StarIcon from "@mui/icons-material/Star";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { margin } from "@mui/system";


export default function GoodBtn(){
    return (
      <>
        <Button
          style={{
            borderRadius: "200px",
            width: "100px",
            paddingLeft: "25px",
            backgroundColor: "#4545AC",
            padding:"5px",
            margin:"10px"
          }}
          id="GoodBtn"
          variant="contained"
          startIcon={
            <StarIcon
              style={{ fontSize: "25px" }}
              id="Icon"
              variant="contained"
            ></StarIcon>
          }
          onClick={() => {
            document.getElementById("Icon").style.color = "yellow";
          }}
        >개추</Button>
        <Button 
        variant="outlined"
        style={{margin:"10px"}}
        startIcon={<ThumbDownIcon></ThumbDownIcon>}
        onClick={()=>{}}
        >비추</Button>
      </>
    );
}