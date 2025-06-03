import './SummaryCard.css';

function SummaryCard({ title, value }) {
  return (
    <>
      <div className="card">
        <div className="summary-card">
          <h2 className="summary-title">{title}</h2>
          <p className="summary-value">{value}</p>
        </div>
      </div>
    </>
  );
}

export default SummaryCard;