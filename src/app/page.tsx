"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Search, Shield, Activity, Cpu, GitBranch, Zap, Lock } from "lucide-react"
import { MoleculeBg } from "@/components/molecule-bg"
import { Hero3D } from "@/components/hero-3d"

// ─── GitHub icon (lucide doesn't ship brand icons) ───
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

// ─── Molecule SVG diagram ───
const NODES: [number, number, number, boolean][] = [
  [50, 50, 18, true],  // nucleus
  [50, 18, 8,  false],
  [79, 34, 8,  false],
  [79, 66, 8,  true],
  [50, 82, 8,  false],
  [21, 66, 8,  false],
  [21, 34, 8,  true],
]
const BONDS: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
]

function MoleculeDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full max-w-[420px] max-h-[420px]">
        {/* Bond lines */}
        {BONDS.map(([f, t], i) => (
          <motion.line
            key={i}
            x1={`${NODES[f][0]}%`} y1={`${NODES[f][1]}%`}
            x2={`${NODES[t][0]}%`} y2={`${NODES[t][1]}%`}
            stroke="rgba(6,182,212,0.3)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: "easeOut" }}
          />
        ))}

        {/* Outer orbit ring */}
        <motion.circle
          cx="50%" cy="50%" r="42%"
          stroke="rgba(6,182,212,0.08)"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        />

        {/* Nodes */}
        {NODES.map(([x, y, r, glow], i) => (
          <motion.circle
            key={i}
            cx={`${x}%`} cy={`${y}%`} r={r}
            fill={i === 0
              ? "rgba(6,182,212,0.85)"
              : glow
              ? "rgba(14,165,233,0.55)"
              : "rgba(6,182,212,0.2)"}
            stroke="rgba(6,182,212,0.55)"
            strokeWidth={i === 0 ? 2 : 1}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.12, type: "spring", bounce: 0.4 }}
            style={{
              filter: glow ? "drop-shadow(0 0 8px rgba(6,182,212,0.85))" : undefined,
            }}
          />
        ))}

        {/* Nucleus label */}
        <motion.text
          x="50%" y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          V
        </motion.text>
      </svg>
    </div>
  )
}

// ─── Feature cards ───
const FEATURES = [
  {
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
    title: "Proof of Work",
    desc: "SHA-256 mining with adjustable difficulty. Watch real block discovery in real time.",
  },
  {
    icon: <Activity className="w-5 h-5 text-cyan-400" />,
    title: "P2P Gossip Network",
    desc: "Blocks and transactions propagate across nodes instantly via a gossip protocol.",
  },
  {
    icon: <Lock className="w-5 h-5 text-cyan-400" />,
    title: "Ed25519 Signatures",
    desc: "Fast, secure elliptic-curve cryptography for authenticating every transaction.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-cyan-400" />,
    title: "Fork Resolution",
    desc: "Automatic longest-chain consensus — orphan blocks resolved without intervention.",
  },
  {
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: "Mempool",
    desc: "Unconfirmed transactions queue in a live mempool visible through the explorer.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    title: "Web Wallet",
    desc: "Browser-based wallet: generate keys, send VLC, view your balance and history.",
  },
]

// ─── Stats ───
const STATS = [
  { label: "Consensus", value: "PoW" },
  { label: "Signature", value: "Ed25519" },
  { label: "Network", value: "P2P" },
  { label: "Written in", value: "Go" },
]

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <MoleculeBg intensity={1} particles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="status-dot" />
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/80 uppercase">
                Bond Network Active
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-tight leading-[1.05] mb-6">
              <span className="text-white">Val</span>
              <span className="text-cyan-400">ence</span>
              <br />
              <span className="text-slate-400 font-light text-[clamp(1.6rem,4vw,3rem)] tracking-wide">
                Blockchain Simulator
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 font-light text-lg leading-relaxed mb-10 max-w-lg">
              Peer nodes bond like atoms in a molecule. An education‑first blockchain where every connection has chemical precision — running right on your machine.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/explorer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_36px_rgba(6,182,212,0.5)] hover:scale-[1.03] active:scale-95"
              >
                <Search className="w-4 h-4" /> Explore Chain
              </Link>
              <Link
                href="/wallet"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-cyan-400/30 text-cyan-300 font-medium tracking-wide hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all hover:scale-[1.03] active:scale-95"
              >
                Open Wallet
              </Link>
              <Link
                href="https://github.com/TheekshanaBC/Valence-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-slate-400 hover:text-white font-medium tracking-wide hover:bg-white/5 transition-all"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8">
              {STATS.map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xl font-semibold text-cyan-400 font-mono">{value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Molecule diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center h-[480px] xl:h-[600px] w-full"
          >
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURES
      ══════════════════════════════ */}
      <section className="w-full py-28 border-t border-[rgba(6,182,212,0.1)]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="status-dot" />
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/70 uppercase">Core Modules</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Under the <span className="text-cyan-400">Hood</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light">
              Valence demonstrates real-world blockchain mechanics in a controlled local environment — no mainnet required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-xl p-6 group cursor-default transition-all hover:border-[rgba(6,182,212,0.35)] hover:shadow-[0_0_20px_rgba(6,182,212,0.07)]"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5 group-hover:border-cyan-400/40 transition-colors">
                  {icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BAND
      ══════════════════════════════ */}
      <section className="w-full py-20 border-t border-[rgba(6,182,212,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Ready to explore the <span className="text-cyan-400">network</span>?
            </h2>
            <p className="text-slate-400 font-light mb-8">
              Download the simulator, spin up a local cluster, and watch the blockchain form — bond by bond.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_24px_rgba(6,182,212,0.3)] hover:shadow-[0_0_36px_rgba(6,182,212,0.5)]"
              >
                Read the Docs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-cyan-400/30 text-cyan-300 font-medium tracking-wide hover:bg-cyan-400/10 transition-all"
              >
                View Architecture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="w-full py-10 border-t border-[rgba(6,182,212,0.1)]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            <span className="text-slate-400">
              <span className="text-white font-medium">Val</span>
              <span className="text-cyan-400 font-medium">ence</span>
              <span className="ml-2 text-slate-600">© {new Date().getFullYear()}</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/docs"  className="hover:text-cyan-400 transition-colors">Docs</Link>
            <Link href="https://github.com/TheekshanaBC/Valence-Frontend" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
