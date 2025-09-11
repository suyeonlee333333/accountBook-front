    export default function RecordCard({ record }) {
    const isIncome = record.type === "수입";
    const sign = isIncome ? "+ " : "- ";

    const tagColors = {
        "슬픔": "#cce9f9",
        "스트레스 해소": "#f9b2b2",
        "기분전환": "#fff5b8",
        "충동구매": "#ffd9b3",
        "flex": "#e3d3ff",
        "소확행": "#ffd6e5",
    };

    return (
        <div className="record-card">

        {/* 감정 태그 칩들: 배열을 개별 칩으로 map */}
        <div className="rc-top">
            <div className="rc-chips">
            {(Array.isArray(record.tag) ? record.tag : (record.tag ? [record.tag] : []))
                .map((t) => (
                <span key={t} className="rc-chip" style={{ backgroundColor: tagColors[t] || "#eee" }}>
                    {t}
                </span>
            ))}
            </div>
        </div>

        <div className="rc-divider" />

        <div className="rc-main">
            <span className="rc-category">{record.category}</span>

            <span className={`rc-amount ${isIncome ? "income" : "expense"}`}>
            {sign}
            {Number(record.amount).toLocaleString()}
            <span className="rc-won">원</span>
            </span>

            {record.payment && <span className="rc-payment">{record.payment}</span>}
        </div>

        <div className="rc-divider" />

        {record.memo && (
            <div className="rc-memo">
            <div className="rc-memo-title">오늘의 씀씀</div>
            <div className="rc-memo-bubble">{record.memo}</div>
            </div>
        )}
        </div>
    );
}