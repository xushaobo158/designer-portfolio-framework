import { ArrowUpRight } from './Icons'
import ProjectPreview from './ProjectPreview'
import BorderGlow from './BorderGlow'

function ProjectCard({ project, previewCopy }) {
  return (
    <BorderGlow
      as="article"
      className="project-card"
      data-project-card
      edgeSensitivity={24}
      glowColor="198 88 72"
      backgroundColor="#0d111a"
      borderRadius={8}
      glowRadius={26}
      glowIntensity={0.65}
      coneSpread={22}
      colors={['#75e9e3', '#6ea8ff', '#9e8cff']}
      fillOpacity={0.14}
    >
      <div className="project-card-top">
        <span className="project-index">/{project.index}</span>
        <span className="project-type">{project.type}</span>
      </div>
      <ProjectPreview type={project.visual} copy={previewCopy} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          {project.meta.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="project-actions">
          {project.actions.map((action, index) => (
            <a key={action} className={index === 0 ? 'project-link' : 'project-link project-link-muted'} href="#contact">
              {action} <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </div>
    </BorderGlow>
  )
}

export default ProjectCard
