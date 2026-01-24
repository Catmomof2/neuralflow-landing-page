import React, { useState, useEffect } from 'react'
import { Code, Link2, Zap, Activity, Users, Shield, Github, Twitter, Linkedin, Menu, X, Check, ChevronLeft, ChevronRight, Play, ChevronDown, Mail } from 'lucide-react'

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [demoStep, setDemoStep] = useState(0)
  const [autoPlayDemo, setAutoPlayDemo] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(0)
  const [email, setEmail] = useState('')
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-play demo
  useEffect(() => {
    if (!autoPlayDemo) return
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [autoPlayDemo])

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Operations, TechCorp',
      quote: 'NeuralFlow reduced our workflow automation time by 80%. We went from weeks to days.',
      logo: '🏢',
    },
    {
      name: 'Marcus Johnson',
      role: 'Founder, DataFlow Inc',
      quote: 'The AI-powered actions are a game-changer. No more manual data processing.',
      logo: '📊',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Engineering, CloudScale',
      quote: 'Finally, a no-code solution that actually scales. Impressive platform.',
      logo: '⚙️',
    },
    {
      name: 'James Wilson',
      role: 'CEO, AutomateNow',
      quote: 'The integration ecosystem is unmatched. Connects to everything we use.',
      logo: '🔗',
    },
  ]

  const demoSteps = [
    {
      title: 'Create Trigger',
      description: 'Set up a trigger event (New Lead, Form Submission, etc.)',
      icon: '🎯',
      code: 'trigger: "new_lead"',
    },
    {
      title: 'Add AI Action',
      description: 'Apply AI to analyze, categorize, or transform data',
      icon: '🤖',
      code: 'ai_action: "categorize_lead"',
    },
    {
      title: 'Connect Integration',
      description: 'Route results to Slack, Salesforce, or 100+ apps',
      icon: '🔌',
      code: 'action: "send_to_slack"',
    },
    {
      title: 'Deploy & Monitor',
      description: 'Deploy instantly and monitor execution in real-time',
      icon: '📈',
      code: 'status: "live"',
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 1,000 workflow executions/month',
        '5 integrations',
        'Basic AI actions',
        'Email support',
        'Community access',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing teams and businesses',
      features: [
        'Up to 50,000 workflow executions/month',
        '50+ integrations',
        'Advanced AI actions',
        'Priority email & chat support',
        'Custom workflows',
        'Team collaboration',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Unlimited workflow executions',
        'All integrations',
        'Custom AI models',
        '24/7 phone & dedicated support',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security & compliance',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  const faqs = [
    {
      question: 'How much does NeuralFlow cost?',
      answer: 'NeuralFlow offers flexible pricing starting at $29/month for individuals. Our Professional plan ($99/month) is designed for growing teams with advanced features. Enterprise customers can contact our sales team for custom pricing based on their specific needs.',
    },
    {
      question: 'What integrations are supported?',
      answer: 'We support 100+ integrations including Slack, Salesforce, HubSpot, Stripe, Google Sheets, Zapier, and many more. Our integration marketplace is constantly growing, and you can request custom integrations for your specific tools.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, security is our top priority. We are SOC 2 Type II compliant, use end-to-end encryption, and comply with GDPR, CCPA, and other major data protection regulations. All data is encrypted both in transit and at rest.',
    },
    {
      question: 'Can I use NeuralFlow without coding?',
      answer: 'Absolutely! NeuralFlow is designed as a no-code platform. Our visual workflow builder allows you to create complex automations by dragging and dropping components. No programming knowledge required.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer email support for all plans, with priority support available on Professional and Enterprise plans. Enterprise customers receive 24/7 phone support and a dedicated account manager.',
    },
    {
      question: 'Can I try NeuralFlow for free?',
      answer: 'Yes! All plans include a 14-day free trial with full access to features. No credit card is required to start. You can explore the platform and build workflows risk-free.',
    },
  ]

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`Thanks for signing up! We'll send updates to ${email}`)
      setEmail('')
    }
  }

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

      {/* HOW IT WORKS - VIDEO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          How it <span className="text-cyan-400">works</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          See NeuralFlow in action with our comprehensive demo video
        </p>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group">
          {/* Video Thumbnail/Background */}
          <div 
            className="relative w-full aspect-video bg-gradient-to-br from-gray-900/80 to-gray-900/40 flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => setVideoPlaying(true)}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/feature-accent.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                <Play size={48} className="text-cyan-400 ml-1" fill="currentColor" />
              </div>
              <p className="text-white font-bold text-lg">Watch Demo (3:45)</p>
            </div>
          </div>

          {/* Video Player Overlay */}
          {videoPlaying && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => setVideoPlaying(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 transition-colors z-10"
                >
                  <X size={24} />
                </button>
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="NeuralFlow Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE DEMO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          See it in <span className="text-purple-400">action</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Build powerful workflows in minutes with our intuitive visual builder
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Steps */}
          <div className="space-y-4">
            {demoSteps.map((step, index) => (
              <div
                key={index}
                onClick={() => {
                  setDemoStep(index)
                  setAutoPlayDemo(false)
                }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  demoStep === index
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                  {demoStep === index && (
                    <div className="text-cyan-400">
                      <Check size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Demo Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 rounded-2xl border border-cyan-500/30 p-8 min-h-96 flex flex-col justify-between">
              {/* Code Display */}
              <div className="bg-black/60 rounded-xl p-6 border border-cyan-500/20 font-mono text-sm space-y-2 mb-6">
                <div className="text-gray-500">{'{'}</div>
                <div className="text-cyan-300 pl-4">trigger: "new_lead",</div>
                <div className="text-purple-300 pl-4">{demoSteps[demoStep].code},</div>
                <div className="text-green-300 pl-4">status: "active"</div>
                <div className="text-gray-500">{'}'}</div>
              </div>

              {/* Step Info */}
              <div className="text-center">
                <div className="text-5xl mb-4">{demoSteps[demoStep].icon}</div>
                <h3 className="text-xl font-bold mb-2">{demoSteps[demoStep].title}</h3>
                <p className="text-gray-400 text-sm">{demoSteps[demoStep].description}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setDemoStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length)}
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setAutoPlayDemo(!autoPlayDemo)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    autoPlayDemo
                      ? 'bg-cyan-500/30 border border-cyan-400/60 text-cyan-400'
                      : 'bg-gray-800/50 hover:bg-cyan-500/20 text-gray-400'
                  }`}
                >
                  <Play size={16} />
                  {autoPlayDemo ? 'Playing' : 'Play'}
                </button>
                <button
                  onClick={() => setDemoStep((prev) => (prev + 1) % demoSteps.length)}
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {demoSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      demoStep === index ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Loved by <span className="text-cyan-400">teams worldwide</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Join thousands of companies automating their workflows
        </p>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Testimonial - Large */}
            <div className="md:col-span-1 p-8 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 min-h-80 flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">{testimonials[currentTestimonial].logo}</div>
                <p className="text-lg text-gray-100 mb-6 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
              <div>
                <p className="font-bold text-white">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-400">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            {/* Other Testimonials - Grid */}
            <div className="md:col-span-1 grid grid-cols-1 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/60'
                      : 'bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{testimonial.logo}</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Simple, transparent <span className="text-cyan-400">pricing</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Choose the perfect plan for your team. Always flexible to scale.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border border-cyan-500/60 shadow-lg shadow-cyan-500/30 md:scale-105'
                  : 'bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-cyan-500 text-black text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-2">{plan.period}</span>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 mb-8 ${
                    plan.highlighted
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50'
                      : 'bg-gray-800/50 text-white hover:bg-cyan-500/20 border border-gray-700/50'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All plans include 14-day free trial. No credit card required.</p>
          <p className="text-sm text-gray-500">Need a custom plan? <span className="text-cyan-400 cursor-pointer hover:underline">Contact our sales team</span></p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Frequently asked <span className="text-cyan-400">questions</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Find answers to common questions about NeuralFlow
        </p>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-cyan-500/20 overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                className={`w-full px-8 py-6 flex items-center justify-between transition-all duration-300 ${
                  expandedFaq === index
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
                    : 'bg-gray-900/50 hover:bg-gray-900/70'
                }`}
              >
                <h3 className="text-lg font-bold text-left">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedFaq === index && (
                <div className="px-8 py-6 bg-black/50 border-t border-cyan-500/20">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL SIGNUP CTA SECTION */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 rounded-3xl blur-2xl" />
        </div>

        <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-8 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay updated with <span className="text-cyan-400">NeuralFlow</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get early access to new features, product updates, and exclusive tips for automating your workflows.
          </p>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
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
