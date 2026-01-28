import { motion } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Fireworks from './components/Fireworks'
import Confetti from './components/Confetti'
import FloatingElements from './components/FloatingElements'
import FlyingText from './components/FlyingText'
import CrazyModal from './components/CrazyModal'
import GlitchEffect from './components/GlitchEffect'
import StrobeLight from './components/StrobeLight'
import ScreenShake from './components/ScreenShake'
import RainbowVortex from './components/RainbowVortex'
import EmojiRain from './components/EmojiRain'
import './index.css'

// Random colors for neon signs
const neonColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#9d00ff', '#00ff66']
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Spin circles
const spinCircles = Array.from({ length: isMobile ? 4 : 8 }, (_, i) => ({
  size: 100 + i * 80,
  color: neonColors[i % neonColors.length],
  duration: 10 + i * 3,
}))

const laserBeams = Array.from({ length: isMobile ? 3 : 6 }, (_, i) => ({
  color: neonColors[i % neonColors.length],
  duration: 3 + Math.random() * 3,
  angle: -30 + Math.random() * 60,
  delay: i * 0.5,
}))

const neonSigns = isMobile ? [
  { text: '🎂 PARABÉNS! 🎂', top: '25%', left: '5%', color: '#ff00ff' },
  { text: '🎉 PARTY! 🎉', bottom: '25%', right: '5%', color: '#00ffff' },
] : [
  { text: '🎂 PARABÉNS! 🎂', top: '20%', left: '5%', color: '#ff00ff' },
  { text: '🎉 PARTY MODE ON! 🎉', top: '70%', right: '5%', color: '#00ffff' },
  { text: '⭐ É O CAIODEV! ⭐', bottom: '20%', left: '5%', color: '#ffff00' },
]

function App() {
  return (
    <ScreenShake>
      <div className="app-container">
        {/* Background effects */}
        <RainbowVortex />
        <div className="glow-overlay" />
        <div className="party-flash" />
        <div className="disco-dots" />
        <div className="mega-flash" />
        <div className="pulse-border" />

        {/* Spinning circles */}
        <div className="spin-circles">
          {spinCircles.map((circle, i) => (
            <div
              key={`circle-${i}`}
              className="spin-circle"
              style={{
                width: circle.size,
                height: circle.size,
                left: `calc(50% - ${circle.size / 2}px)`,
                top: `calc(50% - ${circle.size / 2}px)`,
                borderColor: circle.color,
                '--duration': `${circle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Laser beams */}
        <div className="laser-container">
          {laserBeams.map((laser, i) => (
            <div
              key={`laser-${i}`}
              className="laser-beam"
              style={{
                '--laser-color': laser.color,
                '--duration': `${laser.duration}s`,
                '--angle': `${laser.angle}deg`,
                animationDelay: `${laser.delay}s`,
                left: 0,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        {/* Canvas-based effects */}
        <Fireworks />

        {/* 3D Scene with cake */}
        <Scene3D />

        {/* Confetti system */}
        <Confetti />

        {/* Emoji Rain */}
        <EmojiRain />

        {/* CSS animated elements */}
        <FloatingElements />
        <FlyingText />

        {/* Glitch and Strobe */}
        <GlitchEffect />
        <StrobeLight />

        {/* Crazy popup modal */}
        <CrazyModal />

        {/* Neon signs */}
        {neonSigns.map((sign, i) => (
          <div
            key={`neon-${i}`}
            className="neon-sign"
            style={{
              top: sign.top,
              left: sign.left,
              right: sign.right,
              bottom: sign.bottom,
              '--neon-color': sign.color,
            }}
          >
            {sign.text}
          </div>
        ))}

        {/* Main headline */}
        <div className="headline-container">
          <motion.h1
            className="main-headline shake"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 10,
              duration: 1
            }}
          >
            FELIZ ANIVERSÁRIO CAIODEV!!! 🎂🎉🔥
          </motion.h1>
          <motion.p
            className="sub-headline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            O CARA NÃO PARA DE EVOLUIR! LENDA DEMAIS! 🚀✨💎
          </motion.p>
        </div>

        {/* Bottom message */}
        <div className="bottom-message">
          <motion.p
            className="bottom-text rainbow-text"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            🍻 HOJE O CÓDIGO É FESTA! BORA PRA CIMA CAIODEV! 🍻
          </motion.p>
        </div>

        {/* Crazy animated border */}
        <div className="crazy-border" />
      </div>
    </ScreenShake>
  )
}

export default App
