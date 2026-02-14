import { Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Rocket, Brain } from 'lucide-react'
import { useInView } from '../hooks/useInView'

// Reusable animated wrapper component
function FadeIn({ 
  children, 
  delay = 0,
  className = '',
  direction = 'up'
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  const transforms = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0, 0)' : undefined,
      }}
      // Apply initial transform via className when not in view
      data-visible={isInView}
    >
      <div className={`transition-transform duration-700 ease-out ${!isInView ? transforms[direction] : ''}`}
           style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  )
}

// Animated glow line with shimmer effect
function GlowLine() {
  const { ref, isInView } = useInView({ threshold: 0.5 })
  
  return (
    <div ref={ref} className="relative h-px mb-16 overflow-hidden">
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-1000 ${
          isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />
      {/* Shimmer effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-opacity duration-500 ${
          isInView ? 'animate-shimmer' : 'opacity-0'
        }`}
        style={{ 
          backgroundSize: '200% 100%',
          animation: isInView ? 'shimmer 2s ease-in-out infinite' : 'none'
        }}
      />
    </div>
  )
}

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center items-center relative px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      
      <div className="text-center z-10 max-w-4xl">
        <p 
          className={`text-accent font-mono text-sm md:text-base mb-4 tracking-widest uppercase transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          Tech Entrepreneur · AI Engineer · Surfer
        </p>
        
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-700 delay-150 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Amine<br />
          <span className="gradient-text inline-block hover:scale-105 transition-transform cursor-default">
            Bouhlal
          </span>
        </h1>
        
        <p 
          className={`text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Building the future of padel in Morocco with AI-driven solutions.
          Passionate about automation, agents, and turning complex problems into elegant products.
        </p>
        
        <div 
          className={`flex gap-4 justify-center mb-12 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a 
            href="#projects" 
            className="group px-8 py-3 bg-accent hover:bg-accent-light transition-all rounded-full font-medium relative overflow-hidden"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 border border-[var(--glass-border)] hover:border-accent hover:text-accent transition-all rounded-full font-medium"
          >
            Get in Touch
          </a>
        </div>
        
        <div 
          className={`flex gap-6 justify-center transition-all duration-700 delay-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <SocialLink href="https://github.com/skelecoder" icon={<Github size={20} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/aminebouhlal" icon={<Linkedin size={20} />} label="LinkedIn" />
          <SocialLink href="https://twitter.com/skelecoder" icon={<Twitter size={20} />} label="Twitter" />
          <SocialLink href="mailto:amine@x3.ma" icon={<Mail size={20} />} label="Email" />
        </div>
      </div>
      
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="w-6 h-10 border-2 border-[var(--glass-border)] rounded-full flex justify-center pt-2 hover:border-accent transition-colors cursor-pointer">
          <div className="w-1.5 h-3 bg-[var(--text-muted)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 rounded-full glass flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-accent/20 hover:border-accent/50 hover:scale-110 transition-all duration-300"
    >
      {icon}
    </a>
  )
}

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-[var(--text-muted)]">01.</span> About
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <FadeIn delay={100}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Based in Tangier, Morocco. Former architect turned software engineer.
                Currently leading AI transformation at NTT Data while building X3 — 
                the padel platform that will change how Morocco plays.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                When I'm not coding, you'll find me catching waves in Imsouane 
                or exploring new automation possibilities with AI agents.
              </p>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="TypeScript" color="#3178C6" />
                <TechBadge name="React" color="#61DAFB" />
                <TechBadge name="Next.js" color="#000000" />
                <TechBadge name="Node.js" color="#339933" />
                <TechBadge name="Python" color="#3776AB" />
                <TechBadge name="GCP" color="#4285F4" />
                <TechBadge name="Supabase" color="#3FCF8E" />
                <TechBadge name="Vercel" color="#000000" />
                <TechBadge name="Docker" color="#2496ED" />
                <TechBadge name="Tailwind" color="#06B6D4" />
              </div>
            </FadeIn>
          </div>
          
          <div className="space-y-6">
            <FadeIn delay={150} direction="right">
              <SkillCard icon={<Brain />} title="AI & Automation" desc="Vertex AI, LangChain, n8n, Agent orchestration" />
            </FadeIn>
            <FadeIn delay={250} direction="right">
              <SkillCard icon={<Code2 />} title="Full Stack" desc="React, Next.js, Node, TypeScript, Supabase" />
            </FadeIn>
            <FadeIn delay={350} direction="right">
              <SkillCard icon={<Rocket />} title="Cloud & DevOps" desc="GCP, Vercel, Docker, Kubernetes" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass rounded-xl p-6 hover:bg-white/5 hover:border-accent/30 hover:scale-[1.02] transition-all duration-300 cursor-default group">
      <div className="flex items-center gap-4">
        <div className="text-accent group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div>
          <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <span 
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium glass hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default group"
      style={{ 
        '--badge-color': color,
        borderColor: `${color}33`,
      } as React.CSSProperties}
    >
      <span 
        className="w-2 h-2 rounded-full group-hover:animate-pulse"
        style={{ backgroundColor: color }}
      />
      <span className="group-hover:text-[var(--badge-color)] transition-colors">{name}</span>
    </span>
  )
}

export function Projects() {
  const projects = [
    {
      title: 'X3',
      desc: 'The #1 padel platform for Morocco. Court booking, tournaments, coaching, and community — all in one app.',
      tech: ['Next.js', 'Supabase', 'TypeScript', 'Vercel'],
      link: 'https://x3.ma',
      featured: true,
    },
    {
      title: 'Agent Cell Platform',
      desc: 'AI-powered Business Process Services automation. Multi-agent orchestration for enterprise workflows.',
      tech: ['GCP', 'Vertex AI', 'Python', 'n8n'],
      featured: true,
    },
    {
      title: 'AITO Garage',
      desc: 'Internal AI transformation initiatives at NTT Data. Proof of concepts and production implementations.',
      tech: ['AI/ML', 'Automation', 'Enterprise'],
    },
  ]

  return (
    <section id="projects" className="py-32 px-6 bg-[var(--bg-secondary)]/50">
      <div className="max-w-5xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-[var(--text-muted)]">02.</span> Projects
          </h2>
        </FadeIn>
        
        <div className="space-y-8">
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 150}>
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ 
  title, 
  desc, 
  tech, 
  link, 
  featured 
}: { 
  title: string
  desc: string
  tech: string[]
  link?: string
  featured?: boolean 
}) {
  return (
    <div className={`glass rounded-2xl p-8 hover:bg-white/5 hover:border-accent/20 hover:scale-[1.01] transition-all duration-300 group ${featured ? 'border-accent/20' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          {featured && (
            <span className="text-xs text-accent font-mono mb-2 block animate-pulse">
              Featured Project
            </span>
          )}
          <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{title}</h3>
        </div>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent hover:scale-110 transition-all p-2"
            aria-label={`Visit ${title}`}
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      
      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <span 
            key={i} 
            className="px-3 py-1 text-xs font-mono text-accent/80 bg-accent/10 rounded-full hover:bg-accent/20 transition-colors"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[var(--text-muted)]">03.</span> Get in Touch
          </h2>
        </FadeIn>
        
        <FadeIn delay={100}>
          <p className="text-lg text-[var(--text-secondary)] mb-12 leading-relaxed">
            Whether you want to collaborate on a project, talk about AI, 
            or just say hi — my inbox is always open.
          </p>
        </FadeIn>
        
        <FadeIn delay={200}>
          <a 
            href="mailto:amine@x3.ma"
            className="group inline-block px-12 py-4 bg-accent hover:bg-accent-light transition-all rounded-full font-medium text-lg relative overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="relative z-10">Say Hello</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="mt-24 text-[var(--text-muted)] text-sm font-mono">
            <p className="hover:text-[var(--text-secondary)] transition-colors">Designed & Built by Amine Bouhlal</p>
            <p className="mt-2">© 2026</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
