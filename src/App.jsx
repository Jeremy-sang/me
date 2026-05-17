import { useEffect, useMemo, useState } from 'react'
import AppFooter from './components/AppFooter.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import BackToTopButton from './components/BackToTopButton.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ClickSpark from './components/effects/ClickSpark/ClickSpark.jsx'
import AboutView from './views/AboutView.jsx'
import HomePage from './views/home/HomePage.jsx'
import ProjectsView from './views/ProjectsView.jsx'

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, '')

  if (hash === '/projects') return 'projects'
  if (hash === '/about') return 'about'

  return 'home'
}

export default function App() {
  const [routeName, setRouteName] = useState(getRouteFromHash)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setRouteName(getRouteFromHash())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const themeIcon = useMemo(() => (isDarkMode ? 'fas fa-sun' : 'fas fa-moon'), [isDarkMode])

  return (
    <ClickSpark sparkColor={isDarkMode ? '#2997ff' : '#0066cc'} sparkRadius={22} sparkSize={9}>
      <div className={`${isDarkMode ? 'dark-mode ' : ''}app-shell route-${routeName}`}>
        <AppNavbar
          activeRoute={routeName}
          themeIcon={themeIcon}
          onToggleTheme={() => setIsDarkMode((value) => !value)}
        />
        <CustomCursor />
        <BackToTopButton />

        <main>
          {routeName === 'projects' && <ProjectsView />}
          {routeName === 'about' && <AboutView />}
          {routeName === 'home' && <HomePage />}
        </main>

        {routeName !== 'home' && <AppFooter />}
      </div>
    </ClickSpark>
  )
}
