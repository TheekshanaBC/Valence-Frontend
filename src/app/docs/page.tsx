"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal, Download, Book, Zap } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

const SECTIONS = [
  {
    id: "quickstart",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: "Quick Start",
    desc: "Get a local Valence cluster running in under 5 minutes.",
    steps: [
      { label: "Clone the repository", code: "git clone https://github.com/TheekshanaBC/Valence-Frontend.git" },
      { label: "Install dependencies", code: "go mod tidy" },
      { label: "Start a node", code: "go run ./cmd/valenced --port=8080 --data=./data/node1" },
      { label: "Start a second node (new terminal)", code: "go run ./cmd/valenced --port=8081 --data=./data/node2 --peers=localhost:8080" },
      { label: "Mine a block", code: "go run ./cmd/valence-cli mine --node=localhost:8080" },
    ],
  },
  {
    id: "api",
    icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    title: "REST API Reference",
    desc: "Each node exposes a REST API for interacting with the blockchain.",
    endpoints: [
      { method: "GET",  path: "/chain",         desc: "Returns the full blockchain" },
      { method: "GET",  path: "/blocks/:height", desc: "Get block at height" },
      { method: "GET",  path: "/mempool",        desc: "List unconfirmed transactions" },
      { method: "POST", path: "/transactions",   desc: "Broadcast a signed transaction" },
      { method: "GET",  path: "/peers",          desc: "List connected peers" },
      { method: "GET",  path: "/balance/:addr",  desc: "Get address balance" },
    ],
  },
  {
    id: "wallet",
    icon: <Download className="w-5 h-5 text-cyan-400" />,
    title: "Wallet CLI",
    desc: "Create keys and send transactions from the command line.",
    steps: [
      { label: "Create a new wallet",  code: "go run ./cmd/valence-cli wallet new" },
      { label: "Check balance",        code: "go run ./cmd/valence-cli balance --addr=<your-address>" },
      { label: "Send VLC",             code: "go run ./cmd/valence-cli send --to=<addr> --amount=10 --key=<privkey>" },
      { label: "Request faucet funds", code: "go run ./cmd/valence-cli faucet --addr=<your-address>" },
    ],
  },
]

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET:  "text-green-400 bg-green-400/10 border-green-400/20",
    POST: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border ${colors[method] ?? "text-slate-400 bg-slate-400/10 border-slate-400/20"}`}>
      {method}
    </span>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        label="Documentation"
        title="Getting"
        titleAccent="Started"
        subtitle="Everything you need to run a local Valence cluster, send transactions, and explore the chain."
        breadcrumb={[{ href: "/docs", label: "Docs" }]}
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <Link
            href="https://github.com/TheekshanaBC/Valence-Frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-semibold transition-all shadow-[0_0_16px_rgba(6,182,212,0.3)]"
          >
            <Book className="w-4 h-4" /> View on GitHub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </PageHeader>

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        <MoleculeBg intensity={0.2} particles={false} />

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section, si) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: si * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  <p className="text-sm text-slate-400 font-light">{section.desc}</p>
                </div>
              </div>

              <div className="glass-panel rounded-xl overflow-hidden">
                {/* Steps (quickstart + wallet) */}
                {("steps" in section ? (section as { steps: { label: string; code: string }[] }).steps : []).map((step, i) => (
                  <div key={i} className="border-b border-[rgba(6,182,212,0.07)] last:border-0">
                    <div className="px-5 pt-4 pb-1 flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 text-xs font-mono flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-slate-300">{step.label}</span>
                    </div>
                    <div className="mx-5 mb-4 mt-2 flex items-center gap-3 bg-[#03090e] rounded-lg px-4 py-3 border border-[rgba(6,182,212,0.08)]">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400/50 flex-shrink-0" />
                      <code className="text-xs font-mono text-slate-300 break-all">{step.code}</code>
                    </div>
                  </div>
                ))}

                {/* Endpoints (API) */}
                {("endpoints" in section ? (section as { endpoints: { method: string; path: string; desc: string }[] }).endpoints : []).map((ep, i) => (
                  <div key={i} className="px-5 py-4 flex items-center gap-4 border-b border-[rgba(6,182,212,0.07)] last:border-0 hover:bg-cyan-400/5 transition-colors">
                    <MethodBadge method={ep.method} />
                    <code className="text-sm font-mono text-cyan-300 flex-1">{ep.path}</code>
                    <span className="text-sm text-slate-500 hidden sm:block">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-slate-600 text-sm"
        >
          Full API specification and architecture details available in the{" "}
          <Link href="https://github.com/TheekshanaBC/Valence-Frontend" target="_blank" className="text-cyan-400/70 hover:text-cyan-400 transition-colors">
            GitHub repository →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
