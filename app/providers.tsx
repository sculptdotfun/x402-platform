"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { WalletProvider } from "./providers/WalletProvider";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ConvexProvider client={convex}>
        <WalletProvider>
          {children}
          <ToastProvider />
        </WalletProvider>
      </ConvexProvider>
    </ErrorBoundary>
  );
}