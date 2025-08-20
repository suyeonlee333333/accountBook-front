import './App.css';
import './App.jsx';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import flex from './image/flex.png';
import 기분전환 from './image/기분전환.png';
import 소확행 from './image/소확행.png';
import 스트레스 from './image/스트레스 해소.png';
import 슬픔 from './image/슬픔.png';
import 충동구매 from './image/충동구매.png';

export default function WritePage() {
    
    const [selectedTag, setSelectedTag] = useState(null);
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {amount, note, date: new Date().toLocaleDateString()};
        navigate('/',{state: data});
    }
    // const onWriteClick = (writebox) => {
    // navigate('/writebox');}
    return (
        <>
            <div className="write-container">
                <div className="emotion-tag">
                    <button>
                        <img src={기분전환} alt="기분전환"
                        width="50px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}}/>
                    </button>
                    <button>
                        <img src={스트레스} alt="스트레스"
                        width="50px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}} />
                    </button>
                    <button>
                        <img src={충동구매} alt="충동구매"
                        width="60px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}} />
                    </button>
                    <button>
                        <img src={flex} alt="flex"
                        width="60px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}} />
                    </button>
                    <button>
                        <img src={슬픔} alt="슬픔"
                        width="60px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}} />
                    </button>
                    <button>
                        <img src={소확행} alt="소확행"
                        width="60px" style={{ cursor: "pointer" }}
                        onClick={() => {console.log(0);}} />
                    </button>
                </div>
                {/* <div>{selectedDate}</div> */}
                <div className="plus-minus">
                    <button>지출</button>
                    <button>수입</button>
                </div>
                <div className="wirte-money">
                    <input type="number" placeholder="0원" value={amount} onChange={(e)=> setAmount(e.target.value)} />
                </div>

                <div className="money-category">
                    <button>고정지출</button>
                    <button>식비</button>
                    <button>교통비</button>
                    <button>생필품</button>
                    <button>카페</button>
                    <button>도서</button>
                    <button>교육</button>
                    <button>문화생활</button>
                    <button>쇼핑</button>
                    <button>미용</button>
                    <button>선물</button>
                    <button>건강</button>
                    <button>경조사</button>
                    <button>의료비</button>
                    <button>기타</button>
                </div>
                <div className="type">
                    <button>신용카드</button>
                    <button>체크카드</button>
                    <button>현금</button>
                    <button>계좌이체</button>
                    <button>상품권</button>
                    <button>기타</button>
                </div>
                <div className="write-form">
                    <span></span>
                    <p>오늘의 씀씀</p>
                    <div className="write-form-title">
                        <input type="text" placeholder="오늘의 씀씀" value={note} onChange={(e)=>setNote(e.target.value)} />
                    </div>

                </div>
                <button onClick={handleSubmit} className="close-button">저장</button>
            </div>
        </>
    ) 
}
