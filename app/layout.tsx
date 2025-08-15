import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getDomainConfig } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const config = getDomainConfig();
  
  if (config.isLink) {
    return {
      title: "x402.link - Instant Paywall for Your Content",
      description: "Share files, documents, and links behind a simple crypto paywall. Accept instant USDC payments via x402 protocol.",
      keywords: ["paywall", "content monetization", "crypto payments", "x402", "USDC", "file sharing"],
      openGraph: {
        title: "x402.link - Instant Paywall for Your Content",
        description: "Monetize your content with crypto payments",
        url: "https://x402.link",
        siteName: "x402.link",
        type: "website",
      },
    };
  }
  
  return {
    title: "x402.me - Your Personal Payment Page",
    description: "Create your personal payment profile. Accept instant USDC payments from anyone, anywhere.",
    keywords: ["payment profile", "crypto payments", "x402", "USDC", "personal payments"],
    openGraph: {
      title: "x402.me - Your Personal Payment Page",
      description: "Accept crypto payments with your personal profile",
      url: "https://x402.me",
      siteName: "x402.me",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}