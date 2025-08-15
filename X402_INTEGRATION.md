# x402 Protocol Integration Guide

## Overview

This platform integrates the x402 payment protocol to enable instant, programmatic USDC payments for:
- **Paywall Content**: Files, links, and documents protected by payment
- **Payment Profiles**: Personal payment pages at x402.me/username

## Architecture

### Payment Flow

1. **Client Request**: User/agent requests protected content
2. **402 Response**: Server returns HTTP 402 with payment instructions
3. **Payment Authorization**: Client signs payment with wallet
4. **Verification**: x402 facilitator verifies and settles payment
5. **Content Delivery**: Server returns protected content

### Key Components

```
middleware.ts           - x402 payment middleware configuration
/api/paywall/*         - Protected API endpoints
/lib/hooks/useX402Payment.ts - Client-side payment hook
/components/X402PaymentButton.tsx - Reusable payment UI
```

## Setup Instructions

### 1. Environment Configuration

Create `.env.local` with:

```bash
# Required: Your wallet address to receive payments
NEXT_PUBLIC_RECEIVING_ADDRESS=0x...

# For mainnet only (get from cdp.coinbase.com)
CDP_API_KEY_ID=your-key-id
CDP_API_KEY_SECRET=your-key-secret

# Network selection
NEXT_PUBLIC_NETWORK=base-sepolia  # or 'base' for mainnet
```

### 2. Install Dependencies

```bash
npm install x402-next @coinbase/x402
```

### 3. Testing on Testnet

The platform defaults to Base Sepolia testnet with the free x402.org facilitator:
- No CDP account required
- Get test USDC from faucets
- Perfect for development

### 4. Mainnet Deployment

To accept real payments:

1. Get CDP API keys from [cdp.coinbase.com](https://cdp.coinbase.com)
2. Set environment variables
3. Change `NEXT_PUBLIC_NETWORK=base`
4. Deploy with mainnet configuration

## API Endpoints

### Protected by x402 Payments

#### `/api/paywall/content`
- **Price**: $0.10 USDC
- **Purpose**: Access paywall protected content
- **Parameters**: `contentId` - ID of the content

#### `/api/paywall/download`
- **Price**: $0.50 USDC
- **Purpose**: Download protected files
- **Parameters**: `fileId` - ID of the file

#### `/api/payment/send`
- **Price**: Dynamic (user-specified)
- **Purpose**: Send payments to x402.me profiles
- **Parameters**: `profileId`, `amount`

## Client Integration

### Using the Payment Hook

```typescript
import { useX402Payment } from '@/lib/hooks/useX402Payment';

function MyComponent() {
  const { accessPaywallContent, isProcessing } = useX402Payment();
  
  const handleAccess = async () => {
    const result = await accessPaywallContent('content-123');
    if (result.success) {
      console.log('Content:', result.data);
    }
  };
}
```

### Using the Payment Button

```tsx
<X402PaymentButton
  contentId="content-123"
  price="$0.10"
  type="content"
  onSuccess={(data) => console.log('Success:', data)}
  className="bg-[#0052FF] text-white hover:bg-[#0041d8]"
>
  Unlock Content
</X402PaymentButton>
```

## Features

### For Sellers (Content Creators)
- **Zero Setup**: Just add your wallet address
- **Instant Settlement**: Receive USDC directly
- **No Fees**: 0% platform fees on Base
- **Flexible Pricing**: Set custom prices per endpoint

### For Buyers (Users/Agents)
- **One-Click Payments**: No accounts or signups
- **Programmatic Access**: AI agents can pay automatically
- **Transparent Pricing**: See exact costs upfront
- **Wallet Support**: Works with any EVM wallet

## Testing Payments

### Manual Testing
1. Visit a protected endpoint without payment
2. Receive 402 Payment Required response
3. Connect wallet and authorize payment
4. Access protected content

### Programmatic Testing
```bash
# Without payment (returns 402)
curl http://localhost:3000/api/paywall/content?contentId=123

# With x402 client libraries
npm install x402-fetch
# See client examples in documentation
```

## Security Considerations

1. **Wallet Security**: Never expose private keys
2. **Price Validation**: Always validate payment amounts
3. **Content Access**: Implement proper access controls
4. **Rate Limiting**: Consider adding rate limits
5. **CORS**: Configure appropriate CORS policies

## Troubleshooting

### Common Issues

1. **"Wallet not connected"**
   - Ensure wallet is connected via Web3 provider
   - Check network matches configuration

2. **"Payment failed"**
   - Verify sufficient USDC balance
   - Check wallet is on correct network
   - Ensure receiving address is valid

3. **"Content not found"**
   - Verify content ID exists in database
   - Check Convex connection

## Resources

- [x402 Documentation](https://docs.cdp.coinbase.com/x402/welcome)
- [CDP Dashboard](https://cdp.coinbase.com)
- [Base Sepolia Faucet](https://faucet.circle.com)
- [Discord Support](https://discord.gg/cdp)

## Next Steps

1. **Add Discovery**: List your services in x402 Bazaar
2. **Custom Tokens**: Support other EIP-3009 tokens
3. **Analytics**: Track payment metrics
4. **Webhooks**: Add payment notifications
5. **Multi-network**: Expand to other chains