import { useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import {
  SOURCE_CHAIN,
  DESTINATION_CHAIN,
  BRIDGE_ADDRESS,
  LZ_OPTIONS,
  getDestinationEid,
} from "./constants";
import { useSimulateMagOftAdapterSend } from "./generated";
import { formatEther, parseEther, pad } from "viem";
import { ArrowRightLeft } from "lucide-react";
import { useMagToken } from "./hooks/useMag";
import { useBridge } from "./hooks/useBridge";
import { magAdapterABI } from "./abi/magAdapterABI";

export const Bridge = () => {
  // Wagmi hooks
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  // MAG token hooks
  const { balance, handleApprove } = useMagToken(address, chainId);

  // MAG bridge hooks
  const [amountToBridge, setAmountToBridge] = useState("");
  const { bridgeTokens, bridgeFee } = useBridge(address, chainId);
  const handleBridge = async () => {
    await handleApprove(amountToBridge, BRIDGE_ADDRESS);
    await bridgeTokens(amountToBridge);
  };
  const paddedAddress = pad(address as `0x${string}`, { size: 32 });
  const result = useSimulateMagOftAdapterSend({
    address: BRIDGE_ADDRESS,
    args: [
      {
        dstEid: getDestinationEid(chainId),
        to: paddedAddress,
        amountLD: parseEther(amountToBridge),
        minAmountLD: parseEther(amountToBridge),
        composeMsg: "0x",
        oftCmd: "0x",
        extraOptions: LZ_OPTIONS,
      },
      {
        nativeFee: bridgeFee?.nativeFee || BigInt(0),
        lzTokenFee: BigInt(0),
      },
      address as `0x${string}`,
    ],
  });
  console.log(result);

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">MAG Token Bridge</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Transfer MAG tokens between chains securely and instantly with our
          cross-chain bridge.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-[#FF7777]/20 transition-all duration-300 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {chainId === SOURCE_CHAIN
                ? "Bridge to Destination"
                : "Bridge Back to Source"}
            </h3>
            <ArrowRightLeft
              className="w-8 h-8 text-[#FF7777] cursor-pointer"
              onClick={() => {
                if (chainId === SOURCE_CHAIN) {
                  switchChain({ chainId: DESTINATION_CHAIN });
                } else {
                  switchChain({ chainId: SOURCE_CHAIN });
                }
              }}
            />
          </div>

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
                  onClick={() =>
                    setAmountToBridge(formatEther(balance as bigint))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#FF7777] hover:text-[#ff5555] font-medium"
                >
                  MAX
                </button>
              </div>
            </div>

            <button
              onClick={() => handleBridge()}
              disabled={!amountToBridge || parseFloat(amountToBridge) <= 0}
              className="w-full bg-[#FF7777] hover:bg-[#ff5555] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-semibold"
            >
              {chainId === SOURCE_CHAIN
                ? "Bridge to Destination"
                : "Bridge Back to Source"}
            </button>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-2 px-4 bg-white/20 rounded-lg">
                <span className="text-gray-600">
                  Balance on{" "}
                  {chainId === SOURCE_CHAIN ? SOURCE_CHAIN : DESTINATION_CHAIN}
                </span>
                <span className="font-medium text-[#FF7777]">
                  {balance ? formatEther(balance) : "0"} MAG
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
