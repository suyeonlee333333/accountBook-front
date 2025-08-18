import './App.css';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
//import 'react-big-calendar/lib/css/react-big-calendar.css'
//import { Calendar, momentLocalizer } from 'react-big-calendar'
//import moment from 'moment'

//const localizer = momentLocalizer(moment)



export default function App() {
  

  return (
    <div className="App">
      <>
      <Navbar bg="light" data-bs-theme="light" className="top-bar">
        <Container className="top-bar">
          <Nav className="me-auto">
            <Nav.Link href="#stats">통계</Nav.Link>
            <Nav.Link href="#check">출석체크</Nav.Link>
            <Nav.Link href="#couple-linking">커플 연결</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/date/:date" element={<DateDetailPage />} />
      </Routes>
    </BrowserRouter>
    </>
  
    

      <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className="under-bar"style={{width: '100%'}}>
          <Nav className="me-auto">
            <Nav.Link href="#home">home</Nav.Link>
            <Nav.Link href="#shop">shop</Nav.Link>
            <Nav.Link href="#settings">settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  
</div>
  )

  function CalendarPage () {
  const [currentDate,setCurrentDate]=useState(new Date());
  const [dates, setDates]=useState([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

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

    const onDateClick = (dateStr) => {
    setSelectedDate(dateStr);          // 하이라이트
    navigate(`/date/${dateStr}`);      // 해당 날짜 상세 페이지로 이동
  };


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
        {dates.map((item) => (
          <div
            key={item.dateStr}                                     // ✅ 고유 key
            className={`date ${item.type === 'this' ? 'this-month' : 'other-month'}`}
            onClick={() => onDateClick(item.dateStr)}               // ✅ 문자열 날짜로 이동
            style={{
              padding: 10,
              cursor: "pointer",
              backgroundColor: selectedDate === item.dateStr ? "lightblue" : "transparent", // ✅ 하이라이트
              border: "1px solid #ccc",
              borderRadius: 5,
              margin: 2,
              display: "inline-block",
              width: 30,
              textAlign: "center",
            }}
          >
            {item.day}                                              {/* 셀에는 숫자만 표기 */}
          </div>
        ))}
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