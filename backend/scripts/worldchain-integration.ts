import { ethers } from 'hardhat';
import { EndpointId } from '@layerzerolabs/lz-definitions';

// This script outlines the steps for deploying and configuring MAG token on Worldchain
// It's designed to be a guide rather than an auto-executable script due to the need for
// private keys and contract addresses that shouldn't be hardcoded.

async function main() {
  console.log('⚠️ Worldchain Integration Guide ⚠️');
  console.log('Follow these steps to integrate Worldchain support for MAG token:');
  
  console.log('\n== Step 1: Setup ==');
  console.log('1. Create a .env file with the following (NEVER commit this file):');
  console.log('   PRIVATE_KEY=your_private_key_here');
  console.log('   RPC_URL_ETHEREUM=your_ethereum_rpc_url');
  console.log('   RPC_URL_BASE=your_base_rpc_url');
  console.log('   RPC_URL_WORLDCHAIN=https://damp-intensive-bird.worldchain-mainnet.quiknode.pro/369ee84d76ee98c1ed6ea7a9fece166d948499cd/');
  
  console.log('\n== Step 2: Deployment ==');
  console.log('2. Deploy MagOFT to Worldchain:');
  console.log('   npx hardhat deploy --network worldchain');
  console.log('   - This will use the MagOFT.ts deployment script');
  console.log('   - Record the deployed contract address');
  
  console.log('\n== Step 3: Peer Configuration ==');
  console.log('3. Get the deployed contract addresses:');
  console.log('   - MagOFTAdapter on Ethereum (SOURCE_CHAIN)');
  console.log('   - MagOFT on Base (DESTINATION_CHAIN)');
  console.log('   - MagOFT on Worldchain (from step 2)');
  
  console.log('\n4. Run the following peer configuration commands:');
  
  console.log('\n   # On Ethereum (MagOFTAdapter):');
  console.log('   npx hardhat run --network ethereum scripts/set-worldchain-peer.ts');
  
  console.log('\n   # On Base (MagOFT):');
  console.log('   npx hardhat run --network base scripts/set-worldchain-peer.ts');
  
  console.log('\n   # On Worldchain (MagOFT):');
  console.log('   npx hardhat run --network worldchain scripts/set-worldchain-peer.ts');
  
  console.log('\n== Step 4: Frontend Integration ==');
  console.log('5. Update the frontend constants with Worldchain token address');
  console.log('6. Add Worldchain to frontend chain selection logic');
  console.log('7. Test the bridge with small amounts (0.01-0.1 MAG)');
  
  console.log('\n⚠️ Note: Run each command separately and verify success before proceeding to the next step');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
