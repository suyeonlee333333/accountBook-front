import './App.css';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
        <Container className="under-bar"style={{weight: '300px'}}>
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

    const allDates = prevDates
        .map((d) => ({ date: d, type: "prev" }))
        .concat(thisDates.map((d) => ({ date: d, type: "this" })))
        .concat(nextDates.map((d) => ({ date: d, type: "next" })));

      setDates(allDates);
    };

    const prevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

  //   const onDateClick = (date) => {
  //   setSelectedDate(date);
  //   navigate(`/date/${date}`);
  //   };


  //   {dates.map((item, idx) => {
  // // 현재 날짜 기준 연도, 월 가져오기
  // const realYear = (() => {
  //   if (item.type === "prev") {
  //     if (currentDate.getMonth() === 0) return currentDate.getFullYear() - 1;
  //     else return currentDate.getFullYear();
  //   } else if (item.type === "next") {
  //     if (currentDate.getMonth() === 11) return currentDate.getFullYear() + 1;
  //     else return currentDate.getFullYear();
  //   } else {
  //     return currentDate.getFullYear();
  //   }
  // })();

  // const realMonth = (() => {
  //   if (item.type === "prev") {
  //     if (currentDate.getMonth() === 0) return 11;
  //     else return currentDate.getMonth() - 1;
  //   } else if (item.type === "next") {
  //     if (currentDate.getMonth() === 11) return 0;
  //     else return currentDate.getMonth() + 1;
  //   } else {
  //     return currentDate.getMonth();
  //   }
  // })();
  //   })}

  //   const formattedMonth = String(realMonth + 1).padStart(2, "0");
  //   const formattedDate = String(item.date).padStart(2, "0");

  //   const fullDateStr = `${realYear}-${formattedMonth}-${formattedDate}`;

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
          {dates.map((item,idx)=>(
            <div key={idx} className={`date ${item.type=='this'? "this-month" : "other-month"}`}>{item.date}
            </div>
          ))}
        </div>

        {/* <div
        key={fullDateStr}
        className={`date ${item.type === "this" ? "this-month" : "other-month"}`}
        onClick={() => onDateClick(fullDateStr)}
        style={{
          padding: 10,
          cursor: "pointer",
          backgroundColor: selectedDate === fullDateStr ? "lightblue" : "transparent",
          border: "1px solid #ccc",
          borderRadius: 5,
          margin: 2,
          display: "inline-block",
          width: 30,
          textAlign: "center",
        }}
      >
        {item.date}
      </div> */}
      </>
    )
  };
  function DateDetailPage () {
    
  };
}
