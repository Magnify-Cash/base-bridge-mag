import { ethers } from 'ethers';

/**
 * This script helps convert Ethereum addresses to the proper format for cross-chain messaging
 * Run with: npx ts-node scripts/format-addresses.ts
 */

function padAddress(address: string): string {
  // Remove '0x' prefix if present
  address = address.startsWith('0x') ? address.slice(2) : address;
  
  // Pad the address to 64 characters (32 bytes) with zeros on the left
  const paddedAddress = address.padStart(64, '0');
  
  // Return with 0x prefix
  return '0x' + paddedAddress;
}

async function main() {
  const ETHEREUM_ADAPTER_ADDRESS = '0xB5c6D23c2a29E40fe8C79AcfED435cb48AF02d68';
  const BASE_OFT_ADDRESS = '0x59F680F431f5280e7662b96F2DFA195D1693852d';
  const WORLDCHAIN_OFT_ADDRESS = '0x1940a10ADed874Cc427C6E550FB76e2f9d1875a1';
  
  console.log('Original Addresses:');
  console.log('Ethereum Adapter:', ETHEREUM_ADAPTER_ADDRESS);
  console.log('Base OFT:', BASE_OFT_ADDRESS);
  console.log('Worldchain OFT:', WORLDCHAIN_OFT_ADDRESS);
  
  console.log('\nPadded Addresses (for cross-chain messaging):');
  console.log('Ethereum Adapter:', padAddress(ETHEREUM_ADAPTER_ADDRESS));
  console.log('Base OFT:', padAddress(BASE_OFT_ADDRESS));
  console.log('Worldchain OFT:', padAddress(WORLDCHAIN_OFT_ADDRESS));
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
