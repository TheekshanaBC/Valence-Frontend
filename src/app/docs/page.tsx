"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Terminal,
  Zap,
  Globe,
  Sliders,
  Copy,
  Check,
  ExternalLink,
  Book,
  Shield,
  Layers,
  Search,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

const GITHUB_REPO_URL = "https://github.com/TheekshanaBC/Blockchain-Simulator"

const QUICKSTART_STEPS = [
  {
    step: 1,
    title: "Clone the Repository",
    desc: "Clone the open-source Go backend and Next.js frontend repository.",
    cmd: "git clone https://github.com/TheekshanaBC/Blockchain-Simulator.git",
  },
  {
    step: 2,
    title: "Start Primary Node Daemon (Node 1)",
    desc: "Initializes the Genesis block and launches Node 1 on port 8080.",
    cmd: "go run ./cmd/valenced -port=8080 -data-dir=./data/node1",
  },
  {
    step: 3,
    title: "Start Secondary Peer Node (Node 2)",
    desc: "Launches Node 2 on port 8081 and automatically connects to Node 1 via mesh discovery.",
    cmd: "go run ./cmd/valenced -port=8081 -data-dir=./data/node2 -peers=localhost:8080",
  },
  {
    step: 4,
    title: "Mine a Block with valence-cli",
    desc: "Triggers the Proof-of-Work engine on Node 1 to mine pending transactions.",
    cmd: "go run ./cmd/valence-cli -node=http://localhost:8080 generate",
  },
]

const CLI_COMMANDS = [
  {
    cmd: "valence-cli createwallet",
    args: "[-wallet=name]",
    desc: "Generates a new Ed25519 keypair and securely saves it into the local keystore (keys.json).",
  },
  {
    cmd: "valence-cli getbalance",
    args: "[address]",
    desc: "Queries the confirmed on-chain balance in VCN for the active wallet or a specified address.",
  },
  {
    cmd: "valence-cli sendtoaddress",
    args: "<address> <amount>",
    desc: "Signs and submits a transaction transfer. Automatically converts VCN to Electrons (10^9).",
  },
  {
    cmd: "valence-cli faucet",
    args: "<amount>",
    desc: "Requests test VCN from the network development faucet wallet.",
  },
  {
    cmd: "valence-cli generate",
    args: "",
    desc: "Triggers the local node Proof-of-Work solver to mine a block containing pending mempool transactions.",
  },
  {
    cmd: "valence-cli getnetworkinfo",
    args: "",
    desc: "Returns current node status including block height, best hash, peer count, and difficulty.",
  },
  {
    cmd: "valence-cli getmempoolinfo",
    args: "",
    desc: "Lists all unconfirmed transactions currently queued in the node's mempool.",
  },
  {
    cmd: "valence-cli getpeerinfo",
    args: "",
    desc: "Displays connected peer nodes, latency status, and health metrics.",
  },
  {
    cmd: "valence-cli addnode",
    args: "<address>",
    desc: "Manually triggers a mutual peer announcement connection to an external node address.",
  },
]

const DAEMON_FLAGS = [
  { flag: "-port", default: "8080", desc: "TCP port the HTTP REST API and gossip listener binds to (1–65535)." },
  { flag: "-data-dir", default: "./data/node1", desc: "Local directory where chain.json and keys.json are persisted." },
  { flag: "-peers", default: '""', desc: "Comma-separated list of bootstrap peers (e.g. localhost:8081,localhost:8082)." },
  { flag: "-announce-addr", default: '""', desc: "Explicit address to announce to peers (e.g. http://192.168.1.100:8080)." },
  { flag: "-miner-address", default: '""', desc: "Hex wallet address designated to receive block mining coinbase rewards." },
  { flag: "-faucet-key", default: '""', desc: "Base64 encoded private key for the Faucet wallet to allow testnet token distribution." },
  { flag: "-difficulty", default: "3", desc: "Initial Proof-of-Work target leading zero requirement." },
  { flag: "-retarget-window", default: "4", desc: "Number of blocks between dynamic difficulty recalculations." },
  { flag: "-target-block-time", default: "10", desc: "Target seconds per block used by the retargeting formula." },
  { flag: "-min-diff / -max-diff", default: "2 / 6", desc: "Hard clamping bounds for dynamic difficulty adjustments." },
  { flag: "-max-tx-per-block", default: "10", desc: "Maximum number of transactions packaged into a single block." },
]

