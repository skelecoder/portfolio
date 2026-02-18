export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-ai-agents',
    title: 'Building AI Agents That Actually Work in Production',
    excerpt: "Lessons learned from deploying multi-agent systems at enterprise scale. Spoiler: it's not about the model.",
    date: '2026-02-10',
    readTime: '8 min',
    tags: ['AI', 'Agents', 'Production'],
    content: `
# Building AI Agents That Actually Work in Production

After deploying dozens of AI agents across enterprise systems, I've learned that the difference between a demo and production isn't the model—it's everything around it.

## The Demo Trap

We've all seen it: an impressive demo where an AI agent handles complex tasks flawlessly. Then it meets the real world and falls apart. Why?

**Production is messy.** Users don't follow happy paths. Data is dirty. Systems fail. Network latency varies. And suddenly, your elegant agent architecture is fighting fires.

## Three Lessons That Saved My Sanity

### 1. Build for Failure, Not Success

Every agent call should assume failure. That means:

- **Timeouts everywhere.** I default to 30 seconds max per LLM call
- **Graceful degradation.** If the AI fails, have a fallback (even if it's "I don't know")
- **Idempotent operations.** Retrying should never cause duplicate side effects

\`\`\`typescript
async function safeAgentCall<T>(
  fn: () => Promise<T>,
  fallback: T,
  timeoutMs = 30000
): Promise<T> {
  try {
    return await Promise.race([
      fn(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeoutMs)
      )
    ])
  } catch (error) {
    console.error('Agent call failed:', error)
    return fallback
  }
}
\`\`\`

### 2. Observability is Everything

In traditional software, debugging is straightforward. With AI agents, you need to see *why* it made decisions. My stack:

- **Structured logging** for every decision point
- **Token usage tracking** (costs spiral fast)
- **Response quality metrics** beyond just "it worked"

The moment you can't explain why an agent did something, you've lost control.

### 3. Smaller Agents > One Big Agent

The temptation is to build one mega-agent that handles everything. Don't.

**Specialized agents** that do one thing well are:
- Easier to test
- Cheaper to run
- Simpler to debug
- More reliable

I orchestrate multiple small agents rather than trusting one to do everything.

## The Tech Stack That Works

After much trial and error:

- **OpenAI** for complex reasoning (when you need it)
- **Anthropic Claude** for structured outputs and coding
- **Local models** for classification and simple tasks
- **Redis queues** for async agent communication
- **PostgreSQL** for conversation history

## Final Thoughts

AI agents are powerful, but they're not magic. Treat them like any distributed system: assume failure, log everything, and keep things simple.

The best agent is the one that knows when to say "I need a human for this."

---

*What's your experience with production AI agents? Reach out—I'd love to hear your war stories.*
`
  },
  {
    slug: 'architect-to-developer',
    title: 'From Architect to Developer: A Career Pivot Story',
    excerpt: "How my background in architecture shaped my approach to software design and why I don't regret the switch.",
    date: '2026-01-15',
    readTime: '6 min',
    tags: ['Career', 'Architecture', 'Personal'],
    content: `
# From Architect to Developer: A Career Pivot Story

In 2018, I was designing buildings in Morocco. Today, I design software systems at NTT Data. The path between wasn't obvious, but looking back, it was inevitable.

## The Itch That Wouldn't Quit

I graduated from architecture school in Rabat with a passion for spatial design. But during every project, I found myself more interested in the tools than the buildings:

- Writing scripts to automate Revit workflows
- Building parametric models in Grasshopper
- Creating visualization tools for clients

The software was always more exciting than the walls it represented.

## The Pivot

In 2019, I made the jump. No bootcamp, no computer science degree—just relentless learning and side projects. My first "real" dev role was building internal tools at a small agency.

**It wasn't glamorous.** I remember debugging CSS for hours, feeling like I'd traded one set of frustrations for another. But unlike architecture, I could see results instantly. Deploy, refresh, done.

## What Architecture Taught Me About Code

Here's what surprises people: my architecture background is now my biggest advantage.

### 1. Systems Thinking

Architects design buildings as *systems*—structure, HVAC, electrical, plumbing, all working together. Software is the same. Every component affects every other.

When I architect a system, I think about:
- Load paths (like structural loads, but for data)
- Circulation (user flows, like building circulation)
- Modularity (prefab vs. custom construction)

### 2. Designing for Humans

Architecture is fundamentally about human experience. Good software is too.

I catch myself asking: "How does this *feel* to use?" before "Does this work?" That empathy for users came from years of thinking about how people move through spaces.

### 3. Working with Constraints

In architecture, you have budgets, site conditions, building codes—endless constraints. You learn to be creative within limits.

When I hit technical constraints now, I don't see blockers. I see design problems with interesting solutions.

## What I Had to Unlearn

Not everything transferred smoothly:

- **Perfectionism.** Buildings need to be perfect before construction. Software can iterate.
- **Long timelines.** I had to embrace shipping fast and improving later.
- **Formal processes.** Architecture is all documentation. I had to learn when to skip the docs and just build.

## Do I Miss It?

Sometimes. There's something magical about seeing a physical space you designed come to life.

But software has its own magic: the ability to build something that reaches millions of people, from anywhere, for free.

And honestly? I still think of myself as an architect. I just design different kinds of structures now.

---

*If you're considering a career pivot, my advice: the skills that feel unrelated are often your secret weapons. Don't throw them away—integrate them.*
`
  },
  {
    slug: 'morocco-padel-tech',
    title: 'Why Morocco Needs a Padel Tech Revolution',
    excerpt: 'The story behind X3 and how we\'re using technology to grow the sport we love.',
    date: '2025-12-20',
    readTime: '5 min',
    tags: ['Startups', 'Padel', 'X3'],
    content: `
# Why Morocco Needs a Padel Tech Revolution

Padel is exploding in Morocco. Courts are popping up everywhere—from Tangier to Agadir, from Casablanca to Marrakech. But the infrastructure to support this growth? It's stuck in the past.

That's why we're building X3.

## The Problem We Saw

Every padel player in Morocco knows the frustration:

- **Booking is chaotic.** WhatsApp messages, phone calls, confusion about availability
- **Finding players is hard.** No way to match skill levels or find partners for a game
- **Club management is manual.** Spreadsheets, cash payments, no analytics

The sport is growing 40% year over year, but the tech serving it is from 2010.

## Enter X3

X3 is our answer: a platform that makes playing, booking, and managing padel seamless.

### For Players

- **Instant booking** with real-time court availability
- **Player matching** based on level, schedule, and location
- **Social features** to build your padel community

### For Clubs

- **Management dashboard** with booking analytics
- **Automated payments** (finally, no more cash-only)
- **Customer insights** to grow membership

## The Tech Behind It

We're building X3 with a modern stack:

- **Mobile-first** (React Native)
- **Real-time sync** for bookings (Supabase)
- **Smart matching** algorithms for player pairing
- **Cloud-native** infrastructure (GCP)

But the real innovation isn't technical—it's understanding the local context.

## Why Morocco Specifically

International padel apps exist, but they don't understand Morocco:

- **Payment systems** (we support local methods)
- **Language** (French, Arabic, and Darija support)
- **Club relationships** (we work *with* clubs, not against them)

We're not copying a European model. We're building for Moroccan players, by Moroccan builders.

## What's Next

We're currently piloting with 5 clubs in Tangier and Casablanca. Early results are promising:

- 70% reduction in booking conflicts
- 3x increase in off-peak court usage
- 92% player satisfaction score

By end of 2026, we want X3 in every major Moroccan city.

## Join the Revolution

If you're a club owner, player, or just curious about what we're building—reach out. We're always looking for:

- **Beta testers** who want early access
- **Club partners** ready to modernize
- **Investors** who see the opportunity

Padel in Morocco is just getting started. Let's build the future together.

---

*🎾 Follow our journey: @X3Padel on Instagram and Twitter*
`
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}
