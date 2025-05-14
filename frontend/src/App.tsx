import { useAccount, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { Diamond, ArrowRightLeft, MessageSquareText } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { Bridge } from "./Bridge";
import { SOURCE_CHAIN, DESTINATION_CHAIN, getChainName } from "./constants";

const App = () => {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="p-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Diamond className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-600">Magnify Cash</h1>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="text-gray-500 hover:text-purple-600">Market Opportunity</a>
          <a href="#" className="text-gray-500 hover:text-purple-600">Ecosystem</a>
          <a href="#" className="text-gray-500 hover:text-purple-600">Roadmap</a>
          <a href="#" className="text-gray-500 hover:text-purple-600">How Borrowing Works</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 border-b-2 border-purple-600 pb-4">Token Bridge</a>
          <a href="#" className="text-gray-500 hover:text-purple-600">$MAG</a>
        </div>
        {isConnected ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-gray-100 px-4 py-2 rounded-full font-medium">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button
              onClick={() => disconnect()}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-full transition-colors font-medium"
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
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-2 rounded-full transition-colors font-medium"
                >
                  Connect Wallet
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        )}
      </nav>
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">Unlock Financial Freedom</h2>
          <h3 className="text-4xl mb-8 font-medium">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Bridge your MAG tokens between chains
            </span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience seamless, gasless transactions—all in one platform.
            Transfer your MAG tokens between Ethereum, Base, and Worldchain securely and instantly.
          </p>
          <div className="flex justify-center space-x-3 items-center mt-6">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-100 text-purple-700">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Live MAG Token Bridge
            </div>
          </div>
        </div>
        {isConnected ? (
          <main className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {chainId === SOURCE_CHAIN
                      ? `Bridge to ${getChainName(DESTINATION_CHAIN)}`
                      : `Bridge to ${getChainName(SOURCE_CHAIN)}`}
                  </h3>
                  <ArrowRightLeft
                    className="w-8 h-8 text-purple-600 cursor-pointer"
                    onClick={() => {
                      if (chainId === SOURCE_CHAIN) {
                        switchChain({ chainId: DESTINATION_CHAIN });
                      } else {
                        switchChain({ chainId: SOURCE_CHAIN });
                      }
                    }}
                  />
                </div>
                <Bridge address={address as `0x${string}`} chainId={chainId} />
              </div>
            </div>
          </main>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-[#FF7777]/20 transition-all duration-300 shadow-xl">
              <div className="flex justify-center items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  Connect wallet to bridge...
                </h3>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center py-8 text-gray-500 border-t border-gray-100">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <a href="#" className="text-purple-600 hover:text-purple-700">
            <MessageSquareText size={20} />
          </a>
          <span>Join our community!</span>
        </div>
        <p>© 2024 Magnify Cash. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
