// deploy.js
import { pad } from 'viem'

import { EndpointId } from '@layerzerolabs/lz-definitions'

const hre = require('hardhat')

async function main() {
    // Address of the deployed contracts
    const oftAddress = '0xd70212BA8531a642079c477D976A4A27a0C8A708' // Replace with actual address
    const adapterAddress = '0x14378084BA3Fa1CdB032836AdBA1517154c52CF7' // Replace with actual address

    // Endpoint IDs for the chains
    const bEid = EndpointId.BASESEP_V2_TESTNET

    // Get the contract factories
    const MagOFTAdapter = await hre.ethers.getContractFactory('MagOFTAdapter')

    // Attach to the deployed contract
    const oftAdapter = MagOFTAdapter.attach(adapterAddress)

    // Convert addresses to bytes32
    const bytes32OFT = pad(`${oftAddress}`, { size: 32 })
    console.log(bytes32OFT)

    // Transaction to set peer for Adapter
    const setAdapterPeerTx = await oftAdapter.setPeer(bEid, bytes32OFT)
    await setAdapterPeerTx.wait()
    console.log('Adapter peer set successfully')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
