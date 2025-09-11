    import { useState, useEffect,useMemo } from 'react';  
    import { useNavigate,useLocation } from 'react-router-dom';
    import './App.css';
    import DailyStatFetcher from "./DailyStatFetcher.jsx";
    import RecordCards from './RecordCards.jsx';
    import { IoPodiumOutline } from "react-icons/io5";

    export default function Calendar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [records, setRecords] = useState(() => {
        try {
        const saved = localStorage.getItem("records");
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
        } catch {
        return [];
        }
    });

    const [currentDate, setCurrentDate] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const generateMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const ds = [];
        for (let i = 0; i < firstDay.getDay(); i++) ds.push(null);
        for (let d = 1; d <= lastDay.getDate(); d++) {
        const thisDate = new Date(year, month, d);
        ds.push({ dateStr: thisDate.toISOString().split("T")[0], day: d });
        }
        setDates(ds);
    };

    useEffect(() => { generateMonthDays(currentDate); }, [currentDate]);

    const prevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const handleDateClick = (dateStr) => setSelectedDate(dateStr);

    useEffect(() => {
    const added = location.state?.justAdded;
    if (!added) return;

    setRecords(prev => {
        const without = prev.filter(r => r.id !== added.id);
        return [added, ...without];
    });
    setSelectedDate(added.date);


    navigate(location.pathname, { replace: true, state: null });
    }, [location.state, location.pathname, navigate]);

    useEffect(() => {
    const seen = new Set();
    const deduped = records.filter(r => {
        if (!r?.id || seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
        });
        if (deduped.length !== records.length) {
        setRecords(deduped);
        return;
        }
        localStorage.setItem("records", JSON.stringify(records));
    }, [records]);


    return (
    <>
    <div className="header">
    <button
        className="month-stat" onClick={() => navigate("/expenseStats")}>
        <IoPodiumOutline />
    </button>

    <span className="month-nav">
        <button onClick={prevMonth}>◀</button>
        <span>{currentDate.getMonth() + 1}월</span>
        <button onClick={nextMonth}>▶</button>
    </span>

    <div className="spacer"></div>
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
        
        <div className="records mt-4">
            {selectedDate ? (
            <DailyStatFetcher d={{ type: "this", dateStr: selectedDate }} />
            ) : (
            <span className="text-muted">날짜를 선택하면 소비 기록이 표시됩니다.</span>
            )}
        </div>

        <div className="record-list">
            {records
            .filter(r => r.date === selectedDate) 
            .map((rec) => (
                <RecordCards key={rec.id} record={rec} />
            ))}
        </div>
        </>
    );
    }
