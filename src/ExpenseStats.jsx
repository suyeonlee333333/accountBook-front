import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Chart as ChartJS} from "chart.js/auto";
import {Pie} from "react-chartjs-2";
import ExpenseData from "./expenseData.json";

export default function ExpenseStats() {
    // const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

    // const foodTotal = entries.filter(entry => entry.category === '식비').reduce((sum, entry) => sum + entry.amount, 0);
    
    // const [entries, setEntries] = useState([
    // { id: 1, date: '2023-01-01', category: '식비', amount: 50000},
    // { id: 2, date: '2023-01-02', category: '교통비', amount: 15000 },
    // { id: 3, date: '2023-01-02', category: '식비', amount: 30000 },
    // ]);

    const now=new Date(); 
    const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const [selectedType,setSelectedType] = useState(false);
    const navigate = useNavigate();
    return (
    <>

    <div className="circle-chart">
        <button>지출</button>
        <button onClick={()=>navigate("/incomeStats")}>수입</button>
        <p className="monthStats">{monthKey} 통계</p>
    </div>

    <div className="expense-chart">
        <Pie
            data={{
                labels: ExpenseData.map((data)=>data.label),
                datasets:[
                    {
                        label:"Count",
                        data:ExpenseData.map((data)=>data.value),
                        backgroundColor: [
                            "#FCDAB9",
                            "#F8B3A4",
                            "#F78888",
                            "#A26B7F",
                            "#ECEAAF",
                            "#D5CC84",
                            "#C8BF80",
                            "#CFC9A9",
                            "#DEDAC9",
                            "#E6E9D9",
                            "#D3E6EC",
                            "#B7DAE4",
                            "#95C5D4",
                            "#EEEFE7",
                            "#738089"
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