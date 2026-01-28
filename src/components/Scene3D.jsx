import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sparkles } from '@react-three/drei'
import { Suspense } from 'react'
import Cake3D from './Cake3D'
import Particles3D from './Particles3D'

export default function Scene3D() {
    return (
        <Canvas
            className="three-canvas"
            camera={{ position: [0, 2, 6], fov: 50 }}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                {/* Ambient lighting */}
                <ambientLight intensity={0.4} />

                {/* Colored point lights for party effect */}
                <pointLight position={[5, 5, 5]} color="#ff00ff" intensity={50} />
                <pointLight position={[-5, 5, -5]} color="#00ffff" intensity={50} />
                <pointLight position={[0, -5, 5]} color="#ffff00" intensity={30} />
                <pointLight position={[5, -5, -5]} color="#9d00ff" intensity={40} />

                {/* Spotlight on cake */}
                <spotLight
                    position={[0, 8, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={100}
                    color="#ffffff"
                    castShadow
                />

                {/* Stars in background */}
                <Stars
                    radius={50}
                    depth={50}
                    count={2000}
                    factor={6}
                    saturation={1}
                    fade
                    speed={2}
                />

                {/* Extra sparkles */}
                <Sparkles
                    count={200}
                    scale={15}
                    size={4}
                    speed={0.5}
                    color="#ff00ff"
                />
                <Sparkles
                    count={200}
                    scale={15}
                    size={3}
                    speed={0.8}
                    color="#00ffff"
                />
                <Sparkles
                    count={100}
                    scale={10}
                    size={5}
                    speed={0.3}
                    color="#ffff00"
                />

                {/* The birthday cake */}
                <Cake3D />

                {/* Floating particles */}
                <Particles3D count={300} />

                {/* Controls - limited for UX */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 3}
                />
            </Suspense>
        </Canvas>
    )
}
