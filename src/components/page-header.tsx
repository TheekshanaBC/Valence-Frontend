"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MoleculeBg } from "@/components/molecule-bg"

interface PageHeaderProps {
  label?: string          // small eyebrow label
  title: string
  titleAccent?: string    // highlighted portion appended after title
  subtitle?: string
  breadcrumb?: { href: string; label: string }[]
  children?: React.ReactNode
}

export function PageHeader({
  label,
  title,
  titleAccent,
  subtitle,
  breadcrumb,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative w-full pt-20 pb-16 px-4 overflow-hidden border-b border-[rgba(6,182,212,0.1)]">
      <MoleculeBg intensity={0.5} particles={false} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-slate-500 font-mono tracking-wide mb-6">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-cyan-400 transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow label */}
        {label && (
          <div className="flex items-center gap-2 mb-4">
            <span className="status-dot" />
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400/80 uppercase">{label}</span>
          </div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4"
        >
          {title}
          {titleAccent && (
            <span className="text-cyan-400"> {titleAccent}</span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Slot for extra content (buttons, etc) */}
        {children && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
