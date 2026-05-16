import { useEffect, useRef, useState } from 'react'
import jeremyLogo from '../assets/images/Jeremy LOGO.svg?raw'

const navLinks = [
  { name: 'home', label: '首页', href: '#/' },
  { name: 'projects', label: '项目概览', href: '#/projects' },
  { name: 'about', label: '联系我', href: '#/about' },
]

function parseRgb(value) {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return null

  const alpha = match[4] === undefined ? 1 : Number(match[4])
  if (alpha === 0) return null

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  }
}

function relativeLuminance({ r, g, b }) {
  const toLinear = (channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(colorA, colorB) {
  const light = Math.max(relativeLuminance(colorA), relativeLuminance(colorB))
  const dark = Math.min(relativeLuminance(colorA), relativeLuminance(colorB))
  return (light + 0.05) / (dark + 0.05)
}

function getElementSurfaceColor(element) {
  let current = element

  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current)
    const backgroundColor = parseRgb(style.backgroundColor)

    if (backgroundColor) return backgroundColor

    const backgroundImageColor = parseRgb(style.backgroundImage)
    if (backgroundImageColor) return backgroundImageColor

    current = current.parentElement
  }

  return { r: 255, g: 255, b: 255 }
}

export default function AppNavbar({ activeRoute, themeIcon, onToggleTheme }) {
  const [isOnDarkSurface, setIsOnDarkSurface] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    function updateNavContrast() {
      const nav = document.querySelector('.figma-nav')
      if (!nav) return

      const rect = nav.getBoundingClientRect()
      const sampleX = Math.round(window.innerWidth / 2)
      const sampleY = Math.min(window.innerHeight - 1, Math.round(rect.bottom + 8))
      const sampledElement = document.elementFromPoint(sampleX, sampleY)

      if (!sampledElement) return

      const surfaceColor = getElementSurfaceColor(sampledElement)
      const darkText = { r: 35, g: 37, b: 43 }
      const whiteText = { r: 255, g: 255, b: 255 }
      const darkTextContrast = contrastRatio(darkText, surfaceColor)
      const whiteTextContrast = contrastRatio(whiteText, surfaceColor)

      setIsOnDarkSurface(darkTextContrast < 4.5 && whiteTextContrast > darkTextContrast)
    }

    function scheduleNavContrastUpdate() {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = window.requestAnimationFrame(updateNavContrast)
    }

    scheduleNavContrastUpdate()
    window.requestAnimationFrame(() => {
      scheduleNavContrastUpdate()
      window.requestAnimationFrame(scheduleNavContrastUpdate)
    })

    window.addEventListener('scroll', scheduleNavContrastUpdate, { passive: true })
    window.addEventListener('resize', scheduleNavContrastUpdate)

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scheduleNavContrastUpdate)
      window.removeEventListener('resize', scheduleNavContrastUpdate)
    }
  }, [activeRoute])

  return (
    <header className="site-header">
      <nav className={`figma-nav${isOnDarkSurface ? ' is-on-dark-surface' : ''}`} aria-label="主导航" data-node-id="203:8">
        <a className="figma-nav__logo" href="#/" aria-label="Jeremy 首页" data-node-id="203:9">
          <span className="figma-nav__logo-mark" dangerouslySetInnerHTML={{ __html: jeremyLogo }} />
        </a>

        <ul className="figma-nav__links">
          {navLinks.map((link) => (
            <li key={link.name} className={activeRoute === link.name ? 'is-active' : ''}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <button className="theme-toggle sr-only" type="button" onClick={onToggleTheme} aria-label="切换主题">
          <i className={themeIcon} />
        </button>
      </nav>
    </header>
  )
}
