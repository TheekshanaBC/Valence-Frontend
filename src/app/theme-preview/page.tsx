"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Code, Shield, Cpu, Sparkles, Activity } from "lucide-react"

type ThemeType = "minimal" | "terminal" | "glass" | "brutal" | "synthwave" | "print" | "web3" | "scifi" | "atomic" | "energy" | "scifi-cyber" | "scifi-tactical" | "scifi-command" | "atomic-quantum" | "atomic-hex" | "atomic-fusion" | "atomic-v2" | "atomic-v3" | "atomic-v4"

export default function ThemePreviewPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeType>("minimal")

  const themes = [
    { id: "minimal", name: "Minimalist", icon: <Shield className="w-4 h-4" /> },
    { id: "terminal", name: "Terminal / Hacker", icon: <Code className="w-4 h-4" /> },
    { id: "glass", name: "Glassmorphism", icon: <Sparkles className="w-4 h-4" /> },
    { id: "brutal", name: "Neo-Brutalism", icon: <Cpu className="w-4 h-4" /> },
    { id: "synthwave", name: "Retro Synthwave", icon: <Sparkles className="w-4 h-4" /> },
    { id: "print", name: "Editorial Print", icon: <Code className="w-4 h-4" /> },
    { id: "web3", name: "Modern Web3", icon: <Shield className="w-4 h-4" /> },
    { id: "scifi", name: "Sci-Fi HUD (Base)", icon: <Cpu className="w-4 h-4" /> },
    { id: "atomic", name: "Atomic Bonds", icon: <Activity className="w-4 h-4" /> },
    { id: "energy", name: "Kinetic Energy", icon: <ArrowRight className="w-4 h-4" /> },
    { id: "scifi-cyber", name: "Sci-Fi: Cyberpunk", icon: <Cpu className="w-4 h-4" /> },
    { id: "scifi-tactical", name: "Sci-Fi: Tactical", icon: <Shield className="w-4 h-4" /> },
    { id: "scifi-command", name: "Sci-Fi: Deep Space", icon: <Sparkles className="w-4 h-4" /> },
    { id: "atomic-quantum", name: "Atomic: Quantum", icon: <Activity className="w-4 h-4" /> },
    { id: "atomic-hex", name: "Atomic: Graphene", icon: <Code className="w-4 h-4" /> },
    { id: "atomic-fusion", name: "Atomic: Core Fusion", icon: <Sparkles className="w-4 h-4" /> },
    { id: "atomic-v2", name: "⭐ Atomic v2: Orbital", icon: <Activity className="w-4 h-4" /> },
    { id: "atomic-v3", name: "⭐ Atomic v3: Particle", icon: <Activity className="w-4 h-4" /> },
    { id: "atomic-v4", name: "⭐ Atomic v4: Molecule", icon: <Activity className="w-4 h-4" /> },
  ] as const

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Theme Selector UI (always consistent) */}
      <div className="w-full bg-zinc-900 text-white p-4 border-b border-zinc-800 z-50 flex flex-wrap items-center justify-center gap-4 sticky top-0">
        <span className="text-sm font-semibold text-zinc-400 mr-4 uppercase tracking-wider">Select Theme:</span>
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setActiveTheme(theme.id as ThemeType)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full ${
              activeTheme === theme.id 
                ? "bg-white text-black scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {theme.icon}
            {theme.name}
          </button>
        ))}
      </div>

      {/* The dynamically styled preview area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeTheme === "minimal" && <MinimalTheme key="minimal" />}
          {activeTheme === "terminal" && <TerminalTheme key="terminal" />}
          {activeTheme === "glass" && <GlassTheme key="glass" />}
          {activeTheme === "brutal" && <BrutalTheme key="brutal" />}
          {activeTheme === "synthwave" && <SynthwaveTheme key="synthwave" />}
          {activeTheme === "print" && <PrintTheme key="print" />}
          {activeTheme === "web3" && <Web3Theme key="web3" />}
          {activeTheme === "scifi" && <ScifiTheme key="scifi" />}
          {activeTheme === "atomic" && <AtomicTheme key="atomic" />}
          {activeTheme === "energy" && <EnergyTheme key="energy" />}
          {activeTheme === "scifi-cyber" && <ScifiCyberTheme key="scifi-cyber" />}
          {activeTheme === "scifi-tactical" && <ScifiTacticalTheme key="scifi-tactical" />}
          {activeTheme === "scifi-command" && <ScifiCommandTheme key="scifi-command" />}
          {activeTheme === "atomic-quantum" && <AtomicQuantumTheme key="atomic-quantum" />}
          {activeTheme === "atomic-hex" && <AtomicHexTheme key="atomic-hex" />}
          {activeTheme === "atomic-fusion" && <AtomicFusionTheme key="atomic-fusion" />}
          {activeTheme === "atomic-v2" && <AtomicV2Theme key="atomic-v2" />}
          {activeTheme === "atomic-v3" && <AtomicV3Theme key="atomic-v3" />}
          {activeTheme === "atomic-v4" && <AtomicV4Theme key="atomic-v4" />}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ==========================================
// 1. MINIMAL THEME
// High contrast, stark, clean edges, slow fades
// ==========================================
function MinimalTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 bg-black text-white p-8 md:p-20 font-sans flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6">Valence.</h1>
        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-xl mx-auto mb-12 tracking-wide">
          The most refined blockchain simulation engine. Uncompromising performance.
        </p>
        <div className="flex gap-6 justify-center">
          <button className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors">
            Initialize
          </button>
          <button className="px-8 py-3 bg-transparent border border-zinc-800 text-white text-sm uppercase tracking-widest hover:border-white transition-colors">
            Documentation
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// 2. TERMINAL / HACKER THEME
// Monospace, green/black, grid background, rigid pop-ins
// ==========================================
function TerminalTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#050505] text-[#00ff00] p-8 md:p-20 font-mono relative"
      style={{
        backgroundImage: "linear-gradient(#00ff0011 1px, transparent 1px), linear-gradient(90deg, #00ff0011 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }}
    >
      <div className="max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-[2px] bg-[#00ff00] mb-8 origin-left"
        />
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          &gt; VALENCE_NODE_v1.0
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl opacity-80 mb-12"
        >
          [SYSTEM ALIVE] Decentralized execution environment initialized.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between px-6 py-4 border border-[#00ff00] bg-[#00ff00]/10 hover:bg-[#00ff00] hover:text-black transition-colors"
          >
            <span>CONNECT_WALLET.EXE</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between px-6 py-4 border border-[#00ff00]/30 hover:border-[#00ff00] transition-colors"
          >
            <span>READ_DOCS.TXT</span>
            <Code className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 3. GLASSMORPHISM THEME
// Blurs, glowing orbs, rounded corners, bouncy spring animations
// ==========================================
function GlassTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-slate-950 text-white p-8 md:p-20 font-sans relative flex items-center justify-center overflow-hidden"
    >
      {/* Background glowing orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        className="relative z-10 p-12 md:p-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl max-w-4xl w-full text-center"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">
          Valence
        </h1>
        <p className="text-xl text-blue-100/70 mb-12 max-w-2xl mx-auto">
          Experience the future of local blockchain simulation. Fluid, beautiful, and incredibly fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold transition-shadow">
            Launch Platform
          </button>
          <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ==========================================
// 4. NEO-BRUTALISM THEME
// Hard shadows, thick borders, bright colors, aggressive bouncy animations
// ==========================================
function BrutalTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#ffeebf] text-black p-8 md:p-20 font-black relative flex flex-col items-center justify-center"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ y: -100, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16 relative"
        >
          <div className="absolute -top-6 -right-6 bg-[#ff3b30] border-4 border-black text-white px-4 py-2 transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            v1.0 BETA
          </div>
          <h1 className="text-7xl md:text-9xl uppercase tracking-tighter mb-4">
            Valence
          </h1>
          <h2 className="text-3xl md:text-5xl bg-[#ffff00] inline-block px-4 py-2 border-4 border-black uppercase mb-8">
            Blockchain Simulator
          </h2>
          <p className="text-xl md:text-2xl font-bold max-w-2xl leading-tight">
            No fluff. Just raw, decentralized power running directly on your machine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.button 
            whileHover={{ scale: 1.05, y: -4, x: -4, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95, y: 0, x: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className="w-full bg-[#007aff] text-white border-4 border-black px-8 py-6 text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between"
          >
            <span>Open Wallet</span>
            <ArrowRight className="w-8 h-8" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -4, x: -4, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ scale: 0.95, y: 0, x: 0, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className="w-full bg-[#ffcc00] text-black border-4 border-black px-8 py-6 text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between"
          >
            <span>View Docs</span>
            <Shield className="w-8 h-8" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 5. RETRO SYNTHWAVE THEME
// Neon pinks/purples, glowing text, retro grid
// ==========================================
function SynthwaveTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#0b0c10] text-[#f706d8] p-8 md:p-20 font-sans relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #11001c 0%, #300030 100%)"
      }}
    >
      {/* Perspective Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] border-t-2 border-[#00f3ff] shadow-[0_0_20px_#00f3ff]"
        style={{
          background: "linear-gradient(transparent 95%, #f706d8 100%), linear-gradient(90deg, transparent 95%, #f706d8 100%)",
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)",
          transformOrigin: "bottom center"
        }}
      />
      
      <div className="max-w-4xl w-full text-center relative z-10 -mt-20">
        <motion.h1
          initial={{ textShadow: "0 0 0px #00f3ff" }}
          animate={{ textShadow: ["0 0 10px #00f3ff", "0 0 30px #00f3ff", "0 0 10px #00f3ff"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl md:text-9xl font-black italic tracking-widest text-white mb-4 uppercase"
        >
          VALENCE
        </motion.h1>
        <h2 className="text-2xl md:text-4xl text-[#00f3ff] mb-12 tracking-[0.2em] uppercase font-bold" style={{ textShadow: "0 0 10px #00f3ff" }}>
          Neon Network
        </h2>
        
        <div className="flex gap-6 justify-center">
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px #f706d8" }}
            className="px-8 py-3 bg-[#f706d8] text-white font-bold uppercase tracking-widest border-2 border-white"
          >
            Enter Grid
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00f3ff" }}
            className="px-8 py-3 bg-transparent text-[#00f3ff] font-bold uppercase tracking-widest border-2 border-[#00f3ff]"
          >
            Data Log
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 6. EDITORIAL PRINT THEME
// Off-white, serif, thin lines, newspaper layout
// ==========================================
function PrintTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0, filter: "sepia(100%) blur(10px)" }}
      animate={{ opacity: 1, filter: "sepia(0%) blur(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex-1 bg-[#f4f1ea] text-[#2c2b2a] p-8 md:p-12 font-serif"
    >
      <div className="max-w-5xl mx-auto border-t-4 border-b-4 border-[#2c2b2a] py-8">
        <header className="flex justify-between items-end border-b border-[#2c2b2a] pb-4 mb-12">
          <div>
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-none">The Valence</h1>
            <p className="text-xl italic mt-2 text-[#5a5855]">A Study in Decentralized Systems</p>
          </div>
          <div className="text-right text-sm uppercase tracking-widest">
            <p>Vol. I — No. 1</p>
            <p>EST. 2026</p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-2xl leading-relaxed mb-6 first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              In an era defined by complex networks, the Valence simulator stands as a paradigm of educational clarity. By running a local Proof-of-Work cluster, it demystifies the cryptographic dance of modern ledgers.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="border border-[#2c2b2a] px-6 py-2 hover:bg-[#2c2b2a] hover:text-[#f4f1ea] transition-colors">
                Read Documentation
              </button>
            </div>
          </div>
          <div className="border-l border-[#2c2b2a] pl-12 flex flex-col justify-center">
            <h3 className="text-lg uppercase tracking-widest font-bold mb-4 border-b border-[#2c2b2a] pb-2">Modules</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Cryptographic Signatures</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> P2P Gossip Protocol</li>
              <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Merkle Trees</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 7. MODERN WEB3 THEME
// Very dark, sophisticated gradients, highly polished
// ==========================================
function Web3Theme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#030303] text-white p-8 md:p-20 font-sans flex flex-col items-center justify-center relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-gradient-to-b from-blue-900/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl w-full text-center z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400 mb-8">
            <Sparkles className="w-4 h-4" /> Valence Mainnet is Live
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Future</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            A developer-focused blockchain environment designed for speed, security, and scalability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
              <Code className="w-5 h-5" /> Connect Wallet
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              Explore Network
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 8. SCI-FI HUD THEME
// Hexagons, cyan/orange accents, metallic dark background
// ==========================================
function ScifiTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#090b10] text-[#4dd0e1] p-8 md:p-20 font-mono relative overflow-hidden"
    >
      {/* Decorative HUD Elements */}
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-[#4dd0e1] w-16 h-16 opacity-50"></div>
      <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-[#4dd0e1] w-16 h-16 opacity-50"></div>
      
      <div className="max-w-5xl mx-auto mt-12 flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-[1px] border-dashed border-[#4dd0e1] rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-24 h-24 border border-[#ff9100] rounded-full flex items-center justify-center">
            <Cpu className="w-10 h-10 text-[#4dd0e1]" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.2em] mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#4dd0e1]">
          Valence Core
        </h1>
        
        <div className="flex items-center gap-4 mb-12 opacity-80">
          <div className="h-[1px] w-16 bg-[#ff9100]"></div>
          <span className="uppercase text-sm tracking-widest text-[#ff9100]">System Status: Nominal</span>
          <div className="h-[1px] w-16 bg-[#ff9100]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(77, 208, 225, 0.1)" }}
            className="group relative px-6 py-4 border border-[#4dd0e1] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#4dd0e1] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <span className="uppercase tracking-widest">Initialize Uplink</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 145, 0, 0.1)" }}
            className="group relative px-6 py-4 border border-[#ff9100] text-[#ff9100] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-[2px] bg-[#ff9100] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
            <span className="uppercase tracking-widest">Access Matrix</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 9. ATOMIC BONDS THEME (Valence Chemistry)
