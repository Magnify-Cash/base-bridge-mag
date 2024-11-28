import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MagOFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const magOftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_lzEndpoint', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'InvalidLocalDecimals' },
  {
    type: 'error',
    inputs: [{ name: 'options', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidOptions',
  },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  { type: 'error', inputs: [], name: 'OnlySelf' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'error',
    inputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
    name: 'SimulationResult',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SlippageExceeded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
    ],
    name: 'EnforcedOptionSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'inspector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MsgInspectorSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'srcEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'toAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'dstEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'fromAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountSentLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'preCrimeAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PreCrimeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND_AND_CALL',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'approvalRequired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_msgType', internalType: 'uint16', type: 'uint16' },
      { name: '_extraOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'combineOptions',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimalConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'msgType', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'enforcedOptions',
    outputs: [{ name: 'enforcedOption', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '_sender', internalType: 'address', type: 'address' },
    ],
    name: 'isComposeMsgSender',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isPeer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_packets',
        internalType: 'struct InboundPacket[]',
        type: 'tuple[]',
        components: [
          {
            name: 'origin',
            internalType: 'struct Origin',
            type: 'tuple',
            components: [
              { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
              { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
            ],
          },
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'executor', internalType: 'address', type: 'address' },
          { name: 'message', internalType: 'bytes', type: 'bytes' },
          { name: 'extraData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'lzReceiveAndRevert',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceiveSimulate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'msgInspector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oApp',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oftVersion',
    outputs: [
      { name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' },
      { name: 'version', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'preCrime',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteOFT',
    outputs: [
      {
        name: 'oftLimit',
        internalType: 'struct OFTLimit',
        type: 'tuple',
        components: [
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'maxAmountLD', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'oftFeeDetails',
        internalType: 'struct OFTFeeDetail[]',
        type: 'tuple[]',
        components: [
          { name: 'feeAmountLD', internalType: 'int256', type: 'int256' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quoteSend',
    outputs: [
      {
        name: 'msgFee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'send',
    outputs: [
      {
        name: 'msgReceipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'setEnforcedOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_msgInspector', internalType: 'address', type: 'address' },
    ],
    name: 'setMsgInspector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_preCrime', internalType: 'address', type: 'address' }],
    name: 'setPreCrime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sharedDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MagOFTAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const magOftAdapterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_lzEndpoint', internalType: 'address', type: 'address' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidDelegate' },
  { type: 'error', inputs: [], name: 'InvalidEndpointCall' },
  { type: 'error', inputs: [], name: 'InvalidLocalDecimals' },
  {
    type: 'error',
    inputs: [{ name: 'options', internalType: 'bytes', type: 'bytes' }],
    name: 'InvalidOptions',
  },
  { type: 'error', inputs: [], name: 'LzTokenUnavailable' },
  {
    type: 'error',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'NoPeer',
  },
  {
    type: 'error',
    inputs: [{ name: 'msgValue', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughNative',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'OnlyEndpoint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'OnlyPeer',
  },
  { type: 'error', inputs: [], name: 'OnlySelf' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'error',
    inputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
    name: 'SimulationResult',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SlippageExceeded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
    ],
    name: 'EnforcedOptionSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'inspector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MsgInspectorSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'srcEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'toAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'dstEid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'fromAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountSentLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amountReceivedLD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OFTSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32', indexed: false },
      {
        name: 'peer',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'PeerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'preCrimeAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PreCrimeSet',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SEND_AND_CALL',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'allowInitializePath',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'approvalRequired',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_msgType', internalType: 'uint16', type: 'uint16' },
      { name: '_extraOptions', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'combineOptions',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimalConversionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endpoint',
    outputs: [
      {
        name: '',
        internalType: 'contract ILayerZeroEndpointV2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'eid', internalType: 'uint32', type: 'uint32' },
      { name: 'msgType', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'enforcedOptions',
    outputs: [{ name: 'enforcedOption', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
      { name: '_sender', internalType: 'address', type: 'address' },
    ],
    name: 'isComposeMsgSender',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isPeer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_packets',
        internalType: 'struct InboundPacket[]',
        type: 'tuple[]',
        components: [
          {
            name: 'origin',
            internalType: 'struct Origin',
            type: 'tuple',
            components: [
              { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
              { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
              { name: 'nonce', internalType: 'uint64', type: 'uint64' },
            ],
          },
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'executor', internalType: 'address', type: 'address' },
          { name: 'message', internalType: 'bytes', type: 'bytes' },
          { name: 'extraData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'lzReceiveAndRevert',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_origin',
        internalType: 'struct Origin',
        type: 'tuple',
        components: [
          { name: 'srcEid', internalType: 'uint32', type: 'uint32' },
          { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
        ],
      },
      { name: '_guid', internalType: 'bytes32', type: 'bytes32' },
      { name: '_message', internalType: 'bytes', type: 'bytes' },
      { name: '_executor', internalType: 'address', type: 'address' },
      { name: '_extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'lzReceiveSimulate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'msgInspector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'nextNonce',
    outputs: [{ name: 'nonce', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oApp',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oAppVersion',
    outputs: [
      { name: 'senderVersion', internalType: 'uint64', type: 'uint64' },
      { name: 'receiverVersion', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'oftVersion',
    outputs: [
      { name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' },
      { name: 'version', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'eid', internalType: 'uint32', type: 'uint32' }],
    name: 'peers',
    outputs: [{ name: 'peer', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'preCrime',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteOFT',
    outputs: [
      {
        name: 'oftLimit',
        internalType: 'struct OFTLimit',
        type: 'tuple',
        components: [
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'maxAmountLD', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'oftFeeDetails',
        internalType: 'struct OFTFeeDetail[]',
        type: 'tuple[]',
        components: [
          { name: 'feeAmountLD', internalType: 'int256', type: 'int256' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '_payInLzToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'quoteSend',
    outputs: [
      {
        name: 'msgFee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_sendParam',
        internalType: 'struct SendParam',
        type: 'tuple',
        components: [
          { name: 'dstEid', internalType: 'uint32', type: 'uint32' },
          { name: 'to', internalType: 'bytes32', type: 'bytes32' },
          { name: 'amountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'minAmountLD', internalType: 'uint256', type: 'uint256' },
          { name: 'extraOptions', internalType: 'bytes', type: 'bytes' },
          { name: 'composeMsg', internalType: 'bytes', type: 'bytes' },
          { name: 'oftCmd', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: '_fee',
        internalType: 'struct MessagingFee',
        type: 'tuple',
        components: [
          { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
          { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'send',
    outputs: [
      {
        name: 'msgReceipt',
        internalType: 'struct MessagingReceipt',
        type: 'tuple',
        components: [
          { name: 'guid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'nonce', internalType: 'uint64', type: 'uint64' },
          {
            name: 'fee',
            internalType: 'struct MessagingFee',
            type: 'tuple',
            components: [
              { name: 'nativeFee', internalType: 'uint256', type: 'uint256' },
              { name: 'lzTokenFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      {
        name: 'oftReceipt',
        internalType: 'struct OFTReceipt',
        type: 'tuple',
        components: [
          { name: 'amountSentLD', internalType: 'uint256', type: 'uint256' },
          {
            name: 'amountReceivedLD',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'setDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_enforcedOptions',
        internalType: 'struct EnforcedOptionParam[]',
        type: 'tuple[]',
        components: [
          { name: 'eid', internalType: 'uint32', type: 'uint32' },
          { name: 'msgType', internalType: 'uint16', type: 'uint16' },
          { name: 'options', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'setEnforcedOptions',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_msgInspector', internalType: 'address', type: 'address' },
    ],
    name: 'setMsgInspector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_eid', internalType: 'uint32', type: 'uint32' },
      { name: '_peer', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setPeer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_preCrime', internalType: 'address', type: 'address' }],
    name: 'setPreCrime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sharedDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MagToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const magTokenAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__
 */
export const useReadMagOft = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"SEND"`
 */
export const useReadMagOftSend = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 */
export const useReadMagOftSendAndCall = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'SEND_AND_CALL',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"allowInitializePath"`
 */
export const useReadMagOftAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAbi,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMagOftAllowance = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"approvalRequired"`
 */
export const useReadMagOftApprovalRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAbi,
    functionName: 'approvalRequired',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMagOftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"combineOptions"`
 */
export const useReadMagOftCombineOptions = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'combineOptions',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"decimalConversionRate"`
 */
export const useReadMagOftDecimalConversionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAbi,
    functionName: 'decimalConversionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMagOftDecimals = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"endpoint"`
 */
export const useReadMagOftEndpoint = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'endpoint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"enforcedOptions"`
 */
export const useReadMagOftEnforcedOptions = /*#__PURE__*/ createUseReadContract(
  { abi: magOftAbi, functionName: 'enforcedOptions' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"isComposeMsgSender"`
 */
export const useReadMagOftIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAbi,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"isPeer"`
 */
export const useReadMagOftIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"msgInspector"`
 */
export const useReadMagOftMsgInspector = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'msgInspector',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"name"`
 */
export const useReadMagOftName = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"nextNonce"`
 */
export const useReadMagOftNextNonce = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'nextNonce',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"oApp"`
 */
export const useReadMagOftOApp = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"oAppVersion"`
 */
export const useReadMagOftOAppVersion = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'oAppVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"oftVersion"`
 */
export const useReadMagOftOftVersion = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'oftVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMagOftOwner = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"peers"`
 */
export const useReadMagOftPeers = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"preCrime"`
 */
export const useReadMagOftPreCrime = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'preCrime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"quoteOFT"`
 */
export const useReadMagOftQuoteOft = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'quoteOFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"quoteSend"`
 */
export const useReadMagOftQuoteSend = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'quoteSend',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"sharedDecimals"`
 */
export const useReadMagOftSharedDecimals = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'sharedDecimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMagOftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"token"`
 */
export const useReadMagOftToken = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMagOftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: magOftAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__
 */
export const useWriteMagOft = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMagOftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useWriteMagOftLzReceive = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'lzReceive',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 */
export const useWriteMagOftLzReceiveAndRevert =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 */
export const useWriteMagOftLzReceiveSimulate =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMagOftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"send"`
 */
export const useWriteMagOftSend = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useWriteMagOftSetDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'setDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setEnforcedOptions"`
 */
export const useWriteMagOftSetEnforcedOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setMsgInspector"`
 */
export const useWriteMagOftSetMsgInspector =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setPeer"`
 */
export const useWriteMagOftSetPeer = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'setPeer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setPreCrime"`
 */
export const useWriteMagOftSetPreCrime = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'setPreCrime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMagOftTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMagOftTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMagOftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__
 */
export const useSimulateMagOft = /*#__PURE__*/ createUseSimulateContract({
  abi: magOftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMagOftApprove = /*#__PURE__*/ createUseSimulateContract(
  { abi: magOftAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useSimulateMagOftLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 */
export const useSimulateMagOftLzReceiveAndRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 */
export const useSimulateMagOftLzReceiveSimulate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMagOftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"send"`
 */
export const useSimulateMagOftSend = /*#__PURE__*/ createUseSimulateContract({
  abi: magOftAbi,
  functionName: 'send',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useSimulateMagOftSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setEnforcedOptions"`
 */
export const useSimulateMagOftSetEnforcedOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setMsgInspector"`
 */
export const useSimulateMagOftSetMsgInspector =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setPeer"`
 */
export const useSimulateMagOftSetPeer = /*#__PURE__*/ createUseSimulateContract(
  { abi: magOftAbi, functionName: 'setPeer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"setPreCrime"`
 */
export const useSimulateMagOftSetPreCrime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMagOftTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMagOftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMagOftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__
 */
export const useWatchMagOftEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: magOftAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMagOftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"EnforcedOptionSet"`
 */
export const useWatchMagOftEnforcedOptionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'EnforcedOptionSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"MsgInspectorSet"`
 */
export const useWatchMagOftMsgInspectorSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'MsgInspectorSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"OFTReceived"`
 */
export const useWatchMagOftOftReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'OFTReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"OFTSent"`
 */
export const useWatchMagOftOftSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'OFTSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMagOftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"PeerSet"`
 */
export const useWatchMagOftPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"PreCrimeSet"`
 */
export const useWatchMagOftPreCrimeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'PreCrimeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMagOftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__
 */
export const useReadMagOftAdapter = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"SEND"`
 */
export const useReadMagOftAdapterSend = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'SEND',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"SEND_AND_CALL"`
 */
export const useReadMagOftAdapterSendAndCall =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'SEND_AND_CALL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"allowInitializePath"`
 */
export const useReadMagOftAdapterAllowInitializePath =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'allowInitializePath',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"approvalRequired"`
 */
export const useReadMagOftAdapterApprovalRequired =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'approvalRequired',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"combineOptions"`
 */
export const useReadMagOftAdapterCombineOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'combineOptions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"decimalConversionRate"`
 */
export const useReadMagOftAdapterDecimalConversionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'decimalConversionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"endpoint"`
 */
export const useReadMagOftAdapterEndpoint = /*#__PURE__*/ createUseReadContract(
  { abi: magOftAdapterAbi, functionName: 'endpoint' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"enforcedOptions"`
 */
export const useReadMagOftAdapterEnforcedOptions =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'enforcedOptions',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"isComposeMsgSender"`
 */
export const useReadMagOftAdapterIsComposeMsgSender =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'isComposeMsgSender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"isPeer"`
 */
export const useReadMagOftAdapterIsPeer = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'isPeer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"msgInspector"`
 */
export const useReadMagOftAdapterMsgInspector =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'msgInspector',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"nextNonce"`
 */
export const useReadMagOftAdapterNextNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'nextNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"oApp"`
 */
export const useReadMagOftAdapterOApp = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'oApp',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"oAppVersion"`
 */
export const useReadMagOftAdapterOAppVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'oAppVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"oftVersion"`
 */
export const useReadMagOftAdapterOftVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'oftVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMagOftAdapterOwner = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"peers"`
 */
export const useReadMagOftAdapterPeers = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'peers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"preCrime"`
 */
export const useReadMagOftAdapterPreCrime = /*#__PURE__*/ createUseReadContract(
  { abi: magOftAdapterAbi, functionName: 'preCrime' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"quoteOFT"`
 */
export const useReadMagOftAdapterQuoteOft = /*#__PURE__*/ createUseReadContract(
  { abi: magOftAdapterAbi, functionName: 'quoteOFT' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"quoteSend"`
 */
export const useReadMagOftAdapterQuoteSend =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'quoteSend',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"sharedDecimals"`
 */
export const useReadMagOftAdapterSharedDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: magOftAdapterAbi,
    functionName: 'sharedDecimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"token"`
 */
export const useReadMagOftAdapterToken = /*#__PURE__*/ createUseReadContract({
  abi: magOftAdapterAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__
 */
export const useWriteMagOftAdapter = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAdapterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useWriteMagOftAdapterLzReceive =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 */
export const useWriteMagOftAdapterLzReceiveAndRevert =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 */
export const useWriteMagOftAdapterLzReceiveSimulate =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMagOftAdapterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"send"`
 */
export const useWriteMagOftAdapterSend = /*#__PURE__*/ createUseWriteContract({
  abi: magOftAdapterAbi,
  functionName: 'send',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useWriteMagOftAdapterSetDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setEnforcedOptions"`
 */
export const useWriteMagOftAdapterSetEnforcedOptions =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setMsgInspector"`
 */
export const useWriteMagOftAdapterSetMsgInspector =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setPeer"`
 */
export const useWriteMagOftAdapterSetPeer =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setPreCrime"`
 */
export const useWriteMagOftAdapterSetPreCrime =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMagOftAdapterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: magOftAdapterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__
 */
export const useSimulateMagOftAdapter = /*#__PURE__*/ createUseSimulateContract(
  { abi: magOftAdapterAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceive"`
 */
export const useSimulateMagOftAdapterLzReceive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceiveAndRevert"`
 */
export const useSimulateMagOftAdapterLzReceiveAndRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceiveAndRevert',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"lzReceiveSimulate"`
 */
export const useSimulateMagOftAdapterLzReceiveSimulate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'lzReceiveSimulate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMagOftAdapterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"send"`
 */
export const useSimulateMagOftAdapterSend =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'send',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setDelegate"`
 */
export const useSimulateMagOftAdapterSetDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'setDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setEnforcedOptions"`
 */
export const useSimulateMagOftAdapterSetEnforcedOptions =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'setEnforcedOptions',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setMsgInspector"`
 */
export const useSimulateMagOftAdapterSetMsgInspector =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'setMsgInspector',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setPeer"`
 */
export const useSimulateMagOftAdapterSetPeer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'setPeer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"setPreCrime"`
 */
export const useSimulateMagOftAdapterSetPreCrime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'setPreCrime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magOftAdapterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMagOftAdapterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magOftAdapterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__
 */
export const useWatchMagOftAdapterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: magOftAdapterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"EnforcedOptionSet"`
 */
export const useWatchMagOftAdapterEnforcedOptionSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'EnforcedOptionSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"MsgInspectorSet"`
 */
export const useWatchMagOftAdapterMsgInspectorSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'MsgInspectorSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"OFTReceived"`
 */
export const useWatchMagOftAdapterOftReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'OFTReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"OFTSent"`
 */
export const useWatchMagOftAdapterOftSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'OFTSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMagOftAdapterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"PeerSet"`
 */
export const useWatchMagOftAdapterPeerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'PeerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link magOftAdapterAbi}__ and `eventName` set to `"PreCrimeSet"`
 */
export const useWatchMagOftAdapterPreCrimeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: magOftAdapterAbi,
    eventName: 'PreCrimeSet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magTokenAbi}__
 */
export const useReadMagToken = /*#__PURE__*/ createUseReadContract({
  abi: magTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMagTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: magTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link magTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMagTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: magTokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magTokenAbi}__
 */
export const useWriteMagToken = /*#__PURE__*/ createUseWriteContract({
  abi: magTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link magTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMagTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: magTokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magTokenAbi}__
 */
export const useSimulateMagToken = /*#__PURE__*/ createUseSimulateContract({
  abi: magTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link magTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMagTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: magTokenAbi,
    functionName: 'approve',
  })
