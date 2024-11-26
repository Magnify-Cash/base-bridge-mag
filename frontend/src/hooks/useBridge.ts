import { useReadContract, useWriteContract } from "wagmi";
import { parseEther, zeroAddress, pad } from "viem";
import { magAdapterABI } from "../abi/magAdapterABI";

export const MAG_TOKEN_ADDRESS_ETH: `0x${string}` =
  "0x71da932ccda723ba3ab730c976bc66daaf9c598c";
export const MAG_TOKEN_ADDRESS_BASE: `0x${string}` = zeroAddress; // Replace with actual address

/**
 * Custom hook for managing OFT token operations
 * @param address - User's wallet address
 * @param chainId - The current chain ID (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useBridge(address?: string, chainId?: number) {
  const MAG_TOKEN_ADDRESS =
    chainId === 8453 ? MAG_TOKEN_ADDRESS_BASE : MAG_TOKEN_ADDRESS_ETH;

  console.info(
    "[useBridge] Initializing with address:",
    address,
    "on chainId:",
    chainId,
  );

  // Define extra options as per the test case
  const options = "0x00030d40"; // Assuming the options are encoded in this format. This should be dynamic based on your requirements.

  // Estimate bridge fee
  const { data: bridgeFee } = useReadContract({
    address: MAG_TOKEN_ADDRESS,
    abi: magAdapterABI,
    functionName: "quoteSend",
    args: [
      {
        dstEid: chainId === 1 ? 8453 : 1,
        to: address ? pad(address, { size: 32 }) : zeroAddress,
        amountLD: parseEther("1"), // Example amount, adjust as needed
        minAmountLD: parseEther("0.9"),
        extraOptions: options,
        composeMsg: "0x",
        oftCmd: "0x",
      },
      false, // Not using LZ token for fee
    ],
    enabled: !!address && !!chainId,
    onError: (error) => {
      console.error("[useBridge] Failed to estimate bridge fee:", error);
    },
  });

  // Function to bridge tokens to another chain
  const { writeContractAsync: sendOFT } = useWriteContract();
  const bridgeTokens = async (amount: string) => {
    console.info("[useBridge] Initiating bridge:", { amount });
    const paddedAddress = pad(address, { size: 32 });
    try {
      const result = await sendOFT({
        address: MAG_TOKEN_ADDRESS,
        abi: magAdapterABI,
        functionName: "send",
        args: [
          {
            dstEid: chainId === 1 ? 8453 : 1, // Assuming 8453 is Base chain ID, adjust if different
            to: paddedAddress,
            amountLD: parseEther(amount),
            minAmountLD: parseEther(amount), // Setting minAmountLD to the same as amount for no slippage
            extraOptions: options,
            composeMsg: "0x",
            oftCmd: "0x",
          },
          {
            nativeFee: 0,
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
