"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  phantomWallet,
  rabbyWallet,
  trustWallet,
  rainbowWallet,
  okxWallet,
  argentWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Configure wallet groups with Phantom and other popular wallets
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        phantomWallet, // Phantom wallet explicitly included
        walletConnectWallet,
      ],
    },
    {
      groupName: 'More Wallets',
      wallets: [
        rainbowWallet,
        trustWallet,
        rabbyWallet,
        okxWallet,
        argentWallet,
        ledgerWallet,
      ],
    },
  ],
  {
    appName: 'x402 Platform',
    projectId,
  }
);

// Create wagmi config with connectors - mainnet only
const config = createConfig({
  connectors,
  chains: [base], // Only Base mainnet
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={lightTheme({
            accentColor: '#0052FF', // Coinbase blue
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          modalSize="compact"
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}