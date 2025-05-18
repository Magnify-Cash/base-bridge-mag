# Magnify Cash (MAG) Token Bridge

This project implements a LayerZero Omnichain Fungible Token (OFT) bridge for the Magnify Cash (MAG) token, enabling transfers between Ethereum Mainnet and Base Mainnet.

## Project Overview

The bridge allows users to transfer MAG tokens from its native chain (Ethereum) to Base Mainnet, and vice-versa. It leverages LayerZero v2 messaging infrastructure for cross-chain communication.

- **Native Chain (Source):** Ethereum Mainnet (Chain ID: 1)
- **Destination Chain:** Base Mainnet (Chain ID: 8453)
- **Token:** Magnify Cash (MAG)

## Architecture

The project is a monorepo composed of a backend (smart contracts and deployment) and a frontend (React-based user interface).

### Backend (`./backend`)

- **Smart Contracts (`./contracts`):
  - `MagOFTAdapter.sol`: Deployed on the native chain (Ethereum). It wraps the existing MAG ERC20 token to make it LayerZero-compatible. Users interact with this contract to send tokens from Ethereum to Base.
  - `MagOFT.sol`: Deployed on destination chains (Base). It's a standard OFT contract that represents the bridged MAG token. Users interact with this contract to send tokens from Base back to Ethereum.
- **Deployment (`./deploy`):
  - Uses Hardhat (`hardhat-deploy` plugin) for deploying contracts.
  - `MagOFTAdapter.ts`: Deployment script for `MagOFTAdapter.sol`.
  - `MagOFT.ts`: Deployment script for `MagOFT.sol`.
- **Configuration:
  - `hardhat.config.ts`: Configures Hardhat, networks (RPCs, EIDs, deployer accounts), and specifies the native MAG token address for the adapter.
  - `layerzero.config.ts`: Defines the LayerZero omni-chain application graph, specifying contract instances on different chains and their communication pathways.
  - `.env` (required, from `.env.example`): Stores sensitive information like `MNEMONIC` or `PRIVATE_KEY` for deployment, and RPC URLs.
- **Dependencies:** LayerZero SDK (`@layerzerolabs/oft-evm`, `@layerzerolabs/toolbox-hardhat`), OpenZeppelin Contracts, Ethers.js, Hardhat.

### Frontend (`./frontend`)

- **Framework:** React with Vite and TypeScript.
- **Styling:** Tailwind CSS.
- **Web3 Interaction:
  - `wagmi`: For React hooks interacting with Ethereum.
  - `ConnectKit`: For wallet connection UI.
  - `viem`: For low-level Ethereum interactions.
- **Key Components & Files (`./src`):
  - `App.tsx`: Main application component, handles layout, wallet connection, and chain switching logic.
  - `Bridge.tsx`: Core UI component for amount input, initiating approval, and bridge transactions.
  - `constants.ts`: Centralizes important addresses, chain IDs, and LayerZero configuration values.
  - `wagmi.ts`: Configures `wagmi` and `ConnectKit` with supported chains and app metadata.
  - `generated.ts`: Contains Wagmi-generated hooks for interacting with smart contract ABIs (likely from `wagmi CLI`).
  - **Custom Hooks (`./hooks`):
    - `useMag.ts` (`useMagToken`): Manages MAG ERC20 token interactions (balance, allowance, approve) on the connected chain.
    - `useBridge.ts` (`useBridge`): Handles interactions with `MagOFTAdapter.sol` for bridging from source chain (Ethereum), including quoting send fees and executing the `send` transaction.
    - `useOFT.ts` (`useMagOft`): Handles interactions with `MagOFT.sol` for bridging from destination chains (Base), including quoting send fees and executing the `send` transaction.
- **ABI Directory (`./abi`):** Contains JSON ABI files for the smart contracts, used by `wagmi CLI` to generate typed hooks.

## Key Configuration & Addresses

### Backend (`hardhat.config.ts`)

- **Solidity Compiler:** `^0.8.22`
- **Networks Defined:** `ethereum`, `base` (Testnets like Sepolia, Base Sepolia are commented out).
- **Ethereum Mainnet (Source Chain - Native Token):
  - LayerZero Endpoint ID: `EndpointId.ETHEREUM_V2_MAINNET`
  - Native MAG Token Address (`oftAdapter.tokenAddress`): `0x71DA932ccdA723BA3ab730C976bC66DaAF9C598c`
- **Base Mainnet (Destination Chain):
  - LayerZero Endpoint ID: `EndpointId.BASE_V2_MAINNET`

### Frontend (`frontend/src/constants.ts`)

- **`SOURCE_CHAIN`**: `1` (Ethereum Mainnet)
- **`DESTINATION_CHAIN`**: `8453` (Base Mainnet)
- **`BRIDGE_ADDRESS` (`MagOFTAdapter` on Ethereum):** `0xB5c6D23c2a29E40fe8C79AcfED435cb48AF02d68`
- **`SOURCE_TOKEN_ADDRESS` (MAG on Ethereum):** `0x71DA932ccdA723BA3ab730C976bC66DaAF9C598c`
- **`DESTINATION_TOKEN_ADDRESS` (`MagOFT` on Base):** `0x59F680F431f5280e7662b96F2DFA195D1693852d`
- **`LZ_OPTIONS`**: `"0x0003010011010000000000000000000000000000ea60"` (Default LayerZero options)

## Setup & Usage

### Backend

