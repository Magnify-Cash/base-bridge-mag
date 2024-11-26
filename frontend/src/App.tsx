import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        <ConnectKitButton />
      </div>
    </>
  );
}

export default App;
