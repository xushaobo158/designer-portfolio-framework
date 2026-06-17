import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkSection from './components/WorkSection'
import AbilitySection from './components/AbilitySection'
import ContactSection from './components/ContactSection'
import { portfolioData } from './data/portfolio'
import Grainient from './components/Grainient'
import OpeningScreen from './components/OpeningScreen'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'zh')
  const copy = portfolioData[language]
  const motionScope = usePortfolioMotion()

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title = copy.meta.documentTitle
  }, [copy.meta.documentTitle, language])

  return (
    <div className={`site-shell language-${language}`} ref={motionScope}>
      <OpeningScreen />
      <div className="site-background" aria-hidden="true">
        <Grainient
          color1="#17191f"
          color2="#2b303d"
          color3="#12151c"
          timeSpeed={0.2}
          colorBalance={-0.02}
          warpStrength={0.72}
          warpFrequency={3.2}
          warpSpeed={0.82}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.22}
          rotationAmount={110}
          noiseScale={1.7}
          grainAmount={0.035}
          grainScale={1.6}
          grainAnimated={false}
          contrast={1.1}
          gamma={1.08}
          saturation={0.52}
          centerX={0}
          centerY={0}
          zoom={0.9}
          frameRate={22}
          maxDpr={1}
        />
      </div>
      <Navbar copy={copy.nav} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero copy={copy.hero} />
        <WorkSection copy={copy.work} projects={copy.projects} previewCopy={copy.preview} />
        <AbilitySection copy={copy.ability} abilities={copy.abilities} />
        <ContactSection copy={copy.contact} />
      </main>
    </div>
  )
}

export default App
