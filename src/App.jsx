import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Link, useParams, useLocation} from 'react-router-dom';
import WriteComponent from "./write.jsx";
import { IoCalendarOutline, IoSettingsOutline, IoPencilSharp, IoPodiumOutline } from "react-icons/io5";
import Login from "./login.jsx";
import Calendar from "./calendar.jsx";
import JoinMembership from "./join-membership.jsx";
import ExpenseStats from "./ExpenseStats.jsx";
import IncomeStats from "./IncomeStats.jsx";
import { useState } from 'react';  
  
export default function App() {

  const navigate=useNavigate();
  const [selectedDate, setSelectedDate] = useState(() => {
          const today = new Date();
          return today.toISOString().split("T")[0];
      });
  const { pathname } = useLocation();


  return (
    <div className="App">
    <>
      {/* <button onClick={() => navigate("/expenseStats")}><IoPodiumOutline/></button> */}
    </>

      

      {/* 라우팅 영역 */}
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/date/:date" element={null} />
        <Route path="/writebox" element={<WriteComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenseStats" element={<ExpenseStats/>} />
        <Route path="/incomeStats" element={<IncomeStats/>} />
        <Route path="/join-membership" element={<JoinMembership/>}/>
      </Routes>

      {pathname === "/" && (
      <button
        className="fab-write"
        onClick={() => {
            if (!selectedDate) { alert("날짜를 먼저 선택하세요!"); return; }
            navigate("/writebox", { state: { date: selectedDate } });
        }}
        >
        <IoPencilSharp />
      </button>
      )}


      {/* 하단 네비게이션 바 */}
      <>
        <button onClick={() => navigate("/")}><IoCalendarOutline /></button>
        <button onClick={() => navigate("/settings")}><IoSettingsOutline /></button>
      </>

    </div>
  )

}

