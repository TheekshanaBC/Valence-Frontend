"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Clock, ArrowUpRight, Hash, RefreshCw } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

import { useWallet } from "@/context/WalletContext"

function formatAge(timestampNano: number) {
  const diffMs = Date.now() - (timestampNano / 1e6)
  if (diffMs < 60000) return `${Math.max(0, Math.floor(diffMs/1000))}s ago`
  if (diffMs < 3600000) return `${Math.floor(diffMs/60000)}m ago`
  return `${Math.floor(diffMs/3600000)}h ago`
}

function Panel({ title, onRefresh, children }: { title: React.ReactNode; onRefresh?: () => void; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[rgba(6,182,212,0.1)] flex items-center justify-between">
        {title}
        <button onClick={onRefresh} className="text-slate-500 hover:text-cyan-400 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  )
}

export default function ExplorerPage() {
  const { rpcUrl } = useWallet()
  const [stats, setStats] = useState({ height: 0, txs: 0, nodes: 0 })
  const [blocks, setBlocks] = useState<any[]>([])
  const [recentTxs, setRecentTxs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${rpcUrl}/status`)
      if (res.ok) {
        const data = await res.json()
        setStats({
          height: data.height || 0,
          txs: data.mempool_size || 0,
          nodes: data.peers || 0
        })
      }
    } catch (err) {
      console.error("Failed to fetch status:", err)
    }
  }

  const fetchBlocks = async () => {
    try {
      const res = await fetch(`${rpcUrl}/chain?limit=10`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          const sortedBlocks = [...data].reverse()
          setBlocks(sortedBlocks.slice(0, 6))

          let txs: any[] = []
          for (const b of sortedBlocks) {
            if (b.transactions) {
              txs.push(...b.transactions)
            }
            if (txs.length >= 8) break
          }
          setRecentTxs(txs.slice(0, 8))
        }
      }
    } catch (err) {
      console.error("Failed to fetch blocks:", err)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    await Promise.all([fetchStatus(), fetchBlocks()])
    setLoading(false)
  }

  useEffect(() => {
    if (!rpcUrl) return
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [rpcUrl])

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
          initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
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
          initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Latest Block", value: stats.height.toLocaleString() },
            { label: "Mempool TXs", value: stats.txs.toLocaleString() },
            { label: "Active Nodes", value: stats.nodes.toString() },
            { label: "Avg Block Time", value: "~10s" },
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
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}>
            <Panel title={
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-medium text-slate-200">Latest Blocks</span>
              </div>
            } onRefresh={fetchData}>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {blocks.length === 0 && !loading && (
                  <div className="px-5 py-8 text-center text-slate-500 text-sm">No blocks found</div>
                )}
                {blocks.map((block) => (
                  <div key={block.height} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        <Hash className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">Block #{block.height}</div>
                        <div className="text-xs font-mono text-slate-500">{block.hash?.slice(0, 20)}…</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-cyan-400">{block.transactions?.length || 0} txns</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {formatAge(block.header?.timestamp || 0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}>
            <Panel title={
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-medium text-slate-200">Recent Transactions</span>
              </div>
            } onRefresh={fetchData}>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {recentTxs.length === 0 && !loading && (
                  <div className="px-5 py-8 text-center text-slate-500 text-sm">No transactions found</div>
                )}
                {recentTxs.map((tx, idx) => (
                  <div key={tx.id || `fallback-${idx}`} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-slate-200">{tx.id?.slice(0, 18)}…</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {tx.sender === "VALENCE_COINBASE" ? "Coinbase" : `${tx.sender?.slice(0, 8)}…`} → {tx.recipient === "Genesis" ? "Genesis" : `${tx.recipient?.slice(0, 8)}…`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-cyan-400">{(tx.amount / 1000000000).toFixed(4)} VLC</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {formatAge(tx.timestamp || 0)}
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
          className="mt-8 flex items-center justify-between px-5 py-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5"
        >
          <div className="flex items-center gap-3 text-sm text-cyan-300/80">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            Connected to Live Network ({rpcUrl})
          </div>
        </motion.div>
      </div>
    </div>
  )
}
