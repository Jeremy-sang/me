import { useEffect, useRef } from 'react'

const transitionDuration = 680
const internalDuration = 420
const wheelThreshold = 8

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getTrack(panel) {
  return panel.querySelector('.fh-phone-stage, .fh-card-row')
}

export default function HomeScrollStage({ children }) {
  const stageRef = useRef(null)
  const activeIndexRef = useRef(0)
  const desktopQueryRef = useRef(null)
  const panelsRef = useRef([])
  const internalStepsRef = useRef([])
  const internalIndexRef = useRef([])
  const isAnimatingRef = useRef(false)
  const releaseTimerRef = useRef(0)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    function isDesktopScroll() {
      return desktopQueryRef.current?.matches ?? false
    }

    function getInternalStepCount(panel) {
      const mode = panel.dataset.scrollMode

      if (mode === 'feature-sequence') return 2

      if (mode === 'horizontal-sequence') {
        const track = getTrack(panel)
        const items = track?.children.length ?? 0

        return Math.max(0, items - 1)
      }

      return 0
    }

    function getStageUnits() {
      return panelsRef.current.length + internalStepsRef.current.reduce((total, count) => total + count, 0)
    }

    function setScrollSpace() {
      stage.style.setProperty('--fh-stage-height', `${Math.max(1, getStageUnits()) * window.innerHeight}px`)
    }

    function setClassState(panel, className, enabled) {
      panel.classList.toggle(className, enabled)
    }

    function clearPanelInlineStyles(panel) {
      panel.style.removeProperty('opacity')
      panel.style.removeProperty('transform')
      panel.style.removeProperty('transition')
      panel.style.removeProperty('visibility')
      panel.style.removeProperty('z-index')
    }

    function setPanelTransition(panel, enabled) {
      if (enabled) {
        panel.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
        return
      }

      panel.style.removeProperty('transition')
    }

    function resetInternalMotion(panel) {
      const mode = panel.dataset.scrollMode
      const track = getTrack(panel)

      panel.style.setProperty('--fh-internal-progress', '0')
      panel.style.setProperty('--fh-horizontal-progress', '0')

      if (track) {
        track.style.removeProperty('transform')
      }

      if (mode === 'feature-sequence') {
        panel.querySelectorAll('.fh-feature-card, .fh-feature-copy, .fh-side-card').forEach((element) => {
          element.style.removeProperty('opacity')
          element.style.removeProperty('transform')
        })
      }
    }

    function applyFeatureMotion(panel, progress) {
      const total = Math.max(1, internalStepsRef.current[panelsRef.current.indexOf(panel)])
      const ratio = progress / total
      const card = panel.querySelector('.fh-feature-card')
      const copy = panel.querySelector('.fh-feature-copy')
      const topCard = panel.querySelector('.fh-side-card.top')
      const bottomCard = panel.querySelector('.fh-side-card.bottom')

      panel.style.setProperty('--fh-internal-progress', `${ratio}`)

      if (card) card.style.transform = `translate3d(0, ${-36 * ratio}px, 0) scale(${1 + 0.035 * ratio})`
      if (copy) {
        copy.style.opacity = `${1 - 0.24 * ratio}`
        copy.style.transform = `translate3d(0, ${-72 * ratio}px, 0)`
      }
      if (topCard) {
        topCard.style.opacity = `${1 - 0.28 * ratio}`
        topCard.style.transform = `translate3d(0, ${110 * ratio}px, 0)`
      }
      if (bottomCard) {
        bottomCard.style.opacity = `${1 - 0.22 * ratio}`
        bottomCard.style.transform = `translate3d(0, ${-130 * ratio}px, 0)`
      }
    }

    function applyHorizontalMotion(panel, progress) {
      const track = getTrack(panel)
      if (!track) return

      const total = Math.max(1, internalStepsRef.current[panelsRef.current.indexOf(panel)])
      const ratio = progress / total
      const items = [...track.children]
      const firstOffset = items[0]?.offsetLeft ?? 0
      const targetOffset = items[progress]?.offsetLeft ?? firstOffset + progress * 320
      const distance = targetOffset - firstOffset

      panel.style.setProperty('--fh-horizontal-progress', `${ratio}`)
      track.style.transform = `translate3d(${-distance}px, 0, 0)`
    }

    function applyInternalMotion(panel, progress) {
      const mode = panel.dataset.scrollMode

      if (mode === 'feature-sequence') {
        applyFeatureMotion(panel, progress)
        return
      }

      if (mode === 'horizontal-sequence') {
        applyHorizontalMotion(panel, progress)
      }
    }

    function applyPanelState() {
      const panels = panelsRef.current
      const activeIndex = activeIndexRef.current
      let nextPanelOffset = panels[activeIndex]?.offsetHeight ?? window.innerHeight

      panels.forEach((panel, index) => {
        setClassState(panel, 'is-active', index === activeIndex)
        setClassState(panel, 'is-before', index < activeIndex)
        setClassState(panel, 'is-after', index > activeIndex)

        if (index === activeIndex) {
          panel.style.zIndex = '120'
          panel.style.opacity = '1'
          panel.style.transform = 'translate3d(0, 0, 0) scale(1)'
          panel.style.visibility = 'visible'
          return
        }

        if (index < activeIndex) {
          panel.style.zIndex = `${80 + index}`
          panel.style.opacity = '0'
          panel.style.transform = 'translate3d(0, -8vh, 0) scale(0.965)'
          panel.style.visibility = 'hidden'
          return
        }

        panel.style.zIndex = `${80 + index}`
        panel.style.opacity = '1'
        panel.style.transform = `translate3d(0, ${nextPanelOffset}px, 0) scale(1)`
        panel.style.visibility = 'visible'
        nextPanelOffset += panel.offsetHeight
      })
    }

    function applyFollowingPreview(baseIndex, excludedPanels = new Set()) {
      const panels = panelsRef.current
      let nextPanelOffset = panels[baseIndex]?.offsetHeight ?? window.innerHeight

      panels.forEach((panel, index) => {
        if (index <= baseIndex || excludedPanels.has(panel)) return

        setPanelTransition(panel, false)
        setClassState(panel, 'is-active', false)
        setClassState(panel, 'is-before', false)
        setClassState(panel, 'is-after', true)
        panel.style.zIndex = `${100 + index}`
        panel.style.opacity = '1'
        panel.style.transform = `translate3d(0, ${nextPanelOffset}px, 0) scale(1)`
        panel.style.visibility = 'visible'
        nextPanelOffset += panel.offsetHeight
      })
    }

    function lockScroll(duration) {
      isAnimatingRef.current = true
      window.clearTimeout(releaseTimerRef.current)
      releaseTimerRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false
      }, duration)
    }

    function syncScrollPosition() {
      const activeIndex = activeIndexRef.current
      const consumedInternalSteps = internalStepsRef.current
        .slice(0, activeIndex)
        .reduce((total, count) => total + count, 0)
      const currentStep = activeIndex + consumedInternalSteps + internalIndexRef.current[activeIndex]

      window.scrollTo({
        top: currentStep * window.innerHeight,
        behavior: 'auto',
      })
    }

    function moveInternal(direction) {
      const activeIndex = activeIndexRef.current
      const maxStep = internalStepsRef.current[activeIndex]
      const currentStep = internalIndexRef.current[activeIndex]
      const nextStep = clamp(currentStep + direction, 0, maxStep)

      if (nextStep === currentStep) return false

      internalIndexRef.current[activeIndex] = nextStep
      applyInternalMotion(panelsRef.current[activeIndex], nextStep)
      syncScrollPosition()
      lockScroll(internalDuration)

      return true
    }

    function transitionToPanel(nextIndex, direction) {
      const panels = panelsRef.current
      const activeIndex = activeIndexRef.current
      if (nextIndex < 0 || nextIndex >= panels.length) return false

      const currentPanel = panels[activeIndex]
      const nextPanel = panels[nextIndex]
      const nextRect = nextPanel.getBoundingClientRect()
      const startY = direction > 0
        ? clamp(nextRect.top, 0, window.innerHeight)
        : clamp(nextRect.top, -window.innerHeight * 0.25, 0)

      lockScroll(transitionDuration)
      setPanelTransition(currentPanel, true)
      setPanelTransition(nextPanel, true)
      applyFollowingPreview(nextIndex, new Set([currentPanel, nextPanel]))

      nextPanel.style.visibility = 'visible'
      nextPanel.style.opacity = '1'
      nextPanel.style.zIndex = '140'
      nextPanel.style.transform = `translate3d(0, ${startY}px, 0) scale(1)`

      currentPanel.style.zIndex = '90'
      currentPanel.style.opacity = '1'
      currentPanel.style.transform = 'translate3d(0, 0, 0) scale(1)'

      nextPanel.getBoundingClientRect()

      window.requestAnimationFrame(() => {
        currentPanel.style.opacity = '0.74'
        currentPanel.style.transform = direction > 0
          ? 'translate3d(0, -9vh, 0) scale(0.965)'
          : 'translate3d(0, 7vh, 0) scale(0.98)'
        nextPanel.style.transform = 'translate3d(0, 0, 0) scale(1)'
      })

      window.setTimeout(() => {
        activeIndexRef.current = nextIndex
        panels.forEach((panel) => setPanelTransition(panel, false))
        applyPanelState()
        applyInternalMotion(panelsRef.current[activeIndexRef.current], internalIndexRef.current[activeIndexRef.current])
        syncScrollPosition()
      }, transitionDuration)

      return true
    }

    function handleWheel(event) {
      if (!isDesktopScroll() || !stage) return

      if (isAnimatingRef.current) {
        event.preventDefault()
        return
      }

      const direction = Math.sign(event.deltaY)

      if (direction === 0 || Math.abs(event.deltaY) < wheelThreshold || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return

      event.preventDefault()

      if (moveInternal(direction)) return

      transitionToPanel(activeIndexRef.current + direction, direction)
    }

    function collectPanels() {
      panelsRef.current = [...stage.querySelectorAll('.fh-scroll-panel')]
      internalStepsRef.current = panelsRef.current.map(getInternalStepCount)
      internalIndexRef.current = internalStepsRef.current.map(() => 0)
    }

    function enableScrollStage() {
      collectPanels()
      activeIndexRef.current = 0
      stage.classList.add('is-scroll-enhanced')
      setScrollSpace()
      panelsRef.current.forEach((panel) => {
        setPanelTransition(panel, false)
        resetInternalMotion(panel)
      })
      applyPanelState()
      syncScrollPosition()
    }

    function disableScrollStage() {
      stage.classList.remove('is-scroll-enhanced')
      stage.style.removeProperty('--fh-stage-height')
      panelsRef.current.forEach((panel) => {
        clearPanelInlineStyles(panel)
        resetInternalMotion(panel)
      })
    }

    function handleResizeMode() {
      if (isDesktopScroll()) {
        enableScrollStage()
      } else {
        disableScrollStage()
      }
    }

    desktopQueryRef.current = window.matchMedia('(min-width: 901px)')
    handleResizeMode()

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResizeMode)

    return () => {
      window.clearTimeout(releaseTimerRef.current)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResizeMode)
      disableScrollStage()
    }
  }, [])

  return (
    <div ref={stageRef} className="fh-scroll-stage">
      {children}
    </div>
  )
}
