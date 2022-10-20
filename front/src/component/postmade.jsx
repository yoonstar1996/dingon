import axios from "axios";
import "../css/PostMade.css"
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function PostMade() {
    return (
        <div className="frame">
            <div className="Logo">
                <h2>글 작성</h2>
            </div>
            <hr />
            <div className="titlename">
                <TextField fullWidth type="text" placeholder="제목" />
            </div>
            <div className="alertstory">
                <ErrorOutlineIcon />{"절대절대 부적절한 이미지 혹은 내용을 담으면 안됩니다!"}
            </div>
            <div className="alertstory">
                <ErrorOutlineIcon />{"출처없이 사진을 쓴다면 정의의 철퇴를 쳐 맞으실겁니다!"}
            </div>
            <hr />
            <div className="mainPost">
                <div style={{width:"80%"}}>
                    <TextareaAutosize
                        minRows={30}
                        aria-label="maximum height"
                        placeholder="글을 작성해 주세요!"
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostMade;