import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Trophy, RotateCcw } from 'lucide-react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

interface Block {
  x: number
  y: number
  width: number
  height: number
  color: string
  hits: number
  text?: string
}

interface GameState {
  score: number
  lives: number
  level: number
  gameOver: boolean
  won: boolean
  started: boolean
}

const COLORS = {
  accent: '#6366f1',
  accentLight: '#818cf8',
  purple: '#a855f7',
  pink: '#ec4899',
  dark: '#0a0a0f',
  glass: 'rgba(255, 255, 255, 0.1)',
}

const SKILLS = [
  'React', 'TypeScript', 'AI', 'Node.js', 
  'Python', 'GCP', 'Next.js', 'Vercel',
  'Docker', 'n8n', 'Supabase', 'Three.js'
]

export function PadelGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    won: false,
    started: false,
  })
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 })
  
  const gameRef = useRef({
    paddle: { x: 0, y: 0, width: 80, height: 12 },
    ball: { x: 0, y: 0, vx: 0, vy: 0, radius: 8, trail: [] as { x: number; y: number; alpha: number }[] },
    blocks: [] as Block[],
    particles: [] as Particle[],
    animationId: 0,
    lastTime: 0,
    combo: 0,
    maxCombo: 0,
  })

  // Initialize game
  const initGame = useCallback((width: number, height: number, level: number = 1) => {
    const game = gameRef.current
    const paddleY = height - 40
    
    game.paddle = {
      x: width / 2 - 40,
      y: paddleY,
      width: 80,
      height: 12,
    }
    
    game.ball = {
      x: width / 2,
      y: paddleY - 20,
      vx: 0,
      vy: 0,
      radius: 8,
      trail: [],
    }
    
    // Create blocks based on level
    game.blocks = []
    const blockWidth = (width - 40) / 4
    const blockHeight = 28
    const rows = Math.min(3 + level, 6)
    const colors = [COLORS.accent, COLORS.purple, COLORS.pink, COLORS.accentLight]
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < 4; col++) {
        const skillIndex = (row * 4 + col) % SKILLS.length
        game.blocks.push({
          x: 20 + col * blockWidth,
          y: 60 + row * (blockHeight + 8),
          width: blockWidth - 8,
          height: blockHeight,
          color: colors[row % colors.length],
          hits: row < 2 ? 1 : 2,
          text: SKILLS[skillIndex],
        })
      }
    }
    
    game.particles = []
    game.combo = 0
  }, [])

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const width = Math.min(rect.width - 32, 500)
        const height = Math.min(rect.height - 120, 700)
        setDimensions({ width, height })
        initGame(width, height, gameState.level)
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [initGame, gameState.level])

  // Launch ball
  const launchBall = useCallback(() => {
    const game = gameRef.current
    if (game.ball.vx === 0 && game.ball.vy === 0) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5
      const speed = 6 + gameState.level
      game.ball.vx = Math.cos(angle) * speed
      game.ball.vy = Math.sin(angle) * speed
      setGameState(s => ({ ...s, started: true }))
    }
  }, [gameState.level])

  // Create explosion particles
  const createExplosion = useCallback((x: number, y: number, color: string) => {
    const game = gameRef.current
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12
      const speed = 2 + Math.random() * 3
      game.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
        size: 3 + Math.random() * 3,
      })
    }
  }, [])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const game = gameRef.current
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - game.lastTime) / 16.67, 2)
      game.lastTime = timestamp
      
      const { width, height } = dimensions
      
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#0a0a0f')
      gradient.addColorStop(1, '#12121a')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)'
      ctx.lineWidth = 1
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }
      for (let i = 0; i < height; i += 30) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }
      
      if (!gameState.gameOver && !gameState.won) {
        // Update ball
        if (game.ball.vx !== 0 || game.ball.vy !== 0) {
          game.ball.x += game.ball.vx * deltaTime
          game.ball.y += game.ball.vy * deltaTime
          
          // Ball trail
          game.ball.trail.unshift({ x: game.ball.x, y: game.ball.y, alpha: 1 })
          if (game.ball.trail.length > 15) game.ball.trail.pop()
          game.ball.trail.forEach(t => t.alpha *= 0.85)
          
          // Wall collisions
          if (game.ball.x - game.ball.radius < 0 || game.ball.x + game.ball.radius > width) {
            game.ball.vx *= -1
            game.ball.x = Math.max(game.ball.radius, Math.min(width - game.ball.radius, game.ball.x))
          }
          if (game.ball.y - game.ball.radius < 0) {
            game.ball.vy *= -1
            game.ball.y = game.ball.radius
          }
          
          // Paddle collision
          if (
            game.ball.y + game.ball.radius > game.paddle.y &&
            game.ball.y - game.ball.radius < game.paddle.y + game.paddle.height &&
            game.ball.x > game.paddle.x &&
            game.ball.x < game.paddle.x + game.paddle.width
          ) {
            const hitPos = (game.ball.x - game.paddle.x) / game.paddle.width
            const angle = -Math.PI / 2 + (hitPos - 0.5) * Math.PI * 0.6
            const speed = Math.sqrt(game.ball.vx ** 2 + game.ball.vy ** 2)
            game.ball.vx = Math.cos(angle) * speed
            game.ball.vy = Math.sin(angle) * speed
            game.ball.y = game.paddle.y - game.ball.radius
            createExplosion(game.ball.x, game.ball.y, COLORS.accent)
          }
          
          // Block collisions
          for (let i = game.blocks.length - 1; i >= 0; i--) {
            const block = game.blocks[i]
            if (
              game.ball.x + game.ball.radius > block.x &&
              game.ball.x - game.ball.radius < block.x + block.width &&
              game.ball.y + game.ball.radius > block.y &&
              game.ball.y - game.ball.radius < block.y + block.height
            ) {
              block.hits--
              game.combo++
              game.maxCombo = Math.max(game.maxCombo, game.combo)
              
              const points = 10 * game.combo * gameState.level
              setGameState(s => ({ ...s, score: s.score + points }))
              
              if (block.hits <= 0) {
                createExplosion(block.x + block.width / 2, block.y + block.height / 2, block.color)
                game.blocks.splice(i, 1)
              }
              
              // Determine bounce direction
              const overlapX = Math.min(
                game.ball.x + game.ball.radius - block.x,
                block.x + block.width - (game.ball.x - game.ball.radius)
              )
              const overlapY = Math.min(
                game.ball.y + game.ball.radius - block.y,
                block.y + block.height - (game.ball.y - game.ball.radius)
              )
              
              if (overlapX < overlapY) {
                game.ball.vx *= -1
              } else {
                game.ball.vy *= -1
              }
              
              break
            }
          }
          
          // Check win
          if (game.blocks.length === 0) {
            if (gameState.level < 3) {
              setGameState(s => ({ ...s, level: s.level + 1, started: false }))
              initGame(width, height, gameState.level + 1)
            } else {
              setGameState(s => ({ ...s, won: true }))
            }
          }
          
          // Ball out of bounds
          if (game.ball.y > height + 20) {
            game.combo = 0
            setGameState(s => {
              const newLives = s.lives - 1
              if (newLives <= 0) {
                return { ...s, lives: 0, gameOver: true }
              }
              return { ...s, lives: newLives, started: false }
            })
            game.ball = {
              x: width / 2,
              y: game.paddle.y - 20,
              vx: 0,
              vy: 0,
              radius: 8,
              trail: [],
            }
          }
        }
      }
      
      // Update particles
      game.particles = game.particles.filter(p => {
        p.x += p.vx * deltaTime
        p.y += p.vy * deltaTime
        p.vy += 0.1 * deltaTime
        p.life -= 0.02 * deltaTime
        return p.life > 0
      })
      
      // Draw blocks
      game.blocks.forEach(block => {
        // Glow
        ctx.shadowColor = block.color
        ctx.shadowBlur = 10
        
        // Block
        ctx.fillStyle = block.hits > 1 
          ? block.color 
          : block.color + '80'
        ctx.beginPath()
        ctx.roundRect(block.x, block.y, block.width, block.height, 6)
        ctx.fill()
        
        // Glass effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.beginPath()
        ctx.roundRect(block.x, block.y, block.width, block.height / 2, [6, 6, 0, 0])
        ctx.fill()
        
        // Text
        if (block.text) {
          ctx.shadowBlur = 0
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
          ctx.font = 'bold 10px Inter, system-ui'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(block.text, block.x + block.width / 2, block.y + block.height / 2)
        }
        
        ctx.shadowBlur = 0
      })
      
      // Draw particles
      game.particles.forEach(p => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      
      // Draw ball trail
      game.ball.trail.forEach((t, i) => {
        const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, game.ball.radius)
        gradient.addColorStop(0, `rgba(99, 102, 241, ${t.alpha * 0.5})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(t.x, t.y, game.ball.radius * (1 - i * 0.05), 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Draw ball
      ctx.shadowColor = COLORS.accent
      ctx.shadowBlur = 20
      const ballGradient = ctx.createRadialGradient(
        game.ball.x - 2, game.ball.y - 2, 0,
        game.ball.x, game.ball.y, game.ball.radius
      )
      ballGradient.addColorStop(0, '#fff')
      ballGradient.addColorStop(0.3, COLORS.accentLight)
      ballGradient.addColorStop(1, COLORS.accent)
      ctx.fillStyle = ballGradient
      ctx.beginPath()
      ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
      
      // Draw paddle
      ctx.shadowColor = COLORS.pink
      ctx.shadowBlur = 15
      const paddleGradient = ctx.createLinearGradient(
        game.paddle.x, 0,
        game.paddle.x + game.paddle.width, 0
      )
      paddleGradient.addColorStop(0, COLORS.accent)
      paddleGradient.addColorStop(0.5, COLORS.purple)
      paddleGradient.addColorStop(1, COLORS.pink)
      ctx.fillStyle = paddleGradient
      ctx.beginPath()
      ctx.roundRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height, 6)
      ctx.fill()
      ctx.shadowBlur = 0
      
      // Draw combo
      if (game.combo > 1) {
        ctx.fillStyle = COLORS.accent
        ctx.font = 'bold 14px Inter'
        ctx.textAlign = 'center'
        ctx.fillText(`${game.combo}x COMBO!`, width / 2, height - 60)
      }
      
      game.animationId = requestAnimationFrame(gameLoop)
    }
    
    game.animationId = requestAnimationFrame(gameLoop)
    
    return () => cancelAnimationFrame(game.animationId)
  }, [dimensions, gameState, createExplosion, initGame])

  // Touch/Mouse controls
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const game = gameRef.current
    
    const handleMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      game.paddle.x = Math.max(0, Math.min(dimensions.width - game.paddle.width, x - game.paddle.width / 2))
      
      // Move ball with paddle if not launched
      if (game.ball.vx === 0 && game.ball.vy === 0) {
        game.ball.x = game.paddle.x + game.paddle.width / 2
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX)
    }
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientX)
      launchBall()
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', launchBall)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', launchBall)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
    }
  }, [dimensions, launchBall])

  const restartGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      level: 1,
      gameOver: false,
      won: false,
      started: false,
    })
    initGame(dimensions.width, dimensions.height, 1)
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-dark-900/95 backdrop-blur-lg flex flex-col items-center justify-center p-4"
    >
      {/* Header */}
      <div className="w-full max-w-[500px] flex justify-between items-center mb-4">
        <div className="flex gap-6 text-sm font-mono">
          <span className="text-accent">Score: <span className="text-white">{gameState.score}</span></span>
          <span className="text-pink-500">Lives: <span className="text-white">{'❤️'.repeat(gameState.lives)}</span></span>
          <span className="text-purple-500">Level: <span className="text-white">{gameState.level}</span></span>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close game"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Game Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-2xl border border-white/10 touch-none"
        />
        
        {/* Start overlay */}
        {!gameState.started && !gameState.gameOver && !gameState.won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900/80 rounded-2xl">
            <h3 className="text-2xl font-bold gradient-text mb-2">PADEL BREAKER</h3>
            <p className="text-white/60 text-sm mb-4">Level {gameState.level}</p>
            <p className="text-white/40 text-xs">Tap or click to launch</p>
          </div>
        )}
        
        {/* Game Over overlay */}
        {gameState.gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900/90 rounded-2xl">
            <h3 className="text-3xl font-bold text-pink-500 mb-2">GAME OVER</h3>
            <p className="text-white/60 mb-1">Final Score: <span className="text-accent font-bold">{gameState.score}</span></p>
            <p className="text-white/40 text-sm mb-6">Max Combo: {gameRef.current.maxCombo}x</p>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light transition-colors rounded-full font-medium"
            >
              <RotateCcw size={18} />
              Play Again
            </button>
          </div>
        )}
        
        {/* Win overlay */}
        {gameState.won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900/90 rounded-2xl">
            <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-3xl font-bold gradient-text mb-2">YOU WIN!</h3>
            <p className="text-white/60 mb-1">Final Score: <span className="text-accent font-bold">{gameState.score}</span></p>
            <p className="text-white/40 text-sm mb-6">Max Combo: {gameRef.current.maxCombo}x</p>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light transition-colors rounded-full font-medium"
            >
              <RotateCcw size={18} />
              Play Again
            </button>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <p className="mt-4 text-white/30 text-xs font-mono">
        {navigator.maxTouchPoints > 0 ? 'Drag to move • Tap to launch' : 'Move mouse • Click to launch'}
      </p>
    </div>
  )
}
