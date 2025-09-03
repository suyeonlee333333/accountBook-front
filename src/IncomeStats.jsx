import React, { useState } from 'react';
import {Chart as ChartJS} from "chart.js/auto";
import {Pie} from "react-chartjs-2";
import IncomeData from "./incomeData.json";

export default function IncomeStats() {


    const now=new Date(); 
    const monthKey = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const [selectedType,setSelectedType] = useState(false);
    return (
    <>
    <div className="income-chart">
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