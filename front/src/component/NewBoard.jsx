import React, { useState } from "react";
import axios from "axios";
import "../css/NewBoard.css";


function NewBoard(){
    // const [Id, setId] = useState("");
    const [Name, setName] = useState("");
    const create = () => {
        axios({
            url: "http://localhost:8050/gallery/add",
            method: "post",
            withCredentials: true,
            data : {name : Name}
        }).then((result) => {
    
            if(result.data.code === 200){
                alert("갤러리 생성이 완료됐습니다!")
                window.location.replace(`/gallery/${Name}`)
            }
            else{
                alert("갤러리 생성에 실패했습니다.")
            }
        }); 
    };
    const checkBoardName = () => {
        if(Name == ""){
            alert("내용을 입력해주세요.");
            return false;
        }
        axios({
            url: "http://localhost:8050/gallery/check",
            method: "get",
            withCredentials: true,
            params : {name : encodeURI(Name)}
        }).then((result) => {
            console.log("resultData : ", result.data);
            if (result.data.code === 400){
                alert("이미 존재하는 갤러리이름입니다.")
            }
            // else if (result.data.code === 400 && Name == ""){
            //     alert("내용을 입력해주세요.")
            // }
            else if (result.data.code === 500){
                alert("서버상 문제가 발생했습니다")
            }
            else alert("등록 가능한 갤러리 이름입니다!")
        })
    }
    return (
        <>
            <div className="newBoardBox">
                <div className="theContent">
                    <div className="newBoardTitle">
                        <h2>갤러리 생성하기</h2></div>
                        <hr></hr>
                        <div className="newBoardRule">
                            <h3>갤러리 생성 규칙 </h3>
                            <div className="theRule">1. 음란물 배포 및 불순한 목적의 갤러리는 운영진에 의해 삭제될 수 있습니다.</div>
                            <div className="theRule">2. 반복적으로 동일한 목적의 갤러리를 만들 시 제재를 받을 수 있습니다.</div>
                        <hr></hr>

                        </div>
                        {/* <br></br> */}
                    <span>갤러리 제목 : </span>
                    <input  
                        className="boardName" 
                        placeholder="만들고자 하는 갤러리 제목을 입력해주세요" 
                        onChange={(e)=>{
                            setName(e.target.value);
                            console.log(Name);
                            // if(e.target.value == ""){
                            //     console.log("내용을 입력해주세요")
                            // }
                        }}>
                    </input>
                    <button className="checkBtn" onClick={()=>{
                        checkBoardName();
                    }}>중복확인</button>
                    <br></br>
                    <button 
                        className="createBtn" 
                        onClick={()=>{
                        create();
                        }}>
                    갤러리 생성
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewBoard;