"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUp, X } from "lucide-react"

interface GameplayStepProps {
  step: {
    title: string
    icon: React.ReactNode
    description: string
  }
  index: number
}

const GameplayStep: React.FC<GameplayStepProps> = ({ step, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
      {/* Icon */}
      <motion.div
        className={`w-full md:w-1/3 flex justify-center`}
        style={{ order: isEven ? 0 : 1 }}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {step.icon}
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="w-full md:w-2/3"
        style={{ order: isEven ? 1 : 0 }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-tight text-white">{step.title}</h3>
        <p className="text-lg md:text-xl text-white/70 font-inter leading-relaxed">{step.description}</p>
      </motion.div>
    </div>
  )
}

export default function NetWorthHomepage() {
  const [scrollY, setScrollY] = useState(0)
  const [heroXP, setHeroXP] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hero XP bar animation
  useEffect(() => {
    const xpTimer = setInterval(() => {
      setHeroXP((prev) => {
        if (prev < 100) return prev + 0.5
        return 0 // Reset and loop
      })
    }, 100)
    return () => clearInterval(xpTimer)
  }, [])

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".dropdown-menu") && !target.closest(".hamburger-button")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const gameplaySteps = [
    {
      title: "Increase Your NetWorth",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="40,20 50,35 40,50 30,35" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="35" y="45" width="10" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M25,25 L55,25 M25,55 L55,55" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
        </svg>
      ),
      description:
        "Grow your worth through our 5 metrics: Vigil, Conviction, Morphos, and Reputation, each unlocking unique strengths and strategies. How you define success is yours to choose.",
    },
    {
      title: "Initiate The Market",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <rect x="10" y="15" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />
          <path d="M15,55 L25,45 L35,50 L45,35 L55,40 L65,25" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="25" cy="45" r="2" fill="currentColor" />
          <circle cx="35" cy="50" r="2" fill="currentColor" />
          <circle cx="45" cy="35" r="2" fill="currentColor" />
          <circle cx="55" cy="40" r="2" fill="currentColor" />
          <rect x="12" y="17" width="8" height="2" fill="currentColor" opacity="0.6" />
          <rect x="12" y="21" width="12" height="1" fill="currentColor" opacity="0.4" />
          <polygon points="65,25 70,20 70,30" fill="currentColor" />
        </svg>
      ),
      description:
        "Every position declares intent. Every execution reveals character. The market responds only to those who command respect.",
    },
    {
      title: "Evolve Your Edge",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <polygon points="40,10 55,25 55,40 40,55 25,40 25,25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="40,18 47,25 47,32 40,39 33,32 33,25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="40" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M35,30 L45,30 L42,35 L48,35 L38,45 L41,40 L35,40 Z" fill="currentColor" opacity="0.8" />
          <rect x="20" y="20" width="4" height="4" fill="currentColor" opacity="0.5" />
          <rect x="56" y="20" width="4" height="4" fill="currentColor" opacity="0.5" />
          <rect x="20" y="56" width="4" height="4" fill="currentColor" opacity="0.5" />
          <rect x="56" y="56" width="4" height="4" fill="currentColor" opacity="0.5" />
        </svg>
      ),
      description:
        "Capability compounds through pressure. Each successful trade unlocks deeper market intelligence and sharper analytical weapons.",
    },
    {
      title: "Prove Your Dominance",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <circle cx="25" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="55" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="25" cy="55" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="55" cy="55" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M33,25 L47,25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M25,33 L25,47" stroke="currentColor" strokeWidth="1.5" />
          <path d="M33,55 L47,55" stroke="currentColor" strokeWidth="1.5" />
          <path d="M55,33 L55,47" stroke="currentColor" strokeWidth="1.5" />
          <path d="M33,33 L47,47" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <path d="M47,33 L33,47" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.8" />
          <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.9" />
          <circle cx="55" cy="25" r="3" fill="currentColor" opacity="0.9" />
          <circle cx="25" cy="55" r="3" fill="currentColor" opacity="0.9" />
          <circle cx="55" cy="55" r="3" fill="currentColor" opacity="0.9" />
        </svg>
      ),
      description:
        "Strategic synthesis separates the elite from the ordinary. Master the art of combining insights into unstoppable market advantage.",
    },
    {
      title: "Ascend To Legend",
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <polygon
            points="40,10 60,30 50,40 60,50 40,70 20,50 30,40 20,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="40,20 50,30 45,35 50,40 40,50 30,40 35,35 30,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
          <path d="M30,30 L50,50 M50,30 L30,50" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="15,15 25,15 20,25" fill="currentColor" opacity="0.7" />
          <polygon points="55,15 65,15 60,25" fill="currentColor" opacity="0.7" />
          <polygon points="15,55 25,65 15,65" fill="currentColor" opacity="0.7" />
          <polygon points="55,65 65,65 65,55" fill="currentColor" opacity="0.7" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
        </svg>
      ),
      description:
        "The arena awaits those who have proven their worth. Here, legends are forged through direct competition against the market's finest minds.",
    },
  ]

  const navLinks = [
    { name: "About Us", href: "#" },
    { name: "Core Gameplay", href: "#" },
    { name: "Educational Value", href: "#" },
    { name: "Login", href: "#" },
  ]

  // Animation variants for staggered children
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  }

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-medium tracking-tight">NETWORTH</div>

          {/* Hamburger Menu Button */}
          <div className="relative">
            <button
              className="hamburger-button p-2 text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="text-2xl">☰</span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={dropdownRef}
                  className="dropdown-menu absolute top-full right-0 mt-4 w-screen max-w-xs bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-6 z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Close Button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1 text-white/60 hover:text-white transition-colors duration-200"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-4">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="block text-lg font-inter text-white/80 uppercase tracking-wide hover:text-blue-400 transition-colors duration-300 py-2"
                        variants={linkVariants}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Section 1: Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Background with Parallax */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-900"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Abstract Financial Data Flow */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {/* Subtle Data Streams */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              style={{
                top: `${20 + i * 8}%`,
                width: "120%",
                left: "-10%",
              }}
              animate={{
                x: ["-20%", "20%"],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 15 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 2,
                ease: "linear",
              }}
            />
          ))}

          {/* Floating Data Points */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Ambient XP Light Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-900">
          <motion.div className="h-full bg-blue-500/40 relative overflow-hidden" style={{ width: `${heroXP}%` }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Primary Headline */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            Your net worth isn't just capital.
            <br />
            It's capability.
          </motion.h1>

          {/* Emotional Subheadline */}
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-6 text-white/60 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            This isn't trading. It's your transformation.
          </motion.p>

          {/* Supporting Copy */}
          <motion.p
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          >
            Earn it. Level it. Show it. Welcome to the new market.
          </motion.p>

          {/* Refined CTA Buttons */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-12 py-6 md:px-16 md:py-8 text-lg md:text-xl font-medium tracking-tight shadow-lg transition-all duration-300 border-0"
            >
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              Start Your Ascent
            </Button>
          </motion.div>

          {/* Ambient Progress Indicator */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7, ease: "easeOut" }}
          >
            <div className="text-sm text-white/30 mb-3 tracking-wide uppercase">Capability Level</div>
            <div className="flex items-center justify-center space-x-3 text-white/50">
              <div className="w-1 h-1 bg-blue-400/40 rounded-full"></div>
              <div className="text-xs tracking-wider font-mono">
                {Math.floor(heroXP / 10) + 1} • {Math.floor(heroXP)}% EVOLVED
              </div>
              <div className="w-1 h-1 bg-blue-400/40 rounded-full"></div>
            </div>
          </motion.div>

          {/* Optional Audio Toggle */}
          <motion.div
            className="absolute bottom-12 right-12 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
          >
            <Button variant="ghost" size="sm" className="text-white/30 hover:text-white/60 text-sm tracking-wide">
              🔊 Activate Audio
            </Button>
          </motion.div>
        </div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center">
            <motion.div
              className="w-0.5 h-2 bg-white/30 rounded-full mt-2"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Section 2: Join Waitlist */}
      <section className="pt-[15vh] pb-[15vh] bg-neutral-950 relative">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waitlist-grid" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waitlist-grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-8 leading-tight">
              Fortune favors the diligent. Are you ready to increase your NetWorth?
            </h2>

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-black border border-neutral-700 text-white placeholder-white/50 focus:border-white/30 focus:outline-none transition-colors duration-300 text-lg rounded-lg"
              />
              <Button
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-100 py-4 text-lg font-medium tracking-tight transition-all duration-300"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Your Worth is Your Weapon */}
      <section className="pt-[20vh] pb-[20vh] bg-black relative">
        {/* Minimal Grid Background */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rpg-grid" patternUnits="userSpaceOnUse" width="50" height="50">
                <path d="M0,0 L50,0 L50,50 L0,50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rpg-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
              Your Worth is Your Weapon.
            </h2>
          </motion.div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Card 1: BATTLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-neutral-800 hover:border-neutral-600 transition-all duration-300 p-10 text-center relative overflow-hidden hover:shadow-2xl hover:shadow-white/5">
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="mb-8">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-white mx-auto">
                    {/* Crossed Swords Arena Icon */}
                    <path d="M20,20 L35,35 M45,35 L60,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M20,60 L35,45 M45,45 L60,60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="40" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M32,40 L48,40 M40,32 L40,48" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="15" y="15" width="10" height="4" fill="currentColor" opacity="0.8" />
                    <rect x="55" y="15" width="10" height="4" fill="currentColor" opacity="0.8" />
                    <rect x="15" y="61" width="10" height="4" fill="currentColor" opacity="0.8" />
                    <rect x="55" y="61" width="10" height="4" fill="currentColor" opacity="0.8" />
                    <polygon points="40,25 45,30 40,35 35,30" fill="currentColor" opacity="0.6" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium tracking-wider text-white mb-6 uppercase">BATTLE</h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-lg">
                  Engage in high-stakes tactical challenges that test your foresight and adaptability. Every decision is
                  a clash of wills, where only the sharpest minds prevail.
                </p>
              </div>
            </motion.div>

            {/* Card 2: BECOME */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-neutral-800 hover:border-neutral-600 transition-all duration-300 p-10 text-center relative overflow-hidden hover:shadow-2xl hover:shadow-white/5">
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="mb-8">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-white mx-auto">
                    {/* Mythical Crest Icon */}
                    <polygon
                      points="40,10 55,25 50,40 40,50 30,40 25,25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <polygon points="40,18 47,28 44,38 40,42 36,38 33,28" fill="currentColor" opacity="0.3" />
                    <circle cx="40" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M40,26 L40,38 M34,32 L46,32" stroke="currentColor" strokeWidth="1" />
                    <path d="M25,55 Q40,45 55,55 Q40,65 25,55" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="30" cy="58" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="40" cy="55" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="50" cy="58" r="2" fill="currentColor" opacity="0.8" />
                    <path d="M35,70 L40,65 L45,70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium tracking-wider text-white mb-6 uppercase">BECOME</h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-lg">
                  Your choices carve your identity. Your performance becomes your soulprint—a public testament to your
                  journey and a visible measure of your will.
                </p>
              </div>
            </motion.div>

            {/* Card 3: BUILD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-neutral-800 hover:border-neutral-600 transition-all duration-300 p-10 text-center relative overflow-hidden hover:shadow-2xl hover:shadow-white/5">
                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="mb-8">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-white mx-auto">
                    {/* AI Brain Network Icon */}
                    <circle cx="40" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="25" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="55" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="40" cy="65" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M35,30 L30,45" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M45,30 L50,45" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M31,55 L35,60" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M49,55 L45,60" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M31,50 L49,50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                    <circle cx="40" cy="25" r="3" fill="currentColor" opacity="0.8" />
                    <circle cx="25" cy="50" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="55" cy="50" r="2" fill="currentColor" opacity="0.8" />
                    <circle cx="40" cy="65" r="2" fill="currentColor" opacity="0.8" />
                    <path d="M40,15 L42,12 L40,9 L38,12 Z" fill="currentColor" opacity="0.6" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium tracking-wider text-white mb-6 uppercase">BUILD</h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-lg">
                  Construct your unique path to mastery. Wield powerful artifacts, assemble a custom arsenal of
                  abilities, and build a lasting legacy that the world will recognize.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Comparison Table */}
      <section className="pt-[20vh] pb-[20vh] bg-neutral-950 relative">
        {/* Minimal Grid Background */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="comparison-grid" patternUnits="userSpaceOnUse" width="50" height="50">
                <path d="M0,0 L50,0 L50,50 L0,50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#comparison-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Three Column Comparison Table */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Traditional Finance Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-neutral-800 bg-neutral-950/50 p-8 text-center relative overflow-hidden h-full">
                {/* Header */}
                <div className="mb-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <svg width="60" height="60" viewBox="0 0 60 60" className="text-red-400/60 mx-auto">
                      {/* Book Icon */}
                      <rect
                        x="15"
                        y="10"
                        width="30"
                        height="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        rx="2"
                      />
                      <path
                        d="M15,20 L45,20 M15,25 L45,25 M15,30 L45,30 M15,35 L40,35"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <circle cx="30" cy="42" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-white/80 mb-6">
                    Traditional Finance Learning
                  </h3>
                </div>

                {/* Content List */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Static curriculum</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Passive memorization</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">No real-time feedback</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Theory without practice</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">One-size-fits-all approach</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Gamified Stock Apps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-neutral-800 bg-neutral-950/50 p-8 text-center relative overflow-hidden h-full">
                {/* Header */}
                <div className="mb-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <svg width="60" height="60" viewBox="0 0 60 60" className="text-yellow-400/60 mx-auto">
                      {/* Simple Chart/Badge Icon */}
                      <rect
                        x="10"
                        y="15"
                        width="40"
                        height="30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        rx="3"
                      />
                      <path
                        d="M15,35 L20,30 L25,32 L30,25 L35,28 L40,20 L45,25"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.6" />
                      <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.6" />
                      <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.6" />
                      <rect x="12" y="47" width="8" height="2" fill="currentColor" opacity="0.4" />
                      <rect x="22" y="47" width="6" height="2" fill="currentColor" opacity="0.4" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-white/80 mb-6">Gamified Stock Apps</h3>
                </div>

                {/* Content List */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Superficial mechanics</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">No true skill transfer</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Lacks strategic depth</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Shallow reward systems</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400/40 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/60 leading-relaxed">Entertainment over education</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Column 3: NetWorth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="border border-blue-400/30 bg-gradient-to-b from-blue-950/20 to-neutral-950/50 p-8 text-center relative overflow-hidden h-full">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/[0.02] to-transparent opacity-100 pointer-events-none" />

                {/* Header */}
                <div className="mb-8 relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <motion.svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      className="text-blue-400 mx-auto"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Glowing Crest/Skill Tree Icon */}
                      <g transform="translate(30,30)">
                        {/* Central node */}
                        <motion.circle
                          cx="0"
                          cy="0"
                          r="6"
                          fill="currentColor"
                          opacity="0.8"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Branching connections */}
                        <path
                          d="M0,-6 L-12,-18 M0,-6 L0,-18 M0,-6 L12,-18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                        <path d="M0,6 L-12,18 M0,6 L12,18" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                        <path d="M-6,0 L-18,-6 M6,0 L18,-6" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

                        {/* Outer nodes */}
                        <motion.circle
                          cx="-12"
                          cy="-18"
                          r="3"
                          fill="currentColor"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3, ease: "easeInOut" }}
                        />
                        <motion.circle
                          cx="0"
                          cy="-18"
                          r="3"
                          fill="currentColor"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6, ease: "easeInOut" }}
                        />
                        <motion.circle
                          cx="12"
                          cy="-18"
                          r="3"
                          fill="currentColor"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.9, ease: "easeInOut" }}
                        />
                        <motion.circle
                          cx="-12"
                          cy="18"
                          r="3"
                          fill="currentColor"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.2, ease: "easeInOut" }}
                        />
                        <motion.circle
                          cx="12"
                          cy="18"
                          r="3"
                          fill="currentColor"
                          opacity="0.7"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5, ease: "easeInOut" }}
                        />

                        {/* Outer glow ring */}
                        <motion.circle
                          cx="0"
                          cy="0"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          opacity="0.2"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      </g>
                    </motion.svg>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-white mb-6">NetWorth</h3>
                </div>

                {/* Content List */}
                <div className="space-y-4 text-left relative z-10">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 leading-relaxed font-medium">Real-Time Skill Transfer</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 leading-relaxed font-medium">Evolving Trait System</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 leading-relaxed font-medium">The Olympus AI Ecosystem</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 leading-relaxed font-medium">Adaptive Intelligence Engine</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/80 leading-relaxed font-medium">Mythic Progression System</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Supporting Quote */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-light italic text-white/70 tracking-tight max-w-4xl mx-auto leading-relaxed">
              "This isn't edutainment. It's a training ground for the future elite."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: The Sentient Infrastructure */}
      <section className="pt-[20vh] pb-[20vh] bg-neutral-950 relative">
        {/* Minimal Grid Background */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ai-grid" patternUnits="userSpaceOnUse" width="60" height="60">
                <path d="M0,0 L60,0 L60,60 L0,60 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ai-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
              The Sentient Engine
            </h2>
            <p className="text-xl md:text-2xl text-white/60 tracking-tight max-w-4xl mx-auto">
              The Olympus Ecosystem continuously adopts and evolves based on your unique resonance and decisions.
            </p>
          </motion.div>

          {/* Four Column Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Oracle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              {/* Animated Icon */}
              <div className="mb-8">
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="text-white mx-auto"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Brain outline */}
                  <path
                    d="M25,35 Q20,25 30,20 Q40,15 50,20 Q60,25 55,35 Q60,45 50,50 Q45,55 40,50 Q35,55 30,50 Q20,45 25,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  {/* Brain divisions */}
                  <motion.path
                    d="M40,20 Q40,30 40,50"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.6"
                    animate={{
                      pathLength: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Neural connections */}
                  <motion.path
                    d="M30,30 Q35,25 40,30 Q45,25 50,30"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M30,40 Q35,35 40,40 Q45,35 50,40"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                    animate={{
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Synapses */}
                  <motion.circle
                    cx="32"
                    cy="28"
                    r="2"
                    fill="currentColor"
                    opacity="0.8"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    cx="48"
                    cy="32"
                    r="2"
                    fill="currentColor"
                    opacity="0.8"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.circle
                    cx="35"
                    cy="42"
                    r="2"
                    fill="currentColor"
                    opacity="0.8"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </div>

              {/* Agent Name */}
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Oracle</h3>

              {/* Role Description */}
              <p className="text-white/70 leading-relaxed text-lg">
                The Mind. The infinite curriculum engine, providing lessons drawn from all eras and minds in the moment
                you need them.
              </p>
            </motion.div>

            {/* Column 2: Insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              {/* Animated Icon */}
              <div className="mb-8">
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="text-white mx-auto"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Outer circle (profile border) */}
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{
                      strokeDasharray: ["0 157", "78.5 78.5", "0 157"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Head (upper circle) */}
                  <motion.circle
                    cx="40"
                    cy="30"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Body/shoulders (arc at bottom) */}
                  <motion.path
                    d="M20,55 Q40,45 60,55"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: [0.5, 1, 0.5],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner glow effect */}
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.3"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </div>

              {/* Agent Name */}
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Insight</h3>

              {/* Role Description */}
              <p className="text-white/70 leading-relaxed text-lg">
                The Self. Your co-evolving intelligence and companion that mirrors your decisions, tracks your tilt, and
                learns your unique risk DNA.
              </p>
            </motion.div>

            {/* Column 3: Virgo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              {/* Animated Icon */}
              <div className="mb-8">
                <motion.svg width="80" height="80" viewBox="0 0 80 80" className="text-white mx-auto">
                  {/* World Icon */}
                  <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <motion.path
                    d="M15,40 Q25,25 40,40 Q55,25 65,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.6"
                    animate={{
                      pathLength: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M15,40 Q25,55 40,40 Q55,55 65,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.6"
                    animate={{
                      pathLength: [1, 0, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.8" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.3"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </div>

              {/* Agent Name */}
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Virgo</h3>

              {/* Role Description */}
              <p className="text-white/70 leading-relaxed text-lg">
                The World. The sculptor that generates dynamic economic events, narrative arcs, and mythic calamities to
                train your instincts.
              </p>
            </motion.div>

            {/* Column 4: Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              {/* Animated Icon */}
              <div className="mb-8">
                <motion.svg width="80" height="80" viewBox="0 0 80 80" className="text-white mx-auto">
                  {/* Scales Icon */}
                  <path d="M40,20 L40,60" stroke="currentColor" strokeWidth="2" />
                  <path d="M25,35 L55,35" stroke="currentColor" strokeWidth="2" />

                  {/* Left scale pan - moves up and down */}
                  <motion.path
                    d="M25,35 Q20,45 25,50 Q30,45 25,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{
                      y: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Right scale pan - moves opposite to left */}
                  <motion.path
                    d="M55,35 Q50,45 55,50 Q60,45 55,35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{
                      y: [2, -2, 2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Central fulcrum with subtle pulse */}
                  <motion.circle
                    cx="40"
                    cy="35"
                    r="3"
                    fill="currentColor"
                    opacity="0.8"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Base */}
                  <rect x="35" y="60" width="10" height="5" fill="currentColor" opacity="0.6" />

                  {/* Top indicator with gentle glow */}
                  <motion.circle
                    cx="40"
                    cy="15"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Connecting arms that subtly rotate with the balance */}
                  <motion.path
                    d="M25,35 L40,35"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{
                      rotateZ: [1, -1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "40px 35px" }}
                  />

                  <motion.path
                    d="M40,35 L55,35"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{
                      rotateZ: [-1, 1, -1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "40px 35px" }}
                  />
                </motion.svg>
              </div>

              {/* Agent Name */}
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Logos</h3>

              {/* Role Description */}
              <p className="text-white/70 leading-relaxed text-lg">
                The Laws. The guardian of fairness and economic memory, governing rewards, ensuring zero pay-to-win, and
                auditing every outcome for mythic balance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: The Path to Mastery */}
      <section className="pt-[20vh] pb-[20vh] bg-black relative">
        {/* Minimal Grid Background */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mastery-grid" patternUnits="userSpaceOnUse" width="80" height="80">
                <path d="M0,0 L80,0 L80,80 L0,80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="1" fill="currentColor" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mastery-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
              The Path to Mastery
            </h2>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left Column: The 9 Traits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Subtle accent border */}
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent" />

              <div className="pl-8">
                {/* Icon */}
                <div className="mb-8">
                  <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    className="text-white"
                    animate={{
                      rotateZ: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    {/* Nine-pointed star representing the 9 traits */}
                    <g transform="translate(40,40)">
                      {[...Array(9)].map((_, i) => (
                        <motion.g
                          key={i}
                          transform={`rotate(${i * 40})`}
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                        >
                          <path d="M0,-25 L3,-8 L0,-5 L-3,-8 Z" fill="currentColor" opacity="0.8" />
                          <circle cx="0" cy="-20" r="2" fill="currentColor" />
                        </motion.g>
                      ))}
                      <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="3" fill="currentColor" opacity="0.9" />
                    </g>
                  </motion.svg>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">
                  Discover Your Identity: The 9 Traits
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
                  Your decisions sculpt nine core behavioral traits that define your market persona. Develop{" "}
                  <span className="text-white/90 font-medium">Volatility Acumen</span> to thrive in chaos,{" "}
                  <span className="text-white/90 font-medium">Convex Strategy</span> to amplify asymmetric gains, and{" "}
                  <span className="text-white/90 font-medium">Psychic Fortitude</span> to maintain clarity under
                  pressure.
                </p>

                <p className="text-lg text-white/60 leading-relaxed mb-10">
                  Each trait evolves through authentic gameplay, creating a unique psychological profile that influences
                  your capabilities, unlocks specialized content, and shapes how the world responds to your presence.
                </p>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="bg-transparent border border-white/30 text-white hover:bg-white/5 hover:border-white/50 px-8 py-4 text-lg font-medium tracking-tight transition-all duration-300"
                >
                  View All Traits
                </Button>
              </div>
            </motion.div>

            {/* Right Column: Chrysoplos Relics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Subtle accent border */}
              <div className="absolute -right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />

              <div className="pr-8">
                {/* Icon */}
                <div className="mb-8">
                  <motion.svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
                    {/* Mythic weapon/relic icon */}
                    <g transform="translate(40,40)">
                      {/* Central crystal */}
                      <motion.polygon
                        points="0,-20 12,-8 8,8 -8,8 -12,-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Inner energy core */}
                      <motion.polygon
                        points="0,-12 6,-4 4,4 -4,4 -6,-4"
                        fill="currentColor"
                        opacity="0.3"
                        animate={{
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Orbiting elements representing fusion/customization */}
                      {[...Array(4)].map((_, i) => (
                        <motion.g
                          key={i}
                          animate={{
                            rotateZ: [0, 360],
                          }}
                          transition={{
                            duration: 8 + i * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <circle cx={20 + i * 2} cy="0" r="2" fill="currentColor" opacity="0.6" />
                          <motion.circle
                            cx={20 + i * 2}
                            cy="0"
                            r="4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            opacity="0.3"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.5,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.g>
                      ))}

                      {/* Base/handle */}
                      <rect x="-2" y="8" width="4" height="12" fill="currentColor" opacity="0.7" />
                      <rect x="-4" y="18" width="8" height="3" fill="currentColor" opacity="0.8" />
                    </g>
                  </motion.svg>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">
                  Forge Your Weapons: Chrysoplos
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
                  Chrysoplos are mythic artifacts that amplify your market prowess. These stat-modifying relics can be{" "}
                  <span className="text-white/90 font-medium">fused</span> for exponential power,{" "}
                  <span className="text-white/90 font-medium">ranked up</span> through legendary trials, and{" "}
                  <span className="text-white/90 font-medium">embedded</span> with Apostae—specialized abilities that
                  bend market physics.
                </p>

                <p className="text-lg text-white/60 leading-relaxed mb-10">
                  From the Typhon Spark to the Gravity Halo, each Chrysoplos artifact empowers distinct trading
                  strategies through integrated abilities known as Apostae. Progress through tiers and technify your
                  Chrysoplos to amplify your influence over volatility, time, and market dynamics—transcending
                  conventional trading limits to redefine financial mastery.
                </p>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-400/40 text-amber-100 hover:from-amber-600/30 hover:to-orange-600/30 hover:border-amber-400/60 px-8 py-4 text-lg font-medium tracking-tight transition-all duration-300 backdrop-blur-sm"
                >
                  Explore the Arsenal
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Gameplay Scroll */}
      <section className="pt-[25vh] pb-[25vh] bg-black relative">
        {/* Minimal Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-center mb-32 tracking-tight"
          >
            Forge your destiny
          </motion.h2>
          <div className="space-y-40">
            {gameplaySteps.map((step, index) => {
              return <GameplayStep key={index} index={index} step={step} />
            })}
          </div>
        </div>
      </section>

      {/* Section 8: Breather Section: Cinematic Pause */}
      <section className="pt-[25vh] pb-[25vh] bg-neutral-950 overflow-hidden">
        {/* Subtle texture layer */}
        <div className="absolute inset-0 opacity-[0.03]">
          {/* Scanlines */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="absolute h-px w-full bg-white/10" style={{ top: `${i * 2}%` }} />
            ))}
          </div>
        </div>

        {/* Ambient horizontal element */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-px w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ top: "50%" }}
            animate={{
              x: ["-100%", "0%"],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Soft upward particle drift */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white/40 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Every choice is recorded. The market remembers.
          </motion.h2>
        </div>
      </section>

      {/* Section 9: From the Founder */}
      <section className="relative pt-[20vh] pb-[20vh] bg-neutral-950 overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 opacity-[0.01]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="founder-grid" patternUnits="userSpaceOnUse" width="60" height="60">
                <path d="M0,0 L60,0 L60,60 L0,60 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#founder-grid)" />
          </svg>
        </div>

        {/* Minimal horizontal accent */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-px w-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ top: "50%" }}
            animate={{
              x: ["-50%", "50%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Section Title */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-white/40 uppercase tracking-wide">Founder's Note</p>
            </motion.div>

            {/* First Quote Block */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <blockquote className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight mb-8">
                <span className="text-white/40 font-semibold">"</span>I grew up inside the games that shaped a
                generation — Starcraft, League of Legends, Dark Souls, FIFA. I didn't just play them — I dissected them.
                I studied their meta, their mechanics, and what made them timeless.
              </blockquote>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight mb-8">
                NetWorth is the evolution of that obsession — turning capital into a battleground, learning into a game,
                and ambition into an identity system.
              </p>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight">
                Gamification only works when it's built by a player. I've been one my whole life.
                <span className="text-white/40 font-semibold">"</span>
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-16 h-px bg-white/20 mx-auto mb-16"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            {/* Second Quote Block */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <blockquote className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight mb-8">
                <span className="text-white/40 font-semibold">"</span>
                What I learned from years inside competitive systems is that mastery requires feedback, friction, and
                freedom.
              </blockquote>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight mb-8">
                NetWorth is designed from that DNA. Not as a fintech app. Not as a game. But as a self-evolving arena
                where intelligence, strategy, and identity collide.
              </p>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed tracking-tight">
                I'm not here to wrap a lesson in a game. I'm here to build a world where ambition is the game.
                <span className="text-white/40 font-semibold">"</span>
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-base text-white/50 tracking-tight">— Luis, Creator of NetWorth</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 10: Final CTA - High-Stakes Trailer */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Full-width gradient fog background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

        {/* Horizontal ambient glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main Quote */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-white leading-[0.9]">
              Build your NetWorth.
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/60 tracking-tight leading-relaxed">
              You vs the market. You vs them. You vs who you were.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-16 py-8 text-xl font-medium tracking-tight shadow-lg transition-all duration-300 border-0"
            >
              Start Building
            </Button>

            <Button
              size="lg"
              className="bg-transparent border border-white/20 text-white/80 hover:bg-white/5 hover:text-white px-16 py-8 text-xl font-medium tracking-tight backdrop-blur-sm transition-all duration-300"
            >
              Claim Your Edge
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Join the Mythos */}
      <footer className="bg-neutral-950 border-t border-neutral-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {/* Column 1: Company Info */}
            <motion.div
              className="md:col-span-1 lg:pr-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-8 leading-tight">
                NETWORTH
              </h3>
              <p className="text-lg text-white/70">Building the future of competitive finance.</p>
            </motion.div>

            {/* Column 2: Navigation Links */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <a
                  href="#"
                  className="block text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  Core Gameplay
                </a>
                <a
                  href="#"
                  className="block text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  Educational Value
                </a>
                <a
                  href="#"
                  className="block text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  Careers
                </a>
              </div>
            </motion.div>

            {/* Column 3: Social Links */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {/* Discord */}
                <a
                  href="#"
                  className="flex items-center space-x-3 text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight group"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Discord</span>
                </a>

                {/* X (Twitter) */}
                <a
                  href="#"
                  className="flex items-center space-x-3 text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight group"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>X (Twitter)</span>
                </a>

                {/* Investor Relations */}
                <a
                  href="#"
                  className="block text-lg text-white/70 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  Investor Relations
                </a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center pt-8 border-t border-neutral-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-white/40 text-sm tracking-wide">© 2025 NETWORTH. ALL RIGHTS RESERVED.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
