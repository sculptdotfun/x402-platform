"use client";

import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      setShowStatus(true);
      
      if (online) {
        setTimeout(() => setShowStatus(false), 3000);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!showStatus || isOnline) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">No internet connection</span>
      </div>
    </motion.div>
  );
}

export function ChainIndicator({ chainId }: { chainId?: number }) {
  const chainConfig: Record<number, { name: string; color: string }> = {
    8453: { name: "Base", color: "bg-[#0052FF]" },
    1: { name: "Ethereum", color: "bg-purple-600" },
    137: { name: "Polygon", color: "bg-purple-500" },
  };

  const config = chainId ? chainConfig[chainId] : null;

  if (!config) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-2 h-2 ${config.color} rounded-full`}
        />
        <span className="text-xs font-medium text-gray-700">
          {config.name}
        </span>
      </div>
    </div>
  );
}