import React from "react";
import AssignModal from "./AssignModal";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
import Sticky from "./Sticky"
import "../css/Sticky.css"
import "../css/AssignModal.css"
function Main() {



    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>wefwe</div>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Main;