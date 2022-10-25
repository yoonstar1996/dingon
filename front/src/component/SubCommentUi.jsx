import axios from "axios";
import "../css/subCommentUi.css"
import { TextField, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
const SubCommentUi = ({isLogin, commentId,sublist }) => {

    return (
        <>
            {sublist.length>0 ?<div className="subcommentframe">
                <div style={{ marginBottom: "5px", fontSize: "small", paddingRight: 0, paddingLeft: 0, display: "flex", alignItems: "center" }}>
                    {sublist.map((value,key) => {
                        return (
                            <>
                                <div style={{ width: "25%" }}>
                                    wefwefew
                                </div>
                                <div style={{ width: "80%", overflow: "hidden", wordBreak: "break-all" }}>
                                    wefwefwef
                                </div>
                                <div style={{ width: "15%", display: "flex", justifyContent: "flex-end" }}>
                                    {isLogin ? <Button style={{ color: "black" }} variant="text"><DeleteIcon /></Button> : <></>}
                                </div>
                                <div style={{ width: "15%", display: "flex" }}>
                                    wefwfe
                                </div>
                            </>
                        )
                    })}
                </div>
                <hr style={{ marginBottom: 0, width: "100%", backgroundColor: "#e2e2e2" }} />
            </div>:<></>}
        </>
    )

}

export default SubCommentUi;