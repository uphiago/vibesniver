import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const messages = [
    { emoji: '🎂', text: 'CAIODEV TÁ VELHO!' },
    { emoji: '🎉', text: 'BORA FESTEJAR!' },
    { emoji: '🍻', text: 'LIBERA O OPEN BAR!' },
    { emoji: '🚀', text: 'DEV BRABO DEMAIS!' },
    { emoji: '💎', text: 'O CARA É UMA LENDA!' },
    { emoji: '🔥', text: 'HOJE O CÓDIGO É FESTA!' },
    { emoji: '👑', text: 'REI DO CÓDIGO!' },
    { emoji: '🦄', text: 'UNICÓRNIO DA PROGRAMAÇÃO!' },
    { emoji: '⚡', text: 'SPEED RUN NA VIDA!' },
    { emoji: '🎮', text: 'GG MAIS UM ANO!' },
]

export default function CrazyModal() {
    const [showModal, setShowModal] = useState(false)
    const [currentMessage, setCurrentMessage] = useState(messages[0])
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // Show modal randomly
        const showInterval = setInterval(() => {
            if (Math.random() > 0.3) {
                setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
                setPosition({
                    x: (Math.random() - 0.5) * (window.innerWidth * 0.6),
                    y: (Math.random() - 0.5) * (window.innerHeight * 0.6),
                })
                setShowModal(true)

                // Auto-hide after random time
                setTimeout(() => {
                    setShowModal(false)
                }, Math.random() * 2000 + 1000)
            }
        }, 2000)

        return () => clearInterval(showInterval)
    }, [])

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="crazy-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowModal(false)}
                >
                    <motion.div
                        className="crazy-modal"
                        style={{
                            x: position.x,
                            y: position.y,
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{
                            scale: [0, 1.5, 1, 1.2, 1],
                            rotate: [180, -10, 10, -5, 0],
                        }}
                        exit={{
                            scale: 0,
                            rotate: 180,
                            transition: { duration: 0.3 }
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 300
                        }}
                    >
                        <div className="modal-emoji">{currentMessage.emoji}</div>
                        <div className="modal-text">{currentMessage.text}</div>
                        <div className="modal-sparkles">✨✨✨</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
