import { EndpointId } from "@layerzerolabs/lz-definitions";

export const SOURCE_CHAIN = 1;
export const DESTINATION_CHAIN = 8453;
export const BRIDGE_ADDRESS = "0xB5c6D23c2a29E40fe8C79AcfED435cb48AF02d68";
export const SOURCE_TOKEN_ADDRESS =
  "0x71DA932ccdA723BA3ab730C976bC66DaAF9C598c";
export const DESTINATION_TOKEN_ADDRESS =
  "0x59F680F431f5280e7662b96F2DFA195D1693852d";
export const LZ_OPTIONS = "0x0003010011010000000000000000000000000000ea60";
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
    default:
      return 0;
  }
};
export const getDestinationEid = (chainId: number) => {
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
    default:
      return "";
  }
};
