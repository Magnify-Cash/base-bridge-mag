import { EndpointId } from "@layerzerolabs/lz-definitions";

export const SOURCE_CHAIN = 11155111;
export const DESTINATION_CHAIN = 84532;
export const BRIDGE_ADDRESS = "0x14378084BA3Fa1CdB032836AdBA1517154c52CF7";
export const SOURCE_TOKEN_ADDRESS =
  "0x341DB579E6A62831d608Cbfa5aCc6349579Ba0f1";
export const DESTINATION_TOKEN_ADDRESS =
  "0xd70212BA8531a642079c477D976A4A27a0C8A708";
export const LZ_OPTIONS = "0x0003010011010000000000000000000000000000ea60";
export const getEid = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return EndpointId.SEPOLIA_V2_TESTNET;
    case 84532:
      return EndpointId.BASESEP_V2_TESTNET;
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
