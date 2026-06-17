import { useCallback, useEffect, useMemo, useRef } from 'react'
import './BorderGlow.css'

function parseHSL(hslString) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 200, s: 90, l: 75 }
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']

  return Object.fromEntries(opacities.map((opacity, index) => [
    `--glow-color${keys[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`,
  ]))
}

const gradientPositions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const gradientKeys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const variables = {}
  gradientKeys.forEach((key, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    variables[key] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`
  })
  variables['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return variables
}

function BorderGlow({
  as: Component = 'div',
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '200 90 75',
  backgroundColor = '#0d111a',
  borderRadius = 8,
  glowRadius = 28,
  glowIntensity = 0.72,
  coneSpread = 24,
  colors = ['#75e9e3', '#6ea8ff', '#9e8cff'],
  fillOpacity = 0.18,
  style,
  ...rest
}) {
  const cardRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef(null)

  const styleVariables = useMemo(() => ({
    '--card-bg': backgroundColor,
    '--edge-sensitivity': edgeSensitivity,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  }), [backgroundColor, borderRadius, colors, coneSpread, edgeSensitivity, fillOpacity, glowColor, glowIntensity, glowRadius])

  const updateGlow = useCallback(() => {
    frameRef.current = 0
    const card = cardRef.current
    const pointer = pointerRef.current
    if (!card || !pointer) return

    const rect = card.getBoundingClientRect()
    const x = pointer.x - rect.left
    const y = pointer.y - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const dx = x - centerX
    const dy = y - centerY
    const kx = dx === 0 ? Infinity : centerX / Math.abs(dx)
    const ky = dy === 0 ? Infinity : centerY / Math.abs(dy)
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360

    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3))
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [])

  const handlePointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return
    pointerRef.current = { x: event.clientX, y: event.clientY }
    if (!frameRef.current) frameRef.current = requestAnimationFrame(updateGlow)
  }, [updateGlow])

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = null
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    cardRef.current?.style.setProperty('--edge-proximity', '0')
  }, [])

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <Component
      ref={cardRef}
      className={`border-glow-card ${className}`.trim()}
      style={{ ...styleVariables, ...style }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </Component>
  )
}

export default BorderGlow
