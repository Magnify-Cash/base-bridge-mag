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
import { useMagOft } from "./hooks/useOFT";
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
      setTxHash(approvalTxHash as string);
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      setIsApproving(false);
    }
  };

  // MAG bridge & OFT hooks
  const [amountToBridge, setAmountToBridge] = useState("0");
  const { bridgeTokens, bridgeFee } = useBridge(
    address,
    chainId,
    amountToBridge,
  );
  const { bridgeTokensBack } = useMagOft(address, chainId, amountToBridge);
  const bridge = async () => {
    setIsBridging(true);
    try {
      let bridgeTxHash;
      if (chainId === SOURCE_CHAIN) {
        // Use the bridge tokens function for moving tokens from source to destination
        bridgeTxHash = await bridgeTokens(bridgeFee);
        setTxHash(`https://layerzeroscan.com/tx/${bridgeTxHash}` as string);
      } else if (chainId === DESTINATION_CHAIN) {
        // Use the bridge tokens back function for moving tokens back to the source
        bridgeTxHash = await bridgeTokensBack();
        setTxHash(`https://layerzeroscan.com/tx/${bridgeTxHash}` as string);
      }
    } catch (error) {
      console.error("Bridge operation failed:", error);
    } finally {
      setIsBridging(false);
    }
  };

  // State & hooks for managing transaction hash and loading states
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const { data, isSuccess, isLoading, isError } = useWaitForTransactionReceipt({
    hash: txHash?.split("/").pop() as `0x${string}`,
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
      {chainId === SOURCE_CHAIN ? (
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
              : `Bridge to ${getChainName(DESTINATION_CHAIN)}`}
        </button>
      ) : (
        <button
          onClick={bridge}
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
            : `Bridge to ${getChainName(SOURCE_CHAIN)}`}
        </button>
      )}

      {isError && (
        <p className="text-red-500">Transaction failed. Please try again.</p>
      )}
      {isSuccess && data && txHash && (
        <div>
          <p className="text-green-500">Transaction successful!</p>
          <a
            target="_blank"
            href={txHash}
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Transaction Receipt
          </a>
        </div>
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
