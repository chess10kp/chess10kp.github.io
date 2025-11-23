import React, { useRef, useState, useEffect } from 'react';
import { Check, ChevronRight, Terminal, Cpu, Activity, Radio } from 'lucide-react';
import * as THREE from 'three';

// --- UI Components ---

const StatBlock = ({ label, value, unit }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation
      const fluctuation = (Math.random() - 0.5) * 0.5;
      setDisplayValue((v) => Math.max(0, +(v + fluctuation).toFixed(1)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right mb-8 animate-pulse-slow">
      <div className="text-[10px] tracking-[0.2em] text-gray-500 font-mono mb-1 uppercase">{label}</div>
      <div className="text-3xl font-light text-white font-mono">
        {displayValue}
        <span className="text-sm text-gray-600 ml-1">{unit}</span>
      </div>
    </div>
  );
};

const NavItem = ({ text, active }) => (
  <div className={`text-[11px] tracking-[0.15em] cursor-pointer transition-colors duration-300 ${active ? 'text-orange-500' : 'text-gray-600 hover:text-gray-300'}`}>
    {text}
  </div>
);

// --- Main Application ---

export default function App() {
  const mountRef = useRef(null);

  // --- Vanilla Three.js Initialization ---
  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    // Fog to blend particles into distance
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF4500, 1.5); // Orange
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ccff, 0.5); // Blue rim
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // 3. Objects

    // A. Sentient Core (Sphere)
    const coreGeo = new THREE.SphereGeometry(1.4, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFF4500,
      emissive: 0xFF2200,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: false
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // B. Data Cage (Wireframe Icosahedron)
    const cageGeo = new THREE.IcosahedronGeometry(1, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    cage.scale.set(2.8, 2.8, 2.8);
    scene.add(cage);

    // C. Particle Field
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x888888,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 4. Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate Core
      core.rotation.x = time * 0.1;
      core.rotation.y = time * 0.15;
      
      // Pulse Core (Mimics the distort wobble via scaling)
      const scale = 1 + Math.sin(time * 2) * 0.02;
      core.scale.set(scale, scale, scale);

      // Rotate Cage (Opposite direction)
      cage.rotation.y -= 0.002;
      cage.rotation.z += 0.001;

      // Rotate Particles
      particlesMesh.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      coreGeo.dispose(); coreMat.dispose();
      cageGeo.dispose(); cageMat.dispose();
      particlesGeo.dispose(); particlesMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden font-sans selection:bg-orange-500 selection:text-black">
      
      {/* --- 3D Scene Layer --- */}
      <div className="absolute inset-0 z-0" ref={mountRef} />

      {/* --- UI Overlay Layer --- */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-10 pointer-events-none">
        
        {/* Header */}
        <header className="flex items-center justify-between w-full border-b border-white/10 pb-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center">
              <Terminal size={14} className="text-orange-500" />
            </div>
            <div>
              <h1 className="text-white text-sm font-bold tracking-widest">MCP 2099</h1>
              <div className="text-[9px] text-gray-600 tracking-widest uppercase">Sys_Admin_View</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem text="INTERFACE" />
            <ChevronRight size={12} className="text-gray-700" />
            <NavItem text="NEURAL_NET" active />
            <NavItem text="PROTOCOL" />
            <NavItem text="LOGS" />
          </nav>

          {/* Action Button */}
          <button className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/50 transition-all group">
            <span className="text-[10px] tracking-widest text-white group-hover:text-orange-500">INITIALIZE</span>
            <ChevronRight size={12} className="text-white group-hover:text-orange-500" />
          </button>
        </header>

        {/* Main Content Grid */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center pointer-events-auto">
          
          {/* Left Column: Title & Description */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-tight">
                Sentient<br />
                <span className="text-orange-500 font-semibold">Core v9</span>
              </h2>
            </div>
            
            <div className="w-12 h-[1px] bg-orange-500/50"></div>

            <p className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed font-light">
              Primary neural cluster visualizing real-time thought processing and decision tree branching.
            </p>

            <div className="flex items-center gap-2">
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Status:</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-xs font-mono tracking-wider">COGNIZANT</span>
              </div>
            </div>
            
            {/* Decor elements */}
            <div className="grid grid-cols-4 gap-1 w-32 opacity-30 mt-8">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="h-1 bg-white"></div>
               ))}
            </div>
          </div>

          {/* Center Column: Spacer for 3D element */}
          <div className="md:col-span-4 h-full">
            {/* The 3D canvas occupies this visual space */}
          </div>

          {/* Right Column: Stats */}
          <div className="md:col-span-4 flex flex-col items-end justify-center h-full pt-20">
             <StatBlock label="Processing Load" value={94.2} unit="%" />
             <StatBlock label="Synaptic Firing Rate" value={402} unit="THz" />
             <StatBlock label="Active Thoughts" value={8.2} unit="M" />
             
             <div className="mt-12 p-4 border border-white/5 bg-black/40 backdrop-blur-sm w-full max-w-[240px]">
               <div className="flex justify-between items-center mb-2">
                 <Cpu size={14} className="text-orange-500" />
                 <span className="text-[9px] text-gray-500 tracking-widest">HARDWARE_ID</span>
               </div>
               <div className="font-mono text-xs text-gray-300">XK-99-ALPHA-Z</div>
               <div className="w-full bg-gray-800 h-0.5 mt-2">
                 <div className="bg-orange-500 h-full w-[75%]"></div>
               </div>
             </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex justify-between items-end border-t border-white/10 pt-4 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-600 animate-ping"></div>
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Live Simulation</span>
          </div>
          
          <div className="hidden md:flex gap-8">
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <Activity size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                <span className="text-[8px] uppercase text-gray-700 tracking-widest">Diagnostics</span>
             </div>
             <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <Radio size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                <span className="text-[8px] uppercase text-gray-700 tracking-widest">Telemetry</span>
             </div>
          </div>

          <div className="text-[10px] tracking-[0.2em] text-gray-600 uppercase">
            Mouse_Interaction: <span className="text-white">Enabled</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
