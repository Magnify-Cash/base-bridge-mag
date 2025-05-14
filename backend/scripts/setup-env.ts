/**
 * This script will create a .env file with the provided values.
 * Run with: npx ts-node scripts/setup-env.ts
 * 
 * IMPORTANT: This script contains sensitive information.
 * DELETE THIS FILE after running it once!
 */

import * as fs from 'fs';
import * as path from 'path';

// Define the path to the .env file
const envFilePath = path.join(__dirname, '..', '.env');

// Define the content of the .env file
const envContent = `#   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-
#  / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\
# \`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'
#
#             MAG Token Bridge Environment Configuration
#
#   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-.   .-.-
#  / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\ \\ / / \\
# \`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'   \`-\`-'

# Private key authentication
# SECURITY WARNING: This key should be considered compromised
# Only use for testing and replace for production use
PRIVATE_KEY=07d47b84387bb954a2ce3bb85928eb876add61b7c1c40f0cafc8193ea5fae100

# RPC URLs for various networks
RPC_URL_ETHEREUM=https://boldest-distinguished-wildflower.quiknode.pro/eb565352d8db98b10136b8cc7faf1edfab01d8ae
RPC_URL_BASE=https://boldest-distinguished-wildflower.base-mainnet.quiknode.pro/eb565352d8db98b10136b8cc7faf1edfab01d8ae
RPC_URL_WORLDCHAIN=https://boldest-distinguished-wildflower.worldchain-mainnet.quiknode.pro/eb565352d8db98b10136b8cc7faf1edfab01d8ae

# Etherscan API keys for contract verification
ETHERSCAN_API_KEY=Y1P47UCWY6CTAFFYYTHBUHU32JHAZAY33R
BASE_API_KEY=9G8MC4TYESM1FAEHGP3NV4RU1RN5BPV1WK
WORLDCHAIN_API_KEY=BY7PSJ47E1223NWXGXANKBC4YD8S8SBAYU
`;

// Write the .env file
try {
  fs.writeFileSync(envFilePath, envContent);
  console.log(`✅ Successfully created .env file at: ${envFilePath}`);
  console.log('⚠️  SECURITY WARNING: This file contains sensitive information.');
  console.log('⚠️  Consider deleting this setup script after use!');
} catch (error) {
  console.error('❌ Error creating .env file:', error);
}
