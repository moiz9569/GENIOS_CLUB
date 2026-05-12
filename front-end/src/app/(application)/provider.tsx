"use client";

// import { ActiveChain, clientId } from "@/lib/constant";
import { clientId } from "@/lib/constant";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Provider({ children }: RootLayoutProps) {
  return (
    <ThirdwebProvider  activeChain={Sepolia} clientId={clientId}>
      {children}
    </ThirdwebProvider>
  );
}
