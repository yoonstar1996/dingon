import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../css/Show.css";
import axios from "axios";

const Show = () => {
  const { name, id } = useParams();
  const content = useRef();

  useEffect(() => {
    axios({
      url: "http://localhost:8050/post/content",
      method: "get",
      params: { postId: id },
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
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
          <div ref={content} className="get_content"></div>
        </div>
      </div>
    </>
  );
};

export default Show;
