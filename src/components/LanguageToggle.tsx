import { useLanguage } from '../hooks/useLanguage'

const languages = [
  { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
  { code: 'es' as const, label: 'ES', flag: '🇪🇸' },
  { code: 'fr' as const, label: 'FR', flag: '🇫🇷' },
]

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-[var(--glass-bg)] backdrop-blur-sm rounded-full px-1.5 py-1 border border-[var(--glass-border)]">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`
            px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200
            ${lang === code 
              ? 'bg-accent text-white' 
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }
          `}
          aria-label={`Switch to ${label}`}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
