import { useRef, useEffect } from 'react'

export default function RainbowVortex() {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        let hue = 0
        let frame = 0

        const animate = () => {
            frame++

            // Create trippy spiral effect
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            ctx.globalAlpha = 0.03
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.globalAlpha = 0.5

            for (let i = 0; i < 5; i++) {
                const angle = (frame * 0.02) + (i * Math.PI * 0.4)
                const radius = 100 + Math.sin(frame * 0.03 + i) * 50

                const x = centerX + Math.cos(angle) * radius * 3
                const y = centerY + Math.sin(angle) * radius * 2

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 150)
                gradient.addColorStop(0, `hsla(${hue + i * 60}, 100%, 60%, 0.3)`)
                gradient.addColorStop(1, 'transparent')

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(x, y, 150, 0, Math.PI * 2)
                ctx.fill()
            }

            hue = (hue + 2) % 360

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="vortex-canvas" />
}
