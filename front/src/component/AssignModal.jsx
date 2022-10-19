import TextField from '@mui/material/TextField';
import axios from "axios"
import React from 'react';
import "../css/AssignModal.css";
import Button from '@mui/material/Button';
import { useState } from 'react';


function AssignModal() {

    const [nickName, setName] = useState("");
    const [Pw, setPw] = useState("");
    const [Email, setEmail] = useState("");
    const [EwriteState, EsetwriteState] = useState(false);
    const [IwriteState, IsetwriteState] = useState(false);
    const [PriteState, PsetwriteState] = useState(false);
    const Emailvalidate = () => {
        let check = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
        if (!EwriteState) {
            return false;
        } else {
            return !check.test(Email);
        }
    }
    const namevalidate = () => {
        let check = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        if (!IwriteState) {
            return false;
        } else {
            return !check.test(nickName);
        }
    }
    const Pwvalidate = () => {
        let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;;
        if (!PriteState) {
            return false;
        } else {
            return false;
        }

    }

    const submit=()=>{
        let data={
            email:Email,
            password:Pw,
            nickNmae:nickName
        }

        axios({
            url: "/auth/signup",
            method: "post",
            data:data
        }).then((result) => {
            console.log(result.data);
        });
    }

    return (
        <div className="ocapacity">
            <div className="Modal">
                <div className='title'>
                    회원가입
                </div>
                <div className='metirial'>
                    <TextField onChange={(e) => { EsetwriteState(true); setEmail(e.target.value) }} className='inputTag' id="outlined-basic" label="Email" variant="outlined" error={Emailvalidate()} helperText={Emailvalidate() ? "형식에 맞게 입력하세요." : ""} />
                    <Button style={{ marginLeft: "10px" }}>중복확인</Button>
                </div>
                <div className='metirial'>
                    <TextField className='inputTag' onChange={(e) => { setName(e.target.value); IsetwriteState(true) }} id="outlined-basic" label="NickName" variant="outlined" error={namevalidate()} helperText={namevalidate() ? "형식에 맞게 입력하세요" : ""} />
                    <Button style={{ marginLeft: "10px" }}>중복확인</Button>
                </div>
                <div className='metirial'>
                    <TextField type="password" style={{ width: "65%" }} className='inputTag' onChange={(e) => { setPw(e.target.value); PsetwriteState(true) }} id="outlined-basic" label="password" variant="outlined" error={Pwvalidate()} helperText={Pwvalidate() ? "형식에 맞게 입력하세요" : ""} />
                </div>

                <div className='captar'>
                    <div id="captcha" className="g-recaptcha" data-sitekey="6LcG3ZEiAAAAAN-O78MeoLy3N9lU9J7jGvmHYsiD"></div>
                </div>

                <Button onClick={submit} className='buton' variant="outlined">회원가입 하기</Button>
			
            </div>
        </div>
    );
}

export default AssignModal;