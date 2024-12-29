import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  mousePosition: { x: number; y: number };
}

export function RobotModel({ mousePosition, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF('/robot_emoji_apple.glb') as any;

  // Groupe principal qui va recevoir l'animation (scale, rotation)
  const groupRef = useRef<THREE.Group>(null);

  // Spring d'intro
  const { scale, rotationX, rotationY, rotationZ } = useSpring({
    from: { scale: 0, rotationX: 0, rotationY: 0, rotationZ: 0 },
    to:   { scale: 0.75, rotationX: 0, rotationY: 4.7, rotationZ: 0 },
    config: { mass: 2, tension: 170, friction: 26 },
  });

  // Animation de rotation en fonction de la souris
  useFrame(() => {
    if (!groupRef.current) return;

    // Récupération des rotations du spring
    const baseRotationX = rotationX.get();
    const baseRotationY = rotationY.get();
    const baseRotationZ = rotationZ.get();

    // Mouvements de la souris
    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    // Appliquer une interpolation progressive sur X
    groupRef.current.rotation.x = THREE.MathUtils.clamp(
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        baseRotationX - mouseY * 0.3,
        0.1
      ),
      -0.5,
      0.5
    );
    // Appliquer une interpolation progressive sur Y
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      baseRotationY + mouseX * 0.5,
      0.1
    );
    // Z = baseRotationZ directement
    groupRef.current.rotation.z = baseRotationZ;
  });

  // Création et ajout des meshes en mode impératif
  useEffect(() => {
    if (!groupRef.current) return; // Si le groupe n'est pas encore monté

    // Définition des propriétés pour chaque morceau du robot
    const meshConfigs = [
      {
        geometry: nodes.Object_4.geometry,
        material: materials['Material.001'],
        position: [1.9, 2.46, 1.04],
        rotation: [0, 0, -Math.PI / 2],
        scale: [0.571, 0.2, 0.571],
      },
      {
        geometry: nodes.Object_6.geometry,
        material: materials['Material.001'],
        position: [1.9, 2.46, -1.06],
        rotation: [0, 0, -Math.PI / 2],
        scale: [0.571, 0.2, 0.571],
      },
      {
        geometry: nodes.Object_8.geometry,
        material: materials['Material.001'],
        position: [0, 4.2, 0],
        scale: 0.545,
      },
      {
        geometry: nodes.Object_10.geometry,
        material: materials['Material.001'],
        position: [0, 2, 0],
        scale: 2.053,
      },
      {
        geometry: nodes.Object_12.geometry,
        material: materials['Material.001'],
        position: [0, 2, 0],
        scale: 2.053,
      },
      {
        geometry: nodes.Object_14.geometry,
        material: materials['Material.001'],
        position: [1.9, 1.03, -0.23],
        scale: [0.094, 0.255, 0.189],
      },
      {
        geometry: nodes.Object_16.geometry,
        material: materials['Material.001'],
        position: [1.9, 1.03, 0.23],
        scale: [0.094, 0.255, 0.189],
      },
      {
        geometry: nodes.Object_18.geometry,
        material: materials['Material.001'],
        position: [1.9, 1.03, 0.69],
        scale: [0.094, 0.255, 0.189],
      },
      {
        geometry: nodes.Object_20.geometry,
        material: materials['Material.001'],
        position: [1.9, 1.03, -0.69],
        scale: [0.094, 0.255, 0.189],
      },
      {
        geometry: nodes.Object_22.geometry,
        material: materials['Material.001'],
        position: [0, 2, -2.2],
        rotation: [Math.PI / 2, 0, 0],
        scale: [0.697, 0.172, 0.697],
      },
      {
        geometry: nodes.Object_24.geometry,
        material: materials['Material.001'],
        position: [0, 2, 2.2],
        rotation: [Math.PI / 2, 0, 0],
        scale: [0.697, 0.172, 0.697],
      },
      {
        geometry: nodes.Object_26.geometry,
        material: materials.Material,
        position: [0, 4.5, 0],
        scale: 0.406,
      },
      {
        geometry: nodes.Object_28.geometry,
        material: materials['Material.001'],
        position: [2.03, 2.01, 0],
        rotation: [0, 0, -Math.PI / 2],
        scale: [0.387, 0.424, 0.387],
      },
    ];

    const createdMeshes: THREE.Mesh[] = [];

    for (const cfg of meshConfigs) {
      const mesh = new THREE.Mesh(cfg.geometry, cfg.material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Position
      if (cfg.position) {
        mesh.position.set(...(cfg.position as [number, number, number]));
      }
      // Rotation
      if (cfg.rotation) {
        mesh.rotation.set(...(cfg.rotation as [number, number, number]));
      }
      // Scale
      if (Array.isArray(cfg.scale)) {
        mesh.scale.set(...(cfg.scale as [number, number, number]));
      } else if (typeof cfg.scale === 'number') {
        mesh.scale.setScalar(cfg.scale);
      }

      // Ajout au groupe
      groupRef.current.add(mesh);
      createdMeshes.push(mesh);
    }

    // Nettoyage lors du démontage
    return () => {
      createdMeshes.forEach((mesh) => {
        groupRef.current?.remove(mesh);
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });
    };
  }, [nodes, materials]);

  return (
    <animated.group
      ref={groupRef}
      {...props}
      // On applique le spring
      scale={scale}
      rotation-z={rotationZ}
      position={[0, -1, 0]}
      dispose={null}
    />
  );
}

useGLTF.preload('/robot_emoji_apple.glb');