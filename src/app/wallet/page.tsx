"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Copy, Send, Download, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw, CheckCircle, AlertCircle, Lock, Key, Play } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"
import { useWallet } from "@/context/WalletContext"

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

function formatAge(timestampNano: number) {
  const diffMs = Date.now() - (timestampNano / 1e6)
  if (diffMs < 60000) return `${Math.max(0, Math.floor(diffMs/1000))}s ago`
  if (diffMs < 3600000) return `${Math.floor(diffMs/60000)}m ago`
  return `${Math.floor(diffMs/3600000)}h ago`
}

export default function WalletPage() {
  const { walletState, keys, createWallet, unlockWallet, lockWallet, rpcUrl, requestTransaction } = useWallet()
  
  // Auth UI State
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [authError, setAuthError] = useState("")

  // Dashboard UI State
  const [showKey, setShowKey] = useState(false)
  const [activeTab, setActiveTab] = useState<"send" | "receive" | "dapp">("send")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  
  // Blockchain State
  const [balance, setBalance] = useState("0.0000")
  const [history, setHistory] = useState<any[]>([])
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const fetchWalletData = async () => {
    if (walletState !== "UNLOCKED" || !keys) return
    try {
      const balRes = await fetch(`${rpcUrl}/balances/${keys.address}`)
      if (balRes.ok) {
        const balData = await balRes.json()
        setBalance((balData.balance / 1000000000).toFixed(4))
      }
      
      const histRes = await fetch(`${rpcUrl}/history/${keys.address}`)
      if (histRes.ok) {
        const histData = await histRes.json()
        setHistory(histData || [])
      }
    } catch (err) {
      console.error("Failed to fetch wallet data:", err)
    }
  }

  useEffect(() => {
    if (walletState === "UNLOCKED") {
      fetchWalletData()
      const interval = setInterval(fetchWalletData, 5000)
      return () => clearInterval(interval)
    }
  }, [walletState, keys, rpcUrl])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match")
      return
    }
    createWallet(password)
    setPassword("")
    setConfirmPassword("")
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    const success = unlockWallet(password)
    if (!success) {
      setAuthError("Incorrect password or corrupt keystore")
    } else {
      setPassword("")
    }
  }

  const handleFaucet = async () => {
    if (!keys) return
    setLoading(true)
    setError("")
    setSuccessMsg("")
    try {
      const res = await fetch(`${rpcUrl}/faucet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: keys.address, amount: 100000000000 }) // 100 VLC
      })
      if (res.ok) {
        setSuccessMsg("100 VLC requested from faucet!")
        setTimeout(fetchWalletData, 2000)
      } else {
        const text = await res.text()
        try {
          const err = JSON.parse(text)
          setError(err.error || "Faucet request failed")
        } catch {
          setError(`Faucet request failed: ${res.statusText}`)
        }
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
      setTimeout(() => setSuccessMsg(""), 5000)
      setTimeout(() => setError(""), 5000)
    }
  }

  const handleSend = async () => {
    if (!keys || !amount || !recipient) return
    
    // Instead of calling signTransaction manually here,
    // we route it through the DApp transaction request pipeline
    // to reuse the same approval logic.
    try {
      setLoading(true)
      const amtVLC = parseFloat(amount)
      if (isNaN(amtVLC) || amtVLC <= 0) throw new Error("Invalid amount")
      
      await requestTransaction({ recipient, amountVLC: amtVLC })
      
      setSuccessMsg("Transaction broadcasted!")
      setAmount("")
      setRecipient("")
      setTimeout(fetchWalletData, 2000)
    } catch (e: any) {
      if (e.message !== "Transaction rejected by user") {
        setError(e.message)
      }
    } finally {
      setLoading(false)
      setTimeout(() => setSuccessMsg(""), 5000)
      setTimeout(() => setError(""), 5000)
    }
  }

  const handleDAppPurchase = async () => {
    try {
      // Simulate DApp charging 50 VLC to a random shop address
      await requestTransaction({ 
        recipient: "VALENCE_SHOP_09F3", 
        amountVLC: 50.0 
      })
      setSuccessMsg("Purchase successful!")
      setTimeout(fetchWalletData, 2000)
    } catch (e: any) {
      if (e.message !== "Transaction rejected by user") {
        setError(e.message)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        label="Valence Web Wallet"
        title="Web"
        titleAccent="Wallet"
        subtitle="A secure, non-custodial wallet with AES encryption and MetaMask-style transaction approvals."
        breadcrumb={[{ href: "/wallet", label: "Wallet" }]}
      />

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <MoleculeBg intensity={0.25} particles={false} />

        {/* --- UNINITIALIZED: CREATE WALLET --- */}
        {walletState === "UNINITIALIZED" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto glass-panel rounded-2xl p-8"
          >
            <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-400/30">
              <Key className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Create Wallet</h2>
            <p className="text-sm text-slate-400 mb-6">Create a strong password to securely encrypt your new Valence keys in this browser.</p>
            
            {authError && (
              <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full px-4 py-3 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.15)] text-slate-300 font-mono text-sm placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-all"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.15)] text-slate-300 font-mono text-sm placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-all"
                />
              </div>
              <button type="submit" className="mt-2 w-full py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2">
                Create & Encrypt Wallet
              </button>
            </form>
          </motion.div>
        )}

        {/* --- LOCKED: UNLOCK WALLET --- */}
        {walletState === "LOCKED" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto glass-panel rounded-2xl p-8"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 border border-purple-400/30 mx-auto">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center">Wallet Locked</h2>
            <p className="text-sm text-slate-400 mb-6 text-center">Enter your password to decrypt your keystore.</p>
            
            {authError && (
              <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleUnlock} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#03090e] border border-[rgba(6,182,212,0.15)] text-slate-300 font-mono text-sm placeholder-slate-600 outline-none focus:border-cyan-400/50 transition-all"
              />
              <button type="submit" className="mt-2 w-full py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2">
                Unlock Wallet
              </button>
            </form>
            <div className="mt-6 text-center text-xs text-slate-600">
              Forgot password? You can clear your localStorage and create a new wallet.
            </div>
          </motion.div>
        )}

        {/* --- UNLOCKED: DASHBOARD --- */}
        {walletState === "UNLOCKED" && keys && (
          <>
            {error && (
              <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}
            
            {successMsg && (
              <div className="mb-6 p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> {successMsg}
              </div>
            )}

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
                    <button onClick={fetchWalletData} className="ml-auto text-slate-500 hover:text-cyan-400 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-4xl font-light text-white mb-1">
                    {balance}
                  </div>
                  <div className="text-sm text-slate-500 mb-6">VLC</div>

                  <div className="text-xs font-mono text-slate-500 mb-1">Your Address</div>
                  <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-3 py-2.5 border border-[rgba(6,182,212,0.1)]">
                    <span className="text-xs font-mono text-slate-300 truncate flex-1">{keys.address}</span>
                    <CopyButton text={keys.address} />
                  </div>

                  <div className="mt-4 text-xs font-mono text-slate-500 mb-1">Private Key (Encrypted on disk)</div>
                  <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-3 py-2.5 border border-[rgba(6,182,212,0.1)]">
                    <span className="text-xs font-mono text-slate-300 flex-1 truncate">
                      {showKey ? keys.privateKey : "•••••••••••••••••••••••••••"}
                    </span>
                    <button
                      onClick={() => setShowKey(v => !v)}
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <button 
                    onClick={lockWallet}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-400/20 text-red-400 text-sm font-medium hover:bg-red-400/10 transition-colors"
                  >
                    <Lock className="w-4 h-4" /> Lock Wallet
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
                  <button 
                    onClick={handleFaucet}
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Request 100 VLC
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
                    {(["send", "receive", "dapp"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors capitalize ${
                          activeTab === tab
                            ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {tab === "send" ? <Send className="w-4 h-4" /> : tab === "receive" ? <Download className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {tab === "dapp" ? "DApp Test" : `${tab} VLC`}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {activeTab === "send" && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 block">Recipient Address</label>
                          <input
                            type="text"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value)}
                            placeholder="Address (hex)"
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
                        <button 
                          onClick={handleSend}
                          disabled={loading || !amount || !recipient}
                          className="mt-2 w-full py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
                        >
                          <Send className="w-4 h-4" /> Send Transaction
                        </button>
                      </div>
                    )}
                    
                    {activeTab === "receive" && (
                      <div className="flex flex-col items-center text-center gap-4 py-4">
                        <div className="w-32 h-32 rounded-xl border-2 border-dashed border-cyan-400/30 flex items-center justify-center bg-cyan-400/5">
                          <span className="text-xs text-slate-500 font-mono">QR Code</span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-xs">Share your address to receive VLC from another wallet or the faucet.</p>
                        <div className="flex items-center gap-2 bg-[#03090e] rounded-lg px-4 py-2.5 border border-[rgba(6,182,212,0.1)] w-full">
                          <span className="text-xs font-mono text-slate-300 flex-1 truncate">{keys.address}</span>
                          <CopyButton text={keys.address} />
                        </div>
                      </div>
                    )}

                    {activeTab === "dapp" && (
                      <div className="flex flex-col gap-4 items-center text-center py-6">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-400/30 mb-2">
                          <Play className="w-8 h-8 text-purple-400 ml-1" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-200">DApp Simulator</h3>
                        <p className="text-sm text-slate-400 max-w-sm mb-4">
                          Click below to simulate a decentralized application requesting a transaction from your wallet. Notice the MetaMask-style approval popup.
                        </p>
                        <button 
                          onClick={handleDAppPurchase}
                          className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-900 font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        >
                          Buy NFT (50 VLC)
                        </button>
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
                    {history.length === 0 && (
                      <div className="px-5 py-8 text-center text-slate-500 text-sm">No transactions yet</div>
                    )}
                    {history.map((tx, i) => {
                      const isReceived = tx.recipient === keys.address
                      return (
                      <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isReceived
                              ? "bg-green-400/10 border border-green-400/20"
                              : "bg-red-400/10 border border-red-400/20"
                          }`}>
                            {isReceived
                              ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                              : <ArrowUpRight className="w-4 h-4 text-red-400" />
                            }
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-200 capitalize">{isReceived ? "received" : "sent"}</div>
                            <div className="text-xs text-slate-500 font-mono">
                              {isReceived 
                                ? (tx.sender === "VALENCE_COINBASE" ? "from Coinbase" : `from ${tx.sender.slice(0, 8)}…`)
                                : (tx.recipient === "Genesis" ? "to Genesis" : `to ${tx.recipient.slice(0, 8)}…`)
                              }
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-semibold font-mono ${isReceived ? "text-green-400" : "text-red-400"}`}>
                            {isReceived ? "+" : "-"}{(tx.amount / 1000000000).toFixed(4)} VLC
                          </div>
                          <div className="text-xs text-slate-500">{formatAge(tx.timestamp)}</div>
                        </div>
                      </div>
                    )})}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
