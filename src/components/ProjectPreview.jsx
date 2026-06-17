function ResumePreview({ copy }) {
  return (
    <div className="resume-preview">
      <div className="resume-paper resume-paper-back" />
      <div className="resume-paper resume-paper-front">
        <div className="resume-head"><span>{copy.name}</span><i /></div>
        <div className="resume-body">
          <div className="resume-aside"><b /><b /><b /><b /></div>
          <div className="resume-main"><strong>{copy.experience}</strong><b /><b /><strong>{copy.education}</strong><b /></div>
        </div>
      </div>
    </div>
  )
}

function SocialPreview({ copy }) {
  return (
    <div className="social-preview">
      <div className="phone phone-back"><div className="phone-screen"><span /><b /><b /><b /></div></div>
      <div className="phone phone-front">
        <div className="phone-screen">
          <div className="phone-status" />
          <div className="profile-orb" />
          <strong>{copy.frequency}</strong>
          <div className="people-row"><i /><i /><i /></div>
          <span className="phone-button" />
        </div>
      </div>
      <span className="social-pulse" />
    </div>
  )
}

function DashboardPreview({ copy }) {
  return (
    <div className="dashboard-preview">
      <div className="dash-window">
        <div className="dash-sidebar"><span /><b /><b /><b /><b /></div>
        <div className="dash-content">
          <div className="dash-header"><b /><i /></div>
          <div className="metric-row"><span /><span /><span /></div>
          <div className="chart-area"><div className="chart-line" /><i /><i /><i /></div>
        </div>
      </div>
      <div className="dash-float"><span>+18.6%</span><b>{copy.efficiency}</b></div>
    </div>
  )
}

function WebsitePreview({ copy }) {
  return (
    <div className="website-preview">
      <div className="browser-window">
        <div className="browser-top"><i /><i /><i /><span /></div>
        <div className="browser-page">
          <div className="web-nav"><b /><span /><span /><span /></div>
          <div className="web-hero"><small>{copy.perspective}</small><strong>{copy.rebuilt}</strong><span /></div>
          <div className="web-cards"><i /><i /><i /></div>
        </div>
      </div>
      <div className="web-swatch"><i /><i /><i /></div>
    </div>
  )
}

function ProjectPreview({ type, copy }) {
  const previews = {
    resume: <ResumePreview copy={copy} />,
    social: <SocialPreview copy={copy} />,
    dashboard: <DashboardPreview copy={copy} />,
    website: <WebsitePreview copy={copy} />,
  }

  return (
    <div className={`project-preview preview-${type}`} data-project-preview>
      <div className="project-preview-motion" data-parallax-media>{previews[type]}</div>
    </div>
  )
}

export default ProjectPreview
