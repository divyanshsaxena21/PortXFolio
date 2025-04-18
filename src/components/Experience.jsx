import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'

function Moon() {
  const ref = useRef()

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
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

function OrbitingSphere({ color, label, orbitRadius, speed, link }) {
  const ref = useRef()
  const [angle, setAngle] = useState(0)

  const handleClick = () => {
    window.open(link, '_blank'); // Open the provided link in a new tab
  }

  useFrame(() => {
    // Update the angle to make the sphere orbit around the Moon (0, 0, 0)
    setAngle(prev => prev + speed)

    // Calculate new position using sine and cosine for circular movement
    const x = orbitRadius * Math.cos(angle)
    const z = orbitRadius * Math.sin(angle)

    // Set the sphere's position in orbit around the Moon
    if (ref.current) {
      ref.current.position.set(x, 0, z)  // Y stays constant for the orbit, change X and Z based on the angle
    }
  })

  return (
    <mesh ref={ref} onClick={handleClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
      {/* Text positioned on the front of the sphere */}
      <Text position={[0, 0, 1.2]} rotation={[0, 0, 0]} fontSize={0.3} color="white">
        {label}
      </Text>
    </mesh>
  )
}

export default function Experience() {
  return (
    <Canvas 
      camera={{ position: [0, 5, 14], fov: 60 }} 
      shadows
      style={{ background: 'black' }}  // Set the background to black
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <OrbitControls />

      {/* Always keep the night sky and stars */}
      <Stars radius={100} depth={50} count={5000} factor={5} />
      
      {/* Portfolio Items with orbiting spheres, each with different speeds */}
      <OrbitingSphere 
        color="skyblue" 
        label="Ayush Sharma" 
        orbitRadius={6}  // Orbit radius for the first sphere (6 units from the Moon)
        speed={0.004}     // Speed of the orbit (slower)
        link="https://ayushsharma.site/"  // Add the URL here
      />
      <OrbitingSphere 
        color="hotpink" 
        label="Ashmit Kumar" 
        orbitRadius={8}  // Orbit radius for the second sphere (8 units from the Moon)
        speed={0.003}     // Speed of the orbit (faster)
        link="https://ashmitkumar.vercel.app/"  // Add the URL here
      />
      <OrbitingSphere 
        color="orange" 
        label="Aseem Pradhan" 
        orbitRadius={10} // Orbit radius for the third sphere (10 units from the Moon)
        speed={0.002}     // Speed of the orbit (moderate speed)
        link="https://hello-its-aseem.netlify.app/"  // Add the URL here
      />
      <OrbitingSphere 
        color="red" 
        label="Divyansh Saxena" 
        orbitRadius={12} // Orbit radius for the fourth sphere (12 units from the Moon)
        speed={0.0035}    // Speed of the orbit (slower)
        link="https://divyanshsaxena1978.wixstudio.io/portfolio"  // Add the URL here
      />

      {/* Moon in the center */}
      <Moon />
    </Canvas>
  )
}
