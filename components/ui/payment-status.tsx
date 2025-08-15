"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Clock, Loader2, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

export type PaymentStatus = "idle" | "processing" | "success" | "error" | "pending";

interface PaymentStatusCardProps {
  status: PaymentStatus;
  amount?: string;
  recipient?: string;
  transactionHash?: string;
  error?: string;
  onClose?: () => void;
}

export function PaymentStatusCard({
  status,
  amount,
  recipient,
  transactionHash,
  error,
  onClose,
}: PaymentStatusCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (status === "success" && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const statusConfig = {
    idle: {
      icon: DollarSign,
      color: "text-gray-600",
      bg: "bg-gray-100",
      title: "Ready to Pay",
      description: "Connect your wallet to continue",
    },
    processing: {
      icon: Loader2,
      color: "text-[#0052FF]",
      bg: "bg-blue-100",
      title: "Processing Payment",
      description: "Please wait while we process your transaction",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      title: "Payment Pending",
      description: "Waiting for blockchain confirmation",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      title: "Payment Successful",
      description: "Your payment has been processed",
    },
    error: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
      title: "Payment Failed",
      description: error || "Something went wrong with your payment",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <motion.div
                animate={status === "processing" ? { rotate: 360 } : {}}
                transition={{
                  duration: 2,
                  repeat: status === "processing" ? Infinity : 0,
                  ease: "linear",
                }}
                className={`w-12 h-12 ${config.bg} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-6 h-6 ${config.color}`} />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {config.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {config.description}
                </p>
                
                {amount && (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-500">Amount:</span>
                    <span className="ml-2 font-mono font-medium text-gray-900">
                      {amount} USDC
                    </span>
                  </div>
                )}
                
                {recipient && (
                  <div className="mt-1 text-sm">
                    <span className="text-gray-500">To:</span>
                    <span className="ml-2 font-mono text-gray-700">
                      {recipient.slice(0, 6)}...{recipient.slice(-4)}
                    </span>
                  </div>
                )}
                
                {transactionHash && status === "success" && (
                  <a
                    href={`https://basescan.org/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-[#0052FF] hover:underline"
                  >
                    View on Basescan →
                  </a>
                )}
              </div>
              
              {onClose && status !== "processing" && (
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
            
            {status === "processing" && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
                className="h-1 bg-[#0052FF] rounded-full mt-4"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InlinePaymentStatus({ status, className = "" }: { status: PaymentStatus; className?: string }) {
  const statusConfig = {
    idle: { text: "Ready", color: "text-gray-600 bg-gray-100" },
    processing: { text: "Processing", color: "text-blue-600 bg-blue-100" },
    pending: { text: "Pending", color: "text-yellow-600 bg-yellow-100" },
    success: { text: "Complete", color: "text-green-600 bg-green-100" },
    error: { text: "Failed", color: "text-red-600 bg-red-100" },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {status === "processing" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-3 h-3 border-2 border-current border-t-transparent rounded-full mr-1.5"
        />
      )}
      {config.text}
    </span>
  );
}