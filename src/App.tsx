import { lazy, Suspense, useState } from 'react'
import { Menu, X, Gamepad2 } from 'lucide-react'
import { Hero, About, Projects, Contact } from './components/Sections'

// Lazy load heavy components
const Avatar3D = lazy(() => import('./components/Avatar3D').then(m => ({ default: m.Avatar3D })))
const PadelGame = lazy(() => import('./components/PadelGame').then(m => ({ default: m.PadelGame })))

// Loading fallback with animated gradient sphere placeholder
function Avatar3DFallback() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="relative">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent via-purple-500 to-pink-500 opacity-40 blur-2xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-accent/20 animate-ping" />
        </div>
      </div>
    </div>
  )
}

// Navigation links data
const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Padel Game Easter Egg */}
      {showGame && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-dark-900/95 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        }>
          <PadelGame onClose={() => setShowGame(false)} />
        </Suspense>
      )}

      {/* Game Launch Button - Fixed */}
      <button
        onClick={() => setShowGame(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-accent hover:bg-accent/10 hover:scale-110 transition-all group"
        aria-label="Play Padel Breaker game"
        title="🎮 Play Padel Breaker"
      >
        <Gamepad2 size={20} />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-dark-800 text-xs text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Play Padel Breaker
        </span>
      </button>
      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold gradient-text">AB</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-white/60 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 top-[72px] bg-dark-900/95 backdrop-blur-lg transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-2xl font-medium text-white/80 hover:text-white hover:gradient-text transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero with 3D Avatar */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60" aria-hidden="true">
            <Suspense fallback={<Avatar3DFallback />}>
              <Avatar3D />
            </Suspense>
          </div>
          <Hero />
        </div>

        {/* Sections */}
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
