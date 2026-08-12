"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Wallet, Search, Activity, Shield, Cpu } from "lucide-react"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-foreground/5 via-background to-background"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
            Valence Network v1.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Next Generation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/70">
              Blockchain Simulator
            </span>
          </h1>
          
          <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
            A high-performance, multi-node educational blockchain featuring a decentralized P2P network, 
            Proof of Work consensus, and a functional Web Wallet.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/wallet" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent w-full sm:w-auto"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Open Web Wallet
            </Link>
            <Link 
              href="/explorer" 
              className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/20 bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground w-full sm:w-auto"
            >
              <Search className="mr-2 h-4 w-4" />
              Explore Blockchain
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank"
              className="inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors hover:bg-foreground/5 w-full sm:w-auto"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-foreground/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Under the Hood</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Valence is designed to demonstrate real-world blockchain mechanics in a controlled, local environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-accent" />}
              title="Proof of Work"
              description="Cryptographic mining process ensuring network security and decentralized consensus."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Activity className="h-10 w-10 text-accent" />}
              title="P2P Gossip Network"
              description="Real-time transaction and block propagation across a multi-node local cluster."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Cpu className="h-10 w-10 text-accent" />}
              title="Ed25519 Signatures"
              description="Fast, secure cryptographic signatures for authenticating wallet transactions."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 border-t border-foreground/10 text-center text-foreground/50 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Valence Blockchain Simulator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-8 rounded-2xl border border-foreground/10 bg-background shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-6 p-4 bg-foreground/5 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
