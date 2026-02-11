import { useEffect } from 'react'
import { X } from 'lucide-react'

interface KeyboardHintsProps {
  onClose: () => void
}

const shortcuts = [
  { key: 'T', description: 'Toggle terminal mode' },
  { key: '?', description: 'Show keyboard shortcuts' },
  { key: 'ESC', description: 'Close overlays' },
  { key: '↑ ↓', description: 'Navigate sections' },
  { key: 'Home', description: 'Go to top' },
]

export function KeyboardHints({ onClose }: KeyboardHintsProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === '?') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="glass max-w-sm w-full rounded-2xl p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map(({ key, description }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-white/60 text-sm">{description}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/10 text-white/80 text-xs font-mono min-w-[2.5rem] text-center">
                {key}
              </kbd>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-dark-800 text-white/60">?</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-dark-800 text-white/60">ESC</kbd> to close
        </p>
      </div>
    </div>
  )
}
