"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Wallet } from "lucide-react"
import { useTheme } from "next-themes"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/architecture", label: "Architecture" },
  { href: "/explorer", label: "Explorer" },
  { href: "/wallet", label: "Web Wallet" },
  { href: "/docs", label: "Documentation" },
  { href: "https://github.com", label: "GitHub" },
]

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold tracking-tight">Valence</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex md:items-center md:space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-transparent hover:bg-foreground/5 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <div className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
