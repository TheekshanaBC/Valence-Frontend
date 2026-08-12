"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

const TEAM_SECTION = {
  title: "What is Valence?",
  body: `Valence is an educational, open-source blockchain simulator built to demystify how decentralized systems work under the hood. The name is a deliberate reference to chemistry: just as valence electrons determine how atoms bond and react, the valence of each peer node defines how it connects, propagates data, and reaches consensus.

Unlike toy demos, Valence runs a genuine multi-node P2P cluster on your local machine — complete with SHA-256 Proof-of-Work mining, Ed25519 digital signatures, a gossip-protocol network, Merkle tree verification, and a browser-based Web Wallet. Every part of the system that matters in production blockchains is present here in inspectable, hackable Go code.

The project is designed for students, developers, and curious minds who want to move beyond reading whitepapers and actually see blocks being mined, forks being resolved, and transactions flowing peer-to-peer in real time.`
}

const GOALS = [
  {
    number: "01",
    title: "Demystify Blockchain",
    desc: "Strip away the hype. Show exactly how blocks, hashes, merkle trees, and consensus work at the code level.",
  },
  {
    number: "02",
    title: "Real P2P Networking",
    desc: "A genuine gossip protocol. Nodes discover peers, propagate transactions, and sync chains without a central server.",
  },
  {
    number: "03",
    title: "Hands-on Learning",
    desc: "Run it, break it, tweak the difficulty, fork the chain. Learning by doing — not by reading.",
  },
  {
    number: "04",
    title: "Open Source",
    desc: "Every line of code is public and documented. Fork it, extend it, build your own chain on top.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        label="About the Project"
        title="What is"
        titleAccent="Valence?"
        subtitle="A chemistry-inspired blockchain simulator. Peer nodes bond like atoms — and that's not just a metaphor."
        breadcrumb={[{ href: "/about", label: "About" }]}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        <MoleculeBg intensity={0.25} particles={false} />

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-2xl p-8 md:p-10 mb-10"
        >
          {TEAM_SECTION.body.split("\n\n").map((para, i) => (
            <p key={i} className={`text-slate-300 font-light leading-relaxed text-[1.05rem] ${i > 0 ? "mt-5" : ""}`}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* Goals grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="status-dot" />
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/70 uppercase">Design Goals</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GOALS.map(({ number, title, desc }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                className="glass-panel rounded-xl p-6 hover:border-[rgba(6,182,212,0.35)] transition-all"
              >
                <div className="text-3xl font-black text-cyan-400/20 font-mono mb-3">{number}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass-panel rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="status-dot" />
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/70 uppercase">Tech Stack</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Backend", value: "Go 1.22" },
              { label: "Consensus", value: "SHA-256 PoW" },
              { label: "Signatures", value: "Ed25519" },
              { label: "Frontend", value: "Next.js 15" },
              { label: "Networking", value: "TCP P2P" },
              { label: "Data", value: "LevelDB" },
              { label: "Styling", value: "Tailwind v4" },
              { label: "Animations", value: "Framer Motion" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#03090e] rounded-lg p-4 border border-[rgba(6,182,212,0.08)]">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                <div className="text-sm font-mono text-cyan-300">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
