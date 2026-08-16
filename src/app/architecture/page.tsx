"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Search,
  ChevronRight,
  FileCode2,
  CheckCircle2,
  BookOpen,
  Network,
  Globe2,
  Layers,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MoleculeBg } from "@/components/molecule-bg"
import { MermaidDiagram } from "@/components/mermaid-diagram"
import { ARCH_MODULES } from "@/lib/architecture-data"

const CATEGORIES = ["All", "Primitives", "Consensus & State", "Network & P2P", "Orchestration"] as const
type Category = (typeof CATEGORIES)[number]

export default function ArchitecturePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeModuleId, setActiveModuleId] = React.useState<string>(ARCH_MODULES[0].id)

  const filteredModules = React.useMemo(() => {
    return ARCH_MODULES.filter((m) => {
      const matchesCategory = selectedCategory === "All" || m.category === selectedCategory
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.goPackage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const activeModule = React.useMemo(() => {
    return ARCH_MODULES.find((m) => m.id === activeModuleId) || ARCH_MODULES[0]
  }, [activeModuleId])

  return (
    <div className="min-h-screen pb-24">
      <PageHeader
        title="Blockchain"
        titleAccent="Architecture"
        subtitle="Explore the 12 core cryptographic, consensus, and networking subsystems of the Valence blockchain."
        breadcrumb={[{ href: "/architecture", label: "Architecture" }]}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <MoleculeBg intensity={0.25} particles={false} />

        {/* ─── Category Filter & Search Bar ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-violet-500 text-slate-950 font-semibold"
                    : "glass-panel text-slate-400 hover:text-white hover:border-violet-400/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search architecture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090416] border border-[rgba(139,92,246,0.18)] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 transition-colors"
            />
          </div>
        </div>

        {/* ─── Main Two-Column View ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Compact Slim Module Navigation Rail (25% width) */}
          <div className="lg:col-span-3 flex flex-col gap-1.5 max-h-[840px] overflow-y-auto pr-1">
            {filteredModules.map((mod) => {
              const isSelected = mod.id === activeModuleId
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all border flex items-center justify-between group ${
                    isSelected
                      ? "glass-panel bg-violet-500/10 border-violet-400/60"
                      : "glass-panel border-[rgba(139,92,246,0.08)] hover:border-violet-400/30 hover:bg-violet-500/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 ${
                        isSelected
                          ? "bg-violet-400 text-slate-950 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                          : "bg-[#090416] text-violet-400/80 border border-violet-400/20"
                      }`}
                    >
                      {mod.number}
                    </span>
                    <div className="truncate">
                      <span className={`text-[11px] font-semibold block truncate ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {mod.title}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">{mod.category}</span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 flex-shrink-0 transition-transform ${
                      isSelected ? "text-violet-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Right: Expanded Main Reading View with Mermaid Diagram (75% width) */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-6 sm:p-8 border-[rgba(139,92,246,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-6"
              >
                {/* 1. Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[rgba(139,92,246,0.1)]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-400/15 text-violet-300 border border-violet-400/30">
                        MODULE {activeModule.number}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{activeModule.category}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{activeModule.title}</h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400/80 bg-[#090416] px-3 py-1.5 rounded-lg border border-[rgba(139,92,246,0.15)] self-start">
                    <FileCode2 className="w-3.5 h-3.5" /> {activeModule.goPackage}
                  </span>
                </div>

                {/* 2. Narrative Description */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Subsystem Overview</span>
                  </div>
                  {activeModule.description.map((paragraph, idx) => (
                    <p key={idx} className="text-base text-slate-300 font-light leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 3. Architectural Flow Diagram (Mermaid with Pan & Zoom) */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-400">
                    <Network className="w-3.5 h-3.5" />
                    <span>Architectural Flow & Topology Diagram</span>
                  </div>
                  <MermaidDiagram chart={activeModule.mermaidDiagram} id={activeModule.id} />
                </div>

                {/* 4. Key Architectural Highlights */}
                <div className="space-y-2.5 bg-[#090416]/60 p-4 rounded-xl border border-[rgba(139,92,246,0.08)]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Key Highlights & Guarantees</h4>
                  {activeModule.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-300 font-light leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>

                {/* 5. Security & Integrity Note */}
                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-400/20 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white tracking-wide font-mono uppercase">
                      {activeModule.securityNote.title}
                    </h5>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mt-1">
                      {activeModule.securityNote.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
