# Portfolio Architecture Documentation

**Last Updated:** 2026-02-07  
**Site:** aminebouhlal.com  
**Owner:** Amine Bouhlal

---

## Tech Stack

### Core
- **Framework:** Vite 7.3.1
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.18

### 3D Graphics
- **Three.js:** 0.182.0
- **React Three Fiber:** 9.5.0
- **React Three Drei:** 10.7.7

### Icons & UI
- **Lucide React:** 0.563.0 (icon library)

### Build & Dev
- **Vite:** Fast build tool with HMR
- **ESLint:** Code quality with React hooks rules
- **PostCSS:** CSS processing with Tailwind

---

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Avatar3D.tsx       # 3D avatar using Three.js
│   │   └── Sections.tsx       # Hero, About, Projects, Contact
│   ├── App.tsx                # Main application component
│   ├── App.css                # Component-specific styles
│   ├── index.css              # Global styles + Tailwind imports
│   └── main.tsx               # Application entry point
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json               # Dependencies & scripts
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── eslint.config.js           # ESLint rules
```

---

## Application Architecture

### Component Hierarchy
```
App
├── Navigation (fixed header)
├── Hero Section
│   └── Avatar3D (3D background)
├── About Section
│   └── SkillCards (3 cards)
├── Projects Section
│   └── ProjectCards (3 projects)
└── Contact Section
```

### Sections Breakdown

#### 1. **Hero**
- Full-screen landing
- Animated gradient text for name
- Call-to-action buttons
- Social links (GitHub, LinkedIn, Twitter, Email)
- Scroll indicator (bounce animation)
- Background: 3D Avatar (opacity 60%)

#### 2. **About**
- Two-column grid (text + skills)
- Bio text (architect → engineer transition)
- 3 Skill cards:
  - AI & Automation
  - Full Stack
  - Cloud & DevOps
- Glassmorphism card design

#### 3. **Projects**
- Featured project: **X3** (padel platform)
- **Agent Cell Platform** (AI BPS automation)
- **AITO Garage** (NTT Data AI initiatives)
- Each project card shows: title, description, tech tags, external link

#### 4. **Contact**
- Centered CTA
- Email button
- Footer with copyright

---

## Design System

### Colors (from Tailwind config)
- **Background:** `#0a0a0f` (dark-900)
- **Accent:** `#6366f1` (indigo)
- **Accent Light:** `#818cf8`
- **Dark Variants:** 800, 850, 900

### Typography
- **Primary Font:** Inter (300-700 weights)
- **Mono Font:** JetBrains Mono (for code/tags)
- **Sizes:** Mobile-first responsive (text-5xl → text-8xl on desktop)

### Effects
- **Gradient Text:** Indigo → Purple → Pink gradient
- **Glass Effect:** `rgba(255,255,255,0.03)` + blur + border
- **Glow Line:** Horizontal gradient line (section dividers)
- **Custom Scrollbar:** Dark theme with subtle thumb

### Animations
- Smooth scroll behavior
- Bounce animation (scroll indicator)
- Hover transitions on buttons/cards
- Color transitions on links

---

## Navigation

### Sections
- `#about` → About section
- `#projects` → Projects section
- `#contact` → Contact section

### Mobile Responsiveness
- Navigation hidden on mobile (`md:flex`)
- Responsive text sizes
- Grid → Stack layout transitions

---

## External Links

### Social
- **GitHub:** https://github.com/skelecoder
- **LinkedIn:** https://linkedin.com/in/aminebouhlal
- **Twitter:** https://twitter.com/skelecoder
- **Email:** amine@x3.ma

### Projects
- **X3 Platform:** https://x3.ma

---

## Development

### Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Dev Server
- **Port:** Default Vite port (usually 5173)
- **Hot Module Replacement:** Enabled

---

## Deployment

### Repository
- **GitHub:** skelecoder/portfolio
- **Branch:** main (assumed)

### Deployment Target
- **Vercel** (auto-deploy on git push)
- URL: aminebouhlal.com

---

## Key Features

### ✅ Implemented
- Smooth scroll navigation
- 3D avatar background (Three.js)
- Glassmorphism UI
- Responsive design (mobile-first)
- Dark theme
- Social links integration
- Projects showcase

### 🔄 To Enhance
- Mobile navigation menu
- Core Web Vitals optimization
- Image optimization (WebP, lazy loading)
- SEO meta tags
- Structured data (JSON-LD)
- Accessibility improvements (ARIA labels)
- Dark mode toggle with persistence
- Animations/transitions
- 404 page
- RSS feed
- Sitemap

---

## Notes

- React 19 is latest stable
- Tailwind CSS v4 (uses new PostCSS plugin)
- No routing library (single-page with anchor links)
- No CMS/blog system yet
- No analytics/tracking configured
