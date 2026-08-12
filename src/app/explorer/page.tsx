"use client"

import { motion } from "framer-motion"
import { Search, Clock, ArrowUpRight, Hash, RefreshCw } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

// ── Placeholder data ──
const BLOCKS = Array.from({ length: 6 }, (_, i) => ({
  height: 1284 - i,
  hash:   `0000${Math.random().toString(16).slice(2, 18)}`,
  txCount: Math.floor(Math.random() * 8) + 1,
  miner:  `node-${(i % 3) + 1}`,
  age:    `${i * 12 + 8}s ago`,
}))

const TXS = Array.from({ length: 8 }, (_, i) => ({
  hash:   `a${Math.random().toString(16).slice(2, 18)}`,
  from:   `0x${Math.random().toString(16).slice(2, 10)}`,
  to:     `0x${Math.random().toString(16).slice(2, 10)}`,
  amount: (Math.random() * 50).toFixed(4),
  age:    `${i * 6 + 2}s ago`,
}))

function Panel({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[rgba(6,182,212,0.1)] flex items-center justify-between">
        {title}
        <button className="text-slate-500 hover:text-cyan-400 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  )
}

export default function ExplorerPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        label="Live Network Data"
        title="Blockchain"
        titleAccent="Explorer"
        subtitle="Browse blocks, transactions, and mempool activity on your local Valence cluster."
        breadcrumb={[{ href: "/explorer", label: "Explorer" }]}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <MoleculeBg intensity={0.3} particles={false} />

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-10"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by block height, tx hash, or address…"
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#071422] border border-[rgba(6,182,212,0.15)] text-slate-300 placeholder-slate-600 font-mono text-sm outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.08)] transition-all"
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Latest Block", value: "1,284" },
            { label: "Transactions", value: "9,471" },
            { label: "Active Nodes", value: "42" },
            { label: "Avg Block Time", value: "~14s" },
          ].map(({ label, value }) => (
            <div key={label} className="glass-panel rounded-xl p-5">
              <div className="text-2xl font-semibold text-cyan-400 font-mono mb-1">{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Blocks + Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Latest Blocks */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Panel title={
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-medium text-slate-200">Latest Blocks</span>
              </div>
            }>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {BLOCKS.map((block) => (
                  <div key={block.height} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        <Hash className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">Block #{block.height}</div>
                        <div className="text-xs font-mono text-slate-500">{block.hash.slice(0, 20)}…</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-cyan-400">{block.txCount} txns</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {block.age}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Panel title={
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-medium text-slate-200">Recent Transactions</span>
              </div>
            }>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {TXS.map((tx) => (
                  <div key={tx.hash} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-slate-200">{tx.hash.slice(0, 18)}…</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {tx.from.slice(0, 8)}… → {tx.to.slice(0, 8)}…
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-cyan-400">{tx.amount} VLC</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {tx.age}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </div>

        {/* Connect notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-between px-5 py-4 rounded-xl border border-amber-400/20 bg-amber-400/5"
        >
          <div className="flex items-center gap-3 text-sm text-amber-300/80">
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
            Data shown is mock — start a local Valence node to see live data.
          </div>
          <a
            href="/docs"
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            How to start <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
