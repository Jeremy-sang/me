import { useEffect, useRef, useState } from 'react'

const visibleOffset = 320

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > visibleOffset)
    }

    function scheduleVisibilityUpdate() {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = window.requestAnimationFrame(updateVisibility)
    }

    updateVisibility()
    window.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true })
    window.addEventListener('resize', scheduleVisibilityUpdate)

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scheduleVisibilityUpdate)
      window.removeEventListener('resize', scheduleVisibilityUpdate)
    }
  }, [])

  function handleBackToTop() {
    window.dispatchEvent(new CustomEvent('jeremy:back-to-top'))
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      aria-label="回到顶部"
      title="回到顶部"
      onClick={handleBackToTop}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <path d="M6 14.5 12 8l6 6.5" />
      </svg>
    </button>
  )
}
