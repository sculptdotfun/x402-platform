import { facilitator } from "@coinbase/x402";

// For development/testnet
const TESTNET_FACILITATOR_URL = "https://x402.org/facilitator";

// Network configuration
export const NETWORK_CONFIG = {
  development: {
    network: "base-sepolia" as const,
    facilitatorUrl: TESTNET_FACILITATOR_URL,
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  },
  production: {
    network: "base" as const,
    facilitator: facilitator,
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  },
};

export const getNetworkConfig = () => {
  const isProduction = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_USE_MAINNET === "true";
  return isProduction ? NETWORK_CONFIG.production : NETWORK_CONFIG.development;
};

// Default prices for different content types
export const DEFAULT_PRICES = {
  file: "$0.50",
  link: "$0.10",
  document: "$0.25",
  profile_payment: "$1.00",
};

// Supported file types
export const SUPPORTED_FILE_TYPES = {
  documents: ['.pdf', '.doc', '.docx', '.txt', '.md'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  videos: ['.mp4', '.webm', '.mov', '.avi'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a'],
  archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB