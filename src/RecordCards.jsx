export default function RecordCard({ record }) {
    const isIncome = record.type === "수입";
    const sign = isIncome ? "+ " : "- ";

    return (
        <div className="record-card">
        <time className="rc-date">{record.date}</time>

        <div className="rc-top">
            <div className="rc-tag" title={record.tag}>
            {record.tag}
            </div>

            <div className="rc-top-right">
            <span className="rc-category" title={record.category}>
                {record.category}
            </span>
            <span className="rc-dot" aria-hidden>·</span>
            <span className="rc-payment" title={record.payment}>
                {record.payment}
            </span>
            </div>
        </div>

        <div className={`rc-amount ${isIncome ? "income" : "expense"}`}>
            {sign}
            {Number(record.amount).toLocaleString()}
            <span className="rc-won">원</span>
        </div>

        <div className="rc-divider" />

        <div className="rc-memo">
            <div className="rc-memo-title">오늘의 씀씀</div>
            <p className="rc-memo-text">{record.memo}</p>
        </div>
        </div>
    );
}