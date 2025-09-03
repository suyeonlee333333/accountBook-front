import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import WriteComponent from "./write.jsx";
import { IoGiftOutline, IoCalendarOutline, IoSettingsOutline, IoInfiniteOutline,
  IoTodayOutline, IoPodiumOutline,IoPersonCircleOutline } from "react-icons/io5";
import Login from "./login.jsx";
import Calendar from "./calendar.jsx";
import JoinMembership from "./join-membership.jsx";
import ExpenseStats from "./ExpenseStats.jsx";
import IncomeStats from "./IncomeStats.jsx";

  
export default function App() {

  const navigate=useNavigate();


  return (
    <div className="App">
    <>
      <button onClick={() => navigate("/expenseStats")}><IoPodiumOutline/></button>
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


      {/* 하단 네비게이션 바 */}
      <>
        <button onClick={() => navigate("/")}><IoCalendarOutline /></button>
        <button onClick={() => navigate("/settings")}><IoSettingsOutline /></button>
      </>

    </div>
  )

}

