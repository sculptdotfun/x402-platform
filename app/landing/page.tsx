"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  DollarSign, 
  Globe, 
  Sparkles,
  Check,
  ChevronRight,
  Users,
  TrendingUp,
  Lock,
  Wallet
} from "lucide-react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/animated-text";
import { ConnectButton } from "@/components/ConnectButton";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Instant Settlement",
      description: "Receive payments in seconds, not days",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Zero Platform Fees",
      description: "Keep 100% of your earnings",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Payments",
      description: "Accept USDC from anywhere",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lock,
      title: "Non-Custodial",
      description: "You control your funds",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { value: "0%", label: "Platform Fees" },
    { value: "<1s", label: "Settlement Time" },
    { value: "300+", label: "Wallets Supported" },
    { value: "$0.01", label: "Min Payment" }
  ];

  const useCases = [
    {
      title: "Content Creators",
      items: ["Paywall articles", "Sell downloads", "Premium content", "Exclusive access"]
    },
    {
      title: "Freelancers",
      items: ["Invoice clients", "Global payments", "Instant settlement", "No chargebacks"]
    },
    {
      title: "Businesses",
      items: ["API monetization", "SaaS billing", "Micropayments", "B2B transactions"]
    },
    {
      title: "AI Agents",
      items: ["Autonomous payments", "Service consumption", "Resource access", "Programmatic commerce"]
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-semibold text-gray-900">x402</Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#use-cases" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Use Cases</Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Docs</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/?domain=link" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Launch App
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Powered by x402 Protocol on Base</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Accept crypto payments
              <br />
              <span className="relative">
                <span className="text-[#0052FF]">
                  <AnimatedText 
                    words={["instantly", "globally", "simply", "securely"]}
                    className="inline-block"
                  />
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Create paywalls, accept payments, and monetize your content with USDC on Base. 
              Zero fees, instant settlement, no signups required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/?domain=link"
                  className="inline-flex items-center px-8 py-4 bg-[#0052FF] text-white rounded-lg font-medium hover:bg-[#0041d8] transition-colors"
                >
                  Start Accepting Payments
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/docs"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  View Documentation
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Demo Video/Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                {/* Demo content placeholder */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Wallet className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">Interactive Demo</p>
                    <p className="text-gray-400 text-sm mt-2">Experience instant crypto payments</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#0052FF] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to accept payments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for modern commerce with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <motion.div
                  animate={{
                    scale: hoveredFeature === index ? 1.1 : 1,
                    rotate: hoveredFeature === index ? 5 : 0
                  }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From creators to enterprises, x402 powers payments for all
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-4">{useCase.title}</h3>
                <ul className="space-y-3">
                  {useCase.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200"
            >
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-900 mb-2">0%</div>
                <div className="text-xl text-gray-600">Platform Fees</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited transactions",
                  "Instant USDC settlement",
                  "300+ wallet support",
                  "API access",
                  "Custom branding",
                  "Priority support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/?domain=link"
                className="block w-full px-8 py-4 bg-[#0052FF] text-white rounded-lg font-medium hover:bg-[#0041d8] transition-colors text-center"
              >
                Start Free
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to accept crypto payments?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of sellers using x402 for instant, global payments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/?domain=link"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white rounded-lg font-medium border-2 border-white hover:bg-white/10 transition-colors"
              >
                Read Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/?domain=link" className="text-gray-400 hover:text-white transition-colors">Paywalls</Link></li>
                <li><Link href="/?domain=me" className="text-gray-400 hover:text-white transition-colors">Payment Profiles</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Developers</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/docs/api/rest-api" className="text-gray-400 hover:text-white transition-colors">API Reference</Link></li>
                <li><a href="https://github.com/sculptdotfun/x402-platform" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="https://discord.gg/cdp" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                <li><Link href="/docs/troubleshooting" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 x402. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}