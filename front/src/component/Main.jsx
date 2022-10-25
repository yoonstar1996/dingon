import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import MainBoards from "./MainBoards";
import PostMade from "./postmade";
import Gaesi from "./gaesi";
import { Board } from "./Board.jsx";
import NewBoard from "./NewBoard";
import Show from "./show";
import Mypage from "./Mypage";
import Fix from "./Fix";
import ErrorPage from "./ErrorPage"

const Main = memo((props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainBoards />}></Route>
        <Route
          path="/post/:name/:id"
          element={<Show isLogin={props.isLogin}></Show>}
        ></Route>
        <Route path="/postmade/:name" element={<PostMade />}></Route>
        <Route
          path="/postupdate"
          element={
            {
              /*기영*/
            }
          }
        ></Route>
        <Route
          path="/gallery/:name"
          element={<Board isLogin={props.isLogin}></Board>}
        ></Route>

        <Route path="/mypage" element={<Mypage></Mypage>}></Route>
        <Route path="/fix" element={<Fix userId={props.userId}></Fix>}></Route>
        {props.isLogin ? (
          <Route path="/gallery/made/:name/:postid" element={<Gaesi></Gaesi>}></Route>
        ) : (
          <></>
        )}
        {props.isLogin ?(
          <Route path="/create" element={<NewBoard></NewBoard>}></Route>          
        ) : (
          <></>
        )      
        }
        <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>

      </Routes>
    </>
  );
});

export default Main;
