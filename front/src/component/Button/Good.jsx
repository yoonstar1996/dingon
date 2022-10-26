import React from "react"
import  Button  from "@mui/material/Button"
import StarBorderIcon from "@mui/icons-material/StarBorder";


export default function GoodBtn(){
    return (
      <>
        <Button
          style={{
            borderRadius: "200px",
            width: "50px",
            paddingLeft: "25px",
            backgroundColor: "#4545AC",
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
        ></Button>
      </>
    );
}