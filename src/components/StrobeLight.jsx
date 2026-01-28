import { useEffect, useState } from 'react'

const colors = [
    'rgba(255, 0, 255, 0.15)',
    'rgba(0, 255, 255, 0.15)',
    'rgba(255, 255, 0, 0.15)',
    'rgba(255, 102, 0, 0.15)',
    'rgba(157, 0, 255, 0.15)',
    'rgba(0, 255, 102, 0.15)',
]

export default function StrobeLight() {
    const [color, setColor] = useState(colors[0])
    const [active, setActive] = useState(false)

    useEffect(() => {
        let strobeInterval

        // Randomly turn on strobe bursts
        const burstInterval = setInterval(() => {
            if (Math.random() > 0.5) {
                setActive(true)

                // Fast color cycling during burst
                let count = 0
                strobeInterval = setInterval(() => {
                    setColor(colors[count % colors.length])
                    count++

                    if (count > 15) {
                        clearInterval(strobeInterval)
                        setActive(false)
                    }
                }, 50)
            }
        }, 3000)

        return () => {
            clearInterval(burstInterval)
            if (strobeInterval) clearInterval(strobeInterval)
        }
    }, [])

    if (!active) return null

    return (
        <div
            className="strobe-overlay"
            style={{ background: color }}
        />
    )
}
