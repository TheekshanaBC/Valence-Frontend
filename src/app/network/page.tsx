"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Server, Laptop, RefreshCw, Layers } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"

export default function NetworkPage() {
  return (
    <div className="min-h-screen pb-24">
      <PageHeader
        title="Network"
        titleAccent="Architecture"
        subtitle="How the web frontend, cloud RPC node on Railway, and local node clusters communicate in real life."
        breadcrumb={[{ href: "/network", label: "Network" }]}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <MoleculeBg intensity={0.2} particles={false} />

        {/* ─── 1. The Global Communication Diagram ─── */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white">How the Network Actually Works</h3>
            <p className="text-sm text-slate-400 font-light mt-1">
              A straightforward view of the 3 components: the Website, the Deployed Cloud Node, and Local Nodes.
            </p>
          </div>

          {/* Clean SVG Diagram */}
          <div className="w-full bg-[#090416] rounded-xl p-4 sm:p-6 border border-[rgba(139,92,246,0.15)] overflow-x-auto">
            <svg
              viewBox="0 0 760 210"
              className="w-full min-w-[700px] h-auto text-xs font-mono select-none"
              fill="none"
            >
              {/* Box 1: Website */}
              <rect x="20" y="30" width="180" height="130" rx="10" fill="#0f0726" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
              <text x="110" y="60" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">1. Web Application</text>
              <text x="110" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">Next.js in Browser</text>
              <text x="110" y="105" textAnchor="middle" fill="#a78bfa" fontSize="10">• Signs Tx in browser (Ed25519)</text>
              <text x="110" y="125" textAnchor="middle" fill="#a78bfa" fontSize="10">• Queries /status, /chain</text>
              <text x="110" y="145" textAnchor="middle" fill="#a78bfa" fontSize="10">• Submits POST /tx/submit</text>

              {/* Arrow 1: Website <-> Cloud Node */}
              <line x1="200" y1="95" x2="280" y2="95" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4" />
              <polygon points="280,95 272,91 272,99" fill="#8b5cf6" />
              <polygon points="200,95 208,91 208,99" fill="#8b5cf6" />
              <text x="240" y="85" textAnchor="middle" fill="#a78bfa" fontSize="10">HTTPS REST</text>

              {/* Box 2: Cloud RPC Node */}
              <rect x="290" y="30" width="190" height="130" rx="10" fill="#0f0726" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
              <text x="385" y="60" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">2. Cloud RPC Node</text>
              <text x="385" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">Deployed on Railway</text>
              <text x="385" y="105" textAnchor="middle" fill="#a78bfa" fontSize="10">• Public valenced Node</text>
              <text x="385" y="125" textAnchor="middle" fill="#a78bfa" fontSize="10">• Holds Faucet Key</text>
              <text x="385" y="145" textAnchor="middle" fill="#a78bfa" fontSize="10">• Acts as Seed Bootstrap</text>

              {/* Arrow 2: Local Node <-> Cloud Node (Outbound Polling & Push) */}
              <line x1="480" y1="95" x2="560" y2="95" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
              <polygon points="480,95 488,91 488,99" fill="#10b981" />
              <polygon points="560,95 552,91 552,99" fill="#10b981" />
              <text x="520" y="85" textAnchor="middle" fill="#34d399" fontSize="10">Outbound Poll</text>
              <text x="520" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">GET /mempool</text>
              <text x="520" y="128" textAnchor="middle" fill="#94a3b8" fontSize="9">POST /chain/sync</text>

              {/* Box 3: Local Node Cluster */}
              <rect x="570" y="30" width="170" height="130" rx="10" fill="#0f0726" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
              <text x="655" y="60" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">3. Local Cluster</text>
              <text x="655" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">Your Computer (:8080/:8081)</text>
              <text x="655" y="105" textAnchor="middle" fill="#34d399" fontSize="10">• Mines blocks (PoW)</text>
              <text x="655" y="125" textAnchor="middle" fill="#34d399" fontSize="10">• Pulls mempool (5s)</text>
              <text x="655" y="145" textAnchor="middle" fill="#34d399" fontSize="10">• Pushes mined blocks</text>
            </svg>
          </div>
        </section>

        {/* ─── 2. Detailed Breakdown: 3 Layers ─── */}
        <div className="space-y-6">
          {/* Layer 1: Website -> Cloud Node */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-violet-400/20 text-violet-300 font-mono text-xs flex items-center justify-center font-bold">1</span>
              How the Website Talks to the Cloud RPC Node
            </h3>
            <div className="space-y-3 text-base text-slate-300 font-light leading-relaxed">
              <p>
                The frontend is a static Next.js web application running in your browser. It uses standard HTTP <code className="text-violet-300">fetch()</code> to connect to the deployed cloud RPC node on Railway (<code className="text-violet-300">https://blockchain-simulator-production.up.railway.app</code>).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#090416] border border-[rgba(139,92,246,0.1)]">
                  <span className="text-xs font-semibold text-white block mb-1">Reading Blockchain Data</span>
                  <span className="text-sm text-slate-400">The website sends <code className="text-violet-300">GET /status</code>, <code className="text-violet-300">GET /chain</code>, and <code className="text-violet-300">GET /mempool</code> to display real-time network activity.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#090416] border border-[rgba(139,92,246,0.1)]">
                  <span className="text-xs font-semibold text-white block mb-1">Sending Transactions</span>
                  <span className="text-sm text-slate-400">The browser wallet signs the transfer locally using its private key (Ed25519) and submits the signed JSON via <code className="text-violet-300">POST /tx/submit</code>.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Layer 2: Local Cluster Communication */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-400/20 text-emerald-300 font-mono text-xs flex items-center justify-center font-bold">2</span>
              How Local Nodes Talk to Each Other (Local Cluster)
            </h3>
            <div className="space-y-3 text-base text-slate-300 font-light leading-relaxed">
              <p>
                When you run <code className="text-violet-300">start-cluster.ps1</code> on your computer, it starts multiple node daemons (e.g. Node A on port 8080, Node B on port 8081, Node C on port 8082).
              </p>
              <p>
                Because they are on the same machine, they connect directly via <code className="text-violet-300">http://localhost:8080</code> and <code className="text-violet-300">http://localhost:8081</code>. When Node A receives or mines something, it sends a direct HTTP POST request (<code className="text-violet-300">POST /tx/gossip</code> or <code className="text-violet-300">POST /block/gossip</code>) to Node B.
              </p>
            </div>
          </section>

          {/* Layer 3: Cloud Node <-> Local Nodes (Outbound HTTP) */}
          <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">3</span>
              How Local Nodes Communicate with the Cloud Node (Why Firewalls Don&apos;t Block It)
            </h3>
            <div className="space-y-3 text-base text-slate-300 font-light leading-relaxed">
              <p>
                Your home Wi-Fi router blocks unsolicited incoming connections from the internet. The cloud node on Railway cannot reach into your computer and call <code className="text-violet-300">POST http://your-home-ip:8080</code>.
              </p>
              <p>
                Instead, our Go code handles this naturally by making <strong>outbound HTTP requests</strong> from the local node to the cloud node:
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 rounded-xl bg-[#090416] border border-[rgba(139,92,246,0.1)] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold text-white block mb-0.5">1. Pulling Transactions (Mempool Polling)</span>
                    <span className="text-slate-400">Every 5 seconds (<code className="text-violet-300">runMempoolSync</code> in <code className="text-violet-300">node_background.go</code>), the local node sends <code className="text-violet-300">GET /mempool</code> to Railway to fetch any transactions submitted by web users.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090416] border border-[rgba(139,92,246,0.1)] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold text-white block mb-0.5">2. Pulling Blocks (Chain Sync)</span>
                    <span className="text-slate-400">Every 30 seconds (<code className="text-violet-300">runSync</code> in <code className="text-violet-300">node_background.go</code>), the local node sends <code className="text-violet-300">GET /chain/height</code> to Railway to check if a new block was discovered.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090416] border border-[rgba(139,92,246,0.1)] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold text-white block mb-0.5">3. Pushing Mined Blocks (Push Sync)</span>
                    <span className="text-slate-400">When your local CPU mines a block with PoW, it sends <code className="text-violet-300">POST /chain/sync</code> out to Railway. Railway verifies the block and updates the live chain.</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 pt-2">
                Because all of these requests are <strong>outbound client requests from your machine</strong>, your home router and firewall allow them automatically without any port forwarding or router setup required.
              </p>
            </div>
          </section>
        </div>

        {/* ─── Footer Action Bar ─── */}
        <div className="p-6 rounded-2xl glass-panel border-[rgba(139,92,246,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Want to explore the Go package details?</h4>
            <p className="text-sm text-slate-400 font-light mt-0.5">
              Read the 12 core cryptographic, state, and consensus subsystems in the Architecture Guide.
            </p>
          </div>
          <Link
            href="/architecture"
            className="px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            Go to Architecture <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
