import { useState, useEffect, useCallback } from 'react'

type Theme = 'dark' | 'light'

// Check if View Transitions API is available
const supportsViewTransitions = typeof document !== 'undefined' && 
  'startViewTransition' in document

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored) return stored
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    }
    return 'dark'
  })

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme')
      // Only auto-switch if user hasn't manually set a preference
      if (!stored) {
        setTheme(e.matches ? 'light' : 'dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggle = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    // Use View Transitions API if available for smooth animation
    if (supportsViewTransitions) {
      (document as any).startViewTransition(() => {
        setTheme(newTheme)
      })
    } else {
      setTheme(newTheme)
    }
  }, [theme])

  return { theme, setTheme, toggle }
}
