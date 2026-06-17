function SectionHeading({ label, title, description, count }) {
  return (
    <div className="section-heading">
      <div className="section-kicker" data-section-kicker><span>{label}</span><i /></div>
      <div className="section-title-row">
        <div className="section-title-clip"><h2 data-section-title>{title}</h2></div>
        {count && <span className="section-count" data-section-count>{count}</span>}
      </div>
      {description && <p data-section-description>{description}</p>}
    </div>
  )
}

export default SectionHeading
