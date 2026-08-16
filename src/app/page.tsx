"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Search,
  Shield,
  Activity,
  Cpu,
  GitBranch,
  Zap,
  Lock,
  Terminal,
  Copy,
  Check,
  Layers,
  Globe,
  Wallet,
} from "lucide-react"
import { MoleculeBg } from "@/components/molecule-bg"
import { Hero3D } from "@/components/hero-3d"

const GITHUB_REPO_URL = "https://github.com/TheekshanaBC/Blockchain-Simulator"

// ─── GitHub icon ───
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

// ─── Feature cards ───
const FEATURES = [
  {
    icon: <Shield className="w-6 h-6 text-cyan-400" />,
    bgIcon: <Shield className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "Nakamoto Proof of Work",
    desc: "Multi-core parallel CPU mining with dynamic difficulty retargeting, enforcing target block discovery times.",
    span: "lg:col-span-2",
  },
  {
    icon: <Activity className="w-6 h-6 text-cyan-400" />,
    bgIcon: <Activity className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "Asynchronous P2P Gossip",
    desc: "Non-blocking mesh broadcast engine with SeenCache deduplication and 409 Conflict automatic push-sync.",
    span: "lg:col-span-1",
  },
  {
    icon: <Lock className="w-6 h-6 text-cyan-400" />,
    bgIcon: <Lock className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "Ed25519 Cryptography",
    desc: "Deterministic digital signatures with length-prefixed serialization preventing delimiter injection attacks.",
    span: "lg:col-span-1",
  },
  {
    icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
    bgIcon: <GitBranch className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "Cumulative Work Consensus",
    desc: "Heaviest valid chain resolution based on sum(16^difficulty), safely recovering orphaned transactions during reorgs.",
    span: "lg:col-span-2",
  },
  {
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    bgIcon: <Layers className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "In-Memory Account State",
    desc: "Dynamic balance calculation via deterministic transaction replay with strict sequential nonces for replay attack immunity.",
    span: "lg:col-span-2",
  },
  {
    icon: <Wallet className="w-6 h-6 text-cyan-400" />,
    bgIcon: <Wallet className="absolute -right-4 -bottom-4 w-40 h-40 text-cyan-400/[0.03] -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />,
    title: "Non-Custodial Web Wallet",
    desc: "In-browser Ed25519 signing with AES-encrypted local storage and real-time transaction broadcasting.",
    span: "lg:col-span-1",
  },
]

// ─── Key System Specs ───
const STATS = [
  { label: "Consensus", value: "Nakamoto PoW (16^d)" },
  { label: "Signatures", value: "Ed25519 + SHA256" },
  { label: "Block Target", value: "~10s Retargeting" },
  { label: "Denomination", value: "1 VCN = 10^9 e⁻" },
]

export default function Home() {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCmd(id)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  return (
    <div className="flex flex-col">
      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex pt-16 overflow-hidden">
        <MoleculeBg intensity={1} particles />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col"
          >
            {/* Headline */}
            <h1 className="text-[clamp(3rem,6.5vw,5.2rem)] font-semibold tracking-tight leading-none mb-6">
              <span className="text-white block mb-1">Valence</span>
              <span className="text-slate-400 font-light text-[clamp(1.5rem,3.5vw,2.8rem)] tracking-wide block">
                Blockchain Simulator
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              A high-performance, education-first blockchain simulator running genuine multi-node P2P clusters locally on your machine.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 mb-10">
              <Link
                href="/explorer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm tracking-wide transition-all shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_36px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95"
              >
                <Search className="w-4 h-4" /> Explore Chain
              </Link>
              <Link
                href="/wallet"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/30 text-cyan-300 font-medium text-sm tracking-wide hover:bg-cyan-400/10 hover:border-cyan-400/60 transition-all hover:scale-[1.02] active:scale-95"
              >
                Open Wallet
              </Link>
              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white font-medium text-sm tracking-wide hover:bg-white/5 transition-all"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[rgba(6,182,212,0.12)]">
              {STATS.map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono">{value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Three.js 3D Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:flex items-center justify-center h-[460px] xl:h-[560px] w-full"
          >
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          QUICK START TERMINAL STRIP
      ══════════════════════════════ */}
      <section className="w-full py-12 border-t border-[rgba(6,182,212,0.1)] bg-[#03090e]/70">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-[rgba(6,182,212,0.18)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Run a 2-Node Cluster in Seconds</h3>
                <p className="text-xs text-slate-400 mt-0.5">Spin up two communicating Go peer nodes on your local machine.</p>
              </div>
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto"
              >
                <span>View Full Docs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Node 1 Command */}
              <div className="bg-[#03090e] rounded-xl p-4 border border-[rgba(6,182,212,0.12)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400">Terminal 1 • Node 8080 (Genesis)</span>
                  <button
                    onClick={() => handleCopy("go run ./cmd/valenced -port=8080 -data-dir=./data/node1", "node1")}
                    className="text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {copiedCmd === "node1" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <code className="text-xs font-mono text-slate-200 block overflow-x-auto whitespace-nowrap">
                  go run ./cmd/valenced -port=8080 -data-dir=./data/node1
                </code>
              </div>

              {/* Node 2 Command */}
              <div className="bg-[#03090e] rounded-xl p-4 border border-[rgba(6,182,212,0.12)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400">Terminal 2 • Node 8081 (Peer Mesh)</span>
                  <button
                    onClick={() => handleCopy("go run ./cmd/valenced -port=8081 -data-dir=./data/node2 -peers=localhost:8080", "node2")}
                    className="text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {copiedCmd === "node2" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <code className="text-xs font-mono text-slate-200 block overflow-x-auto whitespace-nowrap">
                  go run ./cmd/valenced -port=8081 -data-dir=./data/node2 -peers=localhost:8080
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CORE PROTOCOL FEATURES
      ══════════════════════════════ */}
      <section className="w-full py-24 border-t border-[rgba(6,182,212,0.1)]">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              Protocol <span className="text-cyan-400">Architecture</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light text-base sm:text-lg leading-relaxed">
              A complete, inspectable blockchain engineered from the ground up in Go. Every subsystem is open source, transparent, and educational.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, bgIcon, title, desc, span }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className={`relative overflow-hidden rounded-2xl border border-[rgba(6,182,212,0.12)] bg-gradient-to-br from-[#071422]/70 to-[#03090e]/90 backdrop-blur-md p-7 group transition-colors hover:border-[rgba(6,182,212,0.35)] hover:shadow-[0_0_24px_rgba(6,182,212,0.1)] ${span}`}
              >
                {bgIcon}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15 transition-colors">
                      {icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2.5 tracking-tight">{title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
                  </div>
                </div>
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
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Ready to explore the <span className="text-cyan-400">network</span>?
            </h2>
            <p className="text-slate-400 font-light text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Explore the 12 core subsystems, inspect live blocks in the explorer, or spin up your own local node cluster.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_32px_rgba(6,182,212,0.45)]"
              >
                Read the Docs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-400/30 text-cyan-300 font-medium text-sm tracking-wide hover:bg-cyan-400/10 transition-all"
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <Link href="/architecture" className="hover:text-cyan-400 transition-colors">Architecture</Link>
            <Link href="/docs" className="hover:text-cyan-400 transition-colors">Docs</Link>
            <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
