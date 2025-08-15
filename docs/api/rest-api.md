# REST API Reference

## Overview

The x402 Platform provides a RESTful API for programmatic access to payment functionality. All API endpoints are protected by the x402 payment middleware.

## Base URL

```
Production: https://x402.link/api
Development: http://localhost:3000/api
```

## Authentication

The API uses the x402 protocol for authentication. Each request must include payment authorization in the `X-PAYMENT` header.

```http
X-PAYMENT: <payment-signature>
```

## Response Format

All responses are returned in JSON format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

## Error Responses

Error responses follow a consistent format:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

## Endpoints

### Paywall Content

#### Get Protected Content

Retrieve paywall-protected content after payment.

```http
GET /api/paywall/content?contentId={contentId}
```

**Parameters:**
- `contentId` (string, required): The ID of the content to retrieve

**Headers:**
- `X-PAYMENT`: Payment authorization signature

**Response:**
```json
{
  "content": {
    "id": "content_123",
    "title": "Premium Article",
    "type": "article",
    "data": "...",
    "creator": "0x..."
  },
  "accessToken": "uuid-token",
  "expiresAt": "2025-01-15T10:00:00Z"
}
```

**Error Codes:**
- `CONTENT_NOT_FOUND`: Content ID does not exist
- `PAYMENT_REQUIRED`: Payment not provided or invalid
- `PAYMENT_INSUFFICIENT`: Payment amount too low

#### Create Paywall Content

Create new paywall-protected content.

```http
POST /api/paywall/content
```

**Request Body:**
```json
{
  "title": "Premium Content",
  "type": "article|file|link",
  "content": "...",
  "price": "0.10",
  "currency": "USDC",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Response:**
```json
{
  "contentId": "content_123",
  "paymentUrl": "https://x402.link/pay/content_123",
  "price": "0.10",
  "currency": "USDC"
}
```

### File Downloads

#### Download Protected File

Download a paywall-protected file after payment.

```http
GET /api/paywall/download?fileId={fileId}
```

**Parameters:**
- `fileId` (string, required): The ID of the file to download

**Headers:**
- `X-PAYMENT`: Payment authorization signature

**Response:**
```json
{
  "downloadUrl": "https://cdn.x402.link/files/...",
  "fileName": "document.pdf",
  "fileSize": 1048576,
  "mimeType": "application/pdf",
  "expiresAt": "2025-01-15T10:15:00Z"
}
```

**Error Codes:**
- `FILE_NOT_FOUND`: File ID does not exist
- `PAYMENT_REQUIRED`: Payment not provided or invalid
- `FILE_EXPIRED`: File no longer available

### Payment Profiles

#### Send Payment to Profile

Send a payment to an x402.me profile.

```http
POST /api/payment/send
```

**Request Body:**
```json
{
  "profileId": "alice",
  "amount": 10.00,
  "message": "Thanks for the great work!",
  "returnUrl": "https://myapp.com/success"
}
```

**Headers:**
- `X-PAYMENT`: Payment authorization signature

**Response:**
```json
{
  "success": true,
  "transactionId": "tx_123",
  "transactionHash": "0x...",
  "timestamp": "2025-01-15T10:00:00Z",
  "amount": 10.00,
  "recipient": "alice"
}
```

#### Get Profile Information

Retrieve public information about a payment profile.

```http
GET /api/payment/profile/{username}
```

**Parameters:**
- `username` (string, required): The profile username

**Response:**
```json
{
  "username": "alice",
  "displayName": "Alice Smith",
  "bio": "Freelance developer",
  "avatar": "https://...",
  "walletAddress": "0x...",
  "acceptedCurrencies": ["USDC"],
  "minimumAmount": 0.01,
  "qrCode": "data:image/png;base64,..."
}
```

### Payment Verification

#### Verify Payment

Verify a payment transaction.

```http
POST /api/payment/verify
```

**Request Body:**
```json
{
  "transactionId": "tx_123",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "valid": true,
  "transaction": {
    "id": "tx_123",
    "amount": 10.00,
    "currency": "USDC",
    "from": "0x...",
    "to": "0x...",
    "timestamp": "2025-01-15T10:00:00Z",
    "status": "completed"
  }
}
```

### Analytics

#### Get Payment Analytics

Retrieve analytics for your payments.

```http
GET /api/analytics/payments
```

**Query Parameters:**
- `startDate` (string): ISO 8601 date
- `endDate` (string): ISO 8601 date
- `groupBy` (string): `day|week|month`

**Headers:**
- `Authorization`: Bearer token for your account

**Response:**
```json
{
  "totalRevenue": 1234.56,
  "transactionCount": 89,
  "averageTransaction": 13.87,
  "currency": "USDC",
  "period": {
    "start": "2025-01-01T00:00:00Z",
    "end": "2025-01-15T23:59:59Z"
  },
  "data": [
    {
      "date": "2025-01-15",
      "revenue": 234.56,
      "transactions": 12
    }
  ]
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:

- **Anonymous**: 100 requests per hour
- **Authenticated**: 1000 requests per hour
- **Payment endpoints**: No limit (each requires payment)

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
```

## Webhooks

Configure webhooks to receive real-time payment notifications.

### Webhook Events

- `payment.completed`: Payment successfully processed
- `payment.failed`: Payment failed
- `content.accessed`: Protected content accessed
- `file.downloaded`: Protected file downloaded

### Webhook Payload

```json
{
  "event": "payment.completed",
  "timestamp": "2025-01-15T10:00:00Z",
  "data": {
    "transactionId": "tx_123",
    "amount": 10.00,
    "currency": "USDC",
    "from": "0x...",
    "to": "0x...",
    "metadata": {}
  }
}
```

### Webhook Verification

Verify webhook signatures to ensure authenticity:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature === expectedSignature;
}
```

## SDK Libraries

Official SDK libraries for easier integration:

### JavaScript/TypeScript

```bash
npm install @x402/sdk
```

```javascript
import { X402Client } from '@x402/sdk';

const client = new X402Client({
  apiKey: 'your-api-key',
  network: 'base'
});

// Access protected content
const content = await client.paywall.getContent('content_123');

// Send payment
const result = await client.payment.send({
  to: 'alice',
  amount: 10.00
});
```

### Python

```bash
pip install x402-sdk
```

```python
from x402_sdk import X402Client

client = X402Client(
    api_key="your-api-key",
    network="base"
)

# Access protected content
content = client.paywall.get_content("content_123")

# Send payment
result = client.payment.send(
    to="alice",
    amount=10.00
)
```

## Error Codes Reference

| Code | Description | HTTP Status |
|------|-------------|------------|
| `PAYMENT_REQUIRED` | Payment not provided | 402 |
| `PAYMENT_INVALID` | Invalid payment signature | 400 |
| `PAYMENT_INSUFFICIENT` | Payment amount too low | 402 |
| `CONTENT_NOT_FOUND` | Content does not exist | 404 |
| `FILE_NOT_FOUND` | File does not exist | 404 |
| `PROFILE_NOT_FOUND` | Profile does not exist | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |

## Testing

Use the following test endpoints for development:

```
GET /api/test/payment-required
```

Returns a 402 Payment Required response for testing client integration.

```
POST /api/test/verify-payment
```

Verifies a test payment signature.

## Support

For API support:

- Documentation: [docs.x402.link](https://docs.x402.link)
- Discord: [discord.gg/cdp](https://discord.gg/cdp)
- Email: api@x402.link