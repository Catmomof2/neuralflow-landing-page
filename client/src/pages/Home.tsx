import React, { useState, useEffect } from 'react'
import { Code, Link2, Zap, Activity, Users, Shield, Github, Twitter, Linkedin, Menu, X } from 'lucide-react'

/**
 * NeuralFlow Landing Page
 * Design: Cyberpunk Minimalism
 * - Deep black background with neon cyan (#00d9ff) and electric purple (#a855f7) accents
 * - Space Mono for bold headlines, Inter for body text
 * - Asymmetric layout with diagonal elements and glowing borders
 * - Smooth animations and interactive hover effects
 */
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 overflow-hidden">
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full h-16 flex items-center px-6 md:px-8 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'
      }`}>
        <div className="flex-1">
          <span className="text-xl font-bold tracking-tighter font-mono">NeuralFlow</span>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          {['Features', 'Pricing', 'Docs', 'Blog'].map((link) => (
            <li 
              key={link} 
              className="hover:text-cyan-400 transition-colors cursor-pointer duration-300"
            >
              {link}
            </li>
          ))}
        </ul>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex ml-8 items-center space-x-4">
          <button className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300">
            Sign In
          </button>
          <button className="px-5 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden ml-4 p-2 hover:bg-gray-900/50 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-cyan-500/20 z-40 md:hidden">
          <div className="px-6 py-4 space-y-4">
            {['Features', 'Pricing', 'Docs', 'Blog'].map((link) => (
              <div key={link} className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                {link}
              </div>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
              <button className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors text-left">
                Sign In
              </button>
              <button className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 w-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: 'url(/images/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        
        {/* Animated Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Badge */}
        <span className="px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-xs font-medium text-cyan-400 mb-8 inline-block hover:border-cyan-400 hover:bg-cyan-500/20 transition-all duration-300">
          ✨ Beta 2.0 is now live
        </span>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight max-w-5xl leading-[1.1] mb-8">
          Automate your workflow with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-pulse">
            AI Intelligence
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          The next generation of automation. Connect your stack, deploy AI agents, and scale your operations without writing a single line of code.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="px-8 py-4 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95">
            Start Building Free
          </button>
          <button className="px-8 py-4 border-2 border-cyan-500/50 text-white rounded-lg font-bold hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
            Watch Demo
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Section Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">
          Everything you need to <span className="text-cyan-400">scale</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Main Feature - Large Box */}
          <div className="md:col-span-2 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="p-3 w-fit rounded-lg bg-cyan-500/20 mb-6 group-hover:bg-cyan-500/30 transition-colors">
                <Code className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Visual Workflow Builder</h3>
              <p className="text-gray-300 max-w-md text-lg">
                Our drag-and-drop interface allows you to map out complex logic visually. Connect nodes, set triggers, and watch the magic happen.
              </p>
            </div>
            <div className="mt-8 bg-black/60 rounded-xl p-4 border border-cyan-500/20 font-mono text-sm text-cyan-300 overflow-x-auto">
              // Trigger(New Lead) → AI(Categorize) → Action(Slack)
            </div>
          </div>

          {/* AI Feature - Tall Box */}
          <div className="md:col-span-1 md:row-span-2 p-8 md:p-10 rounded-2xl bg-gradient-to-b from-purple-600/20 to-cyan-600/20 border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/20 flex flex-col justify-center text-center">
            <div className="p-3 w-fit rounded-lg bg-purple-500/20 mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
              <Zap className="text-purple-400" size={48} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Native AI Actions</h3>
            <p className="text-gray-200 text-lg">
              Summarize documents, analyze sentiment, or generate responses automatically using built-in LLMs.
            </p>
          </div>

          {/* Small Feature 1 */}
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="p-3 w-fit rounded-lg bg-purple-500/20 mb-4 group-hover:bg-purple-500/30 transition-colors">
              <Link2 className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">100+ Apps</h3>
            <p className="text-sm text-gray-400">
              Seamlessly integrate with Slack, Stripe, and more.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="p-3 w-fit rounded-lg bg-green-500/20 mb-4 group-hover:bg-green-500/30 transition-colors">
              <Shield className="text-green-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Bank-grade Security</h3>
            <p className="text-sm text-gray-400">
              SOC 2 Type II compliant and end-to-end encrypted.
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:text-purple-400 transition-colors">10K+</div>
            <p className="text-gray-400 text-lg">Active Users</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2 group-hover:text-cyan-400 transition-colors">99.9%</div>
            <p className="text-gray-400 text-lg">Uptime SLA</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:text-purple-400 transition-colors">500M+</div>
            <p className="text-gray-400 text-lg">Workflows Executed</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-cyan-500/20 py-12 md:py-16 px-6 md:px-8 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <span className="text-xl font-bold tracking-tighter font-mono">NeuralFlow</span>
              <p className="text-gray-500 text-sm mt-3">© 2026 NeuralFlow Inc. All rights reserved.</p>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 text-gray-400">
              <Twitter size={20} className="hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
              <Github size={20} className="hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
              <Linkedin size={20} className="hover:text-cyan-400 cursor-pointer transition-colors duration-300" />
            </div>
            <div className="flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-400">
              <span className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Privacy</span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Terms</span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Security</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyan-500/10" />

          {/* Bottom Info */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>Crafted with precision. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
