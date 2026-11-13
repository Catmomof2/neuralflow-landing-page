import React, { useState, useEffect } from 'react'
import { Zap, Check, ChevronLeft, ChevronRight, Play, Activity, ChevronDown, ArrowRight, Mail, MessageSquare, Github, Twitter, Linkedin, Menu, X } from 'lucide-react'
import { Link } from 'wouter'

/**
 * NeuralFlow Features Page
 * Design: Cyberpunk Minimalism (matches Home.tsx)
 * - Deep black background with neon cyan (#00d9ff) and electric purple (#a855f7) accents
 * - Space Mono for bold headlines, Inter for body text
 *
 * All copy on this page is drawn from client/src/pages/Home.tsx:
 * hero copy, the Visual Workflow Builder demo steps (titles, descriptions,
 * code samples), the pricing plans and their exact feature lists, the FAQ
 * entries (verbatim), the 100+ integrations wording, and the Sarah Chen
 * testimonial. No new features, prices, integrations, stats, or
 * testimonials have been invented here.
 */
export default function Features() {
  const base = import.meta.env.BASE_URL
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [autoPlayDemo, setAutoPlayDemo] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [integrationFilter, setIntegrationFilter] = useState('All')
  const [integrationSearch, setIntegrationSearch] = useState('')

  useEffect(() => {
    globalThis.scrollTo({ top: 0, behavior: 'smooth' })
    const handleScroll = () => setIsScrolled(globalThis.scrollY > 20)
    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-play demo
  useEffect(() => {
    if (!autoPlayDemo) return
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [autoPlayDemo])

  // Same data as Home.tsx demoSteps (verbatim)
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

  // Six feature deep-dives, drawn only from Home.tsx copy.
  // Plan labels follow the pricing feature lists in Home.tsx; where Home.tsx
  // states no tier restriction for a capability, it is labelled "All plans".
  const featureDeepDives = [
    {
      title: 'Visual Workflow Builder',
      icon: '🎯',
      plan: 'All plans',
      description: 'Our intuitive interface allows you to map out complex business processes and inject AI at any step. No technical background required.',
      points: [
        'Map out complex business processes',
        'Inject AI at any step',
        'No technical background required',
      ],
    },
    {
      title: 'AI Actions',
      icon: '🤖',
      plan: 'Starter: Basic AI actions · Professional: Advanced AI actions · Enterprise: Custom AI models',
      description: 'Apply AI to analyze, categorize, or transform data. The AI-powered actions are a game-changer. No more manual data processing.',
      points: [
        'Basic AI actions',
        'Advanced AI actions',
        'Custom AI models',
      ],
    },
    {
      title: '100+ Integrations',
      icon: '🔌',
      plan: 'Starter: 5 integrations · Professional: 50+ integrations · Enterprise: All integrations',
      description: 'Route results to Slack, Salesforce, or 100+ apps. We support 100+ integrations including Slack, Salesforce, HubSpot, Stripe, Google Sheets, Zapier, and many more.',
      points: [
        'Slack, Salesforce, HubSpot, Stripe, Google Sheets, Zapier',
        'Our integration marketplace is constantly growing',
        'You can request custom integrations for your specific tools',
      ],
    },
    {
      title: 'Deploy & Monitor',
      icon: '📈',
      plan: 'Starter: up to 1,000 workflow executions/month · Professional: up to 50,000/month · Enterprise: Unlimited workflow executions',
      description: 'Deploy instantly and monitor execution in real-time. Build, deploy, and scale complex workflows with zero code and infinite possibilities.',
      points: [
        'Deploy instantly',
        'Monitor execution in real-time',
        'Scale your automation as you grow',
      ],
    },
    {
      title: 'Security & Compliance',
      icon: '🛡️',
      plan: 'All plans: SOC 2 Type II, end-to-end encryption, GDPR & CCPA · Enterprise: Advanced security & compliance',
      description: 'Security is our top priority. We are SOC 2 Type II compliant, use end-to-end encryption, and comply with GDPR, CCPA, and other major data protection regulations. All data is encrypted both in transit and at rest.',
      points: [
        'SOC 2 Type II compliant',
        'End-to-end encryption',
        'GDPR, CCPA, and other major data protection regulations',
      ],
    },
    {
      title: 'No-Code, Team Collaboration & API Access',
      icon: '👥',
      plan: 'All plans: no-code · Professional: Team collaboration & API access · Enterprise: On-premise deployment',
      description: 'NeuralFlow is designed as a no-code platform. Our visual workflow builder allows you to create complex automations by dragging and dropping components. No programming knowledge required.',
      points: [
        'Drag and drop components — no programming knowledge required',
        'Team collaboration',
        'API access',
      ],
    },
  ]

  // Only the integrations actually named in Home.tsx. No others invented.
  // Home.tsx states the total as "100+ integrations".
  const namedIntegrations = [
    { name: 'Slack', note: 'Named in the workflow builder and the FAQ' },
    { name: 'Salesforce', note: 'Named in the workflow builder and the FAQ' },
    { name: 'HubSpot', note: 'Named in the FAQ' },
    { name: 'Stripe', note: 'Named in the FAQ' },
    { name: 'Google Sheets', note: 'Named in the FAQ' },
    { name: 'Zapier', note: 'Named in the FAQ' },
  ]
  const integrationFilters = ['All', ...namedIntegrations.map((i) => i.name)]
  const visibleIntegrations = namedIntegrations.filter((i) => {
    const matchesFilter = integrationFilter === 'All' || i.name === integrationFilter
    const matchesSearch = i.name.toLowerCase().includes(integrationSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Same data as Home.tsx pricingPlans (verbatim)
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

  // Same data as Home.tsx faqs (verbatim)
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

  // Home-page section anchors, for nav links that point back to Home.
  const homeSection = (id: string) => `${base}#${id}`

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 overflow-hidden font-sans">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg focus:font-bold">Skip to main content</a>

      {/* NAVIGATION */}
      <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 w-full h-20 flex items-center px-6 md:px-8 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'
      }`}>
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold tracking-tighter font-mono cursor-pointer">NeuralFlow</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <li className="text-cyan-400 cursor-pointer transition-colors duration-300">
            <Link href="/features">Features</Link>
          </li>
          <li className="hover:text-cyan-400 transition-colors cursor-pointer duration-300">
            <a href={homeSection('demo')}>Demo</a>
          </li>
          <li className="hover:text-cyan-400 transition-colors cursor-pointer duration-300">
            <a href={homeSection('pricing')}>Pricing</a>
          </li>
          <li className="hover:text-cyan-400 transition-colors cursor-pointer duration-300">
            <a href={homeSection('faq')}>FAQ</a>
          </li>
          <li className="hover:text-cyan-400 transition-colors cursor-pointer duration-300">
            <a href={homeSection('contact')}>Contact</a>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex ml-8 items-center space-x-4">
          <button className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300">
            Sign In
          </button>
          <Link
            href="/"
            className="px-5 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            Get Started
          </Link>
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
            <div className="text-sm font-medium text-cyan-400 cursor-pointer transition-colors">
              <Link href="/features">Features</Link>
            </div>
            <div className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
              <a href={homeSection('demo')}>Demo</a>
            </div>
            <div className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
              <a href={homeSection('pricing')}>Pricing</a>
            </div>
            <div className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
              <a href={homeSection('faq')}>FAQ</a>
            </div>
            <div className="text-sm font-medium text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
              <a href={homeSection('contact')}>Contact</a>
            </div>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
              <button className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors text-left">
                Sign In
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      <main id="main-content">
      {/* HERO SECTION */}
      <section aria-label="Features hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
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
            FEATURES BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              NEURAL PRECISION
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            The next-generation AI automation platform. Build, deploy, and scale complex workflows with zero code and infinite possibilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
            <a
              href={homeSection('pricing')}
              className="px-8 py-4 bg-gray-900/50 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              See Pricing
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            All plans include a 14-day free trial with full access to features. No credit card is required to start.
          </p>
        </div>
      </section>

      {/* WORKFLOW BUILDER WALKTHROUGH */}
      <section id="builder" aria-labelledby="builder-heading" className="max-w-7xl mx-auto px-6 py-24 border-y border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="builder-heading" className="text-4xl md:text-6xl font-bold mb-6 font-mono">
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

      {/* FEATURE DEEP-DIVES */}
      <section id="deep-dives" aria-labelledby="deep-dives-heading" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 id="deep-dives-heading" className="text-4xl md:text-6xl font-bold mb-6 font-mono">
            Everything You Need to <span className="text-purple-500">Automate</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Build, deploy, and scale complex workflows with zero code and infinite possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureDeepDives.map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col">
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-xs font-bold text-cyan-400 mb-4">{feature.plan}</p>
              <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
              <ul className="space-y-3 mt-auto">
                {feature.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check size={16} className="text-cyan-400 mt-0.5 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="testimonial" aria-labelledby="testimonial-heading" className="max-w-7xl mx-auto px-6 py-24 border-y border-gray-900">
        <h2 id="testimonial-heading" className="text-4xl md:text-6xl font-bold text-center mb-16 font-mono">
          Trusted by <span className="text-purple-500">Innovators</span>
        </h2>
        <div className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30">
          <div className="text-6xl mb-8">🏢</div>
          <p className="text-2xl text-gray-100 mb-8 italic leading-relaxed">
            "NeuralFlow reduced our workflow automation time by 80%. We went from weeks to days."
          </p>
          <p className="text-xl font-bold text-white">Sarah Chen</p>
          <p className="text-cyan-400">VP of Operations, TechCorp</p>
        </div>
      </section>

      {/* INTEGRATIONS EXPLORER */}
      <section id="integrations" aria-labelledby="integrations-heading" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 id="integrations-heading" className="text-4xl md:text-6xl font-bold mb-6 font-mono">
            100+ <span className="text-cyan-400">Integrations</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We support 100+ integrations including Slack, Salesforce, HubSpot, Stripe, Google Sheets, Zapier, and many more. Our integration marketplace is constantly growing, and you can request custom integrations for your specific tools.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            The integrations below are the ones named on this site. The full list is the 100+ integrations NeuralFlow supports.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <input
            type="text"
            value={integrationSearch}
            onChange={(e) => setIntegrationSearch(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-black border border-gray-800 focus:border-cyan-500 outline-none transition-colors"
            placeholder="Search integrations..."
            aria-label="Search integrations"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {integrationFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setIntegrationFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                integrationFilter === filter
                  ? 'bg-cyan-500 text-black border-cyan-500'
                  : 'bg-gray-900/30 border-gray-800 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mb-8" aria-live="polite">
          Showing {visibleIntegrations.length} of {namedIntegrations.length} named integrations
        </p>

        {visibleIntegrations.length === 0 ? (
          <p className="text-center text-gray-400">No named integration matches that search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleIntegrations.map((integration) => (
              <div key={integration.name} className="p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-500">{integration.note}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PLAN COMPARISON */}
      <section id="comparison" aria-labelledby="comparison-heading" className="max-w-7xl mx-auto px-6 py-24 border-y border-gray-900">
        <div className="text-center mb-16">
          <h2 id="comparison-heading" className="text-4xl md:text-6xl font-bold mb-6 font-mono">Transparent <span className="text-cyan-400">Pricing</span></h2>
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
              <Link
                href="/"
                className={`block text-center w-full py-4 rounded-xl font-bold mb-8 transition-all ${
                  plan.highlighted ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </Link>
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

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-6 py-24">
        <h2 id="faq-heading" className="text-4xl font-bold text-center mb-16 font-mono">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                aria-expanded={expandedFaq === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="w-full p-6 flex items-center justify-between bg-gray-900/20 hover:bg-gray-900/40 transition-colors"
              >
                <span className="font-bold text-left">{faq.question}</span>
                <ChevronDown size={20} className={`transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === i && (
                <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} className="p-6 text-gray-400 border-t border-gray-800 bg-black/40">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get started" className="max-w-7xl mx-auto px-6 py-24">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-mono">Get in <span className="text-purple-500">Touch</span></h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Ready to transform your workflow? Our team is here to help you build the future of automation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>
            <a
              href={homeSection('pricing')}
              className="px-8 py-4 bg-gray-900/50 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300"
            >
              See Pricing
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-2"><Mail size={16} className="text-cyan-400" /> hello@neuralflow.ai</span>
            <span className="flex items-center gap-2"><MessageSquare size={16} className="text-purple-400" /> Live support 24/7</span>
          </div>
        </div>
      </section>

      </main>

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
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  <Link href="/features">Features</Link>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  <a href={`${base}features#integrations`}>Integrations</a>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  <a href={homeSection('pricing')}>Pricing</a>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  <a href={homeSection('contact')}>Contact</a>
                </li>
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
    </div>
  )
}
