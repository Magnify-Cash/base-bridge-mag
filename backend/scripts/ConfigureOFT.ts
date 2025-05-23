// deploy.js
import { pad } from 'viem'

import { EndpointId } from '@layerzerolabs/lz-definitions'

const hre = require('hardhat')

async function main() {
    // Address of the deployed contracts
    const oftAddress = '0xd70212BA8531a642079c477D976A4A27a0C8A708' // Replace with actual address
    const oftAdapter = '0x14378084BA3Fa1CdB032836AdBA1517154c52CF7' // Replace with actual address

    // Endpoint IDs for the chains
    const aEid = EndpointId.SEPOLIA_V2_TESTNET

    // Get the contract factories
    const MagOFT = await hre.ethers.getContractFactory('MagOFT')

    // Attach to the deployed contracts
    const oft = MagOFT.attach(oftAddress)

    // Convert addresses to bytes32
    const bytes32Adapter = pad(oftAdapter, { size: 32 })

    // Transaction to set peer for OFT
    const setOFTPeerTx = await oft.setPeer(aEid, bytes32Adapter)
    await setOFTPeerTx.wait()
    console.log('OFT peer set successfully')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
