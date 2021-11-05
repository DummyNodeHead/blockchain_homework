let web3 = require('./metamask');
let abi = [
	{
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_Auc_id",
			"type": "uint256"
		  }
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getNFTByOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "token_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "createTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "URL",
						"type": "string"
					}
				],
				"internalType": "struct Auction.NFT[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			}
		],
		"name": "createNFT",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUnclaim",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Auc_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "NFT_token_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isclaim",
						"type": "bool"
					}
				],
				"internalType": "struct Auction.AUC[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "getAuction",
		"outputs": [
		  {
			"components": [
			  {
				"internalType": "uint256",
				"name": "Auc_id",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "NFT_token_id",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			  },
			  {
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			  },
			  {
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			  },
			  {
				"internalType": "bool",
				"name": "isclaim",
				"type": "bool"
			  }
			],
			"internalType": "struct Auction.AUC[]",
			"name": "",
			"type": "tuple[]"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "getPlayersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "NFTOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "URL",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "myNFTInAuction",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Auc_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "NFT_token_id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "receiver",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isclaim",
						"type": "bool"
					}
				],
				"internalType": "struct Auction.AUC[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "getNFTMadeByMe",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "token_id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "createTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "URL",
						"type": "string"
					}
				],
				"internalType": "struct Auction.NFT[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_NFT_id",
			"type": "uint256"
		  }
		],
		"name": "Belong",
		"outputs": [
		  {
			"internalType": "address[]",
			"name": "",
			"type": "address[]"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_NFT_token_id",
			"type": "uint256"
		  },
		  {
			"internalType": "uint256",
			"name": "_endTime",
			"type": "uint256"
		  },
		  {
			"internalType": "uint256",
			"name": "_startPrice",
			"type": "uint256"
		  }
		],
		"name": "setupAuction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "_Auc_id",
			"type": "uint256"
		  },
		  {
			"internalType": "uint256",
			"name": "price",
			"type": "uint256"
		  }
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [
		  {
			"internalType": "address",
			"name": "_owner",
			"type": "address"
		  }
		],
		"name": "getNFTBought",
		"outputs": [
		  {
			"components": [
			  {
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			  },
			  {
				"internalType": "address",
				"name": "maker",
				"type": "address"
			  },
			  {
				"internalType": "uint256",
				"name": "createTime",
				"type": "uint256"
			  },
			  {
				"internalType": "string",
				"name": "URL",
				"type": "string"
			  }
			],
			"internalType": "struct Auction.NFT[]",
			"name": "",
			"type": "tuple[]"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		  {
			"internalType": "uint256",
			"name": "token_id",
			"type": "uint256"
		  }
		],
		"name": "getNFTOwnerByID",
		"outputs": [
		  {
			"internalType": "address",
			"name": "",
			"type": "address"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "myAuction",
		"outputs": [
		  {
			"components": [
			  {
				"internalType": "uint256",
				"name": "Auc_id",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "NFT_token_id",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			  },
			  {
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			  },
			  {
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			  },
			  {
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			  },
			  {
				"internalType": "bool",
				"name": "isclaim",
				"type": "bool"
			  }
			],
			"internalType": "struct Auction.AUC[]",
			"name": "",
			"type": "tuple[]"
		  }
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
]
let address = '0x9Ce5cE6721e369108C9e9Fa0f3BEd1C66cdA730d'
let contractInstance = new web3.eth.Contract(abi, address)
module.exports = contractInstance