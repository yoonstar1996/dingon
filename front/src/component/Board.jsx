import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
export const Board = (props)=>{
    const [info,setInfo] = useState(null);
    const [err,setErr] = useState(false);
    useEffect(async()=>{
        const data = await axios.get("/")
        if(data.data.code==400){
            setErr(true);
        }
    },[info]);
    return(
        <>
            {!err ? <div style={{width:"100%"}} className="boardBox">게시글</div> : <div style={{width:"100%"}}className="errorBox">에러</div>}
        </>


    );



}