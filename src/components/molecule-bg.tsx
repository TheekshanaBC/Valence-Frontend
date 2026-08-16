"use client"

import { motion } from "framer-motion"

interface MoleculeBgProps {
  /** Opacity multiplier for the rings (0-1). Defaults to 1 */
  intensity?: number
  /** Whether to render floating particle dots. Defaults to true */
  particles?: boolean
}

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 13.7) % 100}%`,
  top: `${(i * 17.3) % 100}%`,
  size: (i % 3) + 2,
  duration: 4 + (i % 5),
  delay: i * 0.18,
}))

export function MoleculeBg({ intensity = 1, particles = true }: MoleculeBgProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Radial glow wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 70% 50%, rgba(6,182,212,${0.05 * intensity}) 0%, transparent 70%)`,
        }}
      />

      {/* Orbital rings */}
      {[
        { size: 320,  duration: 28, opacity: 0.18, reverse: false },
        { size: 520,  duration: 45, opacity: 0.10, reverse: true  },
        { size: 720,  duration: 65, opacity: 0.07, reverse: false },
      ].map(({ size, duration, opacity, reverse }, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full border border-cyan-400 top-1/2 right-[-10%] -translate-y-1/2"
          style={{
            width: size,
            height: size,
            marginRight: -(size / 2),
            opacity: opacity * intensity,
          }}
          animate={{ rotate: reverse ? -360 : 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {/* Electron dot */}
          <div
            className="absolute -top-[5px] left-1/2 rounded-full -translate-x-1/2 bg-cyan-400"
            style={{
              width: 8 + idx * 2,
              height: 8 + idx * 2,
              filter: `drop-shadow(0 0 6px rgba(6,182,212,0.9))`,
            }}
          />
        </motion.div>
      ))}

      {/* Floating micro-particles */}
      {particles &&
        PARTICLES.map(({ id, left, top, size, duration, delay }) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-cyan-300"
            style={{ left, top, width: size, height: size, willChange: "transform, opacity" }}
            animate={{ y: [0, -20, 0], opacity: [0.08, 0.25, 0.08] }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
    </div>
  )
}
