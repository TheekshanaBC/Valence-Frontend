"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Send, Download, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

const MOCK_ADDRESS  = "vlc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
const MOCK_BALANCE  = "124.8340"
const MOCK_HISTORY = [
  { type: "received", from: "vlc1q9fhe...", amount: "+50.0000", time: "2 min ago",  status: "confirmed" },
  { type: "sent",     to:   "vlc1q4wre...", amount: "-12.5000", time: "14 min ago", status: "confirmed" },
  { type: "received", from: "Faucet",       amount: "+100.000", time: "1 hr ago",   status: "confirmed" },
  { type: "sent",     to:   "vlc1qmt5h...", amount: "-5.0000",  time: "3 hr ago",   status: "confirmed" },
  { type: "sent",     to:   "vlc1qzv6p...", amount: "-7.6660",  time: "5 hr ago",   status: "confirmed" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="text-slate-500 hover:text-cyan-400 transition-colors"
      title="Copy"
    >
      {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

export default function WalletPage() {
  const [showKey, setShowKey] = useState(false)
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")

  return (
    <div className="min-h-screen">
      <PageHeader
        label="Valence Web Wallet"
        title="Web"
        titleAccent="Wallet"
        subtitle="Manage your VLC keys, send transactions, and monitor your balance — all in the browser."
        breadcrumb={[{ href: "/wallet", label: "Wallet" }]}
      />

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <MoleculeBg intensity={0.25} particles={false} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Balance card ── */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="status-dot" />
                <span className="text-xs font-mono tracking-widest text-cyan-400/70 uppercase">Balance</span>
              </div>
              <div className="text-4xl font-light text-white mb-1">
                {MOCK_BALANCE}
              </div>
              <div className="text-sm text-slate-500 mb-6">VLC</div>

              <div className="text-xs font-mono text-slate-500 mb-1">Your Address</div>
              <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-3 py-2.5 border border-[rgba(6,182,212,0.1)]">
                <span className="text-xs font-mono text-slate-300 truncate flex-1">{MOCK_ADDRESS}</span>
                <CopyButton text={MOCK_ADDRESS} />
              </div>

              <div className="mt-4 text-xs font-mono text-slate-500 mb-1">Private Key</div>
              <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-3 py-2.5 border border-[rgba(6,182,212,0.1)]">
                <span className="text-xs font-mono text-slate-300 flex-1 truncate">
                  {showKey ? "5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF" : "•••••••••••••••••••••••••••"}
                </span>
                <button
                  onClick={() => setShowKey(v => !v)}
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-cyan-400/20 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-colors">
                <Download className="w-4 h-4" /> Export Wallet
              </button>
            </motion.div>

            {/* Faucet */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-panel rounded-2xl p-5"
            >
              <div className="text-sm font-medium text-slate-200 mb-2">🚰 Faucet</div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">Request free VLC from the network faucet for testing purposes.</p>
              <button className="w-full py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Request 100 VLC
              </button>
            </motion.div>
          </div>

          {/* ── Right: Send/Receive + History ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Tab panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex border-b border-[rgba(6,182,212,0.1)]">
                {(["send", "receive"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tab === "send" ? <Send className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    {tab === "send" ? "Send VLC" : "Receive VLC"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "send" ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 block">Recipient Address</label>
                      <input
                        type="text"
                        value={recipient}
                        onChange={e => setRecipient(e.target.value)}
                        placeholder="vlc1q…"
                        className="w-full px-4 py-3 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.15)] text-slate-300 font-mono text-sm placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 block">Amount (VLC)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.0000"
                        className="w-full px-4 py-3 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.15)] text-slate-300 font-mono text-sm placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-all"
                      />
                    </div>
                    <button className="mt-2 w-full py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Broadcast Transaction
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-4 py-4">
                    {/* QR placeholder */}
                    <div className="w-32 h-32 rounded-xl border-2 border-dashed border-cyan-400/30 flex items-center justify-center bg-cyan-400/5">
                      <span className="text-xs text-slate-500 font-mono">QR Code</span>
                    </div>
                    <p className="text-sm text-slate-400 max-w-xs">Share your address to receive VLC from another wallet or the faucet.</p>
                    <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-4 py-2.5 border border-[rgba(6,182,212,0.1)] w-full">
                      <span className="text-xs font-mono text-slate-300 flex-1 truncate">{MOCK_ADDRESS}</span>
                      <CopyButton text={MOCK_ADDRESS} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Transaction history */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-[rgba(6,182,212,0.1)] flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-sm font-medium text-slate-200">Transaction History</span>
              </div>
              <div className="divide-y divide-[rgba(6,182,212,0.07)]">
                {MOCK_HISTORY.map((tx, i) => (
                  <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        tx.type === "received"
                          ? "bg-green-400/10 border border-green-400/20"
                          : "bg-red-400/10 border border-red-400/20"
                      }`}>
                        {tx.type === "received"
                          ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                          : <ArrowUpRight className="w-4 h-4 text-red-400" />
                        }
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 capitalize">{tx.type}</div>
                        <div className="text-xs text-slate-500 font-mono">
                          {tx.type === "received" ? `from ${tx.from}` : `to ${(tx as any).to}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold font-mono ${tx.type === "received" ? "text-green-400" : "text-red-400"}`}>
                        {tx.amount} VLC
                      </div>
                      <div className="text-xs text-slate-500">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
