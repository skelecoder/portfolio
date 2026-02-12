import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  
  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 dark:text-white/60 hover:text-accent dark:hover:text-accent transition-all hover:bg-white/5 dark:hover:bg-white/5"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="transition-transform hover:rotate-12" />
      ) : (
        <Moon size={18} className="transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
