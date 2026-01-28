import { useEffect, useState } from 'react'

export default function ScreenShake({ children }) {
    const [shake, setShake] = useState({ x: 0, y: 0, rotation: 0 })

    useEffect(() => {
        const shakeInterval = setInterval(() => {
            // Random micro-shakes
            if (Math.random() > 0.6) {
                const intensity = Math.random() * 5 + 2
                setShake({
                    x: (Math.random() - 0.5) * intensity,
                    y: (Math.random() - 0.5) * intensity,
                    rotation: (Math.random() - 0.5) * 2,
                })

                setTimeout(() => {
                    setShake({ x: 0, y: 0, rotation: 0 })
                }, 100)
            }
        }, 200)

        // Random big shakes
        const bigShakeInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                let count = 0
                const shakeAnimation = setInterval(() => {
                    setShake({
                        x: (Math.random() - 0.5) * 15,
                        y: (Math.random() - 0.5) * 15,
                        rotation: (Math.random() - 0.5) * 3,
                    })
                    count++
                    if (count > 10) {
                        clearInterval(shakeAnimation)
                        setShake({ x: 0, y: 0, rotation: 0 })
                    }
                }, 50)
            }
        }, 4000)

        return () => {
            clearInterval(shakeInterval)
            clearInterval(bigShakeInterval)
        }
    }, [])

    return (
        <div
            className="screen-shake-container"
            style={{
                transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.rotation}deg)`,
            }}
        >
            {children}
        </div>
    )
}
