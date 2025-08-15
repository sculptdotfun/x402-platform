import { paymentMiddleware } from 'x402-next';
import { facilitator } from "@coinbase/x402";

// Get configuration from environment variables
const receivingAddress = process.env.NEXT_PUBLIC_RECEIVING_ADDRESS || '0x0000000000000000000000000000000000';

// Configure the payment middleware for protected endpoints
export const middleware = paymentMiddleware(
  receivingAddress, // Wallet address to receive payments
  {
    // API endpoints for paywall content
    '/api/paywall/content': {
      price: '$0.10', // Price in USDC
      network: "base", // Always use mainnet
      config: {
        description: 'Access paywall protected content',
        inputSchema: {
          type: "object",
          properties: {
            contentId: { type: "string", description: "ID of the paywall content" }
          },
          required: ["contentId"]
        },
        outputSchema: {
          type: "object",
          properties: {
            content: { type: "object" },
            accessToken: { type: "string" }
          }
        }
      }
    },
    
    // API endpoint for file downloads
    '/api/paywall/download': {
      price: '$0.50', // Higher price for file downloads
      network: "base", // Always use mainnet
      config: {
        description: 'Download paywall protected file',
        inputSchema: {
          type: "object",
          properties: {
            fileId: { type: "string", description: "ID of the file to download" }
          },
          required: ["fileId"]
        },
        outputSchema: {
          type: "object",
          properties: {
            downloadUrl: { type: "string" },
            expiresAt: { type: "string" }
          }
        }
      }
    },
    
    // Payment profile endpoint
    '/api/payment/send': {
      price: '$1.00', // Dynamic pricing will be handled in the route
      network: "base", // Always use mainnet
      config: {
        description: 'Send payment to x402.me profile',
        inputSchema: {
          type: "object",
          properties: {
            profileId: { type: "string", description: "Profile username" },
            amount: { type: "number", description: "Payment amount in USD" }
          },
          required: ["profileId", "amount"]
        },
        outputSchema: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            transactionId: { type: "string" }
          }
        }
      }
    }
  },
  facilitator // Always use mainnet CDP facilitator
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/paywall/:path*',
    '/api/payment/:path*',
  ]
};