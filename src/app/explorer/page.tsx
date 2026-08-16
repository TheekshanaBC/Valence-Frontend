"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Clock, ArrowUpRight, Hash, RefreshCw, Activity, Network, ChevronDown, ChevronUp, X, Server, AlertCircle, CheckCircle2 } from "lucide-react"
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
  const [mempoolTxs, setMempoolTxs] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null)
  const [expandedTx, setExpandedTx] = useState<string | null>(null)
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

  const fetchMempool = async () => {
    try {
      const res = await fetch(`${rpcUrl}/mempool`)
      if (res.ok) setMempoolTxs(await res.json() || [])
    } catch (err) {
      setMempoolTxs([])
    }
  }

  const fetchData = async () => {
    setLoading(true)
    await Promise.all([fetchStatus(), fetchBlocks(), fetchMempool()])
    setLoading(false)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }
    setSearchLoading(true)
    const q = searchQuery.trim()
    try {
      if (/^\d+$/.test(q)) {
        const res = await fetch(`${rpcUrl}/chain/blocks/${q}`)
        if (res.ok) {
           setSearchResults({ type: 'block', data: await res.json() })
        } else {
           setSearchResults({ type: 'error', data: 'Block not found' })
        }
      } else {
        const [histRes, balRes] = await Promise.all([
          fetch(`${rpcUrl}/history/${q}`),
          fetch(`${rpcUrl}/balances/${q}`)
        ])
        if (histRes.ok && balRes.ok) {
           const h = await histRes.json()
           const b = await balRes.json()
           setSearchResults({ type: 'address', address: q, data: { history: h || [], balance: b.balance } })
        } else {
           setSearchResults({ type: 'error', data: 'No transactions or balance found for this address' })
        }
      }
    } catch (err) {
      setSearchResults({ type: 'error', data: 'Network error during search' })
    }
    setSearchLoading(false)
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
          <form onSubmit={handleSearch}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by block height or wallet address…"
              className="w-full pl-12 pr-24 py-4 rounded-xl bg-[#071422] border border-[rgba(6,182,212,0.15)] text-slate-300 placeholder-slate-600 font-mono text-sm outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.08)] transition-all"
              required
            />
            <button 
              type="submit" 
              disabled={searchLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Search Results */}
          {searchResults && (
            <div className="absolute top-full left-0 right-0 mt-4 p-6 glass-panel rounded-xl z-10 border border-cyan-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <h3 className="text-lg font-semibold text-cyan-400">Search Results</h3>
                <button onClick={() => setSearchResults(null)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              
              {searchResults.type === 'error' && (
                <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  {searchResults.data}
                </div>
              )}

              {searchResults.type === 'block' && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Block Found</div>
                  <div className="text-2xl font-mono text-slate-200 mb-4">#{searchResults.data.height}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono bg-black/20 p-4 rounded-lg border border-white/5">
                    <div><span className="text-slate-500">Hash:</span> <br/><span className="text-cyan-300 break-all">{searchResults.data.hash}</span></div>
                    <div><span className="text-slate-500">Prev:</span> <br/><span className="text-slate-400 break-all">{searchResults.data.header.prev_hash}</span></div>
                    <div><span className="text-slate-500">Transactions:</span> <span className="text-slate-300">{searchResults.data.transactions?.length || 0}</span></div>
                    <div><span className="text-slate-500">Difficulty:</span> <span className="text-slate-300">{searchResults.data.header.difficulty}</span></div>
                  </div>
                </div>
              )}

              {searchResults.type === 'address' && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Address Details</div>
                  <div className="text-sm font-mono text-cyan-300 break-all bg-black/20 p-3 rounded border border-white/5 mb-4">{searchResults.address}</div>
                  <div className="flex gap-8 mb-6">
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Balance</div>
                      <div className="text-xl text-slate-200 font-mono">{(searchResults.data.balance / 1000000000).toFixed(4)} VLC</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Transactions</div>
                      <div className="text-xl text-slate-200 font-mono">{searchResults.data.history.length}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {[
            { label: "Latest Block", value: stats.height.toLocaleString() },
            { label: "Mempool TXs", value: stats.txs.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="glass-panel rounded-xl p-5">
              <div className="text-2xl font-semibold text-cyan-400 font-mono mb-1">{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Blocks + Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="flex flex-col gap-6">
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
                  <div key={block.height} className="border-b border-transparent hover:bg-cyan-400/5 transition-colors group cursor-pointer" onClick={() => setExpandedBlock(expandedBlock === block.height ? null : block.height)}>
                    <div className="px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                          <Hash className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-200">Block #{block.height}</div>
                          <div className="text-xs font-mono text-slate-500">{block.hash?.slice(0, 20)}…</div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <div className="text-xs text-cyan-400">{block.transactions?.length || 0} txns</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" /> {formatAge(block.header?.timestamp || 0)}
                          </div>
                        </div>
                        {expandedBlock === block.height ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                    </div>
                    {expandedBlock === block.height && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4">
                        <div className="bg-[#03090e] border border-cyan-400/10 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Block Hash</div>
                            <div className="text-cyan-300 break-all">{block.hash}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Previous Hash</div>
                            <div className="text-slate-400 break-all">{block.header?.prev_hash}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Merkle Root</div>
                            <div className="text-slate-400 break-all">{block.header?.merkle_root}</div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Difficulty</div>
                              <div className="text-slate-300">{block.header?.difficulty}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Nonce</div>
                              <div className="text-slate-300">{block.header?.nonce}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
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
                  <div key={tx.id || `fallback-${idx}`} className="border-b border-transparent hover:bg-cyan-400/5 transition-colors cursor-pointer" onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}>
                    <div className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-slate-200">{tx.id?.slice(0, 18)}…</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>{tx.sender === "VALENCE_COINBASE" ? "Coinbase" : `${tx.sender?.slice(0, 8)}…`}</span>
                          <span className="text-cyan-500/50">→</span>
                          <span>{tx.recipient === "Genesis" ? "Genesis" : `${tx.recipient?.slice(0, 8)}…`}</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium text-cyan-400">{(tx.amount / 1000000000).toFixed(4)} VLC</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" /> {formatAge(tx.timestamp || 0)}
                          </div>
                        </div>
                        {expandedTx === tx.id ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                    </div>
                    {expandedTx === tx.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4">
                        <div className="bg-[#03090e] border border-cyan-400/10 rounded-lg p-4 grid grid-cols-1 gap-3 text-xs font-mono">
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Transaction ID</div>
                            <div className="text-cyan-300 break-all">{tx.id}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Sender Public Key</div>
                            <div className="text-slate-400 break-all">{tx.public_key || "N/A (Coinbase/Genesis)"}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Cryptographic Signature</div>
                            <div className="text-slate-400 break-all">{tx.signature || "N/A"}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Amount (Electrons)</div>
                              <div className="text-slate-300">{tx.amount}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 uppercase tracking-wider mb-1 text-[10px]">Sequence</div>
                              <div className="text-slate-300">{tx.sequence}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
            {/* Mempool Activity */}
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}>
            <Panel title={
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-slate-200">Mempool Activity</span>
              </div>
            } onRefresh={fetchData}>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {mempoolTxs.length === 0 && !loading && (
                  <div className="px-5 py-8 text-center text-slate-500 text-sm">Mempool is empty</div>
                )}
                {mempoolTxs.map((tx, idx) => (
                  <div key={tx.id || `mempool-${idx}`} className="px-5 py-4 flex items-center justify-between hover:bg-yellow-400/5 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-slate-200">{tx.id?.slice(0, 18)}…</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {tx.sender === "VALENCE_COINBASE" ? "Coinbase" : `${tx.sender?.slice(0, 8)}…`} → {tx.recipient === "Genesis" ? "Genesis" : `${tx.recipient?.slice(0, 8)}…`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-400">{(tx.amount / 1000000000).toFixed(4)} VLC</div>
                      <div className="text-xs text-yellow-500/60 uppercase tracking-wider font-bold mt-0.5">Pending</div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </div>
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
