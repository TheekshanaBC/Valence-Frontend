import Link from "next/link"
import Image from "next/image"
import { ExternalLink, GitBranch } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[rgba(139,92,246,0.1)] bg-[#090416]/80 backdrop-blur-sm mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image 
                src="/logo.png" 
                alt="Valence" 
                width={220} 
                height={48} 
                className="h-12 w-auto object-contain" 
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              An educational, high-performance blockchain simulator built for inspecting and experimenting with decentralized systems.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-light">
              <li>
                <Link href="/explorer" className="hover:text-violet-400 transition-colors">Blockchain Explorer</Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-violet-400 transition-colors">Web Wallet</Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-violet-400 transition-colors">Network Monitor</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-light">
              <li>
                <Link href="/about" className="hover:text-violet-400 transition-colors">About Valence</Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-violet-400 transition-colors">Architecture Guide</Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-violet-400 transition-colors">Documentation</Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-400 font-light">
              <li>
                <a 
                  href="https://github.com/TheekshanaBC/Blockchain-Simulator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-violet-400 transition-colors group"
                >
                  <GitBranch className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-light">
            &copy; {new Date().getFullYear()} Valence Simulator. Open Source Educational Software.
          </p>
          <div className="flex gap-4 text-xs font-light text-slate-500">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
