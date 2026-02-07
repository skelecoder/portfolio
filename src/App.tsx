import { lazy, Suspense, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Hero, About, Projects, Contact } from './components/Sections'

// Lazy load Avatar3D to reduce initial bundle (Three.js is ~1MB)
const Avatar3D = lazy(() => import('./components/Avatar3D').then(m => ({ default: m.Avatar3D })))

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

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <main className="bg-dark-900 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
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

      {/* Hero with 3D Avatar */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
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
  )
}

export default App
