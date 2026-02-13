import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Hook to track mouse position normalized to -1 to 1
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return mouse
}

// Hook to track scroll progress (0 to 1)
function useScrollProgress() {
  const [scroll, setScroll] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setScroll(Math.min(1, Math.max(0, progress)))
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return scroll
}

interface AnimatedSphereProps {
  mouse: { x: number; y: number }
  scrollProgress: number
}

function AnimatedSphere({ mouse, scrollProgress }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation from time
      const baseRotX = state.clock.elapsedTime * 0.2
      const baseRotY = state.clock.elapsedTime * 0.3
      
      // Mouse influence (smooth follow)
      targetRotation.current.x = baseRotX + mouse.y * 0.5
      targetRotation.current.y = baseRotY + mouse.x * 0.8
      
      // Smooth interpolation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        delta * 3
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        delta * 3
      )
      
      // Subtle position shift based on mouse
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouse.x * 0.3,
        delta * 2
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        mouse.y * 0.2,
        delta * 2
      )
    }
  })

  // Distortion increases with scroll (0.4 to 0.7)
  const distortAmount = 0.4 + scrollProgress * 0.3
  
  // Color shifts slightly with scroll (indigo to purple)
  const hue = 0.68 + scrollProgress * 0.1 // 0.68 is ~indigo, 0.78 is ~purple

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          color={`hsl(${hue * 360}, 70%, 60%)`}
          attach="material"
          distort={distortAmount}
          speed={2 + scrollProgress * 2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

interface ParticleRingProps {
  mouse: { x: number; y: number }
  scrollProgress: number
}

function ParticleRing({ mouse, scrollProgress }: ParticleRingProps) {
  const points = useRef<THREE.Points>(null)
  const particleCount = 200
  
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 2.5 + Math.random() * 0.5
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  useFrame((state, delta) => {
    if (points.current) {
      // Base rotation
      const baseRotY = state.clock.elapsedTime * 0.1
      const baseRotX = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      
      // Add mouse influence to particle ring (opposite direction for parallax)
      points.current.rotation.y = THREE.MathUtils.lerp(
        points.current.rotation.y,
        baseRotY - mouse.x * 0.3,
        delta * 2
      )
      points.current.rotation.x = THREE.MathUtils.lerp(
        points.current.rotation.x,
        baseRotX - mouse.y * 0.2,
        delta * 2
      )
      
      // Ring expands slightly with scroll
      const scale = 1 + scrollProgress * 0.3
      points.current.scale.setScalar(scale)
    }
  })

  // Particle opacity increases with scroll
  const particleOpacity = 0.6 + scrollProgress * 0.4

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03 + scrollProgress * 0.02}
        color="#a855f7"
        transparent
        opacity={particleOpacity}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  const mouse = useMousePosition()
  const scrollProgress = useScrollProgress()
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#6366f1"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ec4899"
      />
      <AnimatedSphere mouse={mouse} scrollProgress={scrollProgress} />
      <ParticleRing mouse={mouse} scrollProgress={scrollProgress} />
      <Environment preset="night" />
    </>
  )
}

export function Avatar3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
