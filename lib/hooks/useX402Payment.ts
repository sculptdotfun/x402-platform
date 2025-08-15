import { useState, useCallback } from 'react';
import { wrapFetchWithPayment, decodeXPaymentResponse } from 'x402-fetch';
import { useAccount } from 'wagmi';

interface PaymentResult {
  success: boolean;
  data?: any;
  error?: string;
  transactionHash?: string;
}

export function useX402Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const { address, connector } = useAccount();

  const makePayment = useCallback(async (
    endpoint: string,
    options?: RequestInit
  ): Promise<PaymentResult> => {
    if (!address || !connector) {
      return {
        success: false,
        error: 'Wallet not connected'
      };
    }

    setIsProcessing(true);
    setPaymentStatus('Preparing payment...');

    try {
      // Get the wallet client from the connector
      const walletClient = await connector.getWalletClient();
      
      // Wrap fetch with x402 payment handling
      const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
      
      setPaymentStatus('Processing payment...');
      
      // Make the request with automatic payment handling
      const response = await fetchWithPayment(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      // Decode the payment response header
      const paymentResponseHeader = response.headers.get('x-payment-response');
      let transactionHash: string | undefined;
      
      if (paymentResponseHeader) {
        const paymentResponse = decodeXPaymentResponse(paymentResponseHeader);
        transactionHash = paymentResponse.transactionHash;
        setPaymentStatus('Payment successful!');
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
        transactionHash,
      };
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed');
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
      };
    } finally {
      setIsProcessing(false);
    }
  }, [address, connector]);

  const accessPaywallContent = useCallback(async (contentId: string) => {
    return makePayment(`/api/paywall/content?contentId=${contentId}`, {
      method: 'GET',
    });
  }, [makePayment]);

  const downloadFile = useCallback(async (fileId: string) => {
    return makePayment(`/api/paywall/download?fileId=${fileId}`, {
      method: 'GET',
    });
  }, [makePayment]);

  const sendPayment = useCallback(async (profileId: string, amount: number) => {
    return makePayment('/api/payment/send', {
      method: 'POST',
      body: JSON.stringify({ profileId, amount }),
    });
  }, [makePayment]);

  return {
    isProcessing,
    paymentStatus,
    accessPaywallContent,
    downloadFile,
    sendPayment,
    makePayment,
  };
}