import { useReadContract, useWriteContract } from "wagmi";
import { parseEther, zeroAddress } from "viem";
import { magTokenABI } from "../abi/magTokenABI";

export const MAG_TOKEN_ADDRESS_ETH: `0x${string}` =
  "0x71da932ccda723ba3ab730c976bc66daaf9c598c";
export const MAG_TOKEN_ADDRESS_BASE: `0x${string}` = zeroAddress;
export const MAG_BRIDGE_ADDRESS: `0x${string}` = zeroAddress;

/**
 * Custom hook for managing token operations with dynamic chain selection
 * @param address - User's wallet address
 * @param chainId - The ID of the chain to use (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useMagToken(address?: string, chainId?: number) {
  // Select the appropriate token address based on the chainId passed as an argument
  const MAG_TOKEN_ADDRESS =
    chainId === 8453 ? MAG_TOKEN_ADDRESS_BASE : MAG_TOKEN_ADDRESS_ETH;

  console.info(
    "[useMagToken] Initializing with address:",
    address,
    "on chainId:",
    chainId,
  );

  // Balance of Token
  const { data: balance } = useReadContract({
    address: MAG_TOKEN_ADDRESS,
    abi: magTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    enabled: !!address,
    onError: (error) => {
      console.error("[useMagToken] Failed to fetch balance:", error);
    },
  });

  // Get Token Allowance
  const useAllowance = (
    ownerAddress: `0x${string}`,
    spenderAddress: `0x${string}`,
  ) => {
    const { data: allowance, error } = useReadContract({
      address: MAG_TOKEN_ADDRESS,
      abi: magTokenABI,
      functionName: "allowance",
      args: [ownerAddress, spenderAddress],
      onError: (error) => {
        console.error("[useMagToken] Failed to fetch allowance:", error);
      },
    });
    return { allowance, error };
  };

  // Approve Token
  const { writeContractAsync: approve } = useWriteContract();
  const handleApprove = async (amount: string, spender: `0x${string}`) => {
    console.info("[useMagToken] Initiating approve:", { amount, spender });
    try {
      await approve({
        address: MAG_TOKEN_ADDRESS,
        abi: magTokenABI,
        functionName: "approve",
        args: [spender, parseEther(amount)],
      });
      console.info("[useMagToken] Approve successful");
    } catch (error) {
      window.alert(error);
      console.error("[useMagToken] Approve failed:", error);
      throw error;
    }
  };

  return {
    balance,
    useAllowance,
    handleApprove,
    approve,
  };
}
