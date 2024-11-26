import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { Coins, ArrowRightLeft } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useMagToken } from "./hooks/useMag";
import { useBridge } from "./hooks/useBridge";
import { SOURCE_CHAIN, DESTINATION_CHAIN } from "./constants";

const App = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  // MAG token hooks
  const { balance, useAllowance, handleApprove } = useMagToken(
    address,
    chainId,
  );

  // MAG bridge hooks
  const [amountToBridge, setAmountToBridge] = useState("");
  const { bridgeFee, bridgeTokens, unbridgeTokens } = useBridge(
    address,
    chainId,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2DFFF9] via-[#DAEFFF] to-[#FF7777] text-gray-800">
      <nav className="p-6 flex justify-between items-center backdrop-blur-md bg-white/10">
        <div className="flex items-center space-x-2">
          <Coins className="w-8 h-8 text-[#FF7777]" />
          <h1 className="text-2xl font-bold">MAG Token Bridge</h1>
        </div>
        {/* Assuming you keep the same wallet connection UI */}
        {isConnected ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-lg">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button
              onClick={() => disconnect()} // Placeholder for disconnect function
              className="bg-[#FF7777] hover:bg-[#ff5555] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <ConnectKitButton.Custom>
            {({ show }) => {
              return (
                <button
                  onClick={show}
                  className="bg-[#FF7777] hover:bg-[#ff5555] text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                >
                  Connect Wallet
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        )}
      </nav>

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
                    onClick={() => setAmountToBridge(formatEther(balance))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#FF7777] hover:text-[#ff5555] font-medium"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <button
                onClick={() => bridgeTokens(amountToBridge)}
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
                    {chainId === SOURCE_CHAIN
                      ? SOURCE_CHAIN
                      : DESTINATION_CHAIN}
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
      <footer className="text-center py-6 text-gray-600 backdrop-blur-md bg-white/10">
        <p>© 2024 MAG Token Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
