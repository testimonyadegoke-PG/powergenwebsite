import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Mini3DModelProps {
  type: 'solar' | 'battery' | 'turbine' | 'grid';
  height?: string;
  width?: string;
}

export const Mini3DModel: React.FC<Mini3DModelProps> = ({
  type,
  height = '180px',
  width = '100%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 180;

    // --- Scene ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 10);
    camera.position.set(0, 1.2, 2.5);
    camera.lookAt(0, 0, 0);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffdfb0, 1.5);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    // --- Geometries ---
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh: THREE.Object3D | null = null;
    let blades: THREE.Mesh | null = null;

    if (type === 'solar') {
      // Solar Panel Model
      const solarGroup = new THREE.Group();
      
      const frameMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d5, metalness: 0.9, roughness: 0.1 });
      const blueMat = new THREE.MeshStandardMaterial({ color: 0x0c1e36, metalness: 0.8, roughness: 0.1 });
      
      // Face
      const face = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.7), blueMat);
      solarGroup.add(face);
      
      // Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.04, 0.74), frameMat);
      frame.position.y = -0.01;
      solarGroup.add(frame);
      
      // Leg mounts
      const legMat = new THREE.MeshStandardMaterial({ color: 0x76767c, metalness: 0.8 });
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6), legMat);
      leg.position.set(0, -0.3, 0);
      leg.rotation.x = 0.2;
      solarGroup.add(leg);

      solarGroup.rotation.x = 0.4; // 23deg tilt
      mainMesh = solarGroup;
      group.add(solarGroup);
    } else if (type === 'battery') {
      // BESS Battery Rack
      const bessGroup = new THREE.Group();
      const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x222225, metalness: 0.7, roughness: 0.3 });
      
      // Frame cabinet
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.6), cabinetMat);
      bessGroup.add(cabinet);
      
      // Glow stripes representing active cells
      const greenGlow = new THREE.MeshBasicMaterial({ color: 0x7cbd24 });
      for (let i = 0; i < 4; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.61), greenGlow);
        stripe.position.y = -0.4 + i * 0.26;
        bessGroup.add(stripe);
      }
      
      mainMesh = bessGroup;
      group.add(bessGroup);
    } else if (type === 'turbine') {
      // Wind Turbine
      const turbineGroup = new THREE.Group();
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x9095a0, metalness: 0.8, roughness: 0.25 });
      
      // Mast
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.3), metalMat);
      mast.position.y = -0.15;
      turbineGroup.add(mast);
      
      // Nacelle
      const nacelle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.2), metalMat);
      nacelle.position.set(0, 0.5, 0);
      turbineGroup.add(nacelle);

      // Blades
      const bladesGroup = new THREE.Group();
      bladesGroup.position.set(0, 0.5, 0.11);
      
      const bladeGeo = new THREE.BoxGeometry(0.02, 0.45, 0.01);
      bladeGeo.translate(0, 0.22, 0);
      
      for (let i = 0; i < 3; i++) {
        const blade = new THREE.Mesh(bladeGeo, metalMat);
        blade.rotation.z = (i * Math.PI * 2) / 3;
        bladesGroup.add(blade);
      }
      turbineGroup.add(bladesGroup);
      blades = bladesGroup as unknown as THREE.Mesh; // cast for rotation loop
      
      mainMesh = turbineGroup;
      group.add(turbineGroup);
    } else {
      // Grid nodes
      const gridGroup = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x7cbd24 });
      
      const points = [
        new THREE.Vector3(-0.4, 0.3, 0),
        new THREE.Vector3(0.4, 0.3, 0),
        new THREE.Vector3(0, -0.4, 0.3),
        new THREE.Vector3(-0.3, -0.2, -0.4),
        new THREE.Vector3(0.3, -0.2, -0.4),
      ];
      
      // Spawn nodes
      points.forEach((pt) => {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.copy(pt);
        gridGroup.add(node);
      });
      
      // Draw grid lines
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
          const line = new THREE.Line(lineGeo, lineMat);
          gridGroup.add(line);
        }
      }
      
      mainMesh = gridGroup;
      group.add(gridGroup);
    }

    // --- Animation loop ---
    let reqId: number;
    let clock = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      clock += 0.01;

      if (mainMesh) {
        mainMesh.rotation.y = clock * 0.45;
        // Subtle floating movement
        mainMesh.position.y = Math.sin(clock * 1.5) * 0.06;
      }

      if (blades) {
        blades.rotation.z += 0.045;
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 180;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />
    </div>
  );
};
