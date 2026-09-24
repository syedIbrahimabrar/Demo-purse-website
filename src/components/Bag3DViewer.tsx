import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, Download, Sparkles } from 'lucide-react';

interface Bag3DViewerProps {
  modelUrl?: string;
  className?: string;
  autoRotate?: boolean;
  allowDownload?: boolean;
}

export const Bag3DViewer: React.FC<Bag3DViewerProps> = ({
  modelUrl = '/models/aurelis_hobo_bag.glb',
  className = 'w-full h-full',
  autoRotate = true,
  allowDownload = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.05, 50);
    camera.position.set(0, 0.05, 0.65);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfcf8f2, 1.4);
    scene.add(ambientLight);

    // Key warm light (illuminates front cognac leather texture)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    keyLight.position.set(1.8, 2.4, 2.2);
    scene.add(keyLight);

    // Rim / Back light (highlights strap silhouette & gold hardware buckle)
    const rimLight = new THREE.DirectionalLight(0xe8c682, 2.0);
    rimLight.position.set(-2.0, 2.0, -1.8);
    scene.add(rimLight);

    // Fill light (soft fill for natural leather creases)
    const fillLight = new THREE.DirectionalLight(0xd9e2ec, 1.0);
    fillLight.position.set(-1.5, 0.5, 1.5);
    scene.add(fillLight);

    // Subtle bottom pedestal bounce
    const bounceLight = new THREE.DirectionalLight(0xb57c50, 0.6);
    bounceLight.position.set(0, -1.5, 0.5);
    scene.add(bounceLight);

    // 5. Bag Model Group
    const bagPivot = new THREE.Group();
    scene.add(bagPivot);

    // 6. Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        // Compute bounding box and center precisely at pivot
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Re-center model vertices to origin
        model.position.x = -center.x;
        model.position.y = -center.y + 0.015; // slightly elevate for pedestal seating
        model.position.z = -center.z;

        // Enhance materials if needed
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const stdMat = mesh.material as THREE.MeshStandardMaterial;
              stdMat.envMapIntensity = 1.2;
              stdMat.needsUpdate = true;
            }
          }
        });

        // Add soft subtle contact shadow plane under the bag
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 128;
        shadowCanvas.height = 128;
        const sCtx = shadowCanvas.getContext('2d');
        if (sCtx) {
          const grad = sCtx.createRadialGradient(64, 64, 4, 64, 64, 60);
          grad.addColorStop(0, 'rgba(30, 20, 15, 0.38)');
          grad.addColorStop(0.5, 'rgba(30, 20, 15, 0.14)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          sCtx.fillStyle = grad;
          sCtx.fillRect(0, 0, 128, 128);
        }
        const shadowTex = new THREE.CanvasTexture(shadowCanvas);
        const shadowGeo = new THREE.PlaneGeometry(size.x * 1.25, size.z * 1.8);
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.y = -size.y * 0.49;
        bagPivot.add(shadowMesh);

        bagPivot.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D handbag:', error);
        setLoading(false);
      }
    );

    // 7. Interactive Mouse / Touch Orbit Interaction
    let targetRotationY = 0.25; // initial slight angle showing both front and side buckle
    let targetRotationX = 0.05;
    let currentRotationY = 0.25;
    let currentRotationX = 0.05;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let idleTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.004;

      // Restrict vertical pitch to luxury camera angles (-20deg to +25deg)
      targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
      idleTime = 0;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';
    domElement.style.cursor = 'grab';
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation when user is not interacting
      if (autoRotate && !isDragging) {
        idleTime += 0.016;
        if (idleTime > 1.2) {
          targetRotationY += 0.0035;
        }
      }

      // Smooth inertia damping
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;

      bagPivot.rotation.y = currentRotationY;
      bagPivot.rotation.x = currentRotationX;

      // Subtle breathing float oscillation
      const floatOffsetY = Math.sin(elapsedTime * 1.5) * 0.006;
      bagPivot.position.y = floatOffsetY;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, autoRotate]);

  return (
    <div className={`relative ${className} select-none`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D AURELIS Hobo Bag"
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5]/50 backdrop-blur-[2px] pointer-events-none transition-opacity duration-500">
          <div className="w-8 h-8 rounded-full border-2 border-[#A27B5C]/30 border-t-[#A27B5C] animate-spin mb-3" />
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#131B24]/70">
            Rendering 3D Atelier...
          </span>
        </div>
      )}

      {/* Luxury 360° Interactive Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF8F5]/90 backdrop-blur-md border border-stone-200/80 shadow-sm text-[#131B24] text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] font-medium">
          <RotateCw className={`w-3 h-3 text-[#A27B5C] ${isInteracting ? 'animate-spin' : ''}`} />
          <span>360° Interactive View</span>
        </div>
      </div>

      {/* 3D Asset Download Button */}
      {allowDownload && (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white backdrop-blur-sm border border-stone-200 shadow-sm text-[10.5px] uppercase tracking-[0.18em] text-[#131B24] font-medium transition-colors cursor-pointer"
              title="Download improved 3D model for Blender"
            >
              <Download className="w-3 h-3 text-[#A27B5C]" />
              <span className="hidden sm:inline">3D Assets</span>
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 shadow-xl p-3 z-30 animate-in fade-in slide-in-from-top-1 text-left">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A27B5C] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Blender Ready Deliverables</span>
                </div>
                <div className="space-y-1.5">
                  <a
                    href="/models/aurelis_hobo_bag.glb"
                    download="aurelis_hobo_bag.glb"
                    className="block px-2.5 py-1.5 text-xs text-[#131B24] hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="font-medium">aurelis_hobo_bag.glb</div>
                    <div className="text-[10px] text-stone-500">PBR Materials Embedded (1.3 MB)</div>
                  </a>
                  <a
                    href="/models/aurelis_hobo_bag.obj"
                    download="aurelis_hobo_bag.obj"
                    className="block px-2.5 py-1.5 text-xs text-[#131B24] hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="font-medium">aurelis_hobo_bag.obj</div>
                    <div className="text-[10px] text-stone-500">Source OBJ + Smooth Normals & UVs</div>
                  </a>
                  <a
                    href="/models/aurelis_hobo_bag.mtl"
                    download="aurelis_hobo_bag.mtl"
                    className="block px-2.5 py-1.5 text-xs text-[#131B24] hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="font-medium">aurelis_hobo_bag.mtl</div>
                    <div className="text-[10px] text-stone-500">Material Definitions</div>
                  </a>
                  <div className="pt-1.5 border-t border-stone-100">
                    <span className="text-[9.5px] uppercase tracking-wider text-stone-400 block px-2.5 mb-1">
                      PBR Textures (512x512)
                    </span>
                    <a
                      href="/models/textures/leather_cognac_diffuse.png"
                      download="leather_cognac_diffuse.png"
                      className="block px-2.5 py-1 text-[11px] text-stone-600 hover:text-[#131B24]"
                    >
                      • Cognac BaseColor Map
                    </a>
                    <a
                      href="/models/textures/leather_cognac_normal.png"
                      download="leather_cognac_normal.png"
                      className="block px-2.5 py-1 text-[11px] text-stone-600 hover:text-[#131B24]"
                    >
                      • Pebbled Leather Normal Map
                    </a>
                    <a
                      href="/models/textures/leather_cognac_roughness.png"
                      download="leather_cognac_roughness.png"
                      className="block px-2.5 py-1 text-[11px] text-stone-600 hover:text-[#131B24]"
                    >
                      • Leather Roughness Map
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
