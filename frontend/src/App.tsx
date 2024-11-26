import { useState, useCallback } from "react";
import { formatEther } from "viem";
//import { useReadContract } from "wagmi";
import { Coins, ArrowRightLeft } from "lucide-react";
//import { magTokenABI } from "../contracts/magToken";
//import { useBridge } from "../hooks/useBridge"; // Assuming you have a hook for bridge operations
import { ConnectKitButton } from "connectkit";

interface BridgeProps {
  isConnected: boolean;
  address?: string;
}

const App = ({ isConnected, address }: BridgeProps) => {
  /*
  const {
    bridgeTokens, // Function to bridge tokens from source to destination
    unbridgeTokens, // Function to bridge tokens back to the source
    sourceBalance,
    destinationBalance,
    fetchSourceBalance,
    fetchDestinationBalance,
  } = useBridge(address); */

  const [amountToBridge, setAmountToBridge] = useState("");
  const [direction, setDirection] = useState<"toDest" | "toSource">("toDest");
  const sourceBalance = BigInt(10);
  const destinationBalance = BigInt(50);
  /*
  useEffect(() => {
    if (isConnected && address) {
      fetchSourceBalance();
      fetchDestinationBalance();
    }
  }, [isConnected, address, fetchSourceBalance, fetchDestinationBalance]);

  const handleBridge = useCallback(async () => {
    if (
      !amountToBridge ||
      isNaN(parseFloat(amountToBridge)) ||
      parseFloat(amountToBridge) <= 0
    )
      return;

    try {
      if (direction === "toDest") {
        await bridgeTokens(parseEther(amountToBridge));
        console.info("Tokens bridged to destination chain");
      } else {
        await unbridgeTokens(parseEther(amountToBridge));
        console.info("Tokens bridged back to source chain");
      }
      setAmountToBridge("");
    } catch (error) {
      console.error("Failed to bridge tokens:", error);
    }
  }, [amountToBridge, bridgeTokens, unbridgeTokens, direction]);


  */

  const handleDirectionChange = () => {
    setDirection((prev) => (prev === "toDest" ? "toSource" : "toDest"));
  };

  const handleMaxAmount = useCallback(() => {
    if (direction === "toDest" && sourceBalance) {
      setAmountToBridge(formatEther(sourceBalance));
    } else if (destinationBalance) {
      setAmountToBridge(formatEther(destinationBalance));
    }
  }, [direction, sourceBalance, destinationBalance]);

  const handleBridge = () => {
    console.log("bridging..");
  };

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
              onClick={() => {}} // Placeholder for disconnect function
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
                {direction === "toDest"
                  ? "Bridge to Base"
                  : "Bridge Back to Ethereum"}
              </h3>
              <ArrowRightLeft
                className="w-8 h-8 text-[#FF7777] cursor-pointer"
                onClick={handleDirectionChange}
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
                    onClick={handleMaxAmount}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#FF7777] hover:text-[#ff5555] font-medium"
                  >
                    MAX
                  </button>
                </div>
              </div>

              <button
                onClick={handleBridge}
                disabled={!amountToBridge || parseFloat(amountToBridge) <= 0}
                className="w-full bg-[#FF7777] hover:bg-[#ff5555] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-semibold"
              >
                {direction === "toDest"
                  ? "Bridge to Base"
                  : "Bridge Back to Ethereum"}
              </button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between py-2 px-4 bg-white/20 rounded-lg">
                  <span className="text-gray-600">Source Chain Balance</span>
                  <span className="font-medium text-[#FF7777]">
                    {sourceBalance ? formatEther(sourceBalance) : "0"} MAG
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-4 bg-white/20 rounded-lg">
                  <span className="text-gray-600">
                    Destination Chain Balance
                  </span>
                  <span className="font-medium text-[#FF7777]">
                    {destinationBalance ? formatEther(destinationBalance) : "0"}{" "}
                    MAG
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
