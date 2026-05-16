import { useEffect, useMemo, useState } from 'react'
import AppFooter from './components/AppFooter.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import CustomCursor from './components/CustomCursor.jsx'
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
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <AppNavbar
        activeRoute={routeName}
        themeIcon={themeIcon}
        onToggleTheme={() => setIsDarkMode((value) => !value)}
      />
      <CustomCursor />

      <main>
        {routeName === 'projects' && <ProjectsView />}
        {routeName === 'about' && <AboutView />}
        {routeName === 'home' && <HomePage />}
      </main>

      {routeName !== 'home' && <AppFooter />}
    </div>
  )
}
