// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { MagOFTAdapter } from "../MagOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract MagOFTAdapterMock is MagOFTAdapter {
    constructor(address _token, address _lzEndpoint, address _delegate) MagOFTAdapter(_token, _lzEndpoint, _delegate) {}
}
