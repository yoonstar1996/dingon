import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Show.css";
import axios from "axios";
import Button from "@mui/material/Button";
const Show = ({ isLogin }) => {
  const { name, id } = useParams();
  const [cont, setCont] = useState("");
  const content = useRef();

  const [userId, setUserId] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    axios({
      url: "http://localhost:8050/post/content",
      method: "get",
      params: { postId: id },
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);

      setUserId(response.data.userId);
      let date = new Date(response.data.createdAt);
      let sendDate =
        date.getFullYear() +
        "." +
        (parseInt(date.getMonth()) + 1) +
        "." +
        date.getDate() +
        " ";
      if (date.getHours() < 12) {
        sendDate += date.getHours() + ":";
      } else {
        sendDate += parseInt(date.getHours()) - 12 + ":";
      }
      sendDate += +date.getMinutes();
      setTime(sendDate);
      setCont(response.data);

      let new_div = document.createElement("div");
      new_div.innerHTML = response.data.content;

      content.current.innerHTML = response.data.content;
      let userNickname = response.data.userId;
      content.current.innerHTML += `<input
              value=${userNickname}
            ></input>`;
    });
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="content">
          <div className="headBar">
            <h1 className="t">
<<<<<<< HEAD
              <Link
                style={{ textDecoration: "none" }}
                to={"/gallery/made/" + id}
              >
=======
              <Link style={{ textDecoration: 'none' }} to={"/gallery/" + name}>
>>>>>>> upstream/develop
                {name} 갤러리
              </Link>
            </h1>
            <div className="fixButton">
              {isLogin === userId ? (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/gallery/made/" + id}
                >
                  <Button style={{ background: "#4545AC" }} variant="contained">
                    수정
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="headInfo">
            <div className="contentTitle">
              <div>
                <h4 style={{ marginTop: 0, marginBottom: "10px" }}>
                  {cont.title}
                </h4>
              </div>
              <div>{"닉네임: " + cont.nickName + "   |   " + time}</div>
            </div>
          </div>
          <div ref={content} className="get_content"></div>
        </div>
      </div>
    </>
  );
};

export default Show;
