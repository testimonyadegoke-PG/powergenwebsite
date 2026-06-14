import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const LOGO_URL = '/images/powergen-logo.webp';

interface Part {
  id: string;
  label: string;
  spec: string;
  anchor: [number, number, number];
}

const PARTS: Part[] = [
  { id: 'solar', label: 'Solar array', spec: 'Tier-1 bifacial PV modules generate clean electricity on-site during daylight.', anchor: [-2.4, 1.3, 0] },
  { id: 'inverter', label: 'Smart inverter', spec: 'Grid-forming bidirectional inverters condition and route power in real time.', anchor: [0.4, 1.35, -0.4] },
  { id: 'bess', label: 'Battery storage (BESS)', spec: 'Lithium BESS stores surplus solar, buffers loads and eliminates diesel runtime.', anchor: [2.6, 1.4, 0.9] },
  { id: 'meter', label: 'Smart meter', spec: 'Prepaid smart metering bills usage via mobile money, with zero-default control.', anchor: [1.4, 1.2, 2.0] },
  { id: 'grid', label: 'Distribution', spec: 'Low-voltage distribution delivers reliable, 24/7 power to homes and businesses.', anchor: [-2.6, 0.9, -2.2] },
];

let sharedLogo: THREE.Texture | null = null;
function logoTex(): THREE.Texture {
  if (sharedLogo) return sharedLogo;
  const t = new THREE.TextureLoader().load(LOGO_URL);
  t.colorSpace = THREE.SRGBColorSpace;
  sharedLogo = t;
  return t;
}

