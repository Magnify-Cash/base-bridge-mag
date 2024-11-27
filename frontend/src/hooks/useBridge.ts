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
export function useBridge(address: `0x${string}`, chainId: number) {
  // Estimate bridge fee
  const paddedAddress = pad(address, { size: 32 });
  // Use the generated ERC-20 "balanceOf" hook
  const { data: bridgeFee } = useReadMagOftAdapterQuoteSend({
    address: BRIDGE_ADDRESS,
    args: [
      {
        dstEid: getDestinationEid(chainId),
        to: paddedAddress,
        amountLD: parseEther("1"), // Example amount, adjust as needed
        minAmountLD: parseEther("0.9"),
        composeMsg: "0x",
        oftCmd: "0x",
        extraOptions: LZ_OPTIONS,
      },
      false, // Not using LZ token for fee
    ],
  });

  // Function to bridge tokens to another chain
  const { writeContractAsync: sendOFT } = useWriteMagOftAdapterSend();
  const bridgeTokens = async (amount: string) => {
    console.info("[useBridge] Initiating bridge:", { amount });
    const paddedAddress = pad(address as `0x${string}`, { size: 32 });
    try {
      const result = await sendOFT({
        address: BRIDGE_ADDRESS,
        args: [
          {
            dstEid: getDestinationEid(chainId),
            to: paddedAddress,
            amountLD: parseEther(amount),
            minAmountLD: parseEther(amount),
            composeMsg: "0x",
            oftCmd: "0x",
            extraOptions: LZ_OPTIONS,
          },
          {
            nativeFee: bridgeFee?.nativeFee || BigInt(0),
            lzTokenFee: BigInt(0),
          },
          address,
        ],
      });
      console.info("[useBridge] Bridge tokens successful", result);
    } catch (error) {
      window.alert(error);
      console.error("[useBridge] Failed to bridge tokens:", error);
      throw error;
    }
  };

  return { bridgeFee, bridgeTokens };
}
