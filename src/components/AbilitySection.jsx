import SectionHeading from './SectionHeading'
import { ArrowUpRight } from './Icons'
import GradientText from './GradientText'
import BorderGlow from './BorderGlow'

const titleGradient = ['#69cdff', '#4bacff', '#ffffff']

function AbilitySection({ copy, abilities }) {
  return (
    <section className="section ability-section" id="ability" data-motion-section>
      <div className="ability-orb" />
      <SectionHeading
        label={copy.label}
        title={<>{copy.title[0]}<br /><GradientText colors={titleGradient} animationSpeed={2.6} showBorder={false}>{copy.title[1]}</GradientText></>}
        description={copy.description}
        count="06"
      />

      <div className="ability-grid">
        {abilities.map((ability, index) => (
          <BorderGlow
            as="article"
            className="ability-card"
            key={ability.code}
            data-ability-card
            edgeSensitivity={24}
            glowColor="198 88 72"
            backgroundColor="#0d111a"
            borderRadius={8}
            glowRadius={26}
            glowIntensity={0.65}
            coneSpread={22}
            colors={['#75e9e3', '#6ea8ff', '#9e8cff']}
            fillOpacity={0.14}
            style={{ '--delay': `${index * 55}ms` }}
          >
            <div className="ability-code"><span>{ability.code}</span><i><ArrowUpRight size={14} /></i></div>
            <div>
              <h3>{ability.title}</h3>
              <p>{ability.description}</p>
            </div>
            <span className="ability-line" />
          </BorderGlow>
        ))}
      </div>

      <div className="process-strip" data-process-strip>
        <span>{copy.process[0]}</span><i />
        <span>{copy.process[1]}</span><i />
        <span>{copy.process[2]}</span><i />
        <span>{copy.process[3]}</span>
      </div>
    </section>
  )
}

export default AbilitySection
