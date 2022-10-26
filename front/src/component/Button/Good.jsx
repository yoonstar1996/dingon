import React from "react"
import  Button  from "@mui/material/Button"
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { width } from "@mui/system";


export default function GoodBtn(){
    return(
    <>
    <Button 
    style={{borderRadius: "200px", width:"50px",paddingLeft:"25px" }}
    id="GoodBtn"
    variant="contained" 
    startIcon={<StarBorderIcon style={{fontSize:"25px"}}></StarBorderIcon>} 
    onClick={()=>{}}></Button>
    </>
    )
}