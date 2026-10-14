import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface RealisticTreasureChest3DCanvasProps {
  isOpen: boolean;
  isOpening?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
}

export const RealisticTreasureChest3DCanvas: React.FC<RealisticTreasureChest3DCanvasProps> = ({
  isOpen,
  onClick
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    lidRotation: 0,
    targetLidRotation: 0,
    pointLight: null as THREE.PointLight | null,
    goldGlowLight: null as THREE.PointLight | null,
    particles: null as { points: THREE.Points; vels: { y: number; swaySpeed: number; swayAmp: number }[] } | null,
    chestGroup: null as THREE.Group | null,
    mouseTarget: { x: 0, y: 0 }
  });

  useEffect(() => {
    stateRef.current.targetLidRotation = isOpen ? -Math.PI * 0.65 : 0;
  }, [isOpen]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 6.2);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff4db, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffe299, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00e5ff, 1.0);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    // Glowing treasure light inside the chest
    const treasureLight = new THREE.PointLight(0xffd700, 0, 8);
    treasureLight.position.set(0, 0.3, 0);
    scene.add(treasureLight);
    stateRef.current.pointLight = treasureLight;

    // Outer warm gold aura
    const auraLight = new THREE.PointLight(0xffaa00, 1.2, 5);
    auraLight.position.set(0, 0, 1.5);
    scene.add(auraLight);
    stateRef.current.goldGlowLight = auraLight;

    // Chest Group
    const chestGroup = new THREE.Group();
    scene.add(chestGroup);
    stateRef.current.chestGroup = chestGroup;

    // Materials
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x3b200c,
      roughness: 0.7,
      metalness: 0.1
    });

    const ironBandMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.25
    });

    const darkIronMat = new THREE.MeshStandardMaterial({
      color: 0x221a12,
      metalness: 0.8,
      roughness: 0.4
    });

    // Chest Base
    const baseGeom = new THREE.BoxGeometry(2.4, 1.1, 1.6);
    const chestBase = new THREE.Mesh(baseGeom, woodMat);
    chestBase.position.y = -0.55;
    chestGroup.add(chestBase);

    // Gold Trim Straps on Base
    [-0.95, 0, 0.95].forEach(x => {
      const strapGeom = new THREE.BoxGeometry(0.18, 1.12, 1.62);
      const strap = new THREE.Mesh(strapGeom, ironBandMat);
      strap.position.set(x, -0.55, 0);
      chestGroup.add(strap);
    });

    // Lock Hasp on Base Front
    const haspGeom = new THREE.BoxGeometry(0.3, 0.4, 0.1);
    const hasp = new THREE.Mesh(haspGeom, darkIronMat);
    hasp.position.set(0, -0.2, 0.85);
    chestGroup.add(hasp);

    const lockGeom = new THREE.TorusGeometry(0.12, 0.035, 12, 24);
    const lock = new THREE.Mesh(lockGeom, ironBandMat);
    lock.position.set(0, -0.25, 0.88);
    chestGroup.add(lock);

    // Chest Lid Hinge Group (rotates around back edge: z = -0.8, y = 0)
    const lidHingeGroup = new THREE.Group();
    lidHingeGroup.position.set(0, 0, -0.8);
    chestGroup.add(lidHingeGroup);

    // Arched Lid
    const lidArchGeom = new THREE.CylinderGeometry(0.8, 0.8, 2.42, 32, 1, false, 0, Math.PI);
    const lidMesh = new THREE.Mesh(lidArchGeom, woodMat);
    lidMesh.rotation.z = Math.PI / 2;
    lidMesh.position.set(0, 0, 0.8);
    lidHingeGroup.add(lidMesh);

    // Lid Straps
    [-0.95, 0, 0.95].forEach(x => {
      const lidStrapGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.18, 32, 1, false, 0, Math.PI);
      const lidStrap = new THREE.Mesh(lidStrapGeom, ironBandMat);
      lidStrap.rotation.z = Math.PI / 2;
      lidStrap.position.set(x, 0, 0.8);
      lidHingeGroup.add(lidStrap);
    });

    // Gold Coins pile inside base
    const coinPileGeom = new THREE.BoxGeometry(2.1, 0.5, 1.3);
    const coinPileMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x996515,
      emissiveIntensity: 0.4
    });
    const coinPile = new THREE.Mesh(coinPileGeom, coinPileMat);
    coinPile.position.set(0, -0.15, 0);
    chestGroup.add(coinPile);

    // Floating Gold Sparkles
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    const vels: { y: number; swaySpeed: number; swayAmp: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.2;
      particlePositions[i * 3 + 1] = Math.random() * 2.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      vels.push({
        y: Math.random() * 0.025 + 0.015,
        swaySpeed: Math.random() * 2 + 1,
        swayAmp: Math.random() * 0.01 + 0.005
      });
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.08,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    particlePoints.position.set(0, 0, 0);
    chestGroup.add(particlePoints);
    stateRef.current.particles = { points: particlePoints, vels };

    // Mouse tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
      stateRef.current.mouseTarget = { x: my, y: mx };
    };
    const handleMouseLeave = () => {
      stateRef.current.mouseTarget = { x: 0, y: 0 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    let animId: number;
    let clock = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      clock += 0.03;

      const { targetLidRotation, pointLight, particles, mouseTarget } = stateRef.current;
      stateRef.current.lidRotation += (targetLidRotation - stateRef.current.lidRotation) * 0.1;
      lidHingeGroup.rotation.x = stateRef.current.lidRotation;

      if (chestGroup) {
        chestGroup.rotation.x += (mouseTarget.x - chestGroup.rotation.x) * 0.08;
        chestGroup.rotation.y += (mouseTarget.y - chestGroup.rotation.y) * 0.08;
        chestGroup.position.y = -0.15 + Math.sin(clock * 1.5) * 0.05;
      }

      const isOpenFraction = Math.abs(stateRef.current.lidRotation) / (Math.PI * 0.65);
      if (pointLight) {
        pointLight.intensity = isOpenFraction * (7 + Math.sin(clock * 5) * 1.5);
      }

      if (particles) {
        const { points, vels } = particles;
        const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
        (points.material as THREE.PointsMaterial).opacity = Math.min(isOpenFraction * 0.95, 0.95);

        for (let i = 0; i < particleCount; i++) {
          let y = posAttr.getY(i) + vels[i].y;
          if (y > 3) {
            y = 0;
            posAttr.setX(i, (Math.random() - 0.5) * 2.2);
            posAttr.setZ(i, (Math.random() - 0.5) * 1.5);
          }
          posAttr.setY(i, y);
          posAttr.setX(i, posAttr.getX(i) + Math.sin(clock * vels[i].swaySpeed) * vels[i].swayAmp);
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="w-full h-64 sm:h-72 md:h-80 cursor-pointer select-none touch-none flex items-center justify-center"
      title="Click 3D Treasure Chest to Open / Reveal Plunder"
    />
  );
};
