import { parseEther, pad } from "viem";
import {
  useReadMagOftBalanceOf,
  useWriteMagOftSend,
  useReadMagOftQuoteSend,
} from "../generated";
import {
  DESTINATION_TOKEN_ADDRESS,
  LZ_OPTIONS,
  getDestinationEid,
} from "../constants";

/**
 * Custom hook for managing token operations with dynamic chain selection
 * @param address - User's wallet address
 * @param chainId - The ID of the chain to use (e.g., 1 for Ethereum, 8453 for Base)
 * @returns Object containing token operations and data
 */
export function useMagOft(
  address: `0x${string}`,
  chainId: number,
  amount: string,
) {
  const paddedAddress = pad(address, { size: 32 });
  // Balance of Token
  const { data: balance } = useReadMagOftBalanceOf({
    address: DESTINATION_TOKEN_ADDRESS,
    args: [address as `0x${string}`],
  });

  // Function to get bridge quote
  const { data: bridgeFee } = useReadMagOftQuoteSend({
    address: DESTINATION_TOKEN_ADDRESS,
    args: [
      {
        dstEid: getDestinationEid(chainId, undefined), // Using undefined for backward compatibility
        to: paddedAddress,
        amountLD: parseEther(amount),
        minAmountLD: parseEther(amount),
        composeMsg: "0x",
        oftCmd: "0x",
        extraOptions: LZ_OPTIONS,
      },
      false,
    ],
  });

  // Approve Token
  const { writeContractAsync: send } = useWriteMagOftSend();
  const bridgeTokensBack = async (destinationChainId?: number) => {
    try {
      const result = await send({
        address: DESTINATION_TOKEN_ADDRESS,
        args: [
          {
            dstEid: getDestinationEid(chainId, destinationChainId),
            to: paddedAddress,
            amountLD: parseEther(amount),
            minAmountLD: parseEther(amount),
            composeMsg: "0x",
            oftCmd: "0x",
            extraOptions: LZ_OPTIONS,
          },
          {
            nativeFee: bridgeFee!.nativeFee,
            lzTokenFee: BigInt(0),
          },
          address,
        ],
        value: bridgeFee?.nativeFee,
      });
      console.info("[useMagToken] Send successful");
      return result;
    } catch (error) {
      window.alert(error);
      console.error("[useMagToken] Send failed:", error);
      throw error;
    }
  };

  return {
    balance,
    bridgeTokensBack,
  };
}
