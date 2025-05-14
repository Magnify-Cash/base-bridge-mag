import { ethers } from 'hardhat';
import { EndpointId } from '@layerzerolabs/lz-definitions';

// This script sets up peer configuration for Worldchain integration
// It needs to be executed on each network (Ethereum, Base, and Worldchain)

async function main() {
  // You'll need to replace these placeholder addresses with the actual deployed contract addresses
  const ETHEREUM_ADAPTER_ADDRESS = '0x000000000000000000000000000000000000dEaD'; // Replace with real address
  const BASE_OFT_ADDRESS = '0x000000000000000000000000000000000000dEaD';        // Replace with real address
  const WORLDCHAIN_OFT_ADDRESS = '0x000000000000000000000000000000000000dEaD';   // Replace with real address
  
  // Get network information
  const { name: networkName } = await ethers.provider.getNetwork();
  console.log(`Running on network: ${networkName}`);
  
  try {
    // Determine which network we're on and perform the appropriate peer configuration
    if (networkName === 'ethereum' || networkName === 'mainnet') {
      // On Ethereum, configure MagOFTAdapter to trust Worldchain MagOFT
      console.log('Configuring Ethereum MagOFTAdapter to trust Worldchain MagOFT');
      
      const adapter = await ethers.getContractAt('MagOFTAdapter', ETHEREUM_ADAPTER_ADDRESS);
      const tx = await adapter.setPeer(EndpointId.WORLDCHAIN_V2_MAINNET, WORLDCHAIN_OFT_ADDRESS);
      
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Ethereum -> Worldchain peer configured successfully');
    } 
    else if (networkName === 'base') {
      // On Base, configure MagOFT to trust Worldchain MagOFT
      console.log('Configuring Base MagOFT to trust Worldchain MagOFT');
      
      const oft = await ethers.getContractAt('MagOFT', BASE_OFT_ADDRESS);
      const tx = await oft.setPeer(EndpointId.WORLDCHAIN_V2_MAINNET, WORLDCHAIN_OFT_ADDRESS);
      
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Base -> Worldchain peer configured successfully');
    }
    else if (networkName === 'worldchain') {
      // On Worldchain, configure MagOFT to trust both Ethereum and Base
      console.log('Configuring Worldchain MagOFT to trust Ethereum MagOFTAdapter and Base MagOFT');
      
      const oft = await ethers.getContractAt('MagOFT', WORLDCHAIN_OFT_ADDRESS);
      
      // Set peer for Ethereum
      let tx = await oft.setPeer(EndpointId.ETHEREUM_V2_MAINNET, ETHEREUM_ADAPTER_ADDRESS);
      console.log(`Transaction sent for Ethereum peer: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Worldchain -> Ethereum peer configured successfully');
      
      // Set peer for Base
      tx = await oft.setPeer(EndpointId.BASE_V2_MAINNET, BASE_OFT_ADDRESS);
      console.log(`Transaction sent for Base peer: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Worldchain -> Base peer configured successfully');
    }
    else {
      console.error(`Unsupported network: ${networkName}`);
      return;
    }
    
    console.log('Peer configuration completed successfully!');
  } catch (error) {
    console.error('Error setting up peer configuration:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
