export default function SectionTitle({ eyebrow, title, copy, center = true }) {
  return (
    <div className={`section-title ${center ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
