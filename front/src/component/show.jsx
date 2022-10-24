import { useEffect, useRef, useState } from "react";
import { useParams,Link } from "react-router-dom";
import "../css/Show.css";
import axios from "axios";
import Button from '@mui/material/Button';
const Show = ({isLogin}) => {
  const { name, id } = useParams();
  const content = useRef();
  const [userId,setUserId]=useState("")
  useEffect(() => {
    axios({
      url: "http://localhost:8050/post/content",
      method: "get",
      params: { postId: id },
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      setUserId(response.data.userId)
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
          {isLogin === userId ? <Link to={"/gallery/made/"+id}>
            <Button variant="contained">수정</Button>
          </Link>:<></>}
          <div ref={content} className="get_content">
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
