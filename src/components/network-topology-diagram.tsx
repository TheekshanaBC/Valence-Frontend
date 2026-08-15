"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Laptop,
  Cloud,
  Shield,
  Server,
  Lock,
  ArrowRight,
  Zap,
  Globe,
  Radio,
  Cpu,
  RefreshCw,
  Layers,
  CheckCircle2,
  Share2,
  FileCheck,
  Send,
  Eye,
} from "lucide-react"

// ─── 1. Native Full Topology Diagram ───
export function NativeNetworkTopology() {
  const [hoveredZone, setHoveredZone] = React.useState<string | null>(null)

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-[#03090e]/95 border border-[rgba(6,182,212,0.2)] p-4 sm:p-8 shadow-[inset_0_2px_24px_rgba(0,0,0,0.8)]">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Architecture Summary Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[rgba(6,182,212,0.12)]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            Native System Architecture
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            End-to-End Network & HTTP NAT Traversal Mesh
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Public Traffic
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> NAT Pinhole
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Private Subnet
          </span>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ─── ZONE 1: Web Client (Browser) ─── */}
        <div
          onMouseEnter={() => setHoveredZone("client")}
          onMouseLeave={() => setHoveredZone(null)}
          className={`lg:col-span-3 rounded-2xl p-5 border transition-all duration-300 ${
            hoveredZone === "client"
              ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
              : "border-[rgba(6,182,212,0.2)] bg-[#071422]/80"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-cyan-400 tracking-wider block">Zone 1</span>
              <h5 className="text-xs font-bold text-white">Web Client (Browser)</h5>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Box 1: Next.js Frontend */}
            <div className="p-3 rounded-xl bg-[#03090e] border border-[rgba(6,182,212,0.15)]">
              <span className="text-[11px] font-semibold text-white block">Next.js Web Interface</span>
              <span className="text-[10px] text-slate-400 font-light block mt-0.5">Live Explorer & Dashboard</span>
            </div>

            {/* Box 2: In-Browser Wallet */}
            <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/25">
              <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-semibold mb-1">
                <Lock className="w-3 h-3" />
                <span>In-Browser Ed25519 Keystore</span>
              </div>
              <p className="text-[10px] text-slate-300 font-light leading-relaxed">
                Zero-knowledge signing: private keys never leave client memory.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(6,182,212,0.1)] flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
            <span>Payload:</span>
            <span className="bg-[#03090e] px-2 py-0.5 rounded border border-cyan-400/20">Signed JSON</span>
          </div>
        </div>

        {/* ─── CONNECTOR 1: Browser to Cloud RPC ─── */}
        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center gap-2">
          <span className="text-[9px] font-mono text-cyan-400 text-center uppercase tracking-widest">
            HTTPS / REST
          </span>
          <div className="w-full flex items-center justify-center">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 to-cyan-500 relative">
              <motion.div
                animate={{ x: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,1)]"
              />
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 text-center">/tx/submit<br />/status</span>
        </div>

        {/* ─── ZONE 2: Public Cloud (Deployed RPC Gateway) ─── */}
        <div
          onMouseEnter={() => setHoveredZone("cloud")}
          onMouseLeave={() => setHoveredZone(null)}
          className={`lg:col-span-3 rounded-2xl p-5 border transition-all duration-300 ${
            hoveredZone === "cloud"
              ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
              : "border-[rgba(6,182,212,0.2)] bg-[#071422]/80"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-cyan-400 tracking-wider block">Zone 2</span>
              <h5 className="text-xs font-bold text-white">Public Cloud RPC Gateway</h5>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Box 1: valenced RPC Daemon */}
            <div className="p-3 rounded-xl bg-[#03090e] border border-[rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-white">Deployed valenced Node</span>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">:8080</span>
              </div>
              <span className="text-[10px] text-slate-400 font-light block">Public IP • CORS Enabled</span>
            </div>

            {/* Box 2: PeerManager & SeenCache */}
            <div className="p-3 rounded-xl bg-[#03090e] border border-[rgba(6,182,212,0.15)]">
              <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-semibold mb-1">
                <Radio className="w-3 h-3" />
                <span>PeerManager & SeenCache</span>
              </div>
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                Central rendezvous discovery & gossip relay ring preventing loops.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(6,182,212,0.1)] flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
            <span>Role:</span>
            <span className="bg-[#03090e] px-2 py-0.5 rounded border border-cyan-400/20">Discovery Relay</span>
          </div>
        </div>

        {/* ─── CONNECTOR 2: Cloud to NAT Firewall ─── */}
        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center gap-2">
          <span className="text-[9px] font-mono text-amber-400 text-center uppercase tracking-widest">
            Outbound Pinhole
          </span>
          <div className="w-full flex items-center justify-center">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 relative">
              <motion.div
                animate={{ x: [0, 40, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,1)]"
              />
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 text-center">/peers/announce<br />/chain/sync</span>
        </div>

        {/* ─── ZONE 3: Firewall & Local Cluster ─── */}
        <div
          onMouseEnter={() => setHoveredZone("local")}
          onMouseLeave={() => setHoveredZone(null)}
          className={`lg:col-span-4 rounded-2xl p-5 border transition-all duration-300 ${
            hoveredZone === "local"
              ? "border-emerald-400 bg-emerald-950/20 shadow-[0_0_24px_rgba(16,185,129,0.25)]"
              : "border-[rgba(6,182,212,0.2)] bg-[#071422]/80"
          }`}
        >
          {/* NAT Barrier Banner */}
          <div className="mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-white block">Stateful NAT Gateway Firewall</span>
                <span className="text-[9px] text-amber-300 font-light block">Zero Open Inbound Ports</span>
              </div>
            </div>
            <span className="text-[9px] font-mono bg-[#03090e] text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
              Pinhole Active
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-white">Local Node Cluster (Private Subnet)</span>
          </div>

          {/* Local Cluster Nodes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Node 1 */}
            <div className="p-2.5 rounded-xl bg-[#03090e] border border-[rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-white">Node 1 (Miner)</span>
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-400/10 px-1 py-0.2 rounded">:8080</span>
              </div>
              <span className="text-[9px] text-slate-400 font-light block">Genesis & PoW Solver</span>
            </div>

            {/* Node 2 */}
            <div className="p-2.5 rounded-xl bg-[#03090e] border border-[rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-white">Node 2 (Peer)</span>
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-400/10 px-1 py-0.2 rounded">:8081</span>
              </div>
              <span className="text-[9px] text-slate-400 font-light block">Local Mesh Gossip</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[rgba(6,182,212,0.1)] flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span>Keepalive:</span>
            <span>Reverse Polling 5s / 30s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 2. Native Lifecycle & NAT Traversal Sequence ───
const LIFECYCLE_STEPS = [
  {
    num: "01",
    actor: "Private Local Cluster",
    title: "Outbound NAT Hole-Punch Handshake",
    desc: "Local Node 1 sends an outbound HTTP POST /peers/announce to the public cloud RPC node. The home router firewall registers the outgoing socket and creates a dynamic NAT translation pinhole.",
    tag: "Outbound Handshake",
    color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  {
    num: "02",
    actor: "Web Wallet (Browser)",
    title: "Client-Side Ed25519 Signing",
    desc: "User creates a transfer. The transaction payload is serialized with length prefixes and signed with the private key inside the browser. The raw signature and public key are packaged into JSON.",
    tag: "Zero-Knowledge",
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  },
  {
    num: "03",
    actor: "Public Cloud RPC Gateway",
    title: "Stateless Ingestion & Mempool Queue",
    desc: "Public RPC receives POST /tx/submit. It verifies the signature against the derived address, confirms account sequence nonce, and enqueues the transaction in its in-memory mempool.",
    tag: "Verification",
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  },
  {
    num: "04",
    actor: "Firewall & Local Cluster",
    title: "Reverse Polling & Gossip Ingestion",
    desc: "Local nodes execute their background 5s pull loop (GET /mempool) through the open NAT pinhole. The newly submitted transaction is ingested into the local miner's mempool.",
    tag: "NAT Relay",
    color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  {
    num: "05",
    actor: "Local Miner Daemon",
    title: "Parallel Multi-Core CPU Mining",
    desc: "Local Node 1 runs SHA-256 Proof-of-Work across available CPU cores, calculating a valid block header hash meeting the target difficulty threshold.",
    tag: "Nakamoto PoW",
    color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  },
  {
    num: "06",
    actor: "Global Mesh Network",
    title: "Push-Sync Propagation & Explorer Refresh",
    desc: "Local Node 1 pushes the mined block to the public RPC node via POST /chain/sync. The RPC node validates cumulative work, appends the block, and the Next.js Explorer updates in real time.",
    tag: "Consensus Finality",
    color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  },
]

export function NativeSequenceFlow() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-[#03090e]/95 border border-[rgba(6,182,212,0.2)] p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(6,182,212,0.12)]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
            Execution Lifecycle
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Transaction Journey: Browser $\rightarrow$ Cloud RPC $\rightarrow$ NAT $\rightarrow$ PoW Miner
          </h4>
        </div>
      </div>

      <div className="space-y-4">
        {LIFECYCLE_STEPS.map((step) => (
          <div
            key={step.num}
            className="p-4 rounded-xl bg-[#071422]/70 border border-[rgba(6,182,212,0.12)] hover:border-cyan-400/40 transition-all flex flex-col sm:flex-row sm:items-start gap-4"
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:w-16 flex-shrink-0">
              <span className="text-lg font-black font-mono text-cyan-400/80 bg-[#03090e] px-2.5 py-1 rounded-lg border border-cyan-400/20">
                {step.num}
              </span>
              <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border text-center whitespace-nowrap ${step.color}`}>
                {step.tag}
              </span>
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                <span className="text-[10px] font-mono text-slate-400">{step.actor}</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 3. Native Block & Gossip Propagation Flowchart ───
export function NativePropagationFlow() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-[#03090e]/95 border border-[rgba(6,182,212,0.2)] p-4 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(6,182,212,0.12)]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
            Gossip Engine
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            SeenCache Deduplication & Asynchronous Broadcast Mesh
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stage 1 */}
        <div className="p-5 rounded-xl bg-[#071422]/80 border border-[rgba(6,182,212,0.15)] space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400 mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase text-emerald-400">Step 1 • Mining</span>
            <h5 className="text-xs font-bold text-white mt-1">PoW Nonce Discovered</h5>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-2">
              Miner produces block satisfying current difficulty target ($16^d$) with valid Merkle root.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.1)] text-[10px] font-mono text-cyan-300">
            Block Header Hash Verified
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-5 rounded-xl bg-[#071422]/80 border border-[rgba(6,182,212,0.15)] space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 mb-2">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase text-cyan-400">Step 2 • SeenCache Filter</span>
            <h5 className="text-xs font-bold text-white mt-1">Gossip Broadcast Mesh</h5>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-2">
              Before relaying, the node checks its 1024-entry SeenCache hash ring. If already seen, broadcast is halted.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.1)] text-[10px] font-mono text-cyan-300">
            Zero Broadcast Storms
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-5 rounded-xl bg-[#071422]/80 border border-[rgba(6,182,212,0.15)] space-y-3 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-indigo-400/10 border border-indigo-400/25 flex items-center justify-center text-indigo-400 mb-2">
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono uppercase text-indigo-400">Step 3 • Web Dashboard</span>
            <h5 className="text-xs font-bold text-white mt-1">Live Explorer Sync</h5>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-2">
              Public RPC node updates its in-memory ledger. Explorer queries GET /chain and renders the new block tip.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.1)] text-[10px] font-mono text-cyan-300">
            Real-Time State Finality
          </div>
        </div>
      </div>
    </div>
  )
}
