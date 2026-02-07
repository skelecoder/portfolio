import { Avatar3D } from './components/Avatar3D'
import { Hero, About, Projects, Contact } from './components/Sections'

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
          <Avatar3D />
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
