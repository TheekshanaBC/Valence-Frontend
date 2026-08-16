"use client"

import * as React from "react"
import { ZoomIn, ZoomOut, RotateCcw, Move, Maximize2 } from "lucide-react"

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: unknown) => void
      render: (id: string, text: string) => Promise<{ svg: string }>
    }
  }
}

export function MermaidDiagram({ chart, id }: { chart: string; id: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = React.useState<string>("")
  const [isRendered, setIsRendered] = React.useState<boolean>(false)

  // Pan & Zoom state
  const [scale, setScale] = React.useState<number>(1)
  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Reset viewport when diagram ID changes
  React.useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [id])

  React.useEffect(() => {
    let isMounted = true

    const loadAndRender = async () => {
      if (typeof window === "undefined") return

      if (!window.mermaid) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.getElementById("mermaid-cdn-script") as HTMLScriptElement | null
          if (existingScript) {
            if (window.mermaid) {
              resolve()
            } else {
              existingScript.addEventListener("load", () => resolve())
              existingScript.addEventListener("error", reject)
            }
            return
          }

          const script = document.createElement("script")
          script.id = "mermaid-cdn-script"
          script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
          script.async = true
          script.onload = () => resolve()
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      if (window.mermaid && isMounted) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
          state: { useMaxWidth: false },
          themeVariables: {
            darkMode: true,
            background: "transparent",
            primaryColor: "#140a33",
            primaryTextColor: "#f1f5f9",
            primaryBorderColor: "rgba(139,92,246, 0.6)",
            lineColor: "#a78bfa",
            secondaryColor: "#0f0726",
            tertiaryColor: "#090416",
            fontFamily: "monospace",
            fontSize: "16px",
          },
        })

        try {
          const cleanId = `mermaid-${id.replace(/[^a-zA-Z0-9]/g, "")}-${Math.random().toString(36).substring(2, 8)}`
          const { svg } = await window.mermaid.render(cleanId, chart)
          if (isMounted) {
            setSvgContent(svg)
            setIsRendered(true)
          }
        } catch (err) {
          console.error("Mermaid render error:", err)
        }
      }
    }

    loadAndRender()

    return () => {
      isMounted = false
    }
  }, [chart, id])

  // Mouse wheel zoom (attached via useEffect for non-passive preventDefault)
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85
      setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 3.5))
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [isRendered])

  // Drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Left click only
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  // Drag move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  // Drag end
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.5))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.4))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!isRendered) {
    return (
      <div className="w-full h-56 flex items-center justify-center bg-[#090416]/80 rounded-2xl border border-[rgba(139,92,246,0.12)]">
        <span className="text-xs font-mono text-violet-400/60 animate-pulse">Loading Architecture Flowchart...</span>
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-2xl border border-[rgba(139,92,246,0.2)] bg-[#090416]/95 overflow-hidden shadow-[inset_0_2px_16px_rgba(0,0,0,0.7)] group">
      {/* Floating Canvas Control Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#0f0726]/90 backdrop-blur-md p-1.5 rounded-xl border border-[rgba(139,92,246,0.25)] shadow-lg">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-violet-400/15 transition-all text-xs"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-violet-400/15 transition-all text-xs"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-mono text-violet-300 px-1 select-none">
          {Math.round(scale * 100)}%
        </span>
        <div className="w-px h-4 bg-[rgba(139,92,246,0.2)] mx-0.5" />
        <button
          onClick={handleReset}
          title="Reset Position & Zoom"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-violet-400/15 transition-all text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Hint Pill */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-[#0f0726]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[rgba(139,92,246,0.15)] text-[10px] font-mono text-slate-400 select-none pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
        <Move className="w-3 h-3 text-violet-400" />
        <span>Drag to pan • Scroll to zoom</span>
      </div>

      {/* Interactive Drag & Zoom Viewport Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full min-h-[360px] h-[400px] flex items-center justify-center select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } bg-[radial-gradient(rgba(139,92,246,0.08)_1px,transparent_1px)] [background-size:20px_20px]`}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
          className="flex items-center justify-center pointer-events-none [&_svg]:max-w-none [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  )
}