1.  Navigate to the `backend` directory.
2.  Create a `.env` file from `.env.example` and fill in:
    - `MNEMONIC` or `PRIVATE_KEY` for the deployer account.
    - RPC URLs for Ethereum (`RPC_URL_ETHEREUM_MAINNET`), Base (`RPC_URL_BASE_MAINNET`), etc. (Ensure these match the networks in `hardhat.config.ts`). **See "Important Notes" regarding specific RPC endpoints.**
3.  Install dependencies: `yarn install`
4.  Deploy contracts:
    - To deploy `MagOFTAdapter` (on Ethereum): `npx hardhat deploy --network ethereum --tags MagOFTAdapter`
    - To deploy `MagOFT` (on Base): `npx hardhat deploy --network base --tags MagOFT`

### Frontend

1.  Navigate to the `frontend` directory.
2.  Install dependencies: `yarn install`
3.  (Optional) Create a `.env` file if you need to set `VITE_WALLETCONNECT_PROJECT_ID` (see Notes).
4.  Run the development server: `yarn dev`
5.  Open your browser to the local URL provided.

## Important Notes & Points for Review

1.  **RPC Configuration (`hardhat.config.ts` & `.env`):
    - The `hardhat.config.ts` currently uses generic RPC URLs (`https://base.llamarpc.com`, `https://eth.llamarpc.com`) or mislabelled environment variables (e.g., `process.env.RPC_URL_SEPOLIA` for Base Mainnet).
    - **Critical:** Memory `a44153c0-d70b-488c-82ff-425610993073` specifies mandatory QuikNode RPCs for Base Mainnet and WorldChain Mainnet:
        - Base Mainnet: `https://boldest-distinguished-wildflower.base-mainnet.quiknode.pro/eb565352d8db98b10136b8cc7faf1edfab01d8ae`
        - WorldChain Mainnet: `https://boldest-distinguished-wildflower.worldchain-mainnet.quiknode.pro/eb565352d8db98b10136b8cc7faf1edfab01d8ae`
    - **Action Required:** Update `hardhat.config.ts` and `.env.example` to reflect these required RPC endpoints for Base. If an Ethereum Mainnet specific RPC is required, it should also be consistently configured.

2.  **`BRIDGE_ADDRESS` Discrepancy (`MagOFTAdapter` on Ethereum):
    - `frontend/src/constants.ts` uses `0xB5c6D23c2a29E40fe8C79AcfED435cb48AF02d68`.
    - Memory `08ccbd22-fad7-4c77-9f43-7bb2171ca482` refers to issues with `quoteSend` on an older address `0x535Dc42F47eEc302921Ca9ba4f24B847b7D8650e`.
    - **Action Required:** Verify that `0xB5c6...` is the correct, audited, and functional deployment. Document the status of the older `0x535Dc...` address if relevant.

3.  **`DESTINATION_TOKEN_ADDRESS` Discrepancy (`MagOFT` on Base):
    - `frontend/src/constants.ts` uses `0x59F680F431f5280e7662b96F2DFA195D1693852d`.
    - Memory `07f9a992-2333-4c25-921a-bacf40c733ea` states this address (and `WORLDCHAIN_TOKEN_ADDRESS`) is `0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1`.
    - **Action Required:** Verify the correct deployed `MagOFT` address on Base Mainnet and update `constants.ts` if necessary. Clarify if the `0x1940a...` address is for a different deployment or network (e.g., WorldChain).

4.  **WalletConnect Project ID (`frontend/src/wagmi.ts`):
    - `walletConnectProjectId` is currently empty.
    - **Action Required:** Obtain a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) and set it in `wagmi.ts` or via an environment variable (e.g., `VITE_WALLETCONNECT_PROJECT_ID`) for WalletConnect to function in deployed/production environments.

5.  **Frontend App Metadata (`frontend/src/wagmi.ts`):
    - `appUrl` and `appIcon` point to `family.co`. These should be updated to reflect the actual application's URL and branding.

6.  **WorldChain Integration:
    - Several memories (`user_global`, `a44153c0-d70b-488c-82ff-425610993073`) refer to WorldChain (Chain ID 480). The current implementation focuses on Ethereum-Base.
    - If WorldChain support is planned, the contracts, configurations (`hardhat.config.ts`, `layerzero.config.ts`), and frontend (`constants.ts`, `wagmi.ts`) will need to be extended.

7.  **Testnet Configuration:
    - Testnet configurations (Sepolia, Base Sepolia) are commented out in `hardhat.config.ts` and `frontend/src/constants.ts` (though `wagmi.ts` includes them).
    - For robust testing and development, these should be uncommented, correctly configured with appropriate RPCs and test token/contract addresses, and used in CI/staging.

8.  **LayerZero `quoteSend` Issue (Memory `08ccbd22-fad7-4c77-9f43-7bb2171ca482`):
    - This memory noted `quoteSend` reverting with an 'Internal error' on `MagOFTAdapter` `0x535Dc...`. While the frontend now uses a different adapter address (`0xB5c6...`), this highlights the importance of thorough testing of the LayerZero messaging pathway for the current contracts.

## Support

For any questions or support regarding this repository, please contact [ty@siestamarkets.com](mailto:ty@siestamarkets.com).

## Global Rules & Best Practices

This project aims to adhere to the global rules and best practices outlined in the organization's standards (see `MEMORY[user_global]`), including TypeScript strictness, ESLint rules, security best practices, dependency management, code efficiency, testing, and documentation.

--- 

This README provides a comprehensive overview of the Magnify Cash Token Bridge. Please ensure all "Action Required" items are addressed to ensure stability, security, and correctness.
