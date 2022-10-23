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
      console.log(content);
      content.current.innerHTML = response.data.content;
    });
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="content">
          <div ref={content} className="get_content">
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
