import { createConfig } from "wagmi";
import { mainnet, sepolia, base, baseSepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { defineChain } from "viem";

// Define Worldchain
const worldchain = defineChain({
  id: 11_155_420,
  name: 'Worldchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Worldchain ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://damp-intensive-bird.worldchain-mainnet.quiknode.pro/369ee84d76ee98c1ed6ea7a9fece166d948499cd/'],
    },
    public: {
      http: ['https://damp-intensive-bird.worldchain-mainnet.quiknode.pro/369ee84d76ee98c1ed6ea7a9fece166d948499cd/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Worldscan',
      url: 'https://worldscan.com',
    },
  },
});

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, base, worldchain, sepolia, baseSepolia],

    // Required API Keys
    walletConnectProjectId: "",

    // Required App Info
    appName: "Magnify.Cash Bridge",

    // Optional App Info
    appDescription: "Mag Cash Bridge",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
