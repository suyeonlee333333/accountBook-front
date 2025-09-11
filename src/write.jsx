import './App.css';
import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import flex from './image/flex.png';
import 기분전환 from './image/기분전환.png';
import 소확행 from './image/소확행.png';
import 스트레스 from './image/스트레스_해소.png';
import 슬픔 from './image/슬픔.png';
import 충동구매 from './image/충동구매.png';

export default function WritePage() {
    const [selectedTags, setSelectedTags] = useState([]);
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const [activeCategory, setActiveCategory] = useState("고정지출");
    const [activeType, setActiveType] = useState("지출");
    const [activePayment, setActivePayment] = useState("신용카드");

    const navigate = useNavigate();
    const location = useLocation();

    const dateFromCalendar = location.state?.date;
    const date = dateFromCalendar || new Date().toISOString().split("T")[0];

    const payment = ["신용카드","체크카드","현금","계좌이체","상품권","기타"];
    const type = ["지출","수입"];

    const expenseCategory = [
        ["고정지출", "식비", "교통비", "생필품", "카페"],
        ["도서", "교육", "문화생활", "쇼핑", "미용"],
        ["선물", "건강", "경조사", "의료비", "기타"],
    ];
    const incomeCategory = [
        ["월급","부업","용돈","기타"],
    ];

    const categories = activeType === "수입" ? incomeCategory : expenseCategory;

    const toggleTag = (name) => {
        setSelectedTags((prev) =>
        prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
        );
    };

    const handleSave = () => {
        if (!activeType) { alert("수입/지출을 선택하세요."); return; }
        if (!amount || Number(amount) <= 0) { alert("금액을 입력하세요."); return; }
        if (!activeCategory) { alert("카테고리를 선택하세요."); return; }
        if (activeType === "지출" && !activePayment) { alert("결제수단을 선택하세요."); return; }

        const newRecord = {
        id: (crypto?.randomUUID?.() ?? String(Date.now())),
        date,
        type: activeType,
        amount: Number(amount),
        category: activeCategory,
        payment: activeType === "지출" ? activePayment : "",
        tag: activeType === "지출" ? selectedTags : [],
        memo: note || "",
        };

        navigate("/", { state: { justAdded: newRecord } });
    };

    return (
        <>
        <div className="write-container">

            <div className="plus-minus">
            {type.map((t) => (
                <button
                key={t}
                onClick={() => {
                    setActiveType(t);
                    setActiveCategory(t === "수입" ? "월급" : "고정지출"); 
                    setActivePayment(t === "지출" ? "신용카드" : "");
                    setSelectedTags([]);
                }}
                style={{ color: activeType === t ? "black" : "gray" }}
                >
                {t}
                </button>
            ))}
            </div>

            {activeType === "지출" && (
                <div className="emotion-tag">
                    <button
                    className={`emotion-btn ${selectedTags?.includes("기분전환") ? "on" : ""}`}
                    onClick={() => toggleTag("기분전환")}
                    >
                    <img src={기분전환} alt="기분전환" />
                    <p className="emotion-word">기분전환</p>
                    </button>

                    <button
                    className={`emotion-btn ${selectedTags?.includes("스트레스 해소") ? "on" : ""}`}
                    onClick={() => toggleTag("스트레스 해소")}
                    >
                    <img src={스트레스} alt="스트레스" />
                    <p className="emotion-word">스트레스</p>
                    </button>

                    <button
                    className={`emotion-btn ${selectedTags?.includes("충동구매") ? "on" : ""}`}
                    onClick={() => toggleTag("충동구매")}
                    >
                    <img src={충동구매} alt="충동구매" />
                    <p className="emotion-word">충동구매</p>
                    </button>

                    <button
                    className={`emotion-btn ${selectedTags?.includes("flex") ? "on" : ""}`}
                    onClick={() => toggleTag("flex")}
                    >
                    <img src={flex} alt="flex" />
                    <p className="emotion-word">flex</p>
                    </button>

                    <button
                    className={`emotion-btn ${selectedTags?.includes("슬픔") ? "on" : ""}`}
                    onClick={() => toggleTag("슬픔")}
                    >
                    <img src={슬픔} alt="슬픔" />
                    <p className="emotion-word">슬픔</p>
                    </button>

                    <button
                    className={`emotion-btn ${selectedTags?.includes("소확행") ? "on" : ""}`}
                    onClick={() => toggleTag("소확행")}
                    >
                    <img src={소확행} alt="소확행" />
                    <p className="emotion-word">소확행</p>
                    </button>
                </div>
)}


            <div>
            <input
                type="number"
                className="write-money"
                placeholder={activeType === "수입" ? "수입 금액" : "지출 금액"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
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

            {activeType === "지출" && (
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
            )}

            <div>
            <p className="write-form-title">오늘의 씀씀</p>
            <div>
                <input
                type="text"
                className="write-form"
                placeholder="오늘의 씀씀"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                />
            </div>
            </div>

            <button className="close-button" onClick={handleSave}>저장</button>
        </div>
        </>
    );
}
