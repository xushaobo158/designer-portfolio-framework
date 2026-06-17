import { useEffect, useRef, useState } from 'react'
import './GradientText.css'

function GradientText({
  children,
  className = '',
  colors = ['#5227ff', '#ff9ffc', '#b497cf'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const rootRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const gradientColors = [...colors, colors[0]].join(', ')
  const gradientStyle = {
    '--gradient-colors': gradientColors,
    '--gradient-speed': `${animationSpeed}s`,
  }

  useEffect(() => {
    const node = rootRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: '100px',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={rootRef}
      className={`animated-gradient-text ${isVisible ? 'is-gradient-visible' : ''} ${showBorder ? 'has-gradient-border' : ''} ${className}`.trim()}
      style={gradientStyle}
    >
      {showBorder && <span className="gradient-overlay" aria-hidden="true" />}
      <span className="gradient-text-content">{children}</span>
    </span>
  )
}

export default GradientText
