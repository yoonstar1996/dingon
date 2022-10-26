import React from "react"
import  Button  from "@mui/material/Button"
import StarBorderIcon from "@mui/icons-material/StarBorder";


export default function GoodBtn(){
    return (
      <>
        <Button
          style={{
            borderRadius: "200px",
            width: "100px",
            paddingLeft: "25px",
            backgroundColor: "#4545AC",
            padding:"5px"
          }}
          id="GoodBtn"
          variant="contained"
          startIcon={
            <StarBorderIcon
              style={{ fontSize: "25px" }}
              id="Icon"
              variant="contained"
            ></StarBorderIcon>
          }
          onClick={() => {
            document.getElementById("Icon").style.color = "yellow";
            document.getElementById("Icon").variant = "contained"
          }}
        >개추</Button>
      </>
    );
}