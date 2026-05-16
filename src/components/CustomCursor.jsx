import { useEffect, useState } from 'react'
import cursorIcon from '../assets/images/鼠标指针.svg'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    function enableCustomCursor() {
      const enabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      setIsEnabled(enabled)
      document.documentElement.classList.toggle('has-custom-cursor', enabled)
    }

    function updateCursorPosition(event) {
      setPosition({ x: event.clientX, y: event.clientY })
      setIsVisible(true)
    }

    function hideCursor() {
      setIsVisible(false)
      setIsPressed(false)
    }

    function pressCursor() {
      setIsPressed(true)
    }

    function releaseCursor() {
      setIsPressed(false)
    }

    enableCustomCursor()
    window.addEventListener('mousemove', updateCursorPosition)
    window.addEventListener('mousedown', pressCursor)
    window.addEventListener('mouseup', releaseCursor)
    window.addEventListener('mouseenter', updateCursorPosition)
    window.addEventListener('mouseleave', hideCursor)
    window.addEventListener('resize', enableCustomCursor)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', updateCursorPosition)
      window.removeEventListener('mousedown', pressCursor)
      window.removeEventListener('mouseup', releaseCursor)
      window.removeEventListener('mouseenter', updateCursorPosition)
      window.removeEventListener('mouseleave', hideCursor)
      window.removeEventListener('resize', enableCustomCursor)
    }
  }, [])

  if (!isEnabled) return null

  return (
    <div
      className={`custom-cursor${isVisible ? ' is-visible' : ''}`}
      aria-hidden="true"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <img className={`custom-cursor__icon${isPressed ? ' is-pressed' : ''}`} src={cursorIcon} alt="" />
    </div>
  )
}
