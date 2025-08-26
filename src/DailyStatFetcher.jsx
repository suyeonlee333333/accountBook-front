import React, { useState } from "react";


    export default function DailyStatFetcher({ d }) {
    const [stat, setStat] = useState(null);
    const [error, setError] = useState(null);

    const handleclick= async (dateStr) => {
    const response = await fetch(
        `http://localhost:8080/user/dailystat?date=${dateStr}`
    );

    if (!response.ok) {
        throw new Error("서버 요청 실패");
    }

    const data = await response.json();
    setStat(data); // 받아온 JSON 저장

    return (
        <div>
        <button onClick={handleclick}>통계 불러오기</button>

        {error && <p style={{ color: "red" }}>에러: {error}</p>}

        {stat && (
            <div style={{ marginTop: "10px", padding: "10px", border: "1px solid gray" }}>
            <p><b>날짜:</b> {stat.date}</p>
            <p><b>금액:</b> {stat.money}</p>
            <p><b>설명:</b> {stat.descriptions}</p>
            <p><b>타입:</b> {stat.type}</p>
            <p><b>카테고리:</b> {stat.category}</p>
            </div>
        )}
        </div>
    );
    }
    }
