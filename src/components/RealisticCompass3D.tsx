import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { playClickSound, playWarpSound, playLaserSound } from "../utils/cyberSound";
import { Layers, Eye, Compass, Box, RefreshCw } from "lucide-react";

export interface CompassHandle {
  spinAndEmbark: () => void;
  setHovered: (hovered: boolean) => void;
}

interface RealisticCompass3DProps {
  className?: string;
  onStartSpin?: () => void;
  onEmbark?: () => void;
}

export const RealisticCompass3D = forwardRef<CompassHandle, RealisticCompass3DProps>(
  ({ className = "", onStartSpin, onEmbark }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [renderMode, setRenderMode] = useState<"blueprint" | "solid">("blueprint");
    const [activeView, setActiveView] = useState<"iso" | "plan" | "elevation" | "print">("iso");
    const [visibleLayers, setVisibleLayers] = useState({
      foundation: true,
      columns: true,
      slabs: true,
      roof: true,
      gantry: true
    });
    const [isAutoRotate, setIsAutoRotate] = useState(true);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const modelGroupRef = useRef<THREE.Group | null>(null);
    const nozzleRef = useRef<THREE.Mesh | null>(null);
    const printLineRef = useRef<THREE.Line | null>(null);

    const isDraggingRef = useRef(false);
    const prevMousePosRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0.35, y: -0.6 });
    const currentRotationRef = useRef({ x: 0.35, y: -0.6 });
    const isWarpingRef = useRef(false);

    useImperativeHandle(ref, () => ({
      spinAndEmbark: () => {
        isWarpingRef.current = true;
        playWarpSound();
        playLaserSound();
        onStartSpin?.();

        // Spin acceleration effect
        let spinSpeed = 0.05;
        const spinInterval = setInterval(() => {
          spinSpeed += 0.02;
          if (modelGroupRef.current) {
            modelGroupRef.current.rotation.y += spinSpeed;
          }
        }, 16);

        setTimeout(() => {
          clearInterval(spinInterval);
          onEmbark?.();
        }, 650);
      },
      setHovered: (_hovered: boolean) => {
        // Subtle tilt on hover
      }
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || 640;
      const height = container.clientHeight || 420;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(12, 11, 16);
      camera.lookAt(0, 2, 0);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x64cfe6, 1.8);
      dirLight1.position.set(15, 20, 10);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xe75b2c, 1.2);
      dirLight2.position.set(-15, -10, -10);
      scene.add(dirLight2);

      // Grid Ground Plane
      const gridHelper = new THREE.GridHelper(24, 24, 0xe75b2c, 0x1f3c52);
      gridHelper.position.y = -0.05;
      scene.add(gridHelper);

      // Main Model Group
      const modelGroup = new THREE.Group();
      scene.add(modelGroup);
      modelGroupRef.current = modelGroup;

      // Create Structural CAD Building
      buildBuildingModel(modelGroup);

      // Render Loop
      let animId: number;
      let printStep = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);

        // Smooth rotation damping
        if (!isWarpingRef.current) {
          if (isAutoRotate && !isDraggingRef.current) {
            targetRotationRef.current.y += 0.004;
          }
          currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.1;
          currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.1;

          modelGroup.rotation.x = currentRotationRef.current.x;
          modelGroup.rotation.y = currentRotationRef.current.y;
        }

        // Animate 3D Concrete Printer Nozzle toolpath
        if (nozzleRef.current) {
          printStep += 0.03;
          nozzleRef.current.position.x = Math.sin(printStep) * 3.2;
          nozzleRef.current.position.z = Math.cos(printStep * 0.7) * 2.2;
          nozzleRef.current.position.y = 4.8 + Math.sin(printStep * 0.2) * 0.3;
        }

        renderer.render(scene, camera);
      };
      animate();

      // Mouse & Touch Interaction
      const handlePointerDown = (e: PointerEvent) => {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.clientX, y: e.clientY };
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - prevMousePosRef.current.x;
        const dy = e.clientY - prevMousePosRef.current.y;
        prevMousePosRef.current = { x: e.clientX, y: e.clientY };

        targetRotationRef.current.y += dx * 0.008;
        targetRotationRef.current.x += dy * 0.008;
        targetRotationRef.current.x = Math.max(-1.1, Math.min(1.1, targetRotationRef.current.x));
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
      };

      const dom = renderer.domElement;
      dom.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || 640;
        const h = container.clientHeight || 420;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        dom.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        renderer.dispose();
        if (container.contains(dom)) {
          container.removeChild(dom);
        }
      };
    }, []);

    // Helper to construct architectural building elements
    const buildBuildingModel = (group: THREE.Group) => {
      // Materials
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x64cfe6,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const solidMat = new THREE.MeshStandardMaterial({
        color: 0x163449,
        roughness: 0.4,
        metalness: 0.2
      });
      const concreteMat = new THREE.MeshStandardMaterial({
        color: 0x8a9da8,
        roughness: 0.85,
        metalness: 0.1
      });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x64cfe6,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        transmission: 0.7
      });
      const orangeBeamMat = new THREE.MeshStandardMaterial({
        color: 0xe75b2c,
        roughness: 0.3
      });

      // 1. Foundation Footing Slabs
      const foundationGroup = new THREE.Group();
      foundationGroup.name = "foundation";
      const padGeo = new THREE.BoxGeometry(2, 0.4, 2);
      const cols = [-4.5, -1.5, 1.5, 4.5];
      const rows = [-3, 0, 3];

      cols.forEach(x => {
        rows.forEach(z => {
          const pad = new THREE.Mesh(padGeo, concreteMat);
          pad.position.set(x, 0.2, z);
          foundationGroup.add(pad);
        });
      });
      group.add(foundationGroup);

      // 2. Structural Columns (R.C.C & Steel)
      const columnGroup = new THREE.Group();
      columnGroup.name = "columns";
      const colGeo = new THREE.BoxGeometry(0.4, 6.5, 0.4);

      cols.forEach(x => {
        rows.forEach(z => {
          const col = new THREE.Mesh(colGeo, orangeBeamMat);
          col.position.set(x, 3.45, z);
          columnGroup.add(col);
        });
      });
      group.add(columnGroup);

      // 3. Floor Slabs (Ground, First, Roof)
      const slabGroup = new THREE.Group();
      slabGroup.name = "slabs";
      const slabHeights = [0.4, 3.2, 6.2];

      slabHeights.forEach((y, idx) => {
        const slabGeo = new THREE.BoxGeometry(10.5, 0.25, 7.5);
        const slab = new THREE.Mesh(slabGeo, idx === 2 ? orangeBeamMat : concreteMat);
        slab.position.set(0, y, 0);
        slabGroup.add(slab);

        // Glass curtain walls between ground and first floor
        if (idx === 0) {
          const glassGeo = new THREE.BoxGeometry(10.2, 2.7, 7.2);
          const glass = new THREE.Mesh(glassGeo, glassMat);
          glass.position.set(0, 1.7, 0);
          slabGroup.add(glass);
        }
      });
      group.add(slabGroup);

      // 4. Roof Truss & Cantilever Beams
      const roofGroup = new THREE.Group();
      roofGroup.name = "roof";
      const trussBeamGeo = new THREE.CylinderGeometry(0.12, 0.12, 11, 8);
      for (let i = -3; i <= 3; i += 1.5) {
        const beam = new THREE.Mesh(trussBeamGeo, wireMat);
        beam.rotation.z = Math.PI / 2;
        beam.position.set(0, 6.6, i);
        roofGroup.add(beam);
      }
      group.add(roofGroup);

      // 5. 3D Concrete Printing Gantry Frame & Extruder Nozzle
      const gantryGroup = new THREE.Group();
      gantryGroup.name = "gantry";

      // Gantry Rails
      const railGeo = new THREE.BoxGeometry(12, 0.2, 0.2);
      const rail1 = new THREE.Mesh(railGeo, orangeBeamMat);
      rail1.position.set(0, 7.8, -4);
      const rail2 = new THREE.Mesh(railGeo, orangeBeamMat);
      rail2.position.set(0, 7.8, 4);
      gantryGroup.add(rail1, rail2);

      // Cross Gantry Beam
      const crossBeamGeo = new THREE.BoxGeometry(0.3, 0.3, 8.2);
      const crossBeam = new THREE.Mesh(crossBeamGeo, solidMat);
      crossBeam.position.set(0, 7.9, 0);
      gantryGroup.add(crossBeam);

      // Extruder Head / Nozzle
      const nozzleGeo = new THREE.ConeGeometry(0.3, 0.8, 16);
      const nozzle = new THREE.Mesh(nozzleGeo, orangeBeamMat);
      nozzle.rotation.x = Math.PI;
      nozzle.position.set(0, 4.8, 0);
      gantryGroup.add(nozzle);
      nozzleRef.current = nozzle;

      // Laser guide line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -1.8, 0)
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x64cfe6 });
      const line = new THREE.Line(lineGeo, lineMat);
      nozzle.add(line);

      group.add(gantryGroup);
    };

    // Update Materials when renderMode toggles
    useEffect(() => {
      const group = modelGroupRef.current;
      if (!group) return;

      group.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (renderMode === "blueprint") {
            child.material = new THREE.MeshBasicMaterial({
              color: child.parent?.name === "gantry" ? 0xe75b2c : 0x64cfe6,
              wireframe: true,
              transparent: true,
              opacity: 0.75
            });
          } else {
            // Solid mode
            if (child.parent?.name === "columns" || child.parent?.name === "gantry") {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xe75b2c,
                roughness: 0.4
              });
            } else if (child.parent?.name === "slabs" || child.parent?.name === "foundation") {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x1f3c52,
                roughness: 0.6
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x64cfe6,
                roughness: 0.3,
                transparent: true,
                opacity: 0.6
              });
            }
          }
        }
      });
    }, [renderMode]);

    // Handle view switch
    const setView = (view: "iso" | "plan" | "elevation" | "print") => {
      setActiveView(view);
      playClickSound();

      if (view === "iso") {
        targetRotationRef.current = { x: 0.35, y: -0.6 };
      } else if (view === "plan") {
        targetRotationRef.current = { x: 1.45, y: 0 };
      } else if (view === "elevation") {
        targetRotationRef.current = { x: 0.05, y: 0 };
      } else if (view === "print") {
        targetRotationRef.current = { x: 0.5, y: 0.8 };
      }
    };

    return (
      <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
        {/* Model Container Panel */}
        <div className="relative h-[380px] sm:h-[460px] md:h-[520px] w-full rounded-sm bg-[#120e0f]/90 border border-[#513b3b] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Blueprint Corner Accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#c83b35] pointer-events-none z-10" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#dfb8af] pointer-events-none z-10" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#dfb8af] pointer-events-none z-10" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#c83b35] pointer-events-none z-10" />

          {/* Top HUD Status Bar */}
          <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c83b35] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs text-[#dfb8af] font-semibold tracking-wider">
                PARAMETRIC CAD · 3D CONCRETE PRINTING MODEL
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 font-mono text-[10px] text-[#bcaea2]">
              <span>SPAN: 18,000 mm</span>
              <span>•</span>
              <span>BAY: 12,000 mm</span>
              <span>•</span>
              <span className="text-[#eb9287]">SCALE: 1:100</span>
            </div>
          </div>

          {/* Three.js Canvas Element */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* View Preset Buttons (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setView("iso")}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeView === "iso"
                  ? "bg-[#c83b35] text-white shadow-[0_0_12px_rgba(200,59,53,0.6)]"
                  : "bg-[#201819]/80 text-[#bcaea2] hover:text-white border border-[#513b3b]"
              }`}
            >
              ISOMETRIC
            </button>
            <button
              type="button"
              onClick={() => setView("plan")}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeView === "plan"
                  ? "bg-[#dfb8af] text-[#141011] font-bold shadow-[0_0_12px_rgba(223,184,175,0.6)]"
                  : "bg-[#201819]/80 text-[#bcaea2] hover:text-white border border-[#513b3b]"
              }`}
            >
              FLOOR PLAN
            </button>
            <button
              type="button"
              onClick={() => setView("elevation")}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeView === "elevation"
                  ? "bg-[#dfb8af] text-[#141011] font-bold shadow-[0_0_12px_rgba(223,184,175,0.6)]"
                  : "bg-[#201819]/80 text-[#bcaea2] hover:text-white border border-[#513b3b]"
              }`}
            >
              ELEVATION
            </button>
            <button
              type="button"
              onClick={() => setView("print")}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeView === "print"
                  ? "bg-[#d4bd88] text-[#141011] font-bold shadow-[0_0_12px_rgba(212,189,136,0.6)]"
                  : "bg-[#201819]/80 text-[#bcaea2] hover:text-white border border-[#513b3b]"
              }`}
            >
              3D NOZZLE
            </button>
          </div>

          {/* Controls & Mode Toggles (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
            {/* Auto-Rotate Toggle */}
            <button
              type="button"
              title="Toggle Auto Rotate"
              onClick={() => {
                setIsAutoRotate(!isAutoRotate);
                playClickSound();
              }}
              className={`p-1.5 sm:p-2 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                isAutoRotate
                  ? "bg-[#201819] border-[#dfb8af] text-[#dfb8af]"
                  : "bg-[#141011] border-[#513b3b] text-gray-500"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} />
            </button>

            {/* Wireframe vs Solid Toggle */}
            <button
              type="button"
              onClick={() => {
                setRenderMode(renderMode === "blueprint" ? "solid" : "blueprint");
                playClickSound();
              }}
              className="px-3 py-1.5 rounded text-[10px] sm:text-xs font-mono font-bold bg-[#201819] border border-[#dfb8af]/60 text-[#dfb8af] hover:bg-[#332326] transition-all cursor-pointer flex items-center space-x-1.5 shadow-[0_0_10px_rgba(223,184,175,0.3)]"
            >
              <Box className="w-3.5 h-3.5" />
              <span>{renderMode === "blueprint" ? "WIREFRAME" : "SOLID BIM"}</span>
            </button>
          </div>

          {/* Interactive Hint */}
          <div className="absolute top-12 left-5 z-10 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
            <span className="font-mono text-[9px] text-[#bcaea2]">
              DRAG TO ROTATE • SCROLL TO ZOOM • TEST STRUCTURAL LAYERS
            </span>
          </div>
        </div>
      </div>
    );
  }
);

RealisticCompass3D.displayName = "RealisticCompass3D";
