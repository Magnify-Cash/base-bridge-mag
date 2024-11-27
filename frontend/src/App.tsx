import { useAccount, useDisconnect } from "wagmi";
import { Coins } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { Bridge } from "./Bridge";

const App = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
      {isConnected ? (
        <Bridge />
      ) : (
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
              <div className="flex justify-center items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  Connect wallet to bridge...
                </h3>
              </div>
            </div>
          </div>
        </main>
      )}
      <footer className="text-center py-6 text-gray-600 backdrop-blur-md bg-white/10">
        <p>© 2024 MAG Token Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
