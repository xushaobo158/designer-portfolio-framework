import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from './Icons'
import GradientText from './GradientText'

const titleGradient = ['#69cdff', '#4bacff', '#ffffff']

const heroLocales = {
  zh: {
    eyebrow: 'UI/UX DESIGNER · PRODUCT DESIGNER · INTERACTION',
    philosophy: '让每一次交互都自然、清晰且有价值',
    intro: '我叫徐少柏，是一名关注产品逻辑与体验细节的 UI/UX 设计师，擅长把复杂需求转化为清晰、可落地的界面方案。',
    roles: ['UI/UX Designer', 'Product Designer', 'Interaction Designer'],
    metrics: [
      ['B端', '复杂系统与后台架构'],
      ['C端', '移动产品体验与增长路径'],
      ['WEB', '网页改版与品牌表达'],
    ],
    workLabel: 'Selected work entrance',
    workTitle: '向下进入作品系统',
    workMeta: 'Resume / C-end App / B-end System / Website Redesign',
  },
  en: {
    eyebrow: 'UI/UX DESIGNER · PRODUCT DESIGNER · INTERACTION',
    philosophy: 'Make every interaction natural, clear, and valuable.',
    intro: 'I am Shaobai Xu, a UI/UX designer focused on product logic, interaction clarity, and turning complex needs into polished, shippable interface solutions.',
    roles: ['UI/UX Designer', 'Product Designer', 'Interaction Designer'],
    metrics: [
      ['B-END', 'Complex systems & dashboards'],
      ['C-END', 'Mobile experience & growth flows'],
      ['WEB', 'Website redesign & brand expression'],
    ],
    workLabel: 'Selected work entrance',
    workTitle: 'Scroll into the case system',
    workMeta: 'Resume / C-end App / B-end System / Website Redesign',
  },
}

function Hero({ copy }) {
  const heroRef = useRef(null)
  const locale = copy.primaryAction === 'View Work' ? 'en' : 'zh'
  const content = heroLocales[locale]

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reducedMotion) return undefined

    let frame = 0
    const applyPosition = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect()
      const mx = ((clientX - rect.left) / rect.width - 0.5) * 2
      const my = ((clientY - rect.top) / rect.height - 0.5) * 2
      hero.style.setProperty('--hero-mx', mx.toFixed(3))
      hero.style.setProperty('--hero-my', my.toFixed(3))
    }

    const onPointerMove = (event) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        applyPosition(event.clientX, event.clientY)
        frame = 0
      })
    }

    const onPointerLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--hero-mx', '0')
        hero.style.setProperty('--hero-my', '0')
        frame = 0
      })
    }

    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', onPointerLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-grid" />

      <div className="hero-poster-ornament" data-hero-detail aria-hidden="true">
        <span />
        <i />
        <b />
        <i />
        <span />
      </div>

      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow" data-hero-detail><span>{content.eyebrow}</span><i /></div>
        <div className="hero-role-rail" data-hero-detail>
          {content.roles.map((role) => <span key={role}>{role}</span>)}
        </div>

        <div className="hero-poster-stage">
          <h1 className="hero-philosophy" data-hero-title>
            <span className="hero-title-mask"><span className="hero-title-line" data-hero-line>
              <GradientText colors={titleGradient} animationSpeed={2.6} showBorder={false}>
                {content.philosophy}
              </GradientText>
            </span></span>
          </h1>
        </div>

        <div className="hero-metrics" data-hero-detail>
          {content.metrics.map(([value, label]) => (
            <div className="hero-metric" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="hero-intro" data-hero-detail>
          {content.intro}
        </p>

        <div className="hero-actions" data-hero-detail>
          <a className="button button-primary" href="#work">{copy.primaryAction} <ArrowDown /></a>
          <a className="button button-ghost" href="#contact">{copy.secondaryAction} <ArrowUpRight /></a>
        </div>
        <a className="hero-work-teaser" href="#work" data-hero-detail>
          <span>{content.workLabel}</span>
          <strong>{content.workTitle}</strong>
          <em>{content.workMeta}</em>
          <i><ArrowDown /></i>
        </a>
        <div className="hero-footnote" data-hero-detail>
          <span>{copy.location}</span>
          <span>{copy.focus}</span>
        </div>
      </div>

      <a className="scroll-cue" href="#work" aria-label={copy.scrollLabel} data-hero-detail>
        <span>{copy.scroll}</span>
        <i><ArrowDown /></i>
      </a>
    </section>
  )
}

export default Hero
