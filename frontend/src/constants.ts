import { EndpointId } from "@layerzerolabs/lz-definitions";

export const SOURCE_CHAIN = 1;
export const DESTINATION_CHAIN = 8453;
export const BRIDGE_ADDRESS = "0x535Dc42F47eEc302921Ca9ba4f24B847b7D8650e"; // New MagOFTAdapter on Ethereum
export const SOURCE_TOKEN_ADDRESS =
  "0x71DA932ccdA723BA3ab730C976bC66DaAF9C598c";
export const DESTINATION_TOKEN_ADDRESS =
  "0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1"; // New MagOFT on Base
export const LZ_OPTIONS = "0x0003010011010000000000000000000000000000ea60";
export const WORLDCHAIN = 11155420; // Adding Worldchain as a constant

// This is the address of the deployed MagOFT on Worldchain
// Deployed at transaction: 0xec9d00de7b467e25f7eab0e3a224cddc7250a854e91f5aad7a7ff5da32aba6eb
export const WORLDCHAIN_TOKEN_ADDRESS = "0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1";

// Get available destination chains based on current chain
export const getAvailableDestinations = (currentChainId: number): number[] => {
  switch (currentChainId) {
    case SOURCE_CHAIN: // Ethereum
      return [DESTINATION_CHAIN, WORLDCHAIN]; // Can bridge to Base or Worldchain
    case DESTINATION_CHAIN: // Base
      return [SOURCE_CHAIN, WORLDCHAIN]; // Can bridge to Ethereum or Worldchain
    case WORLDCHAIN: // Worldchain
      return [SOURCE_CHAIN, DESTINATION_CHAIN]; // Can bridge to Ethereum or Base
    default:
      return [];
  }
};

// Get token address based on chain
export const getTokenAddress = (chainId: number): string => {
  switch (chainId) {
    case SOURCE_CHAIN: // Ethereum
      return SOURCE_TOKEN_ADDRESS;
    case DESTINATION_CHAIN: // Base
      return DESTINATION_TOKEN_ADDRESS;
    case WORLDCHAIN: // Worldchain
      return WORLDCHAIN_TOKEN_ADDRESS;
    default:
      return "";
  }
};

export const getEid = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return EndpointId.SEPOLIA_V2_TESTNET;
    case 84532:
      return EndpointId.BASESEP_V2_TESTNET;
    case 8453:
      return EndpointId.BASE_V2_MAINNET;
    case 1:
      return EndpointId.ETHEREUM_V2_MAINNET;
    case WORLDCHAIN:
      return EndpointId.WORLDCHAIN_V2_MAINNET; // Using proper Worldchain endpoint ID
    default:
      return 0;
  }
};
export const getDestinationEid = (chainId: number, targetChainId?: number): number => {
  // If targetChainId is provided, use it to get the correct EID
  if (targetChainId !== undefined) {
    return getEid(targetChainId);
  }
  
  // Fallback to old behavior for backward compatibility
  if (chainId === SOURCE_CHAIN) {
    return getEid(DESTINATION_CHAIN);
  } else {
    return getEid(SOURCE_CHAIN);
  }
};
export const getChainName = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return "Sepolia";
    case 84532:
      return "Base Sepolia";
    case 8453:
      return "Base";
    case 1:
      return "Ethereum";
    case WORLDCHAIN:
      return "Worldchain";
    default:
      return "";
  }
};
