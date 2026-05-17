import { useCallback, useEffect, useRef } from 'react'
import './ClickSpark.css'

// Adapted from React Bits ClickSpark (MIT + Commons Clause).
// Source: https://reactbits.dev/animations/click-spark
export default function ClickSpark({
  sparkColor = '#0066cc',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
  extraScale = 1,
  children,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let resizeTimer = 0

    function resizeCanvas() {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = window.devicePixelRatio || 1
      const nextWidth = Math.max(1, Math.round(width * dpr))
      const nextHeight = Math.max(1, Math.round(height * dpr))

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth
        canvas.height = nextHeight
        canvas.style.width = `${Math.round(width)}px`
        canvas.style.height = `${Math.round(height)}px`
      }
    }

    function handleResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resizeCanvas, 100)
    }

    resizeCanvas()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(resizeTimer)
    }
  }, [])

  const easeFunc = useCallback(
    (progress) => {
      switch (easing) {
        case 'linear':
          return progress
        case 'ease-in':
          return progress * progress
        case 'ease-in-out':
          return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress
        default:
          return progress * (2 - progress)
      }
    },
    [easing],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let animationId = 0

    function draw(timestamp) {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)
        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)
        const x1 = (spark.x + distance * Math.cos(spark.angle)) * dpr
        const y1 = (spark.y + distance * Math.sin(spark.angle)) * dpr
        const x2 = (spark.x + (distance + lineLength) * Math.cos(spark.angle)) * dpr
        const y2 = (spark.y + (distance + lineLength) * Math.sin(spark.angle)) * dpr

        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2 * dpr
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      animationId = window.requestAnimationFrame(draw)
    }

    animationId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize])

  function handleClick(event) {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = event.clientX
    const y = event.clientY
    const now = performance.now()
    const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
      x,
      y,
      angle: (2 * Math.PI * index) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div className="click-spark-container" onClick={handleClick}>
      <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
      {children}
    </div>
  )
}
