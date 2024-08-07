import { OrbitControls, useHelper, useGLTF, useTexture, Center, Sparkles, shaderMaterial, useFBO, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import portalVShader from '../shaders/portal/vertex.js'
import portalFShader from '../shaders/portal/fragment.js'
import { extend, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text3D } from '@react-three/drei'
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#A020F0'),
        uColorEnd: new THREE.Color('#000000'),
    }, portalVShader, portalFShader
)

extend({ PortalMaterial: PortalMaterial })

const Portal = () => {
    const [text, setText] = useState('METAMORPHOSIS');
    const [hovered, setHovered] = useState(false);

    const portalHover = (isHovered) => {
        setHovered(isHovered);
        if (!isHovered) {
            setText('METAMORPHOSIS');
        } else {
            setText('Register Now ! ! !');
        }
    };
    const portalClick = () => { 
        window.location.href = 'https://metamorphosis.wcewlug.org'
        // console.log('Portal Clicked ! ! !'); 
    }
    const { nodes } = useGLTF('./Portal/portal.glb')
    const bakedTexture = useTexture('./Portal/canva_baked3.png');
    const textTexture = useTexture('./Planets/neon_text2.png');
    // console.log(textTexture);
    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uniforms.uTime.value += delta
    })
    // useNavigate('/register')
    
    return (
        <>

            <color args={['#000000']} attach="background" />
            <Stars />
            <color args={['#000000']} attach="background" />
            {/* <OrbitControls /> */}
            <group position={[0, -2, -8]} scale={5}>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
                <mesh geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                />
                <mesh geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                />
                <mesh
                    onClick={portalClick}
                    onPointerOver={() => portalHover(true)}
                    onPointerOut={() => portalHover(false)}
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    <portalMaterial ref={portalMaterial} />
                </mesh>
                <Sparkles size={25} scale={[4, 2, 4]} position-y={1} speed={2} />
            </group>
            <group position={[-130, 100, -150]}>
                <Text3D
                 font='./Fonts/JSON/Helios Pro_Regular.json' 
                 size={0.75}
                    // height={0.2}
                    scale={30}
                    curveSegments={1}
                    // bevelEnabled
                    rotation={[Math.PI/8,0,0]}
                >
                    <meshBasicMaterial map={textTexture} map-flipY={false}   />
                    {text}
                </Text3D>
            </group>
            <group position={[-80, 80, -150]}>
                <Text3D
                 font='./Fonts/JSON/Helios Pro_Regular.json' 
                 size={0.75}
                    // height={0.2}
                    scale={10}
                    curveSegments={1}
                    // bevelEnabled
                    rotation={[Math.PI/8,0,0]}
                >
                    <meshBasicMaterial map={textTexture} map-flipY={false}   />
                    Click on Sword for Wargames ! ! !
                </Text3D>
            </group>
             {/* <primitive object={textii.scene} position={[0,200,-150]} scale={2} /> */}

        </>
    )
}

export default Portal







