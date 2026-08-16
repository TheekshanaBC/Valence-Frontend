"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

const ABOUT_PARAGRAPHS = [
  "Valence is an educational, open-source blockchain simulator built to demystify how decentralized systems operate under the hood. It provides a complete, inspectable implementation of a distributed blockchain node written in Go, paired with a modern web dashboard and wallet interface.",
  "Unlike simplified toy demonstrations, Valence runs a genuine multi-node peer-to-peer network on your local machine. It incorporates Proof-of-Work mining, Ed25519 digital signatures, dynamic difficulty retargeting, binary Merkle tree verification, account sequence replay protection, and asynchronous gossip-based block and transaction propagation.",
  "The project is designed for developers, students, and researchers who want to move beyond reading whitepapers and actually observe blocks being mined, forks being resolved by Nakamoto Cumulative Work, and transactions propagating across nodes in real time.",
]

const GOALS = [
  {
    number: "01",
    title: "Demystify Blockchain Internals",
    desc: "Strip away the speculation and marketing. Demonstrate exactly how cryptographic primitives, block headers, state ledgers, and consensus rules function at the source code level.",
  },
  {
    number: "02",
    title: "Genuine P2P Networking",
    desc: "A fully decentralized gossip protocol where nodes discover peers, propagate blocks, and synchronize chains without any centralized coordinator or tracker server.",
  },
  {
    number: "03",
    title: "Hands-on Experimentation",
    desc: "Run multiple nodes locally, adjust difficulty parameters, trigger chain forks, submit transactions, and inspect real-time chain reorganizations in your browser.",
  },
  {
    number: "04",
    title: "Transparent & Zero-Dependency",
    desc: "Every line of code is open source and documented. Built with standard Go libraries and zero external database dependencies for maximum auditability and ease of setup.",
  },
]

const TECH_STACK = [
  { label: "Backend Core", value: "Go 1.22+" },
  { label: "Consensus", value: "Nakamoto PoW (16^d)" },
  { label: "Signatures", value: "Ed25519" },
  { label: "Hashing", value: "Double SHA-256" },
  { label: "Networking", value: "HTTP REST Gossip" },
  { label: "Persistence", value: "Atomic JSON (.tmp)" },
  { label: "Frontend", value: "Next.js 16 (Turbopack)" },
  { label: "Styling", value: "Tailwind CSS v4" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <PageHeader
        title="What is"
        titleAccent="Valence?"
        subtitle="An open-source blockchain simulator built for inspecting, understanding, and experimenting with decentralized systems."
        breadcrumb={[{ href: "/about", label: "About" }]}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <MoleculeBg intensity={0.25} particles={false} />

        {/* ─── Main Narrative Overview ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-8 sm:p-10 mb-10 space-y-5"
        >
          {ABOUT_PARAGRAPHS.map((paragraph, index) => (
            <p
              key={index}
              className="text-slate-300 font-light leading-relaxed text-base sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* ─── Design & Learning Goals ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white tracking-tight">Project Goals</h3>
            <p className="text-sm text-slate-400 font-light mt-1">
              Core architectural principles guiding the design and development of Valence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GOALS.map(({ number, title, desc }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="glass-panel rounded-xl p-6 border-[rgba(139,92,246,0.12)] hover:border-violet-400/30 transition-all"
              >
                <div className="text-3xl font-black text-violet-400/25 font-mono mb-2">{number}</div>
                <h4 className="text-base font-semibold text-white mb-2">{title}</h4>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Technology Stack ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-2xl p-6 sm:p-8"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white tracking-tight">Technology Stack</h3>
            <p className="text-sm text-slate-400 font-light mt-1">
              Standards, algorithms, and libraries powering the simulator.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH_STACK.map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#03090e]/90 rounded-xl p-4 border border-[rgba(139,92,246,0.08)] flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-1">{label}</span>
                <span className="text-xs font-mono font-semibold text-violet-300">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
