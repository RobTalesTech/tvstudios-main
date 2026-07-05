import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

type StepType = "idle" | "power-on" | "revealed" | "ready" | "transitioning";

// WebGL Error Boundary to catch any R3F initialization or runtime crashes
class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError?: (error: any) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("WebGL Canvas render error, falling back to 2D:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Sound synthesis helper using native Web Audio API (no external audio assets required)
const playIntroSound = (type: "click" | "power-on" | "enter") => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === "click") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === "power-on") {
      // Rising high-voltage static frequency charge
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(12000, audioCtx.currentTime + 1.2);
      
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);

      // CRT phosphor static pop at the end
      setTimeout(() => {
        const popOsc = audioCtx.createOscillator();
        const popGain = audioCtx.createGain();
        popOsc.frequency.setValueAtTime(150, audioCtx.currentTime);
        popGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        popOsc.connect(popGain);
        popGain.connect(audioCtx.destination);
        popOsc.start();
        popOsc.stop(audioCtx.currentTime + 0.12);
      }, 950);
    } else if (type === "enter") {
      // Low sub bass drop representing system initialization
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(85, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 1.5);
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    }
  } catch (e) {
    console.warn("Audio synthesis not supported by browser security policy.", e);
  }
};

interface TVModelProps {
  step: StepType;
  handlePowerOn: () => void;
  handleEnter: () => void;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

// 3D TV / CRT Mesh Component (Uses useFrame, must be nested inside Canvas)
function TVModel({ step, handlePowerOn, handleEnter, mouseRef }: TVModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const isPoweringOn = step !== "idle";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Mouse-driven camera cinematic pan & tilt parallax effect
    const mouseX = mouseRef.current.x; // Normalized [-1, 1] viewport position
    const mouseY = mouseRef.current.y; // Normalized [-1, 1] viewport position

    // Consistent camera framing distance
    const targetZ = 4.8;

    // Subtle panning offsets for 3D parallax without screen drift
    const targetX = mouseX * 0.25;
    const targetY = mouseY * 0.2;

    // Smooth lerp for professional cinematography
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.025);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.025);

    // Tilt camera target focus points to generate parallax
    targetLookAt.current.x = THREE.MathUtils.lerp(targetLookAt.current.x, mouseX * 0.08, 0.025);
    targetLookAt.current.y = THREE.MathUtils.lerp(targetLookAt.current.y, mouseY * 0.08, 0.025);
    targetLookAt.current.z = 0;
    
    state.camera.lookAt(targetLookAt.current);

    // 2. TV screen glow static flicker
    if (screenMaterialRef.current) {
      if (isPoweringOn) {
        // Generate real-time television static noise (gold/amber tones)
        const noise = Math.random();
        const baseColor = new THREE.Color(
          THREE.MathUtils.lerp(0.85, 1.0, noise), // R
          THREE.MathUtils.lerp(0.68, 0.78, noise), // G
          THREE.MathUtils.lerp(0.35, 0.45, noise)  // B
        );
        screenMaterialRef.current.color.copy(baseColor);
        
        const flicker = 0.85 + Math.sin(time * 60) * 0.15;
        screenMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          screenMaterialRef.current.emissiveIntensity,
          3.5 * flicker,
          0.06
        );
      } else {
        screenMaterialRef.current.emissiveIntensity = 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} scale={[1, 1, 1]}>
      {/* 1. Main TV Cabinet Frame - Polished premium black metal */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.7, 1.4]} />
        <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* Sci-Fi glowing glowing golden accent strip along the cabinet's top-front edge */}
      <mesh position={[0, 0.86, 0.71]}>
        <boxGeometry args={[2.4, 0.015, 0.015]} />
        <meshStandardMaterial 
          color="#ffaa44" 
          emissive="#ffaa44" 
          emissiveIntensity={isPoweringOn ? 2.5 : 0.8} 
          roughness={0.1}
        />
      </mesh>

      {/* 2. Front Screen Frame Bevel - High-contrast brushed metal bezel */}
      <mesh position={[0, 0, 0.71]}>
        <boxGeometry args={[2.14, 1.44, 0.05]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.12} />
      </mesh>

      {/* 3. Curved CRT Screen mesh - Sleek dark glass */}
      <mesh position={[0, 0, 0.73]}>
        <boxGeometry args={[1.96, 1.26, 0.04]} />
        <meshStandardMaterial
          ref={screenMaterialRef}
          color="#0d1411"
          emissive="#f7d08a"
          emissiveIntensity={0.05}
          roughness={0.05}
          metalness={0.6}
        />
        {/* Render HTML directly inside the screen mesh */}
        <Html
          center
          style={{
            height: '37.4vh',
            width: '58.2vh',
            maxWidth: '88vw',
            maxHeight: 'calc(88vw * 1.26 / 1.96)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none relative select-none">
            <AnimatePresence mode="wait">
              {step === "idle" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center gap-4 w-full h-full text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(212, 175, 55, 0.5)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePowerOn}
                    className="w-14 h-14 rounded-full bg-[#D4AF37] hover:bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all cursor-pointer pointer-events-auto"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </motion.button>
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#D4AF37] animate-pulse">
                    Click to Project
                  </span>
                </motion.div>
              )}

              {(step === "revealed" || step === "ready" || step === "transitioning") && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center gap-4 w-full h-full text-center"
                >
                  <motion.h1
                    initial={{ letterSpacing: "0.05em" }}
                    animate={{ letterSpacing: "0.15em" }}
                    transition={{ duration: 1.2 }}
                    className="font-display text-2xl md:text-4xl font-black uppercase text-gradient-gold select-none leading-none"
                  >
                    TV³ Studios
                  </motion.h1>

                  {step === "ready" && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.25)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnter}
                      className="px-6 py-2.5 rounded-full border border-[hsl(43_72%_55%)] bg-black text-[hsl(43_72%_55%)] hover:bg-[hsl(43_72%_55%)] hover:text-black font-mono text-[9px] font-bold uppercase tracking-[0.25em] transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer pointer-events-auto"
                    >
                      Enter Platform
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Html>
      </mesh>

      {/* 4. Side Control Panel Cover */}
      <mesh position={[1.11, 0, 0.1]}>
        <boxGeometry args={[0.18, 1.7, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.92} roughness={0.1} />
      </mesh>

      {/* 5. Analog Control Knobs - Polished gold */}
      <mesh position={[1.11, 0.35, 0.71]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[1.11, 0.05, 0.71]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* 6. Power LED Indicator */}
      <mesh position={[1.11, -0.35, 0.71]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={isPoweringOn ? "#00ff66" : "#ff2e63"} />
      </mesh>

      {/* 7. Classic TV Antennas fanning from one single socket on the right side */}
      <group position={[0.9, 0.85, 0]}>
        {/* Central root connection socket */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
        </mesh>
        
        {/* Left fanned rod */}
        <group rotation={[0, 0, -Math.PI / 6]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 1.2, 8]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.95} roughness={0.08} />
          </mesh>
        </group>
        
        {/* Center fanned rod */}
        <group rotation={[0, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 1.2, 8]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.95} roughness={0.08} />
          </mesh>
        </group>

        {/* Right fanned rod */}
        <group rotation={[0, 0, Math.PI / 6]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.008, 0.012, 1.2, 8]} />
            <meshStandardMaterial color="#b0b0b0" metalness={0.95} roughness={0.08} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

interface TV2DFallbackProps {
  step: StepType;
  handlePowerOn: () => void;
  handleEnter: () => void;
}

// Separate component for the 2D Fallback with constrained nested UI
function TV2DFallback({ step, handlePowerOn, handleEnter }: TV2DFallbackProps) {
  return (
    <motion.div 
      animate={step !== "idle" ? { scale: step === "ready" || step === "transitioning" ? 1.6 : 1.22 } : {}}
      className="w-[280px] h-[200px] border-4 border-zinc-800 bg-[#141414] rounded-3xl p-4 relative flex items-center shadow-2xl border-t-zinc-700 pointer-events-auto"
    >
      {/* Screen */}
      <div 
        className={`flex-1 h-full rounded-xl transition-all duration-1000 overflow-hidden relative border border-black flex flex-col items-center justify-center ${
          step !== "idle" 
            ? "bg-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]" 
            : "bg-[#0d1411]"
        }`}
      >
        {/* Scanlines on screen */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-25 pointer-events-none" />
        {step !== "idle" && (
          <motion.div 
            animate={{ opacity: [0.2, 0.6, 0.2] }} 
            transition={{ duration: 0.08, repeat: Infinity }}
            className="absolute inset-0 bg-[#D4AF37]/10 pointer-events-none" 
          />
        )}

        {/* Constrained HTML interface on the 2D TV screen glass */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 text-center select-none pointer-events-none">
          <AnimatePresence mode="wait">
            {step === "idle" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePowerOn}
                  className="w-10 h-10 rounded-full bg-[#D4AF37] hover:bg-white text-black flex items-center justify-center shadow-lg transition-all cursor-pointer pointer-events-auto"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </motion.button>
                <span className="font-mono text-[7px] uppercase tracking-widest text-[#D4AF37] animate-pulse">
                  Click to Project
                </span>
              </motion.div>
            )}

            {(step === "revealed" || step === "ready" || step === "transitioning") && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <h1 className="font-display text-lg font-black uppercase text-gradient-gold leading-none">
                  TV³ Studios
                </h1>

                {step === "ready" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="px-4 py-1.5 rounded-full border border-[hsl(43_72%_55%)] bg-black text-[hsl(43_72%_55%)] hover:bg-[hsl(43_72%_55%)] hover:text-black font-mono text-[8px] font-bold uppercase tracking-wider transition-all cursor-pointer pointer-events-auto"
                  >
                    Enter Platform
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Control Panel side */}
      <div className="w-12 h-full flex flex-col items-center justify-between py-2 pl-4 border-l border-zinc-900">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center">
          <div className="w-1 h-3 bg-zinc-700 rounded-full rotate-45" />
        </div>
        <div className="w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center">
          <div className="w-1 h-3 bg-zinc-700 rounded-full -rotate-45" />
        </div>
        {/* LED */}
        <div className={`w-2.5 h-2.5 rounded-full ${step !== "idle" ? "bg-emerald-500 shadow-[0_0_8px_#10B981]" : "bg-red-600"}`} />
      </div>
      {/* Antenna decoration */}
      <div className="absolute top-[-30px] left-1/4 w-[2px] h-[30px] bg-zinc-700 origin-bottom rotate-[-30deg]" />
      <div className="absolute top-[-30px] right-1/4 w-[2px] h-[30px] bg-zinc-700 origin-bottom rotate-[30deg]" />
    </motion.div>
  );
}

interface TVIntroProps {
  onEnter: () => void;
}



export default function TVIntro({ onEnter }: TVIntroProps) {
  const [step, setStep] = useState<StepType>("idle");
  
  // Track mouse coordinates across the entire viewport for parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Detect WebGL support synchronously before first render to prevent Canvas mount crashes
  const [hasWebGL, setHasWebGL] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  });

  const handlePowerOn = () => {
    if (step !== "idle") return;
    setStep("power-on");
    playIntroSound("click");
    playIntroSound("power-on");

    // Power on sequence finishes, transition to name reveal
    setTimeout(() => {
      setStep("revealed");
      
      // Secondary delay to show the Enter button after reveal text finishes animation
      setTimeout(() => {
        setStep("ready");
      }, 1500);

    }, 1500);
  };

  const handleEnter = () => {
    if (step !== "ready") return;
    setStep("transitioning");
    playIntroSound("click");
    playIntroSound("enter");

    // Quick white-flash transition under 500ms total
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-[#030303] select-none overflow-hidden flex flex-col items-center justify-center">
      {/* Background Grid Scanlines */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", 
          backgroundSize: "100% 4px, 6px 100%" 
        }} 
      />

      {/* 3D WebGL Canvas Layer or 2D CSS Fallback */}
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
        {hasWebGL ? (
          <WebGLErrorBoundary 
            fallback={<TV2DFallback step={step} handlePowerOn={handlePowerOn} handleEnter={handleEnter} />}
            onError={() => setHasWebGL(false)}
          >
            <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} shadows>
              {/* Brighter lighting setup to make the shape visibly stand out even before power-on */}
              <ambientLight intensity={0.8} />
              
              {/* Cool blue-white key light */}
              <directionalLight position={[8, 10, 6]} color="#cce6ff" intensity={2.2} castShadow />
              
              {/* Secondary fill light */}
              <pointLight position={[-5, 5, -5]} intensity={0.3} />
              
              {/* Warm amber rim/back light behind the TV */}
              <pointLight position={[-4, 3, -4]} color="#ff9933" intensity={2.5} />

              <TVModel 
                step={step} 
                handlePowerOn={handlePowerOn} 
                handleEnter={handleEnter} 
                mouseRef={mouseRef} 
              />

              {/* Lighter, warmer gradient floor plane catching reflections */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#2c221e" roughness={0.65} metalness={0.1} />
              </mesh>
            </Canvas>
          </WebGLErrorBoundary>
        ) : (
          <TV2DFallback step={step} handlePowerOn={handlePowerOn} handleEnter={handleEnter} />
        )}
      </div>

      {/* HUD framing HUD overlays */}
      <div className="absolute inset-0 z-30 w-full h-full flex flex-col items-center justify-between py-16 px-6 pointer-events-none">
        {/* Top Header metadata */}
        <div className="text-center">
          <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.6em] block">
            SIGNAL STATUS // STABLE
          </span>
          <span className="font-mono text-[8px] text-[hsl(43_72%_55%)]/60 uppercase tracking-[0.4em] block mt-1">
            ESTABLISHED 2026
          </span>
        </div>

        {/* Bottom system footer */}
        <div className="text-center font-mono text-[8px] text-zinc-700 tracking-widest uppercase">
          AI FILMMAKING PROTOCOLS // ALL DIRECTIVES ENGAGED
        </div>
      </div>

      {/* Realistic quick white-flash transition overlay */}
      <AnimatePresence>
        {step === "transitioning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeIn" }}
            className="absolute inset-0 bg-[#FFFFFF] z-[99] flex flex-col items-center justify-center"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
