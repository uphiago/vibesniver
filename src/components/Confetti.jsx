import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti() {
    useEffect(() => {
        const duration = 60 * 60 * 1000 // Run forever basically
        const end = Date.now() + duration

        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#9d00ff', '#00ff66']

        // Continuous confetti burst
        const frame = () => {
            if (Date.now() > end) return

            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: colors,
                scalar: 1.2,
                drift: 1
            })

            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: colors,
                scalar: 1.2,
                drift: -1
            })

            requestAnimationFrame(frame)
        }
        frame()

        // Big bursts periodically
        const burstInterval = setInterval(() => {
            const x = Math.random()
            const y = Math.random() * 0.5

            confetti({
                particleCount: 100,
                spread: 100,
                origin: { x, y },
                colors: colors,
                scalar: 1.5,
                gravity: 0.8,
                ticks: 300
            })
        }, 2000)

        // Top cannon  
        const topInterval = setInterval(() => {
            confetti({
                particleCount: 30,
                angle: 270,
                spread: 180,
                origin: { x: 0.5, y: 0 },
                colors: colors,
                gravity: 1.5,
                scalar: 0.8
            })
        }, 1500)

        return () => {
            clearInterval(burstInterval)
            clearInterval(topInterval)
        }
    }, [])

    return null
}
