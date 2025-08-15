"use client";

import { useState } from "react";
import { useX402Payment } from "@/lib/hooks/useX402Payment";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface X402PaymentButtonProps {
  contentId: string;
  price: string;
  type: "content" | "download";
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function X402PaymentButton({
  contentId,
  price,
  type,
  onSuccess,
  onError,
  className = "",
  children,
}: X402PaymentButtonProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const { accessPaywallContent, downloadFile, isProcessing, paymentStatus } = useX402Payment();

  const handlePayment = async () => {
    setStatus("processing");
    
    try {
      const result = type === "content" 
        ? await accessPaywallContent(contentId)
        : await downloadFile(contentId);
      
      if (result.success) {
        setStatus("success");
        onSuccess?.(result.data);
        
        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        onError?.(result.error || "Payment failed");
        
        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      onError?.(error instanceof Error ? error.message : "Payment failed");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "processing":
        return (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        );
      case "success":
        return (
          <>
            <Check className="w-4 h-4 mr-2" />
            Payment Successful!
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Payment Failed
          </>
        );
      default:
        return children || `Pay ${price} USDC`;
    }
  };

  const getButtonStyle = () => {
    const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ";
    
    switch (status) {
      case "success":
        return baseStyle + "bg-green-600 text-white hover:bg-green-700";
      case "error":
        return baseStyle + "bg-red-600 text-white hover:bg-red-700";
      default:
        return baseStyle + className;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={getButtonStyle()}
      >
        {getButtonContent()}
      </button>
      
      {paymentStatus && status === "processing" && (
        <p className="text-sm text-gray-600 mt-2">{paymentStatus}</p>
      )}
    </div>
  );
}