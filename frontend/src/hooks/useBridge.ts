import {
  useReadMagOftAdapterQuoteSend,
  useWriteMagOftAdapterSend,
} from "../generated";
import { parseEther, pad } from "viem";
import { BRIDGE_ADDRESS, LZ_OPTIONS, getDestinationEid } from "../constants";

/**
 * Custom hook for managing OFT token operations
 * @param address - User's wallet address
 * @param chainId - The current chain ID (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useBridge(
  address: `0x${string}`,
  chainId: number,
  amountToBridge: string,
) {
  const paddedAddress = pad(address, { size: 32 });

  // Function to get bridge quote
  const { data: bridgeFee } = useReadMagOftAdapterQuoteSend({
    address: BRIDGE_ADDRESS,
    args: [
      {
        dstEid: getDestinationEid(chainId, undefined), // Using undefined for backward compatibility
        to: paddedAddress,
        amountLD: parseEther(amountToBridge),
        minAmountLD: parseEther(amountToBridge),
        composeMsg: "0x",
        oftCmd: "0x",
        extraOptions: LZ_OPTIONS,
      },
      false,
    ],
  });

  // Function to bridge tokens to another chain
  const { writeContractAsync: sendOFT } = useWriteMagOftAdapterSend();
  const bridgeTokens = async (_bridgeFee: any, destinationChainId?: number) => {
    console.info("[useBridge] Initiating bridge:", {
      amountToBridge,
      _bridgeFee,
    });
    try {
      const result = await sendOFT({
        address: BRIDGE_ADDRESS,
        args: [
          {
            dstEid: getDestinationEid(chainId, destinationChainId),
            to: paddedAddress,
            amountLD: parseEther(amountToBridge),
            minAmountLD: parseEther(amountToBridge),
            composeMsg: "0x",
            oftCmd: "0x",
            extraOptions: LZ_OPTIONS,
          },
          {
            nativeFee: _bridgeFee?.nativeFee,
            lzTokenFee: BigInt(0),
          },
          address,
        ],
        value: _bridgeFee?.nativeFee,
      });
      console.info("[useBridge] Bridge tokens successful", result);
      return result;
    } catch (error) {
      window.alert(error);
      console.error("[useBridge] Failed to bridge tokens:", error);
      throw error;
    }
  };

  return { bridgeFee, bridgeTokens };
}
