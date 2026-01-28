import { useEffect, useRef } from 'react'

class Particle {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        }
        this.alpha = 1
        this.friction = 0.97
        this.gravity = 0.15
        this.size = Math.random() * 3 + 1
    }

    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
    }
}

export default function Fireworks() {
    const canvasRef = useRef()
    const particlesRef = useRef([])
    const animationRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const colors = [
            '#ff00ff', '#00ffff', '#ffff00', '#ff6600',
            '#9d00ff', '#00ff66', '#ff0066', '#66ff00'
        ]

        const createExplosion = () => {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height * 0.6
            const color = colors[Math.floor(Math.random() * colors.length)]
            const particleCount = Math.floor(Math.random() * 50) + 30

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(new Particle(x, y, color))
            }
        }

        // Create initial explosions
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createExplosion(), i * 200)
        }

        // Keep creating explosions
        const explosionInterval = setInterval(() => {
            createExplosion()
        }, 400)

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            particlesRef.current = particlesRef.current.filter(particle => {
                particle.update()
                particle.draw(ctx)
                return particle.alpha > 0.01
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resize)
            clearInterval(explosionInterval)
            cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return <canvas ref={canvasRef} className="fireworks-canvas" />
}
