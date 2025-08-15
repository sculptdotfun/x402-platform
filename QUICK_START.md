# 🚀 Quick Start Guide

## Setup in 3 Minutes

### 1️⃣ **Get WalletConnect Project ID** (1 min)
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up/Login
3. Create New Project → Web
4. Copy the Project ID

### 2️⃣ **Configure Environment** (1 min)
Edit `.env.local`:
```bash
# Your wallet address (where you receive payments)
NEXT_PUBLIC_RECEIVING_ADDRESS=0xYourWalletAddress

# WalletConnect Project ID (from step 1)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id-here

# Convex (optional - for database)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### 3️⃣ **Run the App** (1 min)
```bash
npm run dev
```

Visit http://localhost:3000 ✨

## 🎯 How It Works

1. **Connect ANY Wallet**: 
   - MetaMask, Phantom, Coinbase Wallet, Trust Wallet, etc.
   - 300+ wallets supported via WalletConnect

2. **Create Paywalls**:
   - Upload content → Set price → Share link
   - Buyers pay with x402 protocol

3. **Accept Payments**:
   - Instant USDC payments
   - Zero platform fees
   - Direct to your wallet

## 💰 Testing

### Get Test USDC:
1. Connect wallet to Base Sepolia network
2. Go to [faucet.circle.com](https://faucet.circle.com)
3. Request test USDC

### Test Payment Flow:
1. Create a paywall with test content
2. Set price (e.g., $0.10)
3. Try to access → Get payment prompt
4. Pay with test USDC
5. Access unlocked content

## 🚢 Production Checklist

When ready for real payments:

1. **Get CDP Account** (for mainnet):
   ```bash
   # Sign up at cdp.coinbase.com
   # Add to .env.local:
   CDP_API_KEY_ID=your-key
   CDP_API_KEY_SECRET=your-secret
   NEXT_PUBLIC_NETWORK=base
   ```

2. **Use Real Wallet Address**:
   ```bash
   NEXT_PUBLIC_RECEIVING_ADDRESS=0xYourRealWallet
   ```

3. **Deploy**:
   - Vercel, Netlify, or any host
   - Set environment variables
   - Done! 🎉

## 📱 Supported Wallets

WalletConnect supports 300+ wallets including:
- **MetaMask** - Most popular
- **Phantom** - Multi-chain
- **Coinbase Wallet** - Built-in
- **Trust Wallet** - Mobile first
- **Rainbow** - User friendly
- **Argent** - Smart wallet
- **Ledger Live** - Hardware wallet
- **And 300+ more...**

## 🔗 Links

- [WalletConnect Docs](https://docs.walletconnect.com)
- [x402 Protocol Docs](https://docs.cdp.coinbase.com/x402)
- [Get Test USDC](https://faucet.circle.com)
- [CDP Dashboard](https://cdp.coinbase.com)

## ⚡ That's It!

No embedded wallets. No complex setup. Just:
1. Get WalletConnect ID
2. Add your wallet address
3. Run the app

Users connect their favorite wallet and pay. Simple as that!