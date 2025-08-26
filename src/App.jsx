import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import WriteComponent from "./write.jsx";
import { IoGiftOutline, IoCalendarOutline, IoSettingsOutline, IoInfiniteOutline, IoTodayOutline, IoPodiumOutline } from "react-icons/io5";
import Login from "./login.jsx";
import Calendar from "./calendar.jsx";

  
export default function App() {

  const navigate=useNavigate();
  

  return (
    <div className="App">
    <>
      <button onClick={() => navigate("/stats")}><IoPodiumOutline/></button>
      <button onClick={() => navigate("/todayCheck")}><IoTodayOutline/></button>
      <button onClick={() => navigate("/link")}><IoInfiniteOutline/></button>
    </>

      

      {/* 라우팅 영역 */}
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/date/:date" element={null} />
        <Route path="/writebox" element={<WriteComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gift" element={null}/>
        <Route path="/settings" element={null}/>
        <Route path="/stats" element={null}/>
        <Route path="/todayCheck" element={null}/>
        <Route path="/link" element={null}/>
      </Routes>


      {/* 하단 네비게이션 바 */}
      <>
        <button onClick={() => navigate("/")}><IoCalendarOutline /></button>
        <button onClick={() => navigate("/gift")}><IoGiftOutline /></button>
        <button onClick={() => navigate("/settings")}><IoSettingsOutline /></button>
      </>

    </div>
  )

}

