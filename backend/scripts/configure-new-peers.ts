import { EndpointId } from '@layerzerolabs/lz-definitions';
import { ethers } from 'hardhat';

/**
 * This script configures peer relationships between the newly deployed contracts
 * on different chains (Ethereum, Base, and Worldchain) for the MAG token bridge.
 */

// Function to pad address for cross-chain messaging
function padAddress(address: string): string {
  // Remove 0x prefix if present
  address = address.startsWith('0x') ? address.slice(2) : address;
  
  // Pad the address to 64 characters (32 bytes) with leading zeros
  const paddedAddress = address.padStart(64, '0');
  
  // Return with 0x prefix
  return '0x' + paddedAddress;
}

async function main(): Promise<void> {
  // Contract addresses (newly deployed)
  const ETHEREUM_ADAPTER_ADDRESS = '0x535Dc42F47eEc302921Ca9ba4f24B847b7D8650e'; // New MagOFTAdapter on Ethereum
  const BASE_OFT_ADDRESS = '0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1'; // New MagOFT on Base
  const WORLDCHAIN_OFT_ADDRESS = '0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1'; // MagOFT on Worldchain
  
  // Pad addresses for cross-chain messaging
  const PADDED_ETHEREUM_ADAPTER_ADDRESS = padAddress(ETHEREUM_ADAPTER_ADDRESS);
  const PADDED_BASE_OFT_ADDRESS = padAddress(BASE_OFT_ADDRESS);
  const PADDED_WORLDCHAIN_OFT_ADDRESS = padAddress(WORLDCHAIN_OFT_ADDRESS);
  
  console.log('Using padded addresses for cross-chain messaging:');
  console.log('- Ethereum Adapter:', PADDED_ETHEREUM_ADAPTER_ADDRESS);
  console.log('- Base OFT:', PADDED_BASE_OFT_ADDRESS);
  console.log('- Worldchain OFT:', PADDED_WORLDCHAIN_OFT_ADDRESS);
  
  // Get current network
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId;
  console.log(`Running on network: ${network.name || 'unknown'} (Chain ID: ${chainId})`);
  
  try {
    // Check whether we're on Ethereum mainnet
    if (chainId.toString() === '1' || network.name === 'homestead' || network.name === 'mainnet') {
      console.log('Detected Ethereum mainnet network');
      console.log('Configuring Ethereum MagOFTAdapter to trust Base and Worldchain');
      
      // Get contract instance
      const adapter = await ethers.getContractAt('MagOFTAdapter', ETHEREUM_ADAPTER_ADDRESS);
      
      // Set up trust relationship with Base
      console.log('Setting up Ethereum -> Base peer...');
      let tx = await adapter.setPeer(EndpointId.BASE_V2_MAINNET, PADDED_BASE_OFT_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Ethereum -> Base peer configured successfully');
      
      // Set up trust relationship with Worldchain
      console.log('Setting up Ethereum -> Worldchain peer...');
      tx = await adapter.setPeer(EndpointId.WORLDCHAIN_V2_MAINNET, PADDED_WORLDCHAIN_OFT_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Ethereum -> Worldchain peer configured successfully');
    } 
    // Check whether we're on Base network
    else if (chainId.toString() === '8453' || network.name === 'base') {
      console.log('Detected Base network');
      console.log('Configuring Base MagOFT to trust Ethereum and Worldchain');
      
      // Get contract instance
      const oft = await ethers.getContractAt('MagOFT', BASE_OFT_ADDRESS);
      
      // Set up trust relationship with Ethereum
      console.log('Setting up Base -> Ethereum peer...');
      let tx = await oft.setPeer(EndpointId.ETHEREUM_V2_MAINNET, PADDED_ETHEREUM_ADAPTER_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Base -> Ethereum peer configured successfully');
      
      // Set up trust relationship with Worldchain
      console.log('Setting up Base -> Worldchain peer...');
      tx = await oft.setPeer(EndpointId.WORLDCHAIN_V2_MAINNET, PADDED_WORLDCHAIN_OFT_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Base -> Worldchain peer configured successfully');
    }
    // Any other network is assumed to be Worldchain
    else {
      console.log(`Detected network with chain ID ${chainId}, treating as Worldchain...`);
      // We're on Worldchain, need to trust both Ethereum and Base
      console.log('Configuring Worldchain MagOFT to trust Ethereum and Base');
      
      // Get contract instance
      const oft = await ethers.getContractAt('MagOFT', WORLDCHAIN_OFT_ADDRESS);
      
      // Set up trust relationship with Ethereum
      console.log('Setting up Worldchain -> Ethereum peer...');
      let tx = await oft.setPeer(EndpointId.ETHEREUM_V2_MAINNET, PADDED_ETHEREUM_ADAPTER_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Worldchain -> Ethereum peer configured successfully');
      
      // Set up trust relationship with Base
      console.log('Setting up Worldchain -> Base peer...');
      tx = await oft.setPeer(EndpointId.BASE_V2_MAINNET, PADDED_BASE_OFT_ADDRESS);
      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log('✅ Worldchain -> Base peer configured successfully');
    }
    
    console.log('🎉 Peer configuration completed successfully!');
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
