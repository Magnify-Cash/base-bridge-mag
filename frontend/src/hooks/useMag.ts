import { parseEther } from "viem";
import {
  useReadMagTokenBalanceOf,
  useReadMagTokenAllowance,
  useWriteMagTokenApprove,
} from "../generated";
import {
  SOURCE_TOKEN_ADDRESS,
  DESTINATION_TOKEN_ADDRESS,
  SOURCE_CHAIN,
} from "../constants";

/**
 * Custom hook for managing token operations with dynamic chain selection
 * @param address - User's wallet address
 * @param chainId - The ID of the chain to use (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useMagToken(address: string, chainId: number) {
  const MAG_TOKEN_ADDRESS =
    chainId === SOURCE_CHAIN ? SOURCE_TOKEN_ADDRESS : DESTINATION_TOKEN_ADDRESS;
  // Balance of Token
  const { data: balance } = useReadMagTokenBalanceOf({
    address: MAG_TOKEN_ADDRESS,
    args: [address as `0x${string}`],
  });

  // Get Token Allowance
  const useAllowance = (
    ownerAddress: `0x${string}`,
    spenderAddress: `0x${string}`,
  ) => {
    const {
      data: allowance,
      error,
      refetch: refetchAllowance,
    } = useReadMagTokenAllowance({
      address: MAG_TOKEN_ADDRESS,
      args: [ownerAddress, spenderAddress],
    });
    return { allowance, error, refetchAllowance };
  };

  // Approve Token
  const { writeContractAsync: approve } = useWriteMagTokenApprove();
  const handleApprove = async (amount: string, spender: `0x${string}`) => {
    try {
      let result = await approve({
        address: MAG_TOKEN_ADDRESS,
        args: [spender, parseEther(amount)],
      });
      console.info("[useMagToken] Approve successful");
      return result;
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