const SystemAnatomyCanvas: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let width = host.clientWidth;
    let height = host.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10182e, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6.5, 4.5, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    const ENV = 0.5;

    scene.add(new THREE.HemisphereLight(0x9ab4e6, 0x37425e, 0.7));
    const sun = new THREE.DirectionalLight(0xffe6c4, 2.1);
    sun.position.set(8, 11, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    // Circular turntable pad
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 0.3, 48),
      new THREE.MeshStandardMaterial({ color: 0x223052, roughness: 0.85, metalness: 0.1, envMapIntensity: ENV }),
    );
    pad.position.y = -0.15;
    pad.receiveShadow = true;
    scene.add(pad);
    const padTop = new THREE.Mesh(
      new THREE.CircleGeometry(4.92, 48),
      new THREE.MeshStandardMaterial({ color: 0x2c3c64, roughness: 0.95 }),
    );
    padTop.rotation.x = -Math.PI / 2;
    padTop.position.y = 0.001;
    padTop.receiveShadow = true;
    scene.add(padTop);

    // --- Solar array ---
    const cellMat = new THREE.MeshPhysicalMaterial({ color: 0x0e2552, metalness: 0.4, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: ENV * 1.4 });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xb7bdc7, metalness: 0.9, roughness: 0.35, envMapIntensity: ENV });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x5b626d, metalness: 0.8, roughness: 0.5, envMapIntensity: ENV });
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const g = new THREE.Group();
        const board = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.95), frameMat);
        board.castShadow = true;
        const cells = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.86), cellMat);
        cells.position.y = 0.04;
        board.add(cells);
        const tilt = new THREE.Group();
        tilt.add(board);
        tilt.rotation.x = -Math.PI / 7;
        tilt.position.y = 0.75;
        g.add(tilt);
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 8), postMat);
        post.position.y = 0.37;
        post.castShadow = true;
        g.add(post);
        g.position.set(-3.2 + c * 1.7, 0, -0.8 + r * 1.2);
        scene.add(g);
      }
    }

    // --- Inverter ---
    const inverter = new THREE.Group();
    const invBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.95, 0.32), new THREE.MeshStandardMaterial({ color: 0xd2d7df, metalness: 0.55, roughness: 0.4, envMapIntensity: ENV }));
    invBody.position.y = 0.65;
    invBody.castShadow = true;
    inverter.add(invBody);
    const invScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.22), new THREE.MeshBasicMaterial({ color: 0x123a2a }));
    invScreen.position.set(0, 0.7, 0.17);
    inverter.add(invScreen);
    inverter.position.set(0.4, 0, -0.4);
    scene.add(inverter);

    // --- BESS with real logo ---
    const bess = new THREE.Group();
    const bessBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 1.3), new THREE.MeshStandardMaterial({ color: 0x2e3a52, metalness: 0.8, roughness: 0.4, envMapIntensity: ENV }));
    bessBody.position.y = 0.6;
    bessBody.castShadow = true;
    bess.add(bessBody);
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.28), new THREE.MeshStandardMaterial({ color: 0x12182a, roughness: 0.6 }));
    plaque.position.set(0.3, 0.72, 0.651);
    bess.add(plaque);
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.25), new THREE.MeshBasicMaterial({ map: logoTex(), transparent: true }));
    logo.position.set(0.3, 0.72, 0.653);
    bess.add(logo);
    const fanCab = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 1.0), new THREE.MeshStandardMaterial({ color: 0x1d2535, metalness: 0.9, roughness: 0.3 }));
    fanCab.position.set(1.05, 0.6, 0);
    bess.add(fanCab);
    bess.position.set(2.4, 0, 0.9);
    scene.add(bess);

    // --- Smart meter on a post ---
    const meter = new THREE.Group();
    const mPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 8), postMat);
    mPost.position.y = 0.55;
    meter.add(mPost);
    const mBox = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.44, 0.18), new THREE.MeshStandardMaterial({ color: 0xe8eaee, roughness: 0.5, metalness: 0.2, envMapIntensity: ENV }));
    mBox.position.y = 1.0;
    mBox.castShadow = true;
    const mScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.14), new THREE.MeshBasicMaterial({ color: 0x14406a }));
    mScreen.position.set(0, 1.04, 0.095);
    meter.add(mBox, mScreen);
    meter.position.set(1.4, 0, 2.0);
    scene.add(meter);

    // --- Community houses (distribution endpoint) ---
    const houseMat = new THREE.MeshStandardMaterial({ color: 0x415070, roughness: 0.9, envMapIntensity: ENV });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x7cbd24, roughness: 0.8 });
    for (let i = 0; i < 3; i++) {
      const h = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), houseMat);
      base.position.y = 0.3;
      base.castShadow = true;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.4, 4), roofMat);
      roof.position.y = 0.8;
      roof.rotation.y = Math.PI / 4;
      h.add(base, roof);
      h.position.set(-3.0 - (i % 2) * 0.2, 0, -1.8 - i * 0.9);
      scene.add(h);
    }

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 13;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.35;
    const reduceMotion = prefersReducedMotion();
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.8;
    controls.update();

    const onResize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Project hotspot anchors to screen each frame and position DOM markers.
    const tmp = new THREE.Vector3();
    const updateMarkers = () => {
      for (const part of PARTS) {
        const el = markerRefs.current[part.id];
        if (!el) continue;
        tmp.set(part.anchor[0], part.anchor[1], part.anchor[2]);
        tmp.project(camera);
        const behind = tmp.z > 1;
        if (behind) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          continue;
        }
        const x = (tmp.x * 0.5 + 0.5) * width;
        const y = (-tmp.y * 0.5 + 0.5) * height;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      }
    };

    let reqId = 0;
    const render = () => {
      reqId = requestAnimationFrame(render);
      controls.autoRotate = !activeRef.current && !reduceMotion;
      controls.update();
      updateMarkers();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      pmrem.dispose();
      envMap.dispose();
    };
  }, []);

  const activePart = PARTS.find((p) => p.id === active) || null;

  return (
    <div className="anatomy-stage">
      <div ref={hostRef} className="anatomy-canvas-host">
        <canvas ref={canvasRef} className="anatomy-canvas" />
        {PARTS.map((p) => (
          <button
            key={p.id}
            ref={(el) => { markerRefs.current[p.id] = el; }}
            type="button"
            className={`anatomy-hotspot ${active === p.id ? 'is-active' : ''}`}
            onClick={() => setActive(active === p.id ? null : p.id)}
            aria-label={p.label}
          >
            <span className="anatomy-hotspot__dot" />
          </button>
        ))}
      </div>

      <div className="anatomy-controls">
        <div className="anatomy-parts" role="tablist" aria-label="System components">
          {PARTS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active === p.id}
              className={`anatomy-part-btn ${active === p.id ? 'is-active' : ''}`}
              onClick={() => setActive(active === p.id ? null : p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="anatomy-spec" aria-live="polite">
          {activePart ? (
            <>
              <strong>{activePart.label}</strong>
              <p>{activePart.spec}</p>
            </>
          ) : (
            <p className="anatomy-spec__hint">Drag to orbit the model, then select a component to see what it does.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemAnatomyCanvas;
