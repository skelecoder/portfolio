import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Language = 'en' | 'es' | 'fr'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.blog': 'Writing',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Tech Entrepreneur & AI Engineer',
    'hero.description': 'Founder of X3, building the future of padel in Morocco. Passionate about AI, automation, and creating meaningful products.',
    'hero.cta': 'Get in touch',
    'hero.scroll': 'Scroll to explore',
    
    // About
    'about.title': 'About',
    'about.intro': "I'm a software engineer with a background in architecture, now focused on AI and building products that matter.",
    'about.passion': "My journey from designing buildings to designing systems gave me a unique perspective on structure, scalability, and user experience.",
    'about.current': "Currently leading X3, where we're revolutionizing padel in Morocco through technology.",
    
    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'From architecture to code — a journey of transformation.',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': "Things I've built that I'm proud of.",
    
    // Blog
    'blog.title': 'Writing',
    'blog.subtitle': 'Thoughts on AI, engineering, startups, and the occasional surf trip.',
    'blog.more': 'More posts coming soon...',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What people say about working with me.',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': "Let's build something great together.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent! I\'ll get back to you soon.',
    'contact.error': 'Something went wrong. Please try again.',
    'contact.fallback': 'Or email me directly at',
  },
  es: {
    // Nav
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.blog': 'Blog',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.role': 'Emprendedor Tech & Ingeniero IA',
    'hero.description': 'Fundador de X3, construyendo el futuro del pádel en Marruecos. Apasionado por la IA, automatización y crear productos con impacto.',
    'hero.cta': 'Contáctame',
    'hero.scroll': 'Scroll para explorar',
    
    // About
    'about.title': 'Sobre mí',
    'about.intro': 'Soy ingeniero de software con formación en arquitectura, ahora enfocado en IA y construir productos que importan.',
    'about.passion': 'Mi camino de diseñar edificios a diseñar sistemas me dio una perspectiva única sobre estructura, escalabilidad y experiencia de usuario.',
    'about.current': 'Actualmente liderando X3, donde estamos revolucionando el pádel en Marruecos a través de la tecnología.',
    
    // Experience
    'experience.title': 'Experiencia',
    'experience.subtitle': 'De arquitectura a código — un viaje de transformación.',
    
    // Projects
    'projects.title': 'Proyectos',
    'projects.subtitle': 'Cosas que he construido y de las que estoy orgulloso.',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Reflexiones sobre IA, ingeniería, startups y algún viaje de surf.',
    'blog.more': 'Más posts próximamente...',
    
    // Testimonials
    'testimonials.title': 'Testimonios',
    'testimonials.subtitle': 'Lo que dicen sobre trabajar conmigo.',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': 'Construyamos algo grande juntos.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado! Te responderé pronto.',
    'contact.error': 'Algo salió mal. Por favor intenta de nuevo.',
    'contact.fallback': 'O escríbeme directamente a',
  },
  fr: {
    // Nav
    'nav.about': 'À propos',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.testimonials': 'Témoignages',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Bonjour, je suis',
    'hero.role': 'Entrepreneur Tech & Ingénieur IA',
    'hero.description': 'Fondateur de X3, construisant le futur du padel au Maroc. Passionné par l\'IA, l\'automatisation et la création de produits significatifs.',
    'hero.cta': 'Me contacter',
    'hero.scroll': 'Scroll pour explorer',
    
    // About
    'about.title': 'À propos',
    'about.intro': 'Je suis ingénieur logiciel avec une formation en architecture, maintenant concentré sur l\'IA et la création de produits qui comptent.',
    'about.passion': 'Mon parcours de la conception de bâtiments à la conception de systèmes m\'a donné une perspective unique sur la structure, la scalabilité et l\'expérience utilisateur.',
    'about.current': 'Actuellement à la tête de X3, où nous révolutionnons le padel au Maroc grâce à la technologie.',
    
    // Experience
    'experience.title': 'Expérience',
    'experience.subtitle': 'De l\'architecture au code — un voyage de transformation.',
    
    // Projects
    'projects.title': 'Projets',
    'projects.subtitle': 'Des choses que j\'ai construites et dont je suis fier.',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Réflexions sur l\'IA, l\'ingénierie, les startups et quelques voyages de surf.',
    'blog.more': 'Plus d\'articles bientôt...',
    
    // Testimonials
    'testimonials.title': 'Témoignages',
    'testimonials.subtitle': 'Ce que les gens disent de travailler avec moi.',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Construisons quelque chose de grand ensemble.',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.sending': 'Envoi...',
    'contact.success': 'Message envoyé ! Je vous répondrai bientôt.',
    'contact.error': 'Une erreur s\'est produite. Veuillez réessayer.',
    'contact.fallback': 'Ou écrivez-moi directement à',
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang') as Language
      if (saved && ['en', 'es', 'fr'].includes(saved)) return saved
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2)
      if (browserLang === 'es') return 'es'
      if (browserLang === 'fr') return 'fr'
    }
    return 'en'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('portfolio-lang', newLang)
    document.documentElement.lang = newLang
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
