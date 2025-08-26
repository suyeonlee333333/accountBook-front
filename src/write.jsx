import './App.css';
import {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import flex from './image/flex.png';
import 기분전환 from './image/기분전환.png';
import 소확행 from './image/소확행.png';
import 스트레스 from './image/스트레스_해소.png';
import 슬픔 from './image/슬픔.png';
import 충동구매 from './image/충동구매.png';

export default function WritePage() {
    
    const [selectedTag, setSelectedTag] = useState(null);
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    // const [paymentMethod, setPaymentMethod] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [activePayment, setActivePayment] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const dateFromCalendar = location.state?.date;

    const payment =["신용카드","체크카드","현금","계좌이체","상품권","기타"];
    const type = ["수입","지출"];
    const categories = [
    ["고정지출", "식비", "교통비", "생필품", "카페"],
    ["도서", "교육", "문화생활", "쇼핑", "미용"],
    ["선물", "건강", "경조사", "의료비", "기타"],
    ];

    


    const handleClick = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = () => {
    const data = {
        amount: Number(amount) || 0,
        paymentMethod: "카드", // 기본값으로 카드 설정, 필요시 수정 가능
        tags: selectedTag ? [selectedTag] : [],
        memo: note,
        date: dateFromCalendar || new Date().toISOString().split("T")[0]
    };
    navigate("/", { state: data });
    };
    // const onWriteClick = (writebox) => {
    // navigate('/writebox');}
    return (
<>
    <div className="write-container">
        <div className="emotion-tag">
            <button style={{
                backgroundColor: selectedTag === "기분전환" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={기분전환} alt="기분전환"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("기분전환")}/>
            </button>
            <button style={{
                backgroundColor: selectedTag === "스트레스 해소" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={스트레스} alt="스트레스"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("스트레스 해소")} />
            </button>
            <button style={{
                backgroundColor: selectedTag === "충동구매" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={충동구매} alt="충동구매"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("충동구매")} />
            </button>
            <button style={{
                backgroundColor: selectedTag === "flex" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={flex} alt="flex"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("flex")} />
            </button>
            <button style={{
                backgroundColor: selectedTag === "슬픔" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={슬픔} alt="슬픔"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("슬픔")} />
            </button>
            <button style={{
                backgroundColor: selectedTag === "소확행" ? "#a6b9da7e" : "transparent"
            }}>
                <img src={소확행} alt="소확행"
                width="50px" style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag("소확행")} />
            </button>
        </div>
        
        <div className="plus-minus">
            {type.map((t) => (
                <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{ color: activeType === t ? "black" : "gray" }}
                >
                {t}
                </button>
            ))}
            </div>

        <div className="wirte-money">
            <input type="number" placeholder="0원" value={amount} onChange={(e)=> setAmount(e.target.value)} />
        </div>

        <div className="money-category">
            {categories.map((row, rowIndex) => (
            <div className="ct" key={rowIndex}>
                {row.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{ color: activeCategory === category ? "black" : "gray" }}
                >
                    {category}
                </button>
                ))}
            </div>
            ))}
        </div>

        <div className="method">
            {payment.map((p) => (
                <button
                key={p}
                onClick={() => setActivePayment(p)}
                style={{ color: activePayment === p ? "black" : "gray" }}
                >
                {p}
                </button>
            ))}
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
