import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function GlitchEffect() {
    const [glitchActive, setGlitchActive] = useState(false)
    const [glitchStyle, setGlitchStyle] = useState({})

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlitchActive(true)
                setGlitchStyle({
                    transform: `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) skewX(${(Math.random() - 0.5) * 5}deg)`,
                    filter: `hue-rotate(${Math.random() * 360}deg)`,
                })

                setTimeout(() => {
                    setGlitchActive(false)
                    setGlitchStyle({})
                }, 100 + Math.random() * 200)
            }
        }, 500)

        return () => clearInterval(glitchInterval)
    }, [])

    return (
        <div
            className={`glitch-overlay ${glitchActive ? 'active' : ''}`}
            style={glitchStyle}
        />
    )
}
