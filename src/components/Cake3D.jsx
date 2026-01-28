import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function CandleFlame({ position }) {
    const flameRef = useRef()

    useFrame((state) => {
        if (flameRef.current) {
            flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.2
            flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 12) * 0.3
            flameRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 10) * 0.02
        }
    })

    return (
        <group position={position}>
            {/* Candle stick */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
                <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.3} />
            </mesh>
            {/* Flame */}
            <mesh ref={flameRef} position={[0, 0.3, 0]}>
                <coneGeometry args={[0.08, 0.25, 8]} />
                <meshBasicMaterial color="#ffa500" transparent opacity={0.9} />
            </mesh>
            {/* Flame glow */}
            <pointLight position={[0, 0.3, 0]} color="#ffa500" intensity={2} distance={1} />
        </group>
    )
}

function Frosting({ radius, y, color }) {
    const points = []
    const segments = 32

    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const wobble = Math.sin(angle * 8) * 0.05
        points.push(new THREE.Vector3(x, y + wobble, z))
    }

    return (
        <mesh>
            <tubeGeometry args={[new THREE.CatmullRomCurve3(points, true), 64, 0.08, 8, true]} />
            <MeshWobbleMaterial
                color={color}
                factor={0.3}
                speed={2}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    )
}

function CakeLayer({ position, radius, height, color, emissive }) {
    return (
        <mesh position={position}>
            <cylinderGeometry args={[radius, radius * 1.05, height, 32]} />
            <MeshWobbleMaterial
                color={color}
                factor={0.1}
                speed={1}
                emissive={emissive}
                emissiveIntensity={0.1}
            />
        </mesh>
    )
}

export default function Cake3D() {
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
        }
    })

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <group ref={groupRef} scale={1.5}>
                {/* Bottom layer - pink */}
                <CakeLayer
                    position={[0, 0, 0]}
                    radius={1.2}
                    height={0.6}
                    color="#ff69b4"
                    emissive="#ff1493"
                />

                {/* Middle layer - purple */}
                <CakeLayer
                    position={[0, 0.5, 0]}
                    radius={0.95}
                    height={0.5}
                    color="#9370db"
                    emissive="#8a2be2"
                />

                {/* Top layer - cyan */}
                <CakeLayer
                    position={[0, 0.9, 0]}
                    radius={0.7}
                    height={0.4}
                    color="#00ced1"
                    emissive="#00ffff"
                />

                {/* Frosting decorations */}
                <Frosting radius={1.15} y={0.3} color="#ffffff" />
                <Frosting radius={0.9} y={0.75} color="#ffff00" />
                <Frosting radius={0.65} y={1.1} color="#ff00ff" />

                {/* Candles */}
                <CandleFlame position={[0, 1.3, 0]} />
                <CandleFlame position={[-0.3, 1.3, 0.2]} />
                <CandleFlame position={[0.3, 1.3, 0.2]} />
                <CandleFlame position={[-0.2, 1.3, -0.25]} />
                <CandleFlame position={[0.2, 1.3, -0.25]} />

                {/* Sprinkles */}
                {Array.from({ length: 50 }).map((_, i) => {
                    const angle = (i / 50) * Math.PI * 2 + Math.random()
                    const layer = Math.floor(Math.random() * 3)
                    const radius = [1.15, 0.9, 0.65][layer]
                    const y = [0.15, 0.6, 0.95][layer]

                    return (
                        <mesh
                            key={i}
                            position={[
                                Math.cos(angle) * radius * (0.7 + Math.random() * 0.3),
                                y + Math.random() * 0.2,
                                Math.sin(angle) * radius * (0.7 + Math.random() * 0.3)
                            ]}
                            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                        >
                            <capsuleGeometry args={[0.02, 0.06, 4, 8]} />
                            <meshStandardMaterial
                                color={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]}
                                emissive={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                    )
                })}

                {/* Plate */}
                <mesh position={[0, -0.35, 0]}>
                    <cylinderGeometry args={[1.5, 1.4, 0.1, 32]} />
                    <meshStandardMaterial color="#gold" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    )
}
