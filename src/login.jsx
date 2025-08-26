import { useState, useEffect } from 'react';
import './App.css';

export default function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='login-container'>
            <h2>Login</h2>
            <input type="text" placeholder="아이디를 입력하세요 "
            onChange={(e)=>{setUsername(e.target.value)}}>

            </input>
            <input type="password" placeholder="비밀번호를 입력하세요"
            onChange={(e)=>{setPassword(e.target.value)}}></input>
            
            
        </div>
    )
}