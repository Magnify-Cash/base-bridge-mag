import { createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, sepolia],

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
