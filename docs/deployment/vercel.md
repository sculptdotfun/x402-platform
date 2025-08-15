# Deploying to Vercel

This guide walks you through deploying the x402 platform to Vercel.

## Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- CDP API keys ([cdp.coinbase.com](https://cdp.coinbase.com))
- WalletConnect Project ID ([cloud.walletconnect.com](https://cloud.walletconnect.com))
- GitHub repository with your code

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sculptdotfun/x402-platform&env=NEXT_PUBLIC_RECEIVING_ADDRESS,NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,CDP_API_KEY_ID,CDP_API_KEY_SECRET&envDescription=Required%20environment%20variables&envLink=https://github.com/sculptdotfun/x402-platform/blob/main/.env.example)

## Manual Deployment

### Step 1: Import Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select the repository containing x402 platform

### Step 2: Configure Environment Variables

Add the following environment variables in Vercel:

```bash
# Required
NEXT_PUBLIC_RECEIVING_ADDRESS=0x...  # Your wallet address
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=... # From WalletConnect
CDP_API_KEY_ID=...  # From CDP dashboard
CDP_API_KEY_SECRET=...  # From CDP dashboard

# Optional
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CONVEX_DEPLOY_KEY=...
```

### Step 3: Deploy Settings

Vercel will automatically detect Next.js and configure:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or higher

### Step 4: Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build the project
3. Deploy to production
4. Provide you with a URL

### Step 5: Configure Domains

#### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain (e.g., `x402.link`)
3. Configure DNS records as instructed

#### Subdomain Setup

For multi-tenant setup (x402.link and x402.me):

1. Add both domains to your project
2. Configure DNS for each:
   ```
   x402.link → CNAME → cname.vercel-dns.com
   x402.me → CNAME → cname.vercel-dns.com
   ```

### Step 6: Post-Deployment

#### Verify Environment Variables

```bash
# Check all variables are set
vercel env ls
```

#### Test Payment Flow

1. Visit your deployed URL
2. Connect wallet
3. Create a test paywall
4. Verify payment works

## Production Optimizations

### 1. Enable Caching

Add to `next.config.ts`:

```typescript
module.exports = {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=60, stale-while-revalidate',
        },
      ],
    },
  ],
}
```

### 2. Set Up Monitoring

1. Enable Vercel Analytics:
   ```bash
   npm install @vercel/analytics
   ```

2. Add to layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### 3. Configure Rate Limiting

Use Vercel Edge Middleware:

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip ?? 'anonymous');
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### 4. Enable Web Analytics

```bash
vercel analytics enable
```

## Environment-Specific Configuration

### Production

```bash
NEXT_PUBLIC_RECEIVING_ADDRESS=0xPRODUCTION_WALLET
NODE_ENV=production
```

### Staging

```bash
NEXT_PUBLIC_RECEIVING_ADDRESS=0xSTAGING_WALLET
NODE_ENV=staging
VERCEL_ENV=preview
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] CDP API keys added
- [ ] WalletConnect project ID set
- [ ] Receiving wallet address configured
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Payment flow tested
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Rate limiting enabled

## Troubleshooting

### Build Errors

```bash
# Clear cache and redeploy
vercel --force
```

### Environment Variables Not Working

1. Check variable names (case-sensitive)
2. Redeploy after adding variables
3. Verify in Functions tab

### Payment Errors

1. Check CDP API keys are valid
2. Verify wallet address format
3. Check network configuration (mainnet)

### Domain Issues

1. Verify DNS propagation
2. Check SSL certificate status
3. Clear browser cache

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Vercel CLI
        run: npm i -g vercel
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Preview Deployments

Vercel automatically creates preview deployments for:
- Pull requests
- Branch pushes

Access pattern:
```
https://x402-platform-{branch}-{team}.vercel.app
```

## Performance Monitoring

### Core Web Vitals

Monitor in Vercel Analytics:
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Speed Insights

```bash
vercel speed-insights enable
```

## Security

### Headers

Add security headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### API Protection

Use Vercel Edge Config for API keys:

```typescript
import { get } from '@vercel/edge-config';

export async function middleware() {
  const apiKey = await get('api-key');
  // Validate API key
}
```

## Scaling

### Serverless Functions

Default limits:
- Duration: 10 seconds (Hobby), 60 seconds (Pro)
- Memory: 1024 MB default, up to 3008 MB
- Payload: 4.5 MB

### Edge Functions

For better performance:
- Global distribution
- 0ms cold starts
- Lower latency

Convert to Edge:

```typescript
export const runtime = 'edge';
```

## Cost Optimization

### Optimize Images

```typescript
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority
  quality={85}
/>
```

### Reduce Bundle Size

```bash
# Analyze bundle
npm run build
npm run analyze
```

### Enable ISR

```typescript
export const revalidate = 3600; // Revalidate every hour
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Discord Community](https://discord.gg/cdp)
- [GitHub Issues](https://github.com/sculptdotfun/x402-platform/issues)