import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  
  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-accent transition-all hover:bg-[var(--glass-bg)] border border-transparent hover:border-[var(--glass-border)]"
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
