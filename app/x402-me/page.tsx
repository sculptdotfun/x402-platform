"use client";

import { useState } from "react";
import { ArrowRight, QrCode, Copy, Check, Sparkles, DollarSign } from "lucide-react";
import { ConnectButton } from "@/components/ConnectButton";

export default function X402MeHome() {
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [selectedAmount, setSelectedAmount] = useState("10");
  const [customAmount, setCustomAmount] = useState("");

  const checkUsername = (value: string) => {
    const clean = value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setUsername(clean);
    if (clean.length > 2) {
      setIsAvailable(!["john", "alice", "admin", "test"].includes(clean));
    } else {
      setIsAvailable(null);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`x402.me/${username || "yourname"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-semibold text-gray-900">x402</a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/?domain=link" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Paywall</a>
              <a href="/?domain=me" className="text-sm font-medium text-gray-900">Profile</a>
            </nav>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
              Your personal crypto
              <span className="block text-[#0052FF]">
                payment page
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Claim your x402.me username. Share one link everywhere. 
              Accept instant USDC payments with zero fees. Built for creators, freelancers, and businesses.
            </p>
          </div>

          {/* Main Interactive Component */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Setup */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Set up your profile</h3>
                  
                  {/* Username Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        x402.me/
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => checkUsername(e.target.value)}
                        placeholder="yourname"
                        className="w-full pl-24 pr-12 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/10 bg-white transition-colors"
                      />
                      {isAvailable !== null && username && (
                        <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                          isAvailable ? "text-green-500" : "text-red-500"
                        }`}>
                          {isAvailable ? <Check className="w-5 h-5" /> : <span className="text-sm">Taken</span>}
                        </div>
                      )}
                    </div>
                    {isAvailable && username && (
                      <p className="text-sm text-green-600 mt-2 font-medium">Username available</p>
                    )}
                  </div>

                  {/* Copy Link Button */}
                  <button
                    onClick={copyLink}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 font-medium flex items-center justify-center space-x-2 mb-6 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy your link</span>
                      </>
                    )}
                  </button>

                  {/* Create Profile Button */}
                  <button className="w-full px-6 py-3 bg-[#0052FF] text-white rounded-lg font-medium hover:bg-[#0041d8] transition-colors flex items-center justify-center">
                    Create Profile
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>

                {/* Right: Live Preview */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Live preview</h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    {/* Profile Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-[#0052FF] rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white text-2xl font-semibold">{(username || "U")[0].toUpperCase()}</span>
                      </div>
                      <h4 className="text-lg font-semibold">@{username || "yourname"}</h4>
                      <p className="text-sm text-gray-500">Accepting USDC</p>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-2 mb-4">
                      {["5", "10", "25", "50"].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={`w-full px-4 py-3 rounded-lg border font-medium transition-colors ${
                            selectedAmount === amount && !customAmount
                              ? "border-[#0052FF] bg-blue-50 text-[#0052FF]"
                              : "border-gray-300 hover:border-gray-400 text-gray-700"
                          }`}
                        >
                          ${amount} USDC
                        </button>
                      ))}
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount("");
                        }}
                        placeholder="Custom amount"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/10 transition-colors"
                      />
                    </div>

                    {/* Pay Button */}
                    <button className="w-full py-3 bg-[#0052FF] text-white rounded-lg font-medium hover:bg-[#0041d8] transition-colors flex items-center justify-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Send {customAmount ? `$${customAmount}` : `$${selectedAmount}`}
                    </button>

                    {/* QR Code */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Scan to pay</span>
                        <QrCode className="w-16 h-16 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">One link</div>
              <div className="text-sm text-gray-600">Forever yours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">QR ready</div>
              <div className="text-sm text-gray-600">In-person payments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">No fees</div>
              <div className="text-sm text-gray-600">Keep everything</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">USDC</div>
              <div className="text-sm text-gray-600">On Base</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">© 2025</span>
              <span className="text-sm font-medium text-gray-900">x402</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-[#0052FF] transition-colors">Docs</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#0052FF] transition-colors">GitHub</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#0052FF] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}