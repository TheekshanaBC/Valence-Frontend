"use client"

import React from "react"
import { useWallet, NetworkType } from "@/context/WalletContext"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe, Laptop } from "lucide-react"

export function NetworkSwitcher() {
  const { network, setNetwork } = useWallet()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(139,92,246,0.2)] bg-[#090416] hover:border-violet-400/40 hover:bg-violet-400/5 transition-all text-sm font-medium text-slate-300"
      >
        <div className={`w-2 h-2 rounded-full ${network === "mainnet" ? "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" : "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]"}`} />
        <span className="hidden sm:inline capitalize">{network}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-50" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-[#0a1118] border border-violet-400/20 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden z-50"
          >
            <div className="flex flex-col p-1">
              <button 
                onClick={() => { setNetwork("mainnet"); setOpen(false) }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${network === "mainnet" ? "bg-violet-400/10 text-violet-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}
              >
                <Globe className="w-4 h-4" />
                Mainnet
                {network === "mainnet" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </button>
              
              <button 
                onClick={() => { setNetwork("localhost"); setOpen(false) }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${network === "localhost" ? "bg-violet-400/10 text-violet-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}
              >
                <Laptop className="w-4 h-4" />
                Localhost
                {network === "localhost" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
