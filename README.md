# x402 Platform - Instant Crypto Payments

A modern payment platform built on the x402 protocol, enabling instant USDC payments on Base network with zero fees.

## 🚀 Features

### x402.link - Content Paywalls
- Upload files, share links, or create documents
- Set custom USDC prices
- Instant payment settlement
- No accounts or signups required

### x402.me - Payment Profiles
- Personal payment pages (x402.me/username)
- Accept USDC payments with one link
- Custom amounts and QR codes
- Perfect for creators and freelancers

## 💻 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS (Coinbase-inspired design)
- **Payments**: x402 Protocol on Base network
- **Wallet**: RainbowKit + WalletConnect (300+ wallets)
- **Database**: Convex (optional)

## 🔧 Quick Setup

### Prerequisites
- Node.js 18+
- CDP account ([cdp.coinbase.com](https://cdp.coinbase.com))
- WalletConnect ID ([cloud.walletconnect.com](https://cloud.walletconnect.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sculptdotfun/x402-platform.git
cd x402-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create `.env.local`:
```bash
# Your wallet address (receives payments)
NEXT_PUBLIC_RECEIVING_ADDRESS=0x...

# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...

# CDP API Keys (required for mainnet)
CDP_API_KEY_ID=...
CDP_API_KEY_SECRET=...

# Convex (optional)
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 💰 How It Works

1. **Connect Wallet**: Users connect any wallet (MetaMask, Phantom, Coinbase, etc.)
2. **Create Content**: Upload files or create payment profiles
3. **Set Price**: Choose USDC amount
4. **Share Link**: Send your x402 link
5. **Get Paid**: Instant USDC settlement to your wallet

## 🌟 Key Benefits

- **Zero Platform Fees**: Keep 100% of payments
- **Instant Settlement**: No waiting for payouts
- **No Signups**: Wallet-based authentication
- **AI Compatible**: Agents can pay programmatically
- **300+ Wallets**: Universal wallet support

## 📁 Project Structure

```
├── app/
│   ├── x402-link/        # Paywall platform
│   ├── x402-me/          # Payment profiles
│   └── api/              # x402 payment endpoints
├── components/           # Reusable UI components
├── lib/                  # Utilities and hooks
├── middleware.ts         # x402 payment middleware
└── convex/              # Database schema (optional)
```

## 🚢 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sculptdotfun/x402-platform)

### Manual Deployment
1. Build the project: `npm run build`
2. Set environment variables on your host
3. Deploy the `.next` folder

## 🔐 Security

- Never commit `.env.local`
- Use separate wallets for receiving payments
- Keep CDP API keys secure
- Monitor transactions regularly

## 📚 Documentation

- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402)
- [Quick Start Guide](./QUICK_START.md)
- [Mainnet Setup](./MAINNET_SETUP.md)
- [Integration Guide](./X402_INTEGRATION.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🔗 Links

- [Live Demo](https://x402.link)
- [x402 Protocol](https://docs.cdp.coinbase.com/x402)
- [CDP Dashboard](https://cdp.coinbase.com)
- [Discord Support](https://discord.gg/cdp)

---

Built with ❤️ using x402 protocol