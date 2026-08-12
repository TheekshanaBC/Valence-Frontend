"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

// Architecture flow: nodes → mempool → mining → block → chain
const LAYERS = [
  {
    id: "wallet",
    label: "Wallet / CLI",
    color: "#22d3ee",
    desc: "Ed25519 key pairs, transaction signing, broadcast to node API.",
    items: ["Key Generation", "Sign Tx", "REST API Client"],
  },
  {
    id: "node",
    label: "Node API",
    color: "#38bdf8",
    desc: "HTTP REST API exposing chain state, mempool, and peer management.",
    items: ["GET /blocks", "POST /transactions", "GET /peers"],
  },
  {
    id: "mempool",
    label: "Mempool",
    color: "#818cf8",
    desc: "Unconfirmed transactions are validated and held until mined into a block.",
    items: ["Signature verify", "Balance check", "Fee ordering"],
  },
  {
    id: "mining",
    label: "PoW Miner",
    color: "#a78bfa",
    desc: "Continuously attempts nonces to find a hash satisfying the difficulty target.",
    items: ["SHA-256", "Difficulty target", "Nonce loop"],
  },
  {
    id: "block",
    label: "Block",
    color: "#c084fc",
    desc: "Sealed block: header, Merkle root, nonce, prev-hash, timestamp.",
    items: ["Merkle tree", "Header hash", "Block reward"],
  },
  {
    id: "p2p",
    label: "P2P Gossip",
    color: "#f472b6",
    desc: "Blocks and transactions propagate to all known peers via TCP gossip.",
    items: ["Peer discovery", "Block broadcast", "Fork resolution"],
  },
]

function Arrow() {
  return (
    <div className="flex justify-center my-2">
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent relative"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyan-400/50 w-0 h-0" />
      </motion.div>
    </div>
  )
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        label="System Design"
        title="Architecture"
        subtitle="How the Valence blockchain is structured — from wallet to wire. Each layer is a bond in the chain."
        breadcrumb={[{ href: "/architecture", label: "Architecture" }]}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <MoleculeBg intensity={0.3} particles={false} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="status-dot" />
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/70 uppercase">Layer Stack</span>
            </div>

            {LAYERS.map((layer, i) => (
              <div key={layer.id}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-panel rounded-xl p-5 hover:border-[rgba(6,182,212,0.35)] transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_var(--c)]"
                      style={{ background: layer.color, ["--c" as string]: layer.color }}
                    />
                    <span className="font-semibold text-white">{layer.label}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-3">{layer.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#03090e] border border-[rgba(6,182,212,0.1)] text-slate-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
                {i < LAYERS.length - 1 && <Arrow />}
              </div>
            ))}
          </motion.div>

          {/* Right: SVG bond diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="status-dot" />
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/70 uppercase">Bond Graph</span>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <svg viewBox="0 0 300 300" fill="none" className="w-full">
                {/* Central node */}
                <motion.circle cx="150" cy="150" r="28"
                  fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  style={{ filter: "drop-shadow(0 0 10px rgba(6,182,212,0.5))" }}
                />
                <text x="150" y="155" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="600">NODE</text>

                {/* Satellite nodes + bonds */}
                {[
                  { x: 150, y: 40,  label: "Wallet",  color: "#22d3ee" },
                  { x: 260, y: 95,  label: "API",     color: "#38bdf8" },
                  { x: 260, y: 205, label: "Miner",   color: "#a78bfa" },
                  { x: 150, y: 260, label: "Ledger",  color: "#c084fc" },
                  { x: 40,  y: 205, label: "P2P",     color: "#f472b6" },
                  { x: 40,  y: 95,  label: "Mempool", color: "#818cf8" },
                ].map(({ x, y, label, color }, i) => (
                  <g key={label}>
                    <motion.line
                      x1="150" y1="150" x2={x} y2={y}
                      stroke="rgba(6,182,212,0.2)" strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    />
                    <motion.circle
                      cx={x} cy={y} r="18"
                      fill={`${color}22`} stroke={color} strokeWidth="1"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
                    />
                    <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace">{label}</text>
                  </g>
                ))}
              </svg>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Consensus", value: "Longest chain" },
                  { label: "Block time", value: "~10–30s" },
                  { label: "Transport", value: "TCP sockets" },
                  { label: "Storage", value: "LevelDB" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col bg-[#03090e] rounded-lg p-3 border border-[rgba(6,182,212,0.08)]">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
                    <span className="text-sm font-mono text-cyan-300 mt-0.5">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
