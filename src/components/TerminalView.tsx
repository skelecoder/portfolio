import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface TerminalViewProps {
  onClose: () => void
}

// ASCII art header
const ASCII_HEADER = `
 █████╗ ███╗   ███╗██╗███╗   ██╗███████╗
██╔══██╗████╗ ████║██║████╗  ██║██╔════╝
███████║██╔████╔██║██║██╔██╗ ██║█████╗  
██╔══██║██║╚██╔╝██║██║██║╚██╗██║██╔══╝  
██║  ██║██║ ╚═╝ ██║██║██║ ╚████║███████╗
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
`

// Terminal content - portfolio as CLI output
const TERMINAL_CONTENT = [
  { prompt: '$ whoami', output: 'amine.bouhlal' },
  { prompt: '$ cat about.txt', output: `Software Engineer & AI Specialist
Background in architecture, now building intelligent systems.
Currently: NTT Data, T-Systems | Previously: Various startups
Location: Europe | Timezone: UTC+1` },
  { prompt: '$ ls skills/', output: `TypeScript  Python    React     Next.js
Node.js    FastAPI   AWS       Docker
AI/ML      LLMs      RAG       Automation` },
  { prompt: '$ ls projects/', output: `openclaw/       - AI agent orchestration platform
portfolio/      - This site (React + Three.js + Vite)
ai-experiments/ - Various AI/ML experiments` },
  { prompt: '$ cat interests.txt', output: `- Artificial Intelligence & Automation
- Software Architecture
- Surfing 🏄
- Padel 🎾` },
  { prompt: '$ cat contact.txt', output: `Email:    hello@aminebouhlal.com
GitHub:   github.com/skelecoder
LinkedIn: linkedin.com/in/aminebouhlal` },
]

export function TerminalView({ onClose }: TerminalViewProps) {
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  // Typing effect for prompts
  useEffect(() => {
    if (displayedLines >= TERMINAL_CONTENT.length) return

    const currentItem = TERMINAL_CONTENT[displayedLines]
    
    if (typingIndex < currentItem.prompt.length) {
      const timeout = setTimeout(() => {
        setCurrentPrompt(prev => prev + currentItem.prompt[typingIndex])
        setTypingIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      // Prompt done, show output after brief delay
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => prev + 1)
        setCurrentPrompt('')
        setTypingIndex(0)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [displayedLines, typingIndex])

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedLines, currentPrompt])

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
      {/* Terminal window */}
      <div className="w-full max-w-4xl h-[80vh] bg-[#0d1117] rounded-lg overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm font-mono">amine@portfolio ~ </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close terminal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
        >
          {/* ASCII header */}
          <pre className="text-green-400 text-[10px] md:text-xs mb-4 overflow-x-auto">
            {ASCII_HEADER}
          </pre>
          
          <p className="text-gray-500 mb-4">Welcome to my portfolio. Type 'help' for commands. Press ESC to exit.</p>

          {/* Completed commands */}
          {TERMINAL_CONTENT.slice(0, displayedLines).map((item, i) => (
            <div key={i} className="mb-4">
              <div className="text-green-400">{item.prompt}</div>
              <pre className="text-gray-300 whitespace-pre-wrap pl-2 border-l-2 border-gray-700 ml-1 mt-1">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Currently typing prompt */}
          {displayedLines < TERMINAL_CONTENT.length && (
            <div className="text-green-400">
              {currentPrompt}
              <span className="animate-pulse">▊</span>
            </div>
          )}

          {/* Finished state */}
          {displayedLines >= TERMINAL_CONTENT.length && (
            <div className="mt-4">
              <span className="text-green-400">$ </span>
              <span className="text-gray-500 animate-pulse">▊</span>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 bg-[#161b22] border-t border-gray-800 text-xs text-gray-500 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">ESC</kbd> or click X to return to normal view
        </div>
      </div>
    </div>
  )
}
