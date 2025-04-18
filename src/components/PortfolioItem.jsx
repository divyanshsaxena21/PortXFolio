import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, Stars, Sky } from '@react-three/drei'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

function Moon({ onClick, isVisible }) {
  const ref = useRef()
  const [y, setY] = useState(isVisible ? 2.5 : -5)
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    if (isVisible) setVisible(true)
  }, [isVisible])

  useFrame(() => {
    if (!ref.current) return

    if (isVisible && y < 2.5) {
      setY(prev => {
        const next = prev + 0.1
        ref.current.position.y = next
        ref.current.rotation.y += 0.01 // Rotation for the Moon
        return next
      })
    } else if (!isVisible && y > -5) {
      setY(prev => {
        const next = prev - 0.1
        ref.current.position.y = next
        return next
      })
    } else if (!isVisible && y <= -5) {
      setVisible(false)
    }
  })

  if (!visible) return null

  return (
    <mesh
      ref={ref}
      position={[1, y, 0]}
      onClick={onClick}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="gray"
        roughness={0.7}
        metalness={0.1}
        emissive="white"
        emissiveIntensity={0.3} // Brightness of the moon
      />
    </mesh>
  )
}

function Sun({ onClick, isVisible }) {
  const ref = useRef()
  const [y, setY] = useState(isVisible ? 3 : -5)
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    if (isVisible) setVisible(true)
  }, [isVisible])

  useFrame(() => {
    if (!ref.current) return

    if (isVisible && y < 3) {
      setY(prev => {
        const next = prev + 0.1
        ref.current.position.y = next
        ref.current.rotation.y += 0.01 // Rotation for the Sun
        return next
      })
    } else if (!isVisible && y > -5) {
      setY(prev => {
        const next = prev - 0.1
        ref.current.position.y = next
        return next
      })
    } else if (!isVisible && y <= -5) {
      setVisible(false)
    }
  })

  if (!visible) return null

  return (
    <mesh
      ref={ref}
      position={[1, y, 0]}
      onClick={onClick}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  )
}

function PortfolioItem({ position, textFront, textBack, textTop, textBottom, textLeft, textRight, isDay }) {
  const mesh = useRef()

  // Rotate the cube if it's night
  useFrame(() => {
    if (mesh.current && !isDay) {
      mesh.current.rotation.y += 0.009 // Adjust this value to control rotation speed
    }
  })

  // Create materials for each face of the cube
  const materials = [
    new THREE.MeshStandardMaterial({ color: 'red' }),     // Front face
    new THREE.MeshStandardMaterial({ color: 'green' }),   // Back face
    new THREE.MeshStandardMaterial({ color: 'blue' }),    // Top face
    new THREE.MeshStandardMaterial({ color: 'yellow' }),  // Bottom face
    new THREE.MeshStandardMaterial({ color: 'orange' }),  // Right face
    new THREE.MeshStandardMaterial({ color: 'purple' }),  // Left face
  ]

  return (
    <mesh position={position} ref={mesh} scale={1.2} onClick={() => alert('Clicked on a portfolio item!')}>
      {/* Cube geometry with custom materials */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial attachArray="material" {...materials} />

      {/* Text for each face */}
      <Text
        position={[0, 0, 0.51]}  // Slightly in front of the cube to ensure it's visible
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textFront || "Front"}
      </Text>

      <Text
        position={[0, 0, -0.51]}  // Slightly behind the cube for the back face
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textBack || "Back"}
      </Text>

      <Text
        position={[0, 0.51, 0]}  // Slightly above the cube for the top face
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textTop || "Top"}
      </Text>

      <Text
        position={[0, -0.51, 0]}  // Slightly below the cube for the bottom face
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textBottom || "Bottom"}
      </Text>

      <Text
        position={[-0.51, 0, 0]}  // Slightly to the left of the cube for the left face
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textLeft || "Left"}
      </Text>

      <Text
        position={[0.51, 0, 0]}  // Slightly to the right of the cube for the right face
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {textRight || "Right"}
      </Text>
    </mesh>
  )
}

export default function Experience() {
  const [isDay, setIsDay] = useState(false)

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <OrbitControls />
      <Environment preset={isDay ? 'sunset' : 'night'} />
      
      {/* Sun and Moon Components */}
      <Sun isVisible={isDay} onClick={() => setIsDay(false)} />
      <Moon isVisible={!isDay} onClick={() => setIsDay(true)} />
      
      {/* Portfolio Items (Cubes) */}
      <group>
        <PortfolioItem
          position={[-2, 0, 0]}
          textFront="Front"
          textBack="Back"
          textTop="Top"
          textBottom="Bottom"
          textLeft="Left"
          textRight="Right"
          isDay={isDay}
        />
        <PortfolioItem
          position={[0, 0, 0]}
          textFront="Front"
          textBack="Back"
          textTop="Top"
          textBottom="Bottom"
          textLeft="Left"
          textRight="Right"
          isDay={isDay}
        />
        <PortfolioItem
          position={[2, 0, 0]}
          textFront="Front"
          textBack="Back"
          textTop="Top"
          textBottom="Bottom"
          textLeft="Left"
          textRight="Right"
          isDay={isDay}
        />
      </group>
    </Canvas>
  )
}
