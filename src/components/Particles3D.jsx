import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles3D({ count = 500 }) {
    const meshRef = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)
        const speeds = new Float32Array(count)

        const colorPalette = [
            new THREE.Color('#ff00ff'),
            new THREE.Color('#00ffff'),
            new THREE.Color('#ffff00'),
            new THREE.Color('#ff6600'),
            new THREE.Color('#9d00ff'),
            new THREE.Color('#00ff66'),
        ]

        for (let i = 0; i < count; i++) {
            // Spread particles around the scene
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20

            // Random colors from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
            colors[i * 3] = color.r
            colors[i * 3 + 1] = color.g
            colors[i * 3 + 2] = color.b

            // Random sizes
            sizes[i] = Math.random() * 0.1 + 0.02

            // Random speeds for animation
            speeds[i] = Math.random() * 2 + 0.5
        }

        return { positions, colors, sizes, speeds }
    }, [count])

    useFrame((state) => {
        if (!meshRef.current) return

        const positions = meshRef.current.geometry.attributes.position.array
        const time = state.clock.elapsedTime

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            // Original positions stored in particles
            const x = particles.positions[i3]
            const y = particles.positions[i3 + 1]
            const z = particles.positions[i3 + 2]

            // Animated positions
            positions[i3] = x + Math.sin(time * particles.speeds[i] + i) * 0.5
            positions[i3 + 1] = y + Math.cos(time * particles.speeds[i] * 0.5 + i) * 0.5
            positions[i3 + 2] = z + Math.sin(time * particles.speeds[i] * 0.3 + i) * 0.5
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true
        meshRef.current.rotation.y = time * 0.05
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
