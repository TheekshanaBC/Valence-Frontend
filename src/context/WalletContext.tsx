"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import CryptoJS from "crypto-js"
import { generateKeyPair, generateKeyPairFromMnemonic, signTransaction } from "@/lib/crypto"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, AlertCircle } from "lucide-react"
import { RPC_URL } from "@/lib/config"

export type NetworkType = "mainnet" | "localhost"
export type WalletState = "UNINITIALIZED" | "LOCKED" | "UNLOCKED"

export interface Keys {
  privateKey: string
  publicKey: string
  address: string
  mnemonic?: string
}

export interface TxParams {
  recipient: string
  amountVCN: number // in VCN (will be converted to electrons)
}

interface WalletContextType {
  network: NetworkType
  setNetwork: (n: NetworkType) => void
  rpcUrl: string
  walletState: WalletState
  keys: Keys | null
  createWallet: (password: string, mnemonic?: string) => void
  unlockWallet: (password: string) => boolean
  lockWallet: () => void
  resetWallet: () => void
  requestTransaction: (params: TxParams) => Promise<any>
}

const WalletContext = createContext<WalletContextType | null>(null)

export const useWallet = () => {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within WalletProvider")
  return ctx
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<NetworkType>("mainnet")
  const [walletState, setWalletState] = useState<WalletState>("UNINITIALIZED")
  const [keys, setKeys] = useState<Keys | null>(null)

  // Transaction Prompt State
  const [pendingTx, setPendingTx] = useState<{
    params: TxParams
    resolve: (val: any) => void
    reject: (err: any) => void
  } | null>(null)
  
  const [txLoading, setTxLoading] = useState(false)
  const [txError, setTxError] = useState("")

  const rpcUrl = network === "mainnet" 
    ? RPC_URL 
    : "http://localhost:8080"

  // Check if wallet exists on mount
  useEffect(() => {
    const keystore = localStorage.getItem("valence_keystore")
    if (keystore) {
      setWalletState("LOCKED")
    } else {
      setWalletState("UNINITIALIZED")
    }
    
    // Also load preferred network
    const savedNetwork = localStorage.getItem("valence_network")
    if (savedNetwork === "mainnet" || savedNetwork === "localhost") {
      setNetwork(savedNetwork)
    }
  }, [])

  const handleSetNetwork = (n: NetworkType) => {
    setNetwork(n)
    localStorage.setItem("valence_network", n)
  }

  const createWallet = (password: string, mnemonic?: string) => {
    const newKeys = mnemonic ? generateKeyPairFromMnemonic(mnemonic) : generateKeyPair()
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(newKeys), password).toString()
    localStorage.setItem("valence_keystore", encrypted)
    setKeys(newKeys)
    setWalletState("UNLOCKED")
  }

  const unlockWallet = (password: string): boolean => {
    const keystore = localStorage.getItem("valence_keystore")
    if (!keystore) return false
    
    try {
      const bytes = CryptoJS.AES.decrypt(keystore, password)
      if (bytes.sigBytes <= 0) return false
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8)
      if (!decryptedStr) return false
      
      const parsedKeys = JSON.parse(decryptedStr)
      setKeys(parsedKeys)
      setWalletState("UNLOCKED")
      return true
    } catch (e) {
      return false
    }
  }

  const lockWallet = () => {
    setKeys(null)
    setWalletState("LOCKED")
  }

  const resetWallet = () => {
    localStorage.removeItem("valence_keystore")
    setKeys(null)
    setWalletState("UNINITIALIZED")
  }

  const requestTransaction = (params: TxParams): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (walletState !== "UNLOCKED" || !keys) {
        reject(new Error("Wallet is locked or uninitialized"))
        return
      }
      setPendingTx({ params, resolve, reject })
      setTxError("")
    })
  }

  const approveTx = async () => {
    if (!pendingTx || !keys) return
    setTxLoading(true)
    setTxError("")
    
    try {
      const electrons = Math.floor(pendingTx.params.amountVCN * 1000000000)
      
      const seqRes = await fetch(`${rpcUrl}/sequence/${keys.address}`)
      if (!seqRes.ok) throw new Error("Failed to get sequence")
      const { next_sequence } = await seqRes.json()
      
      const tx = signTransaction(keys.address, pendingTx.params.recipient, electrons, next_sequence, keys.privateKey, keys.publicKey)
      
      const submitRes = await fetch(`${rpcUrl}/tx/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx)
      })
      
      if (submitRes.ok) {
        const responseData = await submitRes.json()
        pendingTx.resolve({ ...responseData, transaction: tx })
        setPendingTx(null)
      } else {
        const text = await submitRes.text()
        try {
          const err = JSON.parse(text)
          setTxError(err.error || "Failed to submit transaction")
        } catch {
          setTxError(`Failed to submit transaction: ${submitRes.statusText}`)
        }
      }
    } catch (e: any) {
      setTxError(e.message)
    } finally {
      setTxLoading(false)
    }
  }

  const rejectTx = () => {
    if (!pendingTx) return
    pendingTx.reject(new Error("Transaction rejected by user"))
    setPendingTx(null)
  }

  return (
    <WalletContext.Provider value={{ network, setNetwork: handleSetNetwork, rpcUrl, walletState, keys, createWallet, unlockWallet, lockWallet, resetWallet, requestTransaction }}>
      {children}

      {/* Transaction Approval Modal */}
      <AnimatePresence>
        {pendingTx && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0a1118] border border-violet-400/20 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-[rgba(139,92,246,0.1)] flex items-center gap-2 bg-violet-400/5">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-200">Signature Request</span>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-slate-400 mb-6">A decentralized application is requesting your approval to broadcast a transaction.</p>
                
                <div className="bg-[#090416] border border-[rgba(139,92,246,0.1)] rounded-xl p-4 mb-6">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Action</div>
                  <div className="text-base text-slate-200 font-medium mb-4">Send VCN</div>
                  
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">To</div>
                  <div className="text-xs font-mono text-slate-300 break-all bg-black/20 p-2 rounded mb-4 border border-white/5">{pendingTx.params.recipient}</div>
                  
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Amount</div>
                  <div className="text-2xl font-light text-violet-400">{pendingTx.params.amountVCN.toFixed(4)} <span className="text-sm text-violet-400/60 font-medium">VCN</span></div>
                </div>

                {txError && (
                  <div className="mb-6 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> <span className="truncate">{txError}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={rejectTx}
                    disabled={txLoading}
                    className="flex-1 py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                  <button 
                    onClick={approveTx}
                    disabled={txLoading}
                    className="flex-1 py-3 rounded-lg bg-violet-500 hover:bg-violet-400 text-slate-900 transition-colors flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50"
                  >
                    {txLoading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-900/30 border-t-slate-900 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WalletContext.Provider>
  )
}
