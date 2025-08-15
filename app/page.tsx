"use client";

import { getDomainConfig } from "@/lib/utils";
import X402LinkHome from "./x402-link/page";
import X402MeHome from "./x402-me/page";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const config = getDomainConfig();

  // For development, show a selector
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get("domain");
    
    if (domain === "link" || (!domain && config.isLink)) {
      return <X402LinkHome />;
    }
    
    if (domain === "me" || (!domain && config.isMe)) {
      return <X402MeHome />;
    }

    // Development domain selector - ultra minimal
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-8">Select Platform</h1>
          <div className="flex space-x-4">
            <a
              href="/?domain=link"
              className="group flex items-center space-x-2 px-6 py-3 border border-gray-200 hover:border-black"
            >
              <span>x402.link</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-1" />
            </a>
            <a
              href="/?domain=me"
              className="group flex items-center space-x-2 px-6 py-3 border border-gray-200 hover:border-black"
            >
              <span>x402.me</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Production: route based on domain
  if (config.isLink) {
    return <X402LinkHome />;
  }
  
  return <X402MeHome />;
}