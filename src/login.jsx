import { useState, useEffect } from 'react'; import './App.css';
import naver from "./image/btnG_아이콘원형.png";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
    <div className='login-container'>
        <div className='login-box'>
            <h2>Login</h2>
            <input 
                className="Id" 
                type="text" 
                placeholder="아이디를 입력하세요"
                onChange={(e)=>setUsername(e.target.value)} 
            />
            <input 
                className="Pw" 
                type="password" 
                placeholder="비밀번호를 입력하세요"
                onChange={(e)=>setPassword(e.target.value)} 
            />
            <button className="login-btn">로그인</button>

        <div>
        {/* <button className="naver-btn">
            <img src={naver} alt="네이버 로그인" />
        </button> */}

        <button className="kakao-btn"></button>

        
        </div>
        <button className="first-login">회원가입</button>
            </div>
        </div>
);
}
