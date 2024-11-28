import { useEffect, useState } from "react";
import {
  SOURCE_CHAIN,
  DESTINATION_CHAIN,
  BRIDGE_ADDRESS,
  getChainName,
} from "./constants";
import { formatEther, parseEther } from "viem";
import { useMagToken } from "./hooks/useMag";
import { useBridge } from "./hooks/useBridge";
import { useWaitForTransactionReceipt } from "wagmi";

export const Bridge = ({
  address,
  chainId,
}: {
  address: `0x${string}`;
  chainId: number;
}) => {
  // MAG token hooks
  const { balance, handleApprove, useAllowance } = useMagToken(
    address,
    chainId,
  );
  const { allowance, refetchAllowance } = useAllowance(address, BRIDGE_ADDRESS);
  const approve = async () => {
    setIsApproving(true);
    try {
      const approvalTxHash = await handleApprove(
        amountToBridge,
        BRIDGE_ADDRESS,
      );
      setTxHash(approvalTxHash);
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      setIsApproving(false);
    }
  };

  // MAG bridge hooks
  const [amountToBridge, setAmountToBridge] = useState("0");
  const { bridgeTokens, bridgeFee } = useBridge(
    address,
    chainId,
    amountToBridge,
  );
  const bridge = async () => {
    setIsBridging(true);
    try {
      const bridgeTxHash = await bridgeTokens(bridgeFee);
      setTxHash(bridgeTxHash);
    } catch (error) {
      console.error("Bridge failed:", error);
    } finally {
      setIsBridging(false);
    }
  };

  // State & hooks for managing transaction hash and loading states
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const { data, isSuccess, isLoading, isError } = useWaitForTransactionReceipt({
    hash: txHash,
    enabled: !!txHash,
    onSuccess: () => {
      refetchAllowance();
    },
    onReplaced: (replacement) =>
      console.log("Transaction replaced:", replacement),
  });
  useEffect(() => {
    if (isSuccess) {
      refetchAllowance();
    }
  }, [isSuccess, refetchAllowance]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="bridge-amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount to Bridge
        </label>
        <div className="relative">
          <input
            id="bridge-amount"
            type="number"
            value={amountToBridge}
            onChange={(e) => setAmountToBridge(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-white/50 border border-[#FF7777]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF7777] text-gray-800"
          />
          <button
            onClick={() => setAmountToBridge(formatEther(balance as bigint))}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#FF7777] hover:text-[#ff5555] font-medium"
          >
            MAX
          </button>
        </div>
      </div>

      <button
        onClick={
          allowance === BigInt(0) || allowance < parseEther(amountToBridge)
            ? approve
            : bridge
        }
        disabled={
          !amountToBridge ||
          parseFloat(amountToBridge) <= 0 ||
          isLoading || // Disable during transaction processing
          isApproving ||
          isBridging
        }
        className="w-full bg-[#FF7777] hover:bg-[#ff5555] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-semibold"
      >
        {isLoading
          ? "Processing..."
          : allowance === BigInt(0) || allowance < parseEther(amountToBridge)
            ? "Approve Tokens"
            : `Bridge to ${getChainName(chainId === SOURCE_CHAIN ? DESTINATION_CHAIN : SOURCE_CHAIN)}`}
      </button>

      {isError && (
        <p className="text-red-500">Transaction failed. Please try again.</p>
      )}
      {isSuccess && data && (
        <p className="text-green-500">Transaction successful!</p>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between py-2 px-4 bg-white/20 rounded-lg">
          <span className="text-gray-600">
            Balance on{" "}
            {chainId === SOURCE_CHAIN
              ? `${getChainName(SOURCE_CHAIN)}`
              : `${getChainName(DESTINATION_CHAIN)}`}
          </span>
          <span className="font-medium text-[#FF7777]">
            {balance ? formatEther(balance) : "0"} MAG
          </span>
        </div>
      </div>
    </div>
  );
};
