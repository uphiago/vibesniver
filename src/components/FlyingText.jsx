import { motion } from 'framer-motion'

const messages = [
    'PARABÉNS!!! 🎉',
    'FELICIDADES! 🥳',
    'MUITOS ANOS DE VIDA! 💖',
    'TÁ FICANDO VELHO! 👴',
    'É O BIXÃO! 🦁',
    'BORA BEBER! 🍻',
    'QUE FASE! 🚀',
    'SHOWW! 🔥',
    'MITO! 👑',
    'CAIODEV É BRABO! 💪',
]

export default function FlyingText() {
    const texts = Array.from({ length: 6 }, (_, i) => ({
        message: messages[i % messages.length],
        top: `${15 + i * 15}%`,
        duration: Math.random() * 5 + 8,
        delay: i * 2,
    }))

    return (
        <>
            {texts.map((text, i) => (
                <motion.div
                    key={`flying-${i}`}
                    className="flying-text rainbow-text"
                    style={{
                        top: text.top,
                        left: '-100%',
                    }}
                    animate={{
                        x: ['0%', `${window.innerWidth + 500}px`],
                    }}
                    transition={{
                        x: {
                            duration: text.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: text.delay,
                        },
                    }}
                >
                    {text.message}
                </motion.div>
            ))}
        </>
    )
}
