import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';

export default function JoinMembership() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="sign-up">
        <div className="Id-set">
            <p style={{margin:0}}>아이디</p>
            <input
            type="text" 
            placeholder="아이디를 입력하세요"></input>
        </div>
        <div className="Pw-set">
            <p style={{margin: 0}}>비밀번호</p>
            <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            ></input>
        </div>
        <div>
            <p style={{margin:0}}>비밀번호 재입력</p>
            <input 
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e)=>{
                setConfirmPassword(e.target.value);
                <p>안녕하세요</p>
            }}></input>
        </div>
        <button className="yesorno" onClick={()=>navigate("/")}>가입하기</button>
        <button className="yesorno" onClick={()=>navigate("/login")}>닫기</button>

        
        </div>
    )
}