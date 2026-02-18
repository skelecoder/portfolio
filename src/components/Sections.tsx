import { useState } from 'react'
import { Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Rocket, Brain, Calendar, ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../hooks/useLanguage'
import { blogPosts, type BlogPost } from '../data/blogPosts'
import { BlogPostModal } from './BlogPostModal'

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
  const { t } = useLanguage()

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center items-center relative px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      
      <div className="text-center z-10 max-w-4xl">
        <p 
          className={`text-accent font-mono text-sm md:text-base mb-4 tracking-widest uppercase transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {t('hero.role')}
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
          {t('hero.description')}
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
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 border border-[var(--glass-border)] hover:border-accent hover:text-accent transition-all rounded-full font-medium"
          >
            {t('nav.contact')}
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
  const { t } = useLanguage()
  
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-[var(--text-muted)]">01.</span> {t('about.title')}
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
            
            <FadeIn delay={450} direction="right">
              <a 
                href="https://github.com/skelecoder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block glass rounded-xl p-4 hover:bg-white/5 hover:border-accent/30 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                  <span className="font-semibold group-hover:text-accent transition-colors">GitHub Activity</span>
                </div>
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=skelecoder&show_icons=true&hide_border=true&bg_color=00000000&title_color=818cf8&icon_color=818cf8&text_color=94a3b8&hide_rank=true&hide_title=true&include_all_commits=true"
                  alt="GitHub Stats"
                  className="w-full opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </a>
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

// Experience timeline data
const experiences = [
  {
    year: '2024 - Present',
    role: 'AI Transformation Lead',
    company: 'NTT Data',
    desc: 'Leading AI initiatives and agent orchestration platforms. Driving enterprise automation with multi-agent systems.',
    tech: ['Vertex AI', 'LangChain', 'Python', 'n8n'],
  },
  {
    year: '2022 - 2024',
    role: 'Senior Software Engineer',
    company: 'T-Systems / NTT',
    desc: 'Built scalable cloud solutions and internal tools. Led technical architecture for key client projects.',
    tech: ['GCP', 'TypeScript', 'React', 'Node.js'],
  },
  {
    year: '2020 - 2022',
    role: 'Full Stack Developer',
    company: 'Freelance',
    desc: 'Developed web applications for startups and SMBs. Specialized in React ecosystems and cloud deployments.',
    tech: ['React', 'Next.js', 'Firebase', 'AWS'],
  },
  {
    year: '2016 - 2020',
    role: 'Architect → Developer',
    company: 'Career Pivot',
    desc: 'Transitioned from architecture to software engineering. Self-taught programming while working in design.',
    tech: ['Architecture', 'AutoCAD', 'Python', 'Web Dev'],
  },
]

export function Experience() {
  const { t } = useLanguage()
  
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-[var(--text-muted)]">02.</span> {t('experience.title')}
          </h2>
        </FadeIn>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent transform md:-translate-x-1/2" />
          
          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`relative flex flex-col md:flex-row gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 mt-2 ring-4 ring-[var(--bg-primary)] z-10" />
                
                {/* Content */}
                <div className={`ml-6 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-accent font-mono text-sm">{exp.year}</span>
                  <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                  <p className="text-[var(--text-muted)] font-medium">{exp.company}</p>
                  <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">{exp.desc}</p>
                  
                  <div className={`flex flex-wrap gap-2 mt-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.tech.map((t, j) => (
                      <span key={j} className="px-2 py-1 text-xs font-mono text-accent/80 bg-accent/10 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  const { t } = useLanguage()
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
            <span className="text-[var(--text-muted)]">03.</span> {t('projects.title')}
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

export function Blog() {
  const { t } = useLanguage()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  
  return (
    <>
      {/* Blog Post Modal */}
      {selectedPost && (
        <BlogPostModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
      
      <section id="blog" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <GlowLine />
          
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[var(--text-muted)]">04.</span> {t('blog.title')}
            </h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl">
              {t('blog.subtitle')}
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={150 + i * 100}>
                <BlogPostCard 
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={500}>
            <div className="mt-12 text-center">
              <span className="text-[var(--text-muted)] text-sm font-mono">
                {t('blog.more')}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function BlogPostCard({ 
  post,
  onClick
}: { 
  post: BlogPost
  onClick: () => void
}) {
  const { title, excerpt, date, readTime, tags } = post
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
  
  return (
    <button 
      onClick={onClick}
      className="glass rounded-2xl p-6 h-full flex flex-col hover:bg-white/5 hover:border-accent/20 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group text-left w-full cursor-pointer"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span 
            key={i}
            className="px-2 py-0.5 text-xs font-mono text-accent/70 bg-accent/10 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors flex items-start gap-2">
        <span className="flex-1">{title}</span>
        <ArrowUpRight size={18} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
      </h3>
      
      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow mb-4">
        {excerpt}
      </p>
      
      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] border-t border-[var(--glass-border)] pt-4 mt-auto">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formattedDate}
        </span>
        <span>{readTime} read</span>
      </div>
    </button>
  )
}

// Testimonials data
const testimonials = [
  {
    quote: "Amine has an exceptional ability to translate complex AI concepts into practical business solutions. His work on our automation platform saved us hundreds of hours.",
    name: "Carlos Martínez",
    role: "Head of Digital Innovation",
    company: "NTT Data",
  },
  {
    quote: "Working with Amine was a game-changer for our startup. He built our MVP in record time and the architecture has scaled beautifully with our growth.",
    name: "Sara El Idrissi",
    role: "Founder & CEO",
    company: "TechStart Morocco",
  },
  {
    quote: "Rare to find someone who excels at both technical implementation and product thinking. Amine brings a unique perspective from his architecture background.",
    name: "Thomas Weber",
    role: "Engineering Manager",
    company: "T-Systems",
  },
]

export function Testimonials() {
  const { t } = useLanguage()
  
  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[var(--text-muted)]">05.</span> {t('testimonials.title')}
          </h2>
        </FadeIn>
        
        <FadeIn delay={100}>
          <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl">
            {t('testimonials.subtitle')}
          </p>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <FadeIn key={i} delay={150 + i * 100}>
              <TestimonialCard {...testimonial} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col hover:bg-white/5 hover:border-accent/20 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group">
      {/* Quote icon */}
      <div className="text-4xl text-accent/30 mb-4 font-serif leading-none group-hover:text-accent/50 transition-colors">"</div>
      
      {/* Quote text */}
      <p className="text-[var(--text-secondary)] leading-relaxed flex-grow mb-6 text-sm md:text-base">
        {quote}
      </p>
      
      {/* Author */}
      <div className="border-t border-[var(--glass-border)] pt-4 mt-auto">
        <p className="font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors">{name}</p>
        <p className="text-sm text-[var(--text-muted)]">{role}</p>
        <p className="text-xs text-accent/70 font-mono mt-1">{company}</p>
      </div>
    </div>
  )
}

export function Contact() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')

    try {
      const response = await fetch('https://formspree.io/f/xpwzqkwa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <GlowLine />
        
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-[var(--text-muted)]">06.</span> {t('contact.title')}
          </h2>
        </FadeIn>
        
        <FadeIn delay={100}>
          <p className="text-lg text-[var(--text-secondary)] mb-12 leading-relaxed text-center">
            {t('contact.subtitle')}
          </p>
        </FadeIn>

        {formState === 'success' ? (
          <FadeIn>
            <div className="text-center py-12 px-6 rounded-2xl bg-accent/10 border border-accent/30">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-accent">Message Sent!</h3>
              <p className="text-[var(--text-secondary)]">Thanks for reaching out. I'll get back to you soon.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-6 text-accent hover:text-accent-light transition-colors font-medium"
              >
                Send another message
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                  placeholder="Tell me about your project, idea, or just say hello..."
                />
              </div>

              {formState === 'error' && (
                <div className="text-red-400 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Something went wrong. Please try again or email me directly.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="group w-full sm:w-auto px-12 py-4 bg-accent hover:bg-accent-light disabled:opacity-70 disabled:cursor-not-allowed transition-all rounded-full font-medium text-lg relative overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {formState === 'sending' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-light via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
                
                <span className="text-[var(--text-muted)] text-sm">
                  or email me at{' '}
                  <a href="mailto:amine@x3.ma" className="text-accent hover:text-accent-light transition-colors">
                    amine@x3.ma
                  </a>
                </span>
              </div>
            </form>
          </FadeIn>
        )}
        
        <FadeIn delay={400}>
          <div className="mt-24 text-[var(--text-muted)] text-sm font-mono text-center">
            <p className="hover:text-[var(--text-secondary)] transition-colors">Designed & Built by Amine Bouhlal</p>
            <p className="mt-2">© 2026</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
