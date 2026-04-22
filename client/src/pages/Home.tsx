import React, { useState, useEffect } from 'react'
import { Code, Link2, Zap, Activity, Users, Shield, Github, Twitter, Linkedin, Menu, X, Check, ChevronLeft, ChevronRight, Play, ChevronDown, Mail, ArrowRight, Calendar, User, Send, Building2, MessageSquare } from 'lucide-react'
import { useAuth } from '../_core/hooks/useAuth.ts'
import { trpc } from '../lib/trpc.ts'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog.tsx'

/**
 * NeuralFlow Landing Page
 * Design: Cyberpunk Minimalism
 * - Deep black background with neon cyan (#00d9ff) and electric purple (#a855f7) accents
 * - Space Mono for bold headlines, Inter for body text
 * - Asymmetric layout with diagonal elements and glowing borders
 * - Smooth animations and interactive hover effects
 */
export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [demoStep, setDemoStep] = useState(0)
  const [autoPlayDemo, setAutoPlayDemo] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [email, setEmail] = useState('')
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(globalThis.scrollY > 20)
    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
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

  const newsletterMutation = trpc.landing.subscribeNewsletter.useMutation()
  const contactMutation = trpc.landing.submitContact.useMutation()

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    try {
      const result = await newsletterMutation.mutateAsync({ email })
      if (result.success) {
        alert('Thanks for signing up! We will send you updates soon.')
        setEmail('')
      } else {
        alert('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await contactMutation.mutateAsync(contactForm)
      if (result.success) {
        alert('Message sent successfully! Our team will get back to you soon.')
        setContactForm({ name: '', email: '', company: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 overflow-hidden font-sans">
      {/* NAVIGATION */}
      <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 w-full h-20 flex items-center px-6 md:px-8 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'
      }`}>
        <div className="flex-1">
          <span className="text-xl font-bold tracking-tighter font-mono cursor-pointer" onClick={() => globalThis.scrollTo({ top: 0, behavior: 'smooth' })}>NeuralFlow</span>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          {['Features', 'Demo', 'Pricing', 'FAQ', 'Contact'].map((link) => (
            <li 
              key={link} 
              className="hover:text-cyan-400 transition-colors cursor-pointer duration-300"
              onClick={() => scrollToSection(link.toLowerCase())}
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
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden ml-4 p-2 hover:bg-gray-900/50 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-cyan-500/20 z-40 md:hidden">
          <div className="px-6 py-4 space-y-4">
            {['Features', 'Demo', 'Pricing', 'FAQ', 'Contact'].map((link) => (
              <div 
                key={link} 
                className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors"
                onClick={() => scrollToSection(link.toLowerCase())}
              >
                {link}
              </div>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
              <button className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors text-left">
                Sign In
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-8 animate-fade-in">
            <Zap size={14} />
            <span>NEURALFLOW V2.0 IS NOW LIVE</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 font-mono">
            AUTOMATE WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              NEURAL PRECISION
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            The next-generation AI automation platform. Build, deploy, and scale complex workflows with zero code and infinite possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 bg-gray-900/50 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              <Play size={20} className="fill-current" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-24 border-y border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
              Visual <span className="text-cyan-400">Workflow</span> Builder
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Our intuitive interface allows you to map out complex business processes and inject AI at any step. No technical background required.
            </p>
            
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <div 
                  key={index}
                  onClick={() => { setDemoStep(index); setAutoPlayDemo(false); }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-6 ${
                    demoStep === index 
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                      : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    demoStep === index ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${demoStep === index ? 'text-cyan-400' : 'text-white'}`}>{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  {demoStep === index && <Check size={20} className="text-cyan-400" />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-cyan-500/30 p-8 min-h-[500px] flex flex-col justify-between shadow-2xl shadow-cyan-500/5">
              <div className="bg-black/60 rounded-xl p-6 border border-cyan-500/20 font-mono text-sm space-y-2 mb-6 overflow-hidden">
                <div className="text-gray-500">{'{'}</div>
                <div className="text-cyan-300 pl-4">trigger: "new_lead",</div>
                <div className="text-purple-300 pl-4 animate-pulse">{demoSteps[demoStep].code},</div>
                <div className="text-green-300 pl-4">status: "active"</div>
                <div className="text-gray-500">{'}'}</div>
              </div>

              <div className="text-center py-12">
                <div className="text-7xl mb-6 animate-bounce">{demoSteps[demoStep].icon}</div>
                <h3 className="text-2xl font-bold mb-2">{demoSteps[demoStep].title}</h3>
                <p className="text-gray-400">{demoSteps[demoStep].description}</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setDemoStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length)}
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setAutoPlayDemo(!autoPlayDemo)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                    autoPlayDemo
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                      : 'bg-gray-800/50 hover:bg-cyan-500/20 text-gray-400'
                  }`}
                >
                  {autoPlayDemo ? <><Activity size={18} className="animate-spin" /> Playing</> : <><Play size={18} /> Play</>}
                </button>
                <button
                  onClick={() => setDemoStep((prev) => (prev + 1) % demoSteps.length)}
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-cyan-500/20 transition-colors"
                  aria-label="Next step"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES/TESTIMONIALS SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 font-mono">
          Trusted by <span className="text-purple-500">Innovators</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="text-6xl mb-8">{testimonials[currentTestimonial].logo}</div>
              <p className="text-2xl text-gray-100 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</p>
              <p className="text-cyan-400">{testimonials[currentTestimonial].role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-6 border ${
                  currentTestimonial === i
                    ? 'bg-cyan-500/10 border-cyan-500/50'
                    : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="text-4xl">{t.logo}</div>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-mono">Transparent <span className="text-cyan-400">Pricing</span></h2>
          <p className="text-gray-400 text-lg">Scale your automation as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-cyan-900/20 to-black border-cyan-500/50 shadow-2xl shadow-cyan-500/10 md:scale-105 z-10'
                  : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-8">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-2">{plan.period}</span>
              </div>
              <button className={`w-full py-4 rounded-xl font-bold mb-8 transition-all ${
                plan.highlighted ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}>
                {plan.cta}
              </button>
              <ul className="space-y-4">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm text-gray-400">
                    <Check size={16} className="text-cyan-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 font-mono">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-6 flex items-center justify-between bg-gray-900/20 hover:bg-gray-900/40 transition-colors"
              >
                <span className="font-bold text-left">{faq.question}</span>
                <ChevronDown size={20} className={`transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === i && (
                <div className="p-6 text-gray-400 border-t border-gray-800 bg-black/40">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-mono">Get in <span className="text-purple-500">Touch</span></h2>
            <p className="text-gray-400 text-lg mb-12">
              Ready to transform your workflow? Our team is here to help you build the future of automation.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email us at</p>
                  <p className="font-bold">hello@neuralflow.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chat with us</p>
                  <p className="font-bold">Live support 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="p-8 md:p-12 rounded-3xl bg-gray-900/30 border border-gray-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black border border-gray-800 focus:border-cyan-500 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-black border border-gray-800 focus:border-cyan-500 outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 ml-1">Company (Optional)</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-black border border-gray-800 focus:border-cyan-500 outline-none transition-colors"
                  placeholder="TechCorp Inc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 ml-1">Message</label>
              <textarea 
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full p-4 rounded-xl bg-black border border-gray-800 focus:border-cyan-500 outline-none transition-colors resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold font-mono mb-6 block">NeuralFlow</span>
              <p className="text-gray-500 max-w-sm mb-8">
                Building the future of autonomous workflows. Empowering teams to focus on what matters most.
              </p>
              <div className="flex gap-4">
                <Twitter className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors" />
                <Github className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors" />
                <Linkedin className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Features</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-900 text-xs text-gray-600">
            <p>© 2026 NeuralFlow Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-400 cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* DEMO MODAL */}
      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl p-0 overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">NeuralFlow Platform Overview</h3>
                <p className="text-gray-400">See how easy it is to automate your business processes.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-black mb-4 mx-auto cursor-pointer hover:scale-110 transition-transform">
                <Play size={32} className="fill-current ml-1" />
              </div>
              <p className="text-cyan-400 font-mono text-sm tracking-widest">INITIALIZING DEMO SEQUENCE...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