// Orbits, nodes, dark matter backgrounds, neon blue/white
// ==========================================
function AtomicTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#050914] text-[#e2e8f0] p-8 md:p-20 font-sans relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Orbits */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full border border-[#3b82f6]/30"
        >
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#60a5fa] rounded-full shadow-[0_0_15px_#60a5fa] -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-[#8b5cf6]/30"
        >
          <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-[#a78bfa] rounded-full shadow-[0_0_20px_#a78bfa] -translate-x-1/2 translate-y-1/2"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
          <span className="text-sm font-mono tracking-widest text-[#94a3b8] uppercase">Isotope V-26</span>
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
        </div>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
          Valence <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#a78bfa]">Engine</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-light max-w-2xl text-[#94a3b8] mb-12">
          Harness the atomic bonds of cryptography. A P2P network engineered for elemental stability and speed.
        </p>

        <div className="flex gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="relative px-8 py-4 rounded-full bg-transparent border border-[#3b82f6] text-[#60a5fa] font-medium tracking-wide overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#3b82f6]/10 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
            Form Connection
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full bg-[#1e293b] text-white hover:bg-[#334155] transition-colors font-medium tracking-wide"
          >
            Inspect Elements
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 10. KINETIC ENERGY THEME
// High voltage, electric plasma, fast dynamic motion
// ==========================================
function EnergyTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-black text-white p-8 md:p-20 font-sans relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Electric Plasma Lines */}
      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-0 left-1/4 w-[2px] h-full bg-[#eab308] shadow-[0_0_20px_#eab308] origin-top opacity-50"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.9, 0.2], scaleY: [1, 1.1, 1] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-0 right-1/4 w-[1px] h-full bg-[#38bdf8] shadow-[0_0_15px_#38bdf8] origin-bottom opacity-50"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ x: -100, skewX: -20, opacity: 0 }}
          animate={{ x: 0, skewX: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">Valence</span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-[#eab308] mb-8" style={{ textShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}>
            High Voltage
          </h2>
          
          <p className="text-xl md:text-3xl font-bold max-w-2xl mb-12 uppercase tracking-wide">
            Instant execution. Maximum throughput. Raw computational energy.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-[#eab308] text-black font-black uppercase text-xl italic hover:bg-white transition-colors transform -skew-x-12 hover:scale-105 active:scale-95 shadow-[8px_8px_0_rgba(255,255,255,0.2)]">
              Ignite Node
            </button>
            <button className="px-10 py-5 bg-transparent border-4 border-[#38bdf8] text-[#38bdf8] font-black uppercase text-xl italic hover:bg-[#38bdf8] hover:text-black transition-colors transform -skew-x-12 hover:scale-105 active:scale-95 shadow-[8px_8px_0_rgba(56,189,248,0.2)]">
              Measure Output
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 11. SCI-FI: CYBERPUNK HUD
// Neon magenta/cyan, angled cuts, glitchy vibe
// ==========================================
function ScifiCyberTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#0a0a0c] text-[#f0f] p-8 md:p-20 font-mono relative overflow-hidden"
    >
      {/* Glitch Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff 2px, #00ffff 4px)", backgroundSize: "100% 4px" }}></div>
      
      <div className="max-w-5xl mx-auto mt-12 flex flex-col items-center relative z-10">
        <div className="mb-4 text-[#0ff] text-sm tracking-[0.3em] flex items-center gap-4">
          <span>// SYS.OVERRIDE</span>
          <div className="h-2 w-12 bg-[#f0f]"></div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0ff] to-[#f0f] relative" style={{ WebkitTextStroke: "1px #f0f" }}>
          Valence
          <motion.span 
            animate={{ x: [-2, 2, -1, 3, 0], y: [1, -2, 2, -1, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-0 left-0 text-[#0ff] opacity-50 mix-blend-screen pointer-events-none"
          >
            Valence
          </motion.span>
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-[#0ff] mb-12">
          Node_Active
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="group relative px-8 py-6 bg-[#f0f]/10 border-l-4 border-[#f0f] overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-[#f0f] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 uppercase tracking-widest font-bold group-hover:text-black transition-colors flex justify-between items-center">
              Execute <ArrowRight className="w-6 h-6" />
            </span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="group relative px-8 py-6 bg-[#0ff]/10 border-r-4 border-[#0ff] overflow-hidden backdrop-blur-sm text-[#0ff]"
          >
            <div className="absolute inset-0 bg-[#0ff] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 uppercase tracking-widest font-bold group-hover:text-black transition-colors flex justify-between items-center">
              Decrypt <Shield className="w-6 h-6" />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 12. SCI-FI: TACTICAL / MILITARY
// Dark olive/gunmetal, rigid grid, crosshairs, night vision green
// ==========================================
function ScifiTacticalTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#121412] text-[#4af626] p-4 md:p-12 font-mono relative overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: "linear-gradient(rgba(74, 246, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 246, 38, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      {/* Tactical Crosshairs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-[#4af626]/20 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-[#4af626]/10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-[#4af626]/10 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 border border-[#4af626]/30 bg-black/50 p-6 flex flex-col">
          <div className="flex justify-between items-center border-b border-[#4af626]/30 pb-2 mb-4">
            <span className="text-xs tracking-widest">[ SYSTEM STATUS ]</span>
            <div className="w-2 h-2 bg-[#4af626] animate-pulse"></div>
          </div>
          <div className="text-xs space-y-2 opacity-80 mb-8">
            <p>» INIT: VALENCE_CORE</p>
            <p>» SYNC: 100%</p>
            <p>» PEERS: 42 ONLINE</p>
            <p>» LATENCY: 12ms</p>
          </div>
          <button className="mt-auto border border-[#4af626] p-3 text-sm hover:bg-[#4af626] hover:text-black transition-colors uppercase tracking-widest flex items-center justify-between">
            [ INITIALIZE ] <Cpu className="w-4 h-4" />
          </button>
        </div>

        <div className="md:col-span-8 flex flex-col justify-center border-l-4 border-[#4af626] pl-8">
          <p className="text-sm tracking-[0.4em] mb-2">TARGET ACQUIRED // VALENCE</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-[0_0_10px_rgba(74,246,38,0.5)]">
            TACTICAL<br/>NETWORK
          </h1>
          <p className="max-w-xl text-[#4af626]/70 uppercase tracking-widest leading-loose text-sm mb-8">
            Deploy local blockchain clusters with military precision. Monitor peer telemetry and execute transactions with zero latency.
          </p>
          <button className="bg-[#4af626] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors w-max shadow-[0_0_20px_rgba(74,246,38,0.4)]">
            ENGAGE PROTOCOL
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 13. SCI-FI: DEEP SPACE COMMAND
// Deep navy, elegant glowing ice blue, clean interfaces
// ==========================================
function ScifiCommandTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#020617] text-white p-8 md:p-20 font-sans relative overflow-hidden flex items-center justify-center"
    >
      {/* Deep Space Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.15)_0%,_rgba(2,6,23,1)_70%)] pointer-events-none"></div>
      
      {/* Minimalist Tech Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80vw] h-[80vw] border-[1px] border-sky-500/10 rounded-full pointer-events-none flex items-center justify-center"
      >
        <div className="w-4 h-4 rounded-full bg-sky-400 blur-sm absolute top-0 -translate-y-1/2"></div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="p-10 md:p-16 rounded-[40px] bg-slate-900/40 border border-sky-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(14,165,233,0.1)] flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-400 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <Activity className="w-8 h-8 text-sky-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-widest mb-6 uppercase">
            Valence <span className="font-bold text-sky-400">Command</span>
          </h1>
          
          <p className="text-xl text-sky-100/60 max-w-2xl font-light tracking-wide leading-relaxed mb-10">
            A state-of-the-art decentralized simulation engine. Engineered for interstellar speed and absolute data integrity.
          </p>

          <div className="flex gap-6 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-8 py-4 rounded-full bg-sky-500 text-slate-900 font-bold uppercase tracking-widest hover:bg-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex justify-center items-center gap-2">
              Access Terminal
            </button>
            <button className="flex-1 sm:flex-none px-8 py-4 rounded-full border border-sky-500/50 text-sky-400 font-bold uppercase tracking-widest hover:bg-sky-500/10 transition-all flex justify-center items-center gap-2">
              System Logs
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 14. ATOMIC: QUANTUM STATE
// Deep violet, glowing teal, smooth sine waves, ethereal
// ==========================================
function AtomicQuantumTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#0b0416] text-[#e2e8f0] p-8 md:p-20 font-sans relative overflow-hidden"
    >
      {/* Quantum Blur Fields */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[#8b5cf6]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#2dd4bf]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
      
      {/* Particle Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMC41IiBmaWxsPSIjMmRkNGJmIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] pointer-events-none opacity-50"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-16">
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-full border border-[#2dd4bf]/40 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-[#8b5cf6]/60 rotate-45 scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-[#2dd4bf]/20 -rotate-45 scale-125"></div>
            <Activity className="w-10 h-10 text-[#2dd4bf] drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
          </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-4">
          Quantum <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#2dd4bf]">State</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-light max-w-2xl text-[#94a3b8] mb-12">
          Achieve perfect consensus through superposition. Fluid network dynamics engineered for the next era.
        </p>

        <div className="flex gap-6">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(45,212,191,0.2)" }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8b5cf6]/20 to-[#2dd4bf]/20 border border-[#2dd4bf]/30 text-white font-medium tracking-wide backdrop-blur-sm"
          >
            Observe Network
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(139,92,246,0.1)" }}
            className="px-8 py-4 rounded-full bg-transparent border border-[#8b5cf6]/30 text-[#c4b5fd] font-medium tracking-wide transition-colors"
          >
            Entangle Node
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 15. ATOMIC: GRAPHENE / HEX BONDS
// Charcoal grey, metallic silver, bright amber, hexagon grids
// ==========================================
function AtomicHexTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#121212] text-white p-8 md:p-20 font-mono relative overflow-hidden"
    >
      {/* Hexagon Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.92' viewBox='0 0 60 103.92' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.92L0 86.6V51.96l30-17.32 30 17.32v34.64L30 103.92zM30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 103.92px"
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mt-12 items-center">
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#f59e0b]/50 text-[#f59e0b] text-sm uppercase tracking-widest font-bold bg-[#f59e0b]/10 mb-8 rounded-sm">
            <Code className="w-4 h-4" /> Lattice Structure
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-gray-200">
            Carbon <br/> <span className="text-[#f59e0b]">Core</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-md font-light leading-relaxed">
            Unbreakable architecture. Geometric precision. A network structured like graphene for ultimate resilience.
          </p>
          <button className="bg-[#f59e0b] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors rounded-sm shadow-[4px_4px_0_rgba(255,255,255,0.1)] flex items-center gap-2">
            Establish Bond <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="hidden md:flex justify-center items-center relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-[400px] h-[400px] border border-gray-700 relative"
          >
            {/* Hexagon Nodes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#f59e0b] rotate-45 shadow-[0_0_20px_#f59e0b]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-gray-600 rotate-45"></div>
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-600 rotate-45"></div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#f59e0b] rotate-45 shadow-[0_0_20px_#f59e0b]"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// 16. ATOMIC: CORE FUSION
// Very dark, intense orange/red glowing core, high energy
// ==========================================
function AtomicFusionTheme() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-black text-white p-8 md:p-20 font-sans relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Fusion Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[60vw] h-[60vw] bg-[#ff4500] rounded-full blur-[150px]"
        ></motion.div>
        <motion.div 
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-[30vw] h-[30vw] bg-[#ff8c00] rounded-full blur-[100px]"
        ></motion.div>
        <div className="absolute w-[10vw] h-[10vw] bg-[#ffffff] rounded-full blur-[40px] shadow-[0_0_100px_#ffffff]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="px-6 py-2 border border-orange-500/50 bg-black/50 backdrop-blur-md rounded-full text-orange-400 font-medium tracking-widest text-sm mb-8 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> CRITICAL MASS ACHIEVED
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,69,0,0.8)] text-white">
          FUSION
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.3em] text-orange-400 mb-12">
          Engine Active
        </h2>
        
        <p className="text-xl text-orange-100/80 mb-12 max-w-2xl font-light">
          Unlimited computational power. A decentralized network generating raw, unstoppable energy.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-10 py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold uppercase tracking-widest rounded-lg shadow-[0_0_30px_rgba(255,69,0,0.6)] border border-orange-400/50"
          >
            Initiate Chain Reaction
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-10 py-5 bg-black/50 backdrop-blur-md border border-orange-500/30 text-orange-400 font-bold uppercase tracking-widest rounded-lg hover:bg-orange-900/30 transition-colors"
          >
            Monitor Heat
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// ⭐ ATOMIC V2: ORBITAL MECHANICS
// Refined version — multiple tilt-angled orbits like an
// Bohr atom. Clean navy base, crisp white nucleus, cool
// blue/violet electrons. Elegant, spacious, readable.
// ==========================================
function AtomicV2Theme() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#04080f] text-white font-sans relative overflow-hidden flex items-center justify-center p-8"
    >
      {/* Tinted nebula wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Orbital Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Nucleus glow */}
        <div className="absolute w-6 h-6 rounded-full bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.25)] z-10" />

        {/* Orbit 1 — tilted 0° */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] rounded-full border border-blue-400/25"
        >
          <div className="absolute -top-[5px] left-1/2 w-[10px] h-[10px] rounded-full bg-blue-400 shadow-[0_0_12px_4px_#60a5fa] -translate-x-1/2" />
        </motion.div>

        {/* Orbit 2 — tilted 60° */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[420px] h-[220px] rounded-full border border-violet-400/20"
          style={{ transform: "rotateX(70deg)" }}
        >
          <div className="absolute -top-[6px] left-1/2 w-[12px] h-[12px] rounded-full bg-violet-300 shadow-[0_0_14px_4px_#c4b5fd] -translate-x-1/2" />
        </motion.div>

        {/* Orbit 3 — tilted 120° */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[550px] h-[550px] rounded-full border border-sky-300/15"
        >
          <div className="absolute -top-[7px] left-1/2 w-[14px] h-[14px] rounded-full bg-sky-200 shadow-[0_0_16px_5px_#bae6fd] -translate-x-1/2" />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-blue-400/80 uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
            Valence Shell Active
          </div>

          <h1 className="text-[clamp(3rem,10vw,6.5rem)] font-extralight tracking-tight leading-none mb-5">
            Valence
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-light max-w-lg leading-relaxed mb-10">
            Electrons in perfect orbit. A distributed ledger built on the same principles that hold matter together.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium tracking-wide transition-colors shadow-[0_0_20px_rgba(37,99,235,0.35)]"
            >
              Open Explorer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-medium tracking-wide transition-colors"
            >
              View Docs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==========================================
// ⭐ ATOMIC V3: PARTICLE FIELD
// Sophisticated dark-matter aesthetic. Still orbital but
// surrounded by a swirling cloud of micro-particles.
// Colder palette — near-black bg, icey-white + indigo accents.
// ==========================================
function AtomicV3Theme() {
  const particles = Array.from({ length: 24 }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#060811] text-white font-sans relative overflow-hidden flex items-center justify-center p-8"
    >
      {/* ── Particle Field ── */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300/30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 17.3) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Central Atom ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Core */}
        <div className="absolute w-8 h-8 rounded-full bg-indigo-200 shadow-[0_0_40px_15px_rgba(165,180,252,0.3)]" />

        {/* Rings */}
        {[300, 450, 600].map((size, idx) => (
          <motion.div
            key={size}
            animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 15 + idx * 8, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-indigo-400/20"
            style={{ width: size, height: size }}
          >
            <div
              className="absolute -top-2 left-1/2 rounded-full -translate-x-1/2 shadow-[0_0_10px_4px_rgba(165,180,252,0.5)]"
              style={{
                width: 10 + idx * 3,
                height: 10 + idx * 3,
                background: `rgba(${165 - idx * 20}, ${180 - idx * 10}, 252, 0.9)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-12 bg-indigo-400/40" />
            <span className="text-xs font-mono tracking-[0.3em] text-indigo-300/70 uppercase">Electron Cloud v1.0</span>
            <div className="h-px w-12 bg-indigo-400/40" />
          </div>

          <h1 className="text-[clamp(3rem,9vw,6rem)] font-thin tracking-[0.08em] leading-none mb-6 text-white">
            VALENCE
          </h1>
          <h2 className="text-xl font-light tracking-[0.2em] text-indigo-300 mb-8 uppercase">
            Particle Network
          </h2>
          <p className="text-slate-400 font-light leading-relaxed mb-10 max-w-xl">
            A dense field of cryptographic bonds. Every transaction a new electron, every block a stable shell.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium tracking-wide transition-all"
            >
              Explore Network
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full border border-indigo-400/30 text-indigo-300 font-medium tracking-wide hover:bg-indigo-900/20 transition-colors"
            >
              Web Wallet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==========================================
// ⭐ ATOMIC V4: MOLECULE / BOND GRAPH
// Visible molecule structure with nodes and bond lines.
// Dark teal base. Shows the "network as molecule" concept
// directly in the hero. Clean, branded, premium.
// ==========================================
function AtomicV4Theme() {
  // Nodes: [x%, y%, size, glowing]
  const nodes: [number, number, number, boolean][] = [
    [50, 50, 20, true],  // nucleus
    [50, 20, 10, false],
    [78, 35, 10, false],
    [78, 65, 10, true],
    [50, 80, 10, false],
    [22, 65, 10, false],
    [22, 35, 10, true],
  ]
  // Bonds: [fromIdx, toIdx]
  const bonds: [number, number][] = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6]
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 bg-[#03090e] text-white font-sans relative overflow-hidden flex items-center"
      style={{ minHeight: 600 }}
    >
      {/* Subtle gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_50%,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ── Molecule Diagram (right side) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none flex items-center justify-center opacity-80">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          {/* Bond lines */}
          {bonds.map(([f, t], i) => (
            <motion.line
              key={i}
              x1={`${nodes[f][0]}%`} y1={`${nodes[f][1]}%`}
              x2={`${nodes[t][0]}%`} y2={`${nodes[t][1]}%`}
              stroke="rgba(139,92,246,0.35)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            />
          ))}
          {/* Nodes */}
          {nodes.map(([x, y, r, glow], i) => (
            <motion.circle
              key={i}
              cx={`${x}%`} cy={`${y}%`} r={r}
              fill={i === 0 ? "rgba(139,92,246,0.9)" : glow ? "rgba(14,165,233,0.6)" : "rgba(139,92,246,0.25)"}
              stroke={"rgba(139,92,246,0.6)"}
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", bounce: 0.4 }}
              style={{ filter: glow ? "drop-shadow(0 0 8px rgba(139,92,246,0.9))" : undefined }}
            />
          ))}
        </svg>
      </div>

      {/* ── Content (left side) ── */}
      <div className="relative z-10 max-w-xl ml-8 md:ml-20 flex flex-col">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
            <span className="text-xs font-mono text-violet-400/80 tracking-[0.25em] uppercase">Bond Network Active</span>
          </div>

          <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-semibold tracking-tight leading-none mb-6">
            <span className="text-white">Val</span><span className="text-violet-400">ence</span>
          </h1>
          <p className="text-slate-400 font-light text-lg leading-relaxed mb-10 max-w-md">
            Peer nodes bond like atoms in a molecule. An education-first blockchain where every connection has chemical precision.
          </p>

          <div className="flex gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-lg bg-violet-500 hover:bg-violet-400 text-slate-900 font-semibold tracking-wide transition-colors"
            >
              Join Network
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-lg border border-violet-400/25 text-violet-300 font-medium tracking-wide hover:bg-violet-900/20 transition-colors"
            >
              View Architecture
            </motion.button>
          </div>

          {/* Mini stats */}
          <div className="mt-12 flex gap-8">
            {[
              { label: "Nodes", value: "42" },
              { label: "Blocks", value: "1,284" },
              { label: "Tx/s", value: "2.4k" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl font-semibold text-violet-400">{value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
