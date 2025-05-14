import { useEffect, useState } from "react";
import {
  SOURCE_CHAIN,
  DESTINATION_CHAIN,
  BRIDGE_ADDRESS,
  getChainName,
  getAvailableDestinations,
  WORLDCHAIN,
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
    }
  };

  // MAG bridge & OFT hooks
  const [amountToBridge, setAmountToBridge] = useState("0");
  
  // State for selected destination chain
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  
  // Get available destination chains
  const availableDestinations = getAvailableDestinations(chainId);
  
  // Initialize selected destination when chain changes or component mounts
  useEffect(() => {
    if (availableDestinations.length > 0) {
      setSelectedDestination(availableDestinations[0]);
    } else {
      setSelectedDestination(null);
    }
  }, [chainId, availableDestinations]);
  const { bridgeTokens, bridgeFee } = useBridge(
    address,
    chainId,
    amountToBridge,
  );
  const { bridgeTokensBack } = useMagOft(address, chainId, amountToBridge);
  const bridge = async () => {
    if (!selectedDestination) {
      console.error("No destination chain selected");
      return;
    }
    
    setIsBridging(true);
    try {
      let bridgeTxHash;
      
      // Bridge logic based on current chain and selected destination
      if (chainId === SOURCE_CHAIN) {
        // Bridge from Ethereum to the selected destination (Base or Worldchain)
        bridgeTxHash = await bridgeTokens(bridgeFee, selectedDestination);
        setTxHash(`https://layerzeroscan.com/tx/${bridgeTxHash}` as string);
      } else if (chainId === DESTINATION_CHAIN || chainId === WORLDCHAIN) {
        // Bridge from Base or Worldchain to the selected destination
        bridgeTxHash = await bridgeTokensBack(selectedDestination);
        setTxHash(`https://layerzeroscan.com/tx/${bridgeTxHash}` as string);
      }
    } catch (error) {
      console.error("Bridge operation failed:", error);
    }
  };

  // State & hooks for managing transaction hash and loading states
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const { data, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: (txHash?.split("/").pop() as `0x${string}`) || "",
  });
  useEffect(() => {
    if (isSuccess || isError) {
      refetchAllowance();
      setIsBridging(false);
      setIsApproving(false);
    }
  }, [isSuccess, isError, refetchAllowance]);

  return (
    <div className="space-y-4">
      <div className="space-y-3 mb-4">
        <label
          htmlFor="destination-chain"
          className="block text-sm font-medium text-gray-700"
        >
          Destination Chain
        </label>
        <select
          id="destination-chain"
          value={selectedDestination || ""}
          onChange={(e) => setSelectedDestination(Number(e.target.value))}
          className="w-full bg-white border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 shadow-sm"
        >
          {availableDestinations.map(chainId => (
            <option key={chainId} value={chainId}>
              {getChainName(chainId)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="space-y-3">
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
            className="w-full bg-white border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 shadow-sm"
          />
          <button
            onClick={() => setAmountToBridge(formatEther(balance as bigint))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            MAX
          </button>
        </div>
      </div>
      {/* Bridge button changes based on current chain and approval status */}
      {chainId === SOURCE_CHAIN ? (
        <button
          onClick={
            allowance === BigInt(0) ||
            (allowance && allowance < parseEther(amountToBridge))
              ? approve
              : bridge
          }
          disabled={
            !amountToBridge ||
            parseFloat(amountToBridge) <= 0 ||
            isApproving ||
            isBridging
          }
          className="w-full bg-[#FF7777] hover:bg-[#ff5555] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-semibold"
        >
          {isApproving || isBridging
            ? "Processing..."
            : allowance === BigInt(0) ||
                (allowance && allowance < parseEther(amountToBridge))
              ? "Approve Tokens"
              : `Bridge to ${selectedDestination ? getChainName(selectedDestination) : 'Selected Chain'}`}
        </button>
      ) : (
        <button
          onClick={bridge}
          disabled={
            !amountToBridge ||
            parseFloat(amountToBridge) <= 0 ||
            isApproving ||
            isBridging
          }
          className="w-full bg-[#FF7777] hover:bg-[#ff5555] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-semibold"
        >
          {isApproving || isBridging
            ? "Processing..."
            : `Bridge to ${selectedDestination ? getChainName(selectedDestination) : 'Selected Chain'}`}
        </button>
      )}

      {isError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-500 mt-4">
          Transaction failed. Please try again.
        </div>
      )}
      {isSuccess && data && txHash && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-600 mt-4">
          <p className="mb-2">Transaction successful!</p>
          <a
            target="_blank"
            href={txHash}
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
          >
            View Transaction Receipt
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 rounded-xl border border-gray-100">
          <span className="text-gray-600">
            Balance on{" "}
            {chainId === SOURCE_CHAIN
              ? `${getChainName(SOURCE_CHAIN)}`
              : `${getChainName(DESTINATION_CHAIN)}`}
          </span>
          <span className="font-medium text-purple-600">
            {balance ? formatEther(balance) : "0"} MAG
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-purple-600 text-2xl font-bold mb-1">20%</div>
            <div className="text-gray-500 text-xs">Max APY</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-purple-600 text-2xl font-bold mb-1">3</div>
            <div className="text-gray-500 text-xs">Networks</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-purple-600 text-2xl font-bold mb-1">0.1%</div>
            <div className="text-gray-500 text-xs">Bridge Fee</div>
          </div>
        </div>
      </div>
    </div>
  );
};
