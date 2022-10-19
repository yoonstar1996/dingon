import React from "react";
import AssignModal from "./AssignModal";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
function Main() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Main;