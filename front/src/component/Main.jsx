import React from "react";
import { Routes, Route } from "react-router-dom"
import MainBoards from "./MainBoards";
import PostMade from "./postmade";
import { Board } from "./Board.jsx";
function Main() {
    return (
        <>
                <Routes>
                    <Route path="/" element={<MainBoards />}></Route>
                    <Route path="/post" element={<div>아장모가받았다</div>}></Route>
                    <Route path="/postmade" element={<PostMade />}></Route>
                    <Route path="/postupdate" element={{/*기영*/}}></Route>
                    <Route path="/gallery/:name" element={<Board></Board>}></Route>
                    <Route path="/gallery/made" element={{/*정우*/}}></Route>
                    <Route path="/*" element={{/*원준*/}}></Route>
                </Routes>
        </>
    );
}

export default Main;