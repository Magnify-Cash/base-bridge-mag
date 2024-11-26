// deploy.js
import { EndpointId } from '@layerzerolabs/lz-definitions'

const hre = require('hardhat')

async function main() {
    // Address of the deployed contracts
    const oftAddress = '0xbA54D4e43b1Fff3558d72327424B605B966766D9' // Replace with actual address
    //const bOFTAddress = '0x0277480600B267AA45f827e7b25B698D9120a795' // Replace with actual address

    // Endpoint IDs for the chains
    const bEid = EndpointId.SEPOLIA_V2_TESTNET

    // Get the contract factories
    const MagOFT = await hre.ethers.getContractFactory('MagOFT')

    // Attach to the deployed contracts
    const aOFT = MagOFT.attach(oftAddress)
    //const bOFT = MagOFTAdapter.attach(bOFTAddress)

    // Convert addresses to bytes32
    const bytes32BOFT = '0x000000000000000000000000ba54d4e43b1fff3558d72327424b605b966766d9'

    // Transaction to set peer for aOFT only
    console.log('Setting peer for aOFT...')
    //const setPeerTx = await aOFT.setPeer(bEid, bytes32BOFT)
    //await setPeerTx.wait()
    console.log('aOFT peer set successfully')

    console.log(await aOFT.readPeers())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
