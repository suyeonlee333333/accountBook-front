import './App.css';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import 'react-big-calendar/lib/css/react-big-calendar.css'
//import { Calendar, momentLocalizer } from 'react-big-calendar'
//import moment from 'moment'

//const localizer = momentLocalizer(moment)



export default function App() {
  const [currentDate,setCurrentDate]=useState(new Date());
  const [dates, setDates]=useState([]);

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
    </>
  
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
  )}
