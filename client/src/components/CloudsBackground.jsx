import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CloudsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Crear escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Configurar cámara
    camera.position.z = 5;

    // Añadir luces
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Niebla
    scene.fog = new THREE.Fog(0x87ceeb, 5, 15);

    // Crear geometría y textura para las nubes
    const cloudGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('/assets/textures/clouds.jpg'),
      transparent: true,
    });

    // Añadir varias nubes
    const clouds = [];
    for (let i = 0; i < 50; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * -10
      );
      cloud.scale.setScalar(Math.random() * 2 + 0.5);
      scene.add(cloud);
      clouds.push(cloud);
    }

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      clouds.forEach((cloud) => {
        cloud.position.x += 0.01;
        if (cloud.position.x > 10) {
          cloud.position.x = -10;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Limpiar al desmontar
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CloudsBackground;
