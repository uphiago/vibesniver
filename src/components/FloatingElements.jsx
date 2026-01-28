import { motion } from 'framer-motion'

const emojis = ['🎉', '🎊', '🥳', '🎈', '🎁', '✨', '💖', '🌟', '🔥', '💫', '🎵', '🎶', '🍰', '🧁', '🍭', '🎀', '👑', '💎', '🦄', '🌈', '⭐', '💥', '🎯', '🏆', '🎪']

export default function FloatingElements() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    // Generate random positions for emojis
    const floatingEmojis = Array.from({ length: isMobile ? 12 : 25 }, (_, i) => ({
        emoji: emojis[i % emojis.length],
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 80 + 10}%`,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
        moveX: (Math.random() - 0.5) * 100,
        moveY: (Math.random() - 0.5) * 100,
    }))

    // Balloons
    const balloons = Array.from({ length: isMobile ? 4 : 8 }, (_, i) => ({
        left: `${10 + i * (isMobile ? 24 : 12)}%`,
        bottom: `${-10 - Math.random() * 20}%`,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * 2,
    }))

    // Gift boxes
    const gifts = Array.from({ length: isMobile ? 3 : 6 }, (_, i) => ({
        left: `${15 + i * (isMobile ? 30 : 15)}%`,
        top: `${60 + Math.random() * 30}%`,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 3,
    }))

    // Sparkles
    const sparkles = Array.from({ length: isMobile ? 15 : 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 2,
    }))

    return (
        <>
            {/* Floating emojis */}
            {floatingEmojis.map((item, i) => (
                <div
                    key={`emoji-${i}`}
                    className="floating-emoji"
                    style={{
                        left: item.left,
                        top: item.top,
                        '--duration': `${item.duration}s`,
                        '--delay': `${item.delay}s`,
                        '--move-x': `${item.moveX}px`,
                        '--move-y': `${item.moveY}px`,
                    }}
                >
                    {item.emoji}
                </div>
            ))}

            {/* Balloons */}
            {balloons.map((balloon, i) => (
                <motion.div
                    key={`balloon-${i}`}
                    className="balloon"
                    style={{
                        left: balloon.left,
                        bottom: balloon.bottom,
                    }}
                    animate={{
                        y: [0, -window.innerHeight * 1.2],
                        rotate: [-10, 10, -10],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        y: {
                            duration: balloon.duration + 5,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        rotate: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                        scale: {
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    🎈
                </motion.div>
            ))}

            {/* Gift boxes */}
            {gifts.map((gift, i) => (
                <div
                    key={`gift-${i}`}
                    className="gift-box"
                    style={{
                        left: gift.left,
                        top: gift.top,
                        '--duration': `${gift.duration}s`,
                        '--delay': `${gift.delay}s`,
                    }}
                >
                    🎁
                </div>
            ))}

            {/* Sparkles */}
            {sparkles.map((sparkle, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="sparkle"
                    style={{
                        left: sparkle.left,
                        top: sparkle.top,
                        '--duration': `${sparkle.duration}s`,
                        '--delay': `${sparkle.delay}s`,
                    }}
                />
            ))}
        </>
    )
}
