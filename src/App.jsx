import './App.css';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom';
import WriteComponent from "./write.jsx";
import { IoGiftOutline, IoCalendarOutline, IoSettingsOutline,
  IoInfiniteOutline, IoTodayOutline, IoPodiumOutline}
  from "react-icons/io5";



export default function App() {
  

  return (
    <div className="App">
      <>
      <Navbar bg="light" data-bs-theme="light" className="top-bar">
        <Container className="top-bar">
          <Nav className="me-auto">
            <Nav.Link href="#stats"><IoPodiumOutline /></Nav.Link>
            <Nav.Link href="#check"><IoTodayOutline /></Nav.Link>
            <Nav.Link href="#couple-linking"><IoInfiniteOutline /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/date/:date" element={<DateDetailPage />} />
        <Route path="/writebox" element={<WriteComponent />} />
      </Routes>
    </BrowserRouter>
    </>
  
    

      <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className="under-bar"style={{width: '100%'}}>
          <Nav className="me-auto">
            <Nav.Link href="#home"><IoCalendarOutline /></Nav.Link>
            <Nav.Link href="#shop"><IoGiftOutline /></Nav.Link>
            <Nav.Link href="#settings"><IoSettingsOutline /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  
</div>
  )

  function CalendarPage () {
  const [currentDate,setCurrentDate]=useState(new Date());
  const [dates, setDates]=useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [records, setRecords] = useState({}); // 날짜별 소비 기록 저장
  const [showWrite, setShowWrite] = useState(false);
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

    const handleDateClick = (dateStr) => {
    // const selected = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth(),
    //   day
    // )
    //   .toISOString()
    //   .split("T")[0];

    setSelectedDate(dateStr);
  };

    useEffect(() => {
  if (location.state) {
    setRecords((prev) => {
      const date = location.state.date;
      return {
        ...prev,
        [date]: [...(prev[date] || []), location.state]
      };
    });
  }
}, [location.state]);



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
            onClick={() => d.type === "this" && handleDateClick(d.dateStr)} 
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
      <span>
        <button onClick={() => 
        {navigate("/writebox");
        setShowWrite(true)}}>+</button>
      </span>

      {showWrite && (
        <div style={{ marginTop: 20 }}>
          <div style={{ marginTop: "20px" }}>
        <h3>소비 기록</h3>
        {Object.entries(records).map(([date, recs]) => (
        <div key={date}>
          <h4>{date}</h4>
          {recs.map((r, i) => (
            <div key={i}>
              <p>금액: {r.amount}원</p>
              <p>태그: {r.tags.join(", ")}</p>
              <p>메모: {r.memo}</p>
            </div>
          ))}
  </div>
))}
      </div>
          {/* <WriteComponent /> */}
          <button onClick={() => setShowWrite(false)}>닫기</button>
        </div>
      )}

      <div style={{ marginTop: 16, borderTop: "1px solid #ddd", paddingTop: 12 }}>
      {selectedDate ? (
        <h5>{selectedDate} 소비 기록 (준비중)</h5>
      ) : (
        <span>날짜를 선택하면 소비 기록이 여기에 표시됩니다.</span>
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