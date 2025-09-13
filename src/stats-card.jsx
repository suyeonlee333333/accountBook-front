    export default function StatsCard({ record }) {
    const isIncome = record.type === "수입";
    const sign = isIncome ? "+ " : "- ";


    return (
        <div className="record-card">

        <div className="rc-main">
            <span className="rc-category">{record.category}</span>

            <span className={`rc-amount ${isIncome ? "income" : "expense"}`}>
            {sign}
            {Number(record.amount).toLocaleString()}
            <span className="rc-won">원</span>
            </span>

            {record.payment && <span className="rc-payment">{record.payment}</span>}
        </div>
        </div>
    );
}