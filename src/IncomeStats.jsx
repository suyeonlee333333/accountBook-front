import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Chart as ChartJS} from "chart.js/auto";
import {Pie} from "react-chartjs-2";
import IncomeData from "./incomeData.json";

export default function IncomeStats() {

    const navigate = useNavigate();


    const now=new Date(); 
    const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const [selectedType,setSelectedType] = useState(false);
    return (
    <>


    <div className="income-chart">
        <button onClick={()=>navigate("/expenseStats")}>지출</button>
        <button>수입</button>
        <p className="monthStats">{monthKey} 통계</p>
        
        <Pie
            data={{
                labels: IncomeData.map((data)=>data.label),
                datasets:[
                    {
                        label:"Count",
                        data:IncomeData.map((data)=>data.value),
                        backgroundColor: [
                            "#FEF6D4",
                            "#FDE1CF",
                            "#FAB5AF",
                            "#DFDAE9",
                        ],
                        borderRadius: 5,

                    }
                    
                ]
            }
            }
        />
    </div>

    </>
    )
    
};                                  