const REST_ENDPOINTS = [
  { method: "GET", path: "/status", desc: "Node status: height, best hash, peer count, difficulty, and mempool size." },
  { method: "GET", path: "/chain/height", desc: "Returns the current block height and best hash." },
  { method: "GET", path: "/chain", desc: "Retrieves the full blockchain or a paginated slice (?limit=N&offset=N)." },
  { method: "GET", path: "/chain/blocks/:height", desc: "Retrieves a single block by its integer height." },
  { method: "GET", path: "/chain/blocks/:height/proof/:txIndex", desc: "Returns binary Merkle SPV inclusion proof for a specific transaction." },
  { method: "POST", path: "/chain/blocks/:height/verify-proof", desc: "Verifies a Merkle SPV proof payload against the block's Merkle root." },
  { method: "GET", path: "/balances", desc: "Returns all account balances derived via in-memory transaction replay." },
  { method: "GET", path: "/balances/:address", desc: "Returns confirmed balance and pending balance for a specific address." },
  { method: "GET", path: "/history/:address", desc: "Returns all inbound and outbound transactions involving the address." },
  { method: "GET", path: "/sequence/:address", desc: "Returns the next expected sequential nonce for replay protection." },
  { method: "GET", path: "/mempool", desc: "Lists all unconfirmed transactions waiting in the memory pool." },
  { method: "POST", path: "/tx/submit", desc: "Submits an Ed25519 signed transaction into the mempool and broadcasts it." },
  { method: "POST", path: "/tx/gossip", desc: "Internal P2P endpoint for receiving transaction broadcasts from peers." },
  { method: "POST", path: "/block/gossip", desc: "Internal P2P endpoint for receiving newly mined blocks from peers." },
  { method: "POST", path: "/mine", desc: "Triggers multi-core CPU Proof-of-Work mining on pending transactions." },
  { method: "POST", path: "/faucet", desc: "Mints development test tokens to a recipient address (rate-limited)." },
  { method: "GET", path: "/peers", desc: "Returns list of connected and healthy network peers." },
  { method: "POST", path: "/peers/announce", desc: "Announces local address for mutual peer discovery and mesh expansion." },
  { method: "POST", path: "/chain/sync", desc: "Accepts push chain synchronization from an ahead peer." },
]

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    POST: "text-amber-400 bg-amber-400/10 border-amber-400/25",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${colors[method] ?? "text-slate-400 bg-slate-400/10 border-slate-400/20"}`}>
      {method}
    </span>
  )
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group bg-[#090416] rounded-lg px-4 py-3 border border-[rgba(139,92,246,0.12)] flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0 overflow-x-auto">
        <Terminal className="w-3.5 h-3.5 text-violet-400/60 flex-shrink-0" />
        <code className="text-xs font-mono text-slate-200 whitespace-nowrap">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="text-slate-500 hover:text-violet-300 transition-colors flex-shrink-0 p-1 rounded"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = React.useState<"quickstart" | "cli" | "flags" | "api">("quickstart")
  const [apiSearch, setApiSearch] = React.useState("")

  const filteredEndpoints = React.useMemo(() => {
    return REST_ENDPOINTS.filter((ep) =>
      ep.path.toLowerCase().includes(apiSearch.toLowerCase()) ||
      ep.desc.toLowerCase().includes(apiSearch.toLowerCase()) ||
      ep.method.toLowerCase().includes(apiSearch.toLowerCase())
    )
  }, [apiSearch])

  return (
    <div className="min-h-screen pb-24">
      <PageHeader
        title="Developer"
        titleAccent="Documentation"
        subtitle="Complete guide to running local node clusters, CLI commands, daemon configuration, and the REST API catalog."
        breadcrumb={[{ href: "/docs", label: "Docs" }]}
      >
        <div className="flex flex-wrap gap-3 mt-4">
          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 text-xs font-semibold tracking-wide transition-all"
          >
            <Book className="w-3.5 h-3.5" /> View on GitHub <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </div>
      </PageHeader>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <MoleculeBg intensity={0.25} particles={false} />

        {/* ─── Navigation Sub-Tabs ─── */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[rgba(139,92,246,0.12)] pb-4">
          {[
            { id: "quickstart", label: "Quick Start Guide", icon: <Zap className="w-3.5 h-3.5" /> },
            { id: "cli", label: "valence-cli Reference", icon: <Terminal className="w-3.5 h-3.5" /> },
            { id: "flags", label: "valenced Daemon Flags", icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: "api", label: "HTTP REST API Catalog", icon: <Globe className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === tab.id
                  ? "bg-violet-500 text-slate-950"
                  : "glass-panel text-slate-400 hover:text-white hover:border-violet-400/30"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ─── Section 1: Quick Start ─── */}
        {activeSection === "quickstart" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border-[rgba(139,92,246,0.18)]">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Multi-Node Local Cluster Setup</h3>
                <p className="text-sm text-slate-400 font-light mt-1">
                  Follow these steps to spin up a live two-node P2P cluster and submit your first transaction in under 3 minutes.
                </p>
              </div>

              <div className="space-y-4">
                {QUICKSTART_STEPS.map((s) => (
                  <div key={s.step} className="p-4 rounded-xl bg-[#090416]/70 border border-[rgba(139,92,246,0.08)] space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-violet-400/15 border border-violet-400/30 text-violet-300 font-mono text-[11px] font-bold flex items-center justify-center">
                        {s.step}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">{s.desc}</p>
                    <CodeBlock code={s.cmd} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Section 2: CLI Command Reference ─── */}
        {activeSection === "cli" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border-[rgba(139,92,246,0.18)]">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">valence-cli Command-Line Interface</h3>
                <p className="text-sm text-slate-400 font-light mt-1">
                  Interact with any node daemon from your terminal using Bitcoin Core-style CLI subcommands.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <h4 className="text-base font-semibold text-violet-300 mb-2">🚀 Interactive Mode</h4>
                <p className="text-sm text-slate-300 font-light mb-3">
                  Running <code className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-violet-200">valence-cli</code> without any arguments launches the new interactive terminal mode. This provides a user-friendly, menu-driven interface to manage wallets, check balances, send transactions, and monitor the network without needing to remember specific commands.
                </p>
                <CodeBlock code="go run ./cmd/valence-cli" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CLI_COMMANDS.map((c) => (
                  <div key={c.cmd} className="p-4 rounded-xl bg-[#090416]/80 border border-[rgba(139,92,246,0.08)] flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-xs font-mono font-bold text-violet-300">{c.cmd}</code>
                        {c.args && <span className="text-[10px] font-mono text-slate-500">{c.args}</span>}
                      </div>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">{c.desc}</p>
                    </div>
                    <CodeBlock code={`go run ./cmd/valence-cli ${c.cmd.replace("valence-cli ", "")} ${c.args}`} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Section 3: Daemon Configuration Flags ─── */}
        {activeSection === "flags" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border-[rgba(139,92,246,0.18)]">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">valenced Node Daemon Configuration Flags</h3>
                <p className="text-sm text-slate-400 font-light mt-1">
                  All startup parameters supported by the core blockchain node daemon.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DAEMON_FLAGS.map((f) => (
                  <div key={f.flag} className="p-4 rounded-xl bg-[#090416]/80 border border-[rgba(139,92,246,0.08)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-violet-300">{f.flag}</span>
                        <span className="text-[10px] font-mono text-slate-500 bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10">
                          Default: {f.default}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Section 4: REST API Catalog ─── */}
        {activeSection === "api" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border-[rgba(139,92,246,0.18)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">HTTP REST API Endpoints</h3>
                  <p className="text-sm text-slate-400 font-light mt-0.5">
                    CORS-enabled JSON endpoints exposed by every active node daemon on its configured port.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search endpoints..."
                    value={apiSearch}
                    onChange={(e) => setApiSearch(e.target.value)}
                    className="w-full bg-[#090416] border border-[rgba(139,92,246,0.18)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredEndpoints.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#090416]/70 border border-[rgba(139,92,246,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-violet-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <MethodBadge method={ep.method} />
                      <code className="text-xs font-mono font-semibold text-violet-300 truncate">{ep.path}</code>
                    </div>
                    <span className="text-xs text-slate-400 font-light">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Footer Link ─── */}
        <div className="mt-12 text-center text-xs text-slate-500 font-light">
          Full Go source code, tests, and reference manual available in the{" "}
          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
          >
            GitHub repository
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
