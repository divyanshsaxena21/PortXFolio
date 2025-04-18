import { useGLTF } from '@react-three/drei'

export default function CustomModel({ path, ...props }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene} {...props} />
}
