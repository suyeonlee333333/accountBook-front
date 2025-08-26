    import './App.css';
    import { useState, useEffect } from 'react';
    import { Navbar, Nav, Container } from 'react-bootstrap';
    import { BrowserRouter, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
    import WriteComponent from "./write.jsx";
    import { IoGiftOutline, IoCalendarOutline, IoSettingsOutline, IoInfiniteOutline, IoTodayOutline, IoPodiumOutline } from "react-icons/io5";
    import DailyStatFetcher from "./DailyStatFetcher.jsx";
    import Login from "./login.jsx";

    
    export default function App() {
    

    return (
        <BrowserRouter>
        <div className="App">
            {/* 상단 네비게이션 바 */}
            <Navbar>
            <Container className="top-bar">
                <Nav className="navbar">
                <Nav.Link as={Link} to="/stats" className="top-icons"><IoPodiumOutline /></Nav.Link>
                <Nav.Link as={Link} to="/check" className="top-icons"><IoTodayOutline /></Nav.Link>
                <Nav.Link as={Link} to="/couple-linking" className="top-icons"><IoInfiniteOutline /></Nav.Link>
                </Nav>
            </Container>
            </Navbar>

            {/* 라우팅 영역 */}
            <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/date/:date" element={<DateDetailPage />} />
            <Route path="/writebox" element={<WriteComponent />} />
            <Route path="/login" element={<Login />} />
            </Routes>

            {/* 하단 네비게이션 바 */}
            <Navbar>
            <Container className="under-bar">
                <Nav className="under-nav">
                <Nav.Link as={Link} to="/"><IoCalendarOutline /></Nav.Link>
                <Nav.Link as={Link} to="/shop"><IoGiftOutline /></Nav.Link>
                <Nav.Link as={Link} to="/settings"><IoSettingsOutline /></Nav.Link>
                </Nav>
            </Container>
            </Navbar>
        </div>
        </BrowserRouter>
    )

    function CalendarPage () {
    const [currentDate,setCurrentDate]=useState(new Date());
    const [dates, setDates]=useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
    });
    const [records, setRecords] = useState({}); // 날짜별 소비 기록 저장
    
    //const [showWrite, setShowWrite] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=> {
        renderCalender();
    },[currentDate]);


    const fmtYMD = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const renderCalender = () => {
        let date = currentDate;
        const viewYear=date.getFullYear();
        const viewMonth=date.getMonth();

        const prevLast = new Date(viewYear,viewMonth,0);
        const thisLast = new Date(viewYear,viewMonth+1,0);

        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();

        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        const prevDates=[];
        const thisDates=[...Array(TLDate+1).keys()].slice(1);
        const nextDates=[];

        if (PLDay !==6) {
        for (let i=0;i<PLDay+1;i++) {
            prevDates.unshift(PLDate-i);
        }
        }
        for (let i=1; i<7-TLDay; i++) {
        nextDates.push(i);
        }

        const cells = [
        ...prevDates.map(d => ({
            dateStr: fmtYMD(new Date(viewYear, viewMonth - 1, d)),
            day: d,
            type: 'prev',
        })),
        ...thisDates.map(d => ({
            dateStr: fmtYMD(new Date(viewYear, viewMonth, d)),
            day: d,
            type: 'this',
        })),
        ...nextDates.map(d => ({
            dateStr: fmtYMD(new Date(viewYear, viewMonth + 1, d)),
            day: d,
            type: 'next',
        })),
        ];

        setDates(cells);
    };

        const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        };

        const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        };

        const handleDateClick = (dateStr) => { setSelectedDate(dateStr);};

        useEffect(() => {
    if (location.state) {
        setRecords(prev => {
        const date = location.state.date;
        return {
            ...prev,
            [date]: [...(prev[date] || []), location.state]
        };
        });
        // state를 사용한 후 초기화
        navigate(".", { replace: true, state: null });
    }
    }, [location.state, navigate]);






        return (
        <>
            <div className="header">
            <button onClick={prevMonth}>◀</button>
            <span>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </span>
            <button onClick={nextMonth}>▶</button>
        </div>

        <div className="weekdays">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="weekday">{day}</div>
            ))}
        </div>

        <div className="dates">
            {dates.map((d) => (
            <div
                key={d.dateStr}
                onClick={() => d.type === "this" && handleDateClick(d.dateStr)}// handleDateClick(d.dateStr)
                style={{
                padding: "10px",
                cursor: d.type === "this" ? "pointer" : "default",
                backgroundColor: selectedDate === d.dateStr ? "#7AD5CC" : "white",
                }}
            >
                {d.day}
            </div>
            ))}
        </div>
        <button
        onClick={() => {
            if (!selectedDate) {
            alert("날짜를 먼저 선택하세요!");
            return;
            }
            navigate("/writebox", { state: { date: selectedDate } });
        }}>
        +
        </button>


        <div className="records mt-4">
            {selectedDate ? (
                <DailyStatFetcher d={{ type: "this", dateStr: selectedDate }} />
                // <>
                //   <h5>{selectedDate} 소비 기록</h5>
                //   {!(records[selectedDate]?.length) ? (
                //     <div className="text-muted">아직 기록이 없습니다.</div>
                //   ) : (
                //     records[selectedDate].map((r, i) => (
                //       <div key={i} className="card p-2 mb-2 shadow-sm">
                //         <span>{r.amount}원</span>
                //         <span>({r.payment})</span> {/* 카드 or 현금 */}
                //         <p>태그: {r.tags?.join(", ") || "-"}</p>
                //         <p>메모: {r.memo || "-"}</p>
                //       </div>
                //     ))
                //   )}
                // </>
            ) : (
                <span className="text-muted">날짜를 선택하면 소비 기록이 표시됩니다.</span>
            )}
            </div>



        </>
        )
    };


    function DateDetailPage () {
        const { date } = useParams();
        return (
        null
        )
    };
    }
