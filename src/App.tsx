import { lazy, Suspense } from 'react'
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

function App() {
  return (
    <main className="bg-dark-900 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold gradient-text">AB</a>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-white/60 hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
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
