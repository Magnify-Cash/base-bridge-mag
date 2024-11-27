import { useReadContract, useWriteContract } from "wagmi";
import { parseEther, zeroAddress, pad } from "viem";
import { magAdapterABI } from "../abi/magAdapterABI";
import { BRIDGE_ADDRESS, LZ_OPTIONS, getDestinationEid } from "../constants";

/**
 * Custom hook for managing OFT token operations
 * @param address - User's wallet address
 * @param chainId - The current chain ID (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useBridge(address?: string, chainId?: number) {
  // Estimate bridge fee
  const paddedAddress = pad(address as `0x${string}`, { size: 32 });
  const { data: bridgeFee } = useReadContract({
    address: BRIDGE_ADDRESS,
    abi: magAdapterABI,
    functionName: "quoteSend",
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
  const { writeContractAsync: sendOFT } = useWriteContract();
  const bridgeTokens = async (amount: string) => {
    console.info("[useBridge] Initiating bridge:", { amount });
    const paddedAddress = pad(address as `0x${string}`, { size: 32 });
    try {
      const result = await sendOFT({
        address: BRIDGE_ADDRESS,
        abi: magAdapterABI,
        functionName: "send",
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
            nativeFee: bridgeFee?.nativeFee,
            lzTokenFee: 0,
          },
          address || zeroAddress, // refund address, using user address or zero address if null
        ],
      });
      console.info("[useBridge] Bridge tokens successful", result);
    } catch (error) {
      window.alert(error);
      console.error("[useBridge] Failed to bridge tokens:", error);
      throw error;
    }
  };

  // Since the ABI doesn't explicitly show an unbridge function, we assume the send function works for both directions
  const unbridgeTokens = bridgeTokens;

  return { bridgeFee, bridgeTokens, unbridgeTokens };
}
