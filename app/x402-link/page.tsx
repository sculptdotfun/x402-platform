"use client";

import { useState } from "react";
import { ArrowRight, Upload, Link2, FileText, Sparkles } from "lucide-react";
import { ConnectButton } from "@/components/ConnectButton";

export default function X402LinkHome() {
  const [selectedType, setSelectedType] = useState<"file" | "link" | "text">("file");
  const [isDragging, setIsDragging] = useState(false);
  const [price, setPrice] = useState("10");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="px-6 h-16 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-semibold text-gray-900">x402</a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/?domain=link" className="text-sm font-medium text-gray-900">Paywall</a>
              <a href="/?domain=me" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Profile</a>
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
              Turn any content into
              <span className="block text-[#0052FF]">
                instant revenue
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upload files, share links, or create documents. Set your price. 
              Get paid in USDC directly to your wallet. No intermediaries, no waiting.
            </p>
          </div>

          {/* Main Interactive Component */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
              {/* Type Selector */}
              <div className="flex space-x-2 p-1 bg-gray-50 rounded-xl mb-8">
                {[
                  { id: "file", icon: Upload, label: "File" },
                  { id: "link", icon: Link2, label: "Link" },
                  { id: "text", icon: FileText, label: "Text" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg text-sm font-medium transition-colors ${
                      selectedType === type.id
                        ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <type.icon className="w-4 h-4 mr-2" />
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Content Input Area */}
              <div className="mb-8">
                {selectedType === "file" && (
                  <div
                    className={`border-2 border-dashed rounded-xl p-20 text-center transition-colors ${
                      isDragging 
                        ? "border-[#0052FF] bg-blue-50" 
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-base font-medium text-gray-900 mb-2">
                      Drop your file here
                    </p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                    <p className="text-xs text-gray-400 mt-4">Max file size: 100MB</p>
                  </div>
                )}

                {selectedType === "link" && (
                  <input
                    type="url"
                    placeholder="https://your-premium-content.com"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/10 bg-white transition-colors"
                  />
                )}

                {selectedType === "text" && (
                  <textarea
                    placeholder="Paste your premium content here..."
                    rows={10}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/10 font-mono bg-white resize-none transition-colors"
                  />
                )}
              </div>

              {/* Price & Action */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set your price
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-12 pr-20 py-3 text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:border-[#0052FF] focus:ring-2 focus:ring-[#0052FF]/10 bg-white transition-colors"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">USDC</span>
                  </div>
                </div>
                <div className="flex items-end">
                  <button className="w-full md:w-auto px-8 py-3 bg-[#0052FF] text-white rounded-lg font-medium hover:bg-[#0041d8] transition-colors flex items-center justify-center">
                    Create Paywall
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
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
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">0%</div>
              <div className="text-sm text-gray-600">Platform fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">Instant</div>
              <div className="text-sm text-gray-600">Settlement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#0052FF] mb-1">100MB</div>
              <div className="text-sm text-gray-600">Max file size</div>
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