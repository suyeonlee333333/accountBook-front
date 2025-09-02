import { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import './App.css';
import DailyStatFetcher from "./DailyStatFetcher.jsx";
import { IoPencilSharp } from "react-icons/io5";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const navigate = useNavigate();

    const generateMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let days = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(null);
        }

        for (let d = 1; d <= lastDay.getDate(); d++) {
        const thisDate = new Date(year, month, d);
        days.push({
            dateStr: thisDate.toISOString().split("T")[0],
            day: d,
        });
        }

        setDates(days);
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    useEffect(() => {
        generateMonthDays(currentDate);
    }, [currentDate]);

    const handleDateClick = (dateStr) => {
        setSelectedDate(dateStr);
    };

    return (
        <>
            <div className="header">
            <button onClick={prevMonth}>◀</button>
            <span>{currentDate.getMonth() + 1}월</span>
            <button onClick={nextMonth}>▶</button>
        </div>

        <div className="calendar-box">
        <div className="weekdays">
            {["일","월","화","수","목","금","토"].map(d => (
            <div key={d} className="weekday">{d}</div>
            ))}
        </div>

        <div className="dates">
            {dates.map((d, i) =>
            d ? (
                <div
                key={d.dateStr}
                onClick={() => handleDateClick(d.dateStr)}
                className={`date-cell ${selectedDate === d.dateStr ? 'is-selected' : ''}`}
                >
                {d.day}
                </div>
            ) : <div key={i} />
            )}
        </div>
        </div>

        <div className="button-container">
        <button className="write-btn"
        onClick={() => {
            if (!selectedDate) {
            alert("날짜를 먼저 선택하세요!");
            return;
            }
            navigate("/writebox", { state: { date: selectedDate } });
        }}>
        <IoPencilSharp />
        </button>
        </div>

        <div className="records mt-4">
                {selectedDate ? (
                    <DailyStatFetcher d={{ type: "this", dateStr: selectedDate }} />
        
                ) : (
                    <span className="text-muted">날짜를 선택하면 소비 기록이 표시됩니다.</span>
                )}
        </div>
</>
    )
}
