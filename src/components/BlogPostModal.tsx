import { useEffect } from 'react'
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react'
import Markdown from 'react-markdown'
import type { BlogPost } from '../data/blogPosts'

interface BlogPostModalProps {
  post: BlogPost
  onClose: () => void
}

export function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-post-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div className="relative min-h-screen flex items-start justify-center px-4 py-8">
        <article 
          className="relative w-full max-w-3xl bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--glass-border)] my-8 animate-in fade-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[var(--glass-border)] bg-[var(--bg-primary)]/95 backdrop-blur-sm rounded-t-2xl">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to articles
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </header>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime} read
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <Markdown
                components={{
                  // Custom heading styles
                  h1: ({ children }) => (
                    <h1 
                      id="blog-post-title"
                      className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-12 mb-4 text-[var(--text-primary)]">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--text-primary)]">
                      {children}
                    </h3>
                  ),
                  // Paragraphs
                  p: ({ children }) => (
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  // Lists
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-[var(--text-secondary)] mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-[var(--text-secondary)] mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[var(--text-secondary)]">
                      {children}
                    </li>
                  ),
                  // Code blocks
                  code: ({ className, children }) => {
                    const isInline = !className
                    if (isInline) {
                      return (
                        <code className="px-1.5 py-0.5 text-sm bg-accent/10 text-accent rounded font-mono">
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code className="block p-4 bg-[var(--bg-secondary)] rounded-lg text-sm font-mono overflow-x-auto text-[var(--text-secondary)]">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="mb-6 overflow-hidden rounded-lg">
                      {children}
                    </pre>
                  ),
                  // Blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-accent pl-4 italic text-[var(--text-muted)] my-6">
                      {children}
                    </blockquote>
                  ),
                  // Links
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  // Strong/Bold
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[var(--text-primary)]">
                      {children}
                    </strong>
                  ),
                  // Emphasis/Italic
                  em: ({ children }) => (
                    <em className="italic text-[var(--text-secondary)]">
                      {children}
                    </em>
                  ),
                  // Horizontal rule
                  hr: () => (
                    <hr className="my-8 border-[var(--glass-border)]" />
                  ),
                }}
              >
                {post.content}
              </Markdown>
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6 md:p-10 pt-0">
            <div className="border-t border-[var(--glass-border)] pt-6">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-accent hover:bg-accent-light transition-colors rounded-full text-sm font-medium"
              >
                ← Back to all articles
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}
