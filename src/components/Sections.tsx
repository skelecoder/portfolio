import { Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Rocket, Brain } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      
      <div className="text-center z-10 max-w-4xl">
        <p className="text-accent font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          Tech Entrepreneur · AI Engineer · Surfer
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Amine<br />
          <span className="gradient-text">Bouhlal</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
          Building the future of padel in Morocco with AI-driven solutions.
          Passionate about automation, agents, and turning complex problems into elegant products.
        </p>
        
        <div className="flex gap-4 justify-center mb-12">
          <a href="#projects" className="px-8 py-3 bg-accent hover:bg-accent-light transition-colors rounded-full font-medium">
            View Work
          </a>
          <a href="#contact" className="px-8 py-3 border border-white/20 hover:border-white/40 transition-colors rounded-full font-medium">
            Get in Touch
          </a>
        </div>
        
        <div className="flex gap-6 justify-center">
          <SocialLink href="https://github.com/skelecoder" icon={<Github size={20} />} />
          <SocialLink href="https://linkedin.com/in/aminebouhlal" icon={<Linkedin size={20} />} />
          <SocialLink href="https://twitter.com/skelecoder" icon={<Twitter size={20} />} />
          <SocialLink href="mailto:amine@x3.ma" icon={<Mail size={20} />} />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
    >
      {icon}
    </a>
  )
}

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glow-line mb-16" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-white/40">01.</span> About
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Based in Tangier, Morocco. Former architect turned software engineer.
              Currently leading AI transformation at NTT Data while building X3 — 
              the padel platform that will change how Morocco plays.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              When I'm not coding, you'll find me catching waves in Imsouane 
              or exploring new automation possibilities with AI agents.
            </p>
          </div>
          
          <div className="space-y-6">
            <SkillCard icon={<Brain />} title="AI & Automation" desc="Vertex AI, LangChain, n8n, Agent orchestration" />
            <SkillCard icon={<Code2 />} title="Full Stack" desc="React, Next.js, Node, TypeScript, Supabase" />
            <SkillCard icon={<Rocket />} title="Cloud & DevOps" desc="GCP, Vercel, Docker, Kubernetes" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass rounded-xl p-6 hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-accent">{icon}</div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-white/50">{desc}</p>
        </div>
      </div>
    </div>
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
    <section id="projects" className="py-32 px-6 bg-dark-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="glow-line mb-16" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          <span className="text-white/40">02.</span> Projects
        </h2>
        
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
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
    <div className={`glass rounded-2xl p-8 hover:bg-white/5 transition-all group ${featured ? 'border-accent/20' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          {featured && <span className="text-xs text-accent font-mono mb-2 block">Featured Project</span>}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-accent transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      
      <p className="text-white/60 mb-6 leading-relaxed">{desc}</p>
      
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <span key={i} className="px-3 py-1 text-xs font-mono text-accent/80 bg-accent/10 rounded-full">
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
        <div className="glow-line mb-16" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-white/40">03.</span> Get in Touch
        </h2>
        
        <p className="text-lg text-white/60 mb-12 leading-relaxed">
          Whether you want to collaborate on a project, talk about AI, 
          or just say hi — my inbox is always open.
        </p>
        
        <a 
          href="mailto:amine@x3.ma"
          className="inline-block px-12 py-4 bg-accent hover:bg-accent-light transition-colors rounded-full font-medium text-lg"
        >
          Say Hello
        </a>
        
        <div className="mt-24 text-white/30 text-sm font-mono">
          <p>Designed & Built by Amine Bouhlal</p>
          <p className="mt-2">© 2026</p>
        </div>
      </div>
    </section>
  )
}
