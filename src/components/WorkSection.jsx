import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'
import GradientText from './GradientText'

const titleGradient = ['#69cdff', '#4bacff', '#ffffff']

function WorkSection({ copy, projects, previewCopy }) {
  return (
    <section className="section work-section" id="work" data-motion-section>
      <SectionHeading
        label={copy.label}
        title={<>{copy.title[0]}<br /><GradientText colors={titleGradient} animationSpeed={2.6} showBorder={false}>{copy.title[1]}</GradientText></>}
        description={copy.description}
        count="04"
      />
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.id} project={project} previewCopy={previewCopy} />)}
      </div>
    </section>
  )
}

export default WorkSection
