"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ExternalLink } from "lucide-react"

const navLinks = [
  { href: "/about",        label: "About" },
  { href: "/architecture", label: "Architecture" },
  { href: "/explorer",     label: "Explorer" },
  { href: "/docs",         label: "Docs" },
  { href: "https://github.com/TheekshanaBC/Valence-Frontend", label: "GitHub", external: true },
]

function ValenceLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Animated nucleus dot */}
      <span className="relative flex items-center justify-center w-6 h-6">
        <span className="absolute w-full h-full rounded-full border border-cyan-400/40 animate-ping opacity-30" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-white">Val</span>
        <span className="text-cyan-400">ence</span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#03090e]/90 backdrop-blur-md border-b border-[rgba(6,182,212,0.12)] shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex h-16 items-center justify-between">
        <ValenceLogo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {link.label}
              {link.external && <ExternalLink className="w-3 h-3 opacity-50" />}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/wallet"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-semibold tracking-wide transition-all shadow-[0_0_16px_rgba(6,182,212,0.3)] hover:shadow-[0_0_24px_rgba(6,182,212,0.5)]"
          >
            Web Wallet
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[rgba(6,182,212,0.2)] text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[rgba(6,182,212,0.1)] bg-[#03090e]/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-cyan-400 bg-cyan-400/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3.5 h-3.5 opacity-40" />}
                </Link>
              ))}
              <Link
                href="/wallet"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-semibold transition-all"
              >
                Web Wallet
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
