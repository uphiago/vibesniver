import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const emojis = ['🎂', '🎉', '🎈', '🎁', '🥳', '🍰', '🧁', '🎊', '💖', '✨', '🌟', '⭐', '🔥', '💎', '👑', '🦄', '🌈', '🎵', '🎶', '💫', '🍻', '🍾', '🥂']

export default function EmojiRain() {
    const [drops, setDrops] = useState([])

    useEffect(() => {
        const addDrop = () => {
            const newDrop = {
                id: Date.now() + Math.random(),
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                x: Math.random() * window.innerWidth,
                size: Math.random() * 30 + 20,
                duration: Math.random() * 3 + 2,
                delay: 0,
                rotation: Math.random() * 720 - 360,
            }

            setDrops(prev => [...prev.slice(-50), newDrop]) // Keep max 50 drops
        }

        // Add drops frequently
        const interval = setInterval(addDrop, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="emoji-rain-container">
            {drops.map(drop => (
                <motion.div
                    key={drop.id}
                    className="emoji-drop"
                    style={{
                        left: drop.x,
                        fontSize: drop.size,
                    }}
                    initial={{ y: -100, rotate: 0, opacity: 1 }}
                    animate={{
                        y: window.innerHeight + 100,
                        rotate: drop.rotation,
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: drop.duration,
                        ease: 'linear',
                    }}
                    onAnimationComplete={() => {
                        setDrops(prev => prev.filter(d => d.id !== drop.id))
                    }}
                >
                    {drop.emoji}
                </motion.div>
            ))}
        </div>
    )
}
