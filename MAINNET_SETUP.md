# 🚀 Mainnet-Only Setup Guide

## ⚡ Quick Setup (5 minutes)

This platform runs **ONLY on Base mainnet** - no testnet needed, even for development.

### 1️⃣ **Get CDP Account** (2 min)
Required for x402 payment processing on mainnet.

1. Go to [cdp.coinbase.com](https://cdp.coinbase.com)
2. Sign up/Login
3. Create API Keys
4. Copy both keys

### 2️⃣ **Get WalletConnect ID** (1 min)
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up/Login
3. Create New Project → Web
4. Copy the Project ID

### 3️⃣ **Configure Environment** (1 min)
Edit `.env.local`:

```bash
# Your wallet address (where you receive payments)
NEXT_PUBLIC_RECEIVING_ADDRESS=0xYourWalletAddress

# WalletConnect Project ID (from step 2)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# CDP API Keys (from step 1) - REQUIRED
CDP_API_KEY_ID=your-key-id
CDP_API_KEY_SECRET=your-key-secret

# Convex (optional - for database)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### 4️⃣ **Run the App** (1 min)
```bash
npm install
npm run dev
```

Visit http://localhost:3000 ✨

## 💰 Using Real USDC

Since this runs on mainnet only:

1. **Get USDC on Base**:
   - Buy on Coinbase → Withdraw to Base
   - Bridge from Ethereum: [bridge.base.org](https://bridge.base.org)
   - Swap on Base: [app.uniswap.org](https://app.uniswap.org)

2. **Start Small**:
   - Test with $0.01 payments first
   - Verify everything works
   - Scale up amounts

## 🎯 How It Works

1. **Connect Wallet**: 
   - MetaMask, Phantom, Coinbase Wallet, etc.
   - 300+ wallets supported

2. **Create Paywalls**:
   - Upload content → Set price → Share link
   - Real USDC payments on Base

3. **Accept Payments**:
   - Instant settlement
   - Zero platform fees
   - Direct to your wallet

## ✅ Production Checklist

- [ ] CDP API keys configured
- [ ] WalletConnect project ID added
- [ ] Your receiving wallet address set
- [ ] Small test payment successful
- [ ] Convex database connected (optional)

## 📱 Supported Wallets

**Popular**:
- MetaMask
- Coinbase Wallet
- Phantom
- WalletConnect (300+ wallets)

**Additional**:
- Rainbow, Trust Wallet, Rabby
- OKX, Argent, Ledger
- And many more...

## 🔗 Resources

- [CDP Dashboard](https://cdp.coinbase.com) - Get API keys
- [WalletConnect](https://cloud.walletconnect.com) - Get project ID
- [Base Bridge](https://bridge.base.org) - Bridge USDC to Base
- [x402 Docs](https://docs.cdp.coinbase.com/x402) - Protocol documentation

## ⚠️ Important Notes

1. **Real Money**: This uses real USDC on Base mainnet
2. **Gas Fees**: Users don't need ETH (x402 handles gas)
3. **No Test Mode**: Always mainnet, even in development
4. **Start Small**: Test with small amounts first

## 🚨 Security

- Never share your CDP API keys
- Use a separate wallet for receiving payments
- Monitor transactions regularly
- Consider rate limiting in production

That's it! No complex setup, no testnet confusion. Just mainnet from day one. 🎉