import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import RecordCard from "./RecordCards.jsx";

const INCOME_CATS = new Set(["월급", "부업", "용돈", "기타"]);

function monthKeyFromDate(d) {
    const dt = typeof d === "string" ? new Date(d) : d;
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    }
    function parseMonthKey(key) { const [y, m] = key.split("-").map(Number); return { year: y, month: m }; }
    function toMonthLabel(key) { const { month } = parseMonthKey(key); return `${month}월`; }

    export default function IncomeStats({ records: propRecords }) {
    const navigate = useNavigate();
    const now = new Date();
    const initMonthKey = monthKeyFromDate(now);

    const [selectedMonth, setSelectedMonth] = useState(initMonthKey);
    const [year, setYear] = useState(now.getFullYear());
    const [catFilter, setCatFilter] = useState("");
    const [monthPickerOpen, setMonthPickerOpen] = useState(false);
    const chartRef = useRef(null);

    const allRecords = useMemo(() => {
        if (Array.isArray(propRecords)) return propRecords;
        try {
        const raw = localStorage.getItem("records");
        return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    }, [propRecords]);

    const monthlyIncome = useMemo(() => {
        return allRecords.filter(
        (r) => r?.type === "수입" && monthKeyFromDate(r.date) === selectedMonth
        );
    }, [allRecords, selectedMonth]);

    const { labels, values } = useMemo(() => {
        const byCat = new Map();
        for (const r of monthlyIncome) {
        const raw = r?.category ?? "기타";
        if (!INCOME_CATS.has(raw)) continue;

        byCat.set(raw, (byCat.get(raw) || 0) + Number(r.amount || 0));
        }
        const labs = Array.from(byCat.keys());
        const vals = labs.map((k) => byCat.get(k));
        return { labels: labs, values: vals };
    }, [monthlyIncome]);

    const pieData = useMemo(() => ({
        labels,
        datasets: [{
        label: "수입",
        data: values,
        backgroundColor: ["#FEF6D4", "#FDE1CF", "#FAB5AF", "#DFDAE9"],
        borderRadius: 6,
        }],
    }), [labels, values]);

    const onPieClick = (evt) => {
        const chart = chartRef.current;
        if (!chart) return;
        const el = getElementAtEvent(chart, evt);
        if (!el || !el[0]) return;
        const idx = el[0].index;
        const label = labels[idx];
        setCatFilter((prev) => (prev === label ? "" : label));
    };

    const monthKeysOfYear = useMemo(() => (
        Array.from({ length: 12 }, (_, i) => `${year}-${String(i + 1).padStart(2, "0")}`)
    ), [year]);

    const monthText = toMonthLabel(selectedMonth);

    const filteredForCards = useMemo(() => {
        if (!catFilter) return [];
        return monthlyIncome
        .filter((r) => INCOME_CATS.has(r?.category) && r.category === catFilter)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [monthlyIncome, catFilter]);

    return (
        <>
        <div className="circle-chart">
            <button onClick={() => navigate("/expenseStats")}>지출</button>
            <button>수입</button>

            <p className="monthStats">
            <span
                className="monthNum"
                onClick={() => setMonthPickerOpen((v) => !v)}
                style={{ cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}
            >
                {monthText}
            </span>{" "}
            통계
            </p>

            {monthPickerOpen && (
            <div className="month-bar">
                <button className="year-btn" onClick={() => setYear((y) => y - 1)}>◀ {year - 1}</button>
                <div className="month-grid">
                {monthKeysOfYear.map((mk) => {
                    const label = toMonthLabel(mk);
                    const active = mk === selectedMonth;
                    return (
                    <button
                        key={mk}
                        className={`month-chip ${active ? "active" : ""}`}
                        onClick={() => {
                        setSelectedMonth(mk);
                        setCatFilter("");
                        setMonthPickerOpen(false);
                        }}
                    >
                        {label.replace("월", "")}
                    </button>
                    );
                })}
                </div>
                <button className="year-btn" onClick={() => setYear((y) => y + 1)}>{year + 1} ▶</button>
            </div>
            )}
        </div>

        <div className="income-chart">
            <Pie ref={chartRef} data={pieData} onClick={onPieClick} />
        </div>

        <div className="cat-pills">
            {labels.map((lab) => (
            <button
                key={lab}
                className={`cat-pill ${catFilter === lab ? "on" : ""}`}
                onClick={() => setCatFilter((prev) => (prev === lab ? "" : lab))}
            >
                {lab}
            </button>
            ))}
        </div>

        {catFilter && (
            <>
            <h3 className="cat-title">
                {toMonthLabel(selectedMonth)} · <strong>{catFilter}</strong> 내역
            </h3>
            <div className="record-list">
                {filteredForCards.length === 0 ? (
                <p className="empty">해당 카테고리 수입 내역이 없습니다.</p>
                ) : (
                filteredForCards.map((rec) => <RecordCard key={rec.id} record={rec} />)
                )}
            </div>
            </>
        )}
        </>
    );
}
