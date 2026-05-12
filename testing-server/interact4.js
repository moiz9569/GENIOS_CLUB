const ethers = require("ethers");
const fs = require("fs-extra");
const axios = require("axios");
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");

const TOKEN = {
  address: "0x54486e9647afB598c0253a26D2266880e1f84CB5",
  abi: [
    {
      type: "constructor",
      name: "",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          type: "address",
          name: "owner",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "spender",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "value",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          type: "address",
          name: "from",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "to",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "value",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "function",
      name: "allowance",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
        {
          type: "address",
          name: "spender",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "approve",
      inputs: [
        {
          type: "address",
          name: "spender",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amount",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "balanceOf",
      inputs: [
        {
          type: "address",
          name: "account",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "decimals",
      inputs: [],
      outputs: [
        {
          type: "uint8",
          name: "",
          internalType: "uint8",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "decreaseAllowance",
      inputs: [
        {
          type: "address",
          name: "spender",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "subtractedValue",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "increaseAllowance",
      inputs: [
        {
          type: "address",
          name: "spender",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "addedValue",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "mint",
      inputs: [
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amount",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "name",
      inputs: [],
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "symbol",
      inputs: [],
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "totalSupply",
      inputs: [],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transfer",
      inputs: [
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amount",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "transferFrom",
      inputs: [
        {
          type: "address",
          name: "from",
          internalType: "address",
        },
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "amount",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
  ],
};

const GeniosClub = {
  address: "0x9707A6497812deE298E6AaE8A8e968385c65d2e9",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "id0",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenAddr",
          type: "address",
        },
        {
          internalType: "address",
          name: "poolAddr",
          type: "address",
        },
        {
          internalType: "address",
          name: "academyAndMarketingAddr",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "G3X7AcademyUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "G3X7ClubUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "G3X7RankUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "MissedTokenReceive",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "referrer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "place",
          type: "uint8",
        },
      ],
      name: "NewUserPlace",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "RankEarners",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "referrer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "referrerId",
          type: "uint256",
        },
      ],
      name: "Registration",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "CurrentRef",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "caller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "Reinvest",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "SentExtraTokenDividends",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "userId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "referrer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "Upgrade",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "ref",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "UserAdd",
      type: "event",
    },
    {
      inputs: [],
      name: "AcademyAndMarketingAddr",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "AcademyAndMarketingComm",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Id0",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "IdToAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "IsUserExists",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LAST_LEVEL",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LastUserId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "LevelPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "LevelPricePercentage",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "Platform",
      outputs: [
        {
          internalType: "uint256",
          name: "G3X2TotalEarnings",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3X7TotalEarnings",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PoolAddr",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "RankReqTotalTeam",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "RankTeamPerLineLimit",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "RanksComm",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "refAddr",
          type: "address",
        },
        {
          internalType: "address",
          name: "curRefaddr",
          type: "address",
        },
      ],
      name: "RegistrationExt",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "TOKEN",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "Users",
      outputs: [
        {
          internalType: "uint256",
          name: "Id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "Ref",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "Amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "TotalTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "DirectRefs",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3X2Earnings",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3X7Earnings",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "UsersTeams",
      outputs: [
        {
          internalType: "uint256",
          name: "G3x2FirstTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x2SecondTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7FirstTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7SecondTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7ThirdTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7FourthTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7FifthTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7SixthTeam",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "G3x7SeventhTeam",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
      ],
      name: "activateAllG3X2Levels",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
      ],
      name: "activateAllG3X7Levels",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "curRefaddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "matrix",
          type: "uint8",
        },
      ],
      name: "buyNewLevel",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "address",
          name: "curRefaddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "buyNewLevelG3X7ById0",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "curRefaddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "buyNewLevelWithUserAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tAmount",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "tPerc",
          type: "uint8",
        },
      ],
      name: "calPerc",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "findFreeG3X2Referrer",
      outputs: [
        {
          internalType: "address",
          name: "refAddr",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "findFreeG3X7Referrer",
      outputs: [
        {
          internalType: "address",
          name: "refAddr",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
      ],
      name: "getDirectRefsIds",
      outputs: [
        {
          internalType: "uint256[]",
          name: "refs",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersActiveG3X2Levels",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersActiveG3X7Levels",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersG3X2Matrix",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "CurrentRef",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "FirstLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "SecondLevelRefs",
              type: "address[]",
            },
            {
              internalType: "bool",
              name: "Blocked",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "ReinvestCount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "ReinvestTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "Earnings",
              type: "uint256",
            },
          ],
          internalType: "struct GeniosClub.G3X2",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersG3X7Matrix",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "CurrentRef",
              type: "address",
            },
            {
              internalType: "address[]",
              name: "FirstLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "SecondLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "ThirdLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "FourthLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "FifthLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "SixthLevelRefs",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "SeventhLevelRefs",
              type: "address[]",
            },
            {
              internalType: "bool",
              name: "Blocked",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "ReinvestCount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "ReinvestTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "Earnings",
              type: "uint256",
            },
          ],
          internalType: "struct GeniosClub.G3X7",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersRankTeams",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "G3x7FirstTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7SecondTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7ThirdTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7FourthTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7FifthTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7SixthTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "G3x7SeventhTeam",
              type: "uint256",
            },
          ],
          internalType: "struct GeniosClub.RankTeam",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddr",
          type: "address",
        },
        {
          internalType: "uint8",
          name: "level",
          type: "uint8",
        },
      ],
      name: "usersRanks",
      outputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "IsActive",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "TotalTeam",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "DirectRefs",
              type: "uint256",
            },
          ],
          internalType: "struct GeniosClub.Rank",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

let lastId = 90;
const myKey =
  "1ac7a3275e2f65452f3443ee3dc5b0f620e6bc81d08595a06162c5cd855ae625";
const tokenAmount = ethers.utils.parseUnits("100", 18);

async function interactWithSmartContract() {
  const wallets = await fs.readJson("wallets.json");

  let refAddress = "0xfF5fC056d43215Dc3fAdF70CA7eD3EA471A78246";
  const refWallet = ThirdwebSDK.fromPrivateKey(
    myKey, // Your wallet's private key (only required for write operations)
    "fantom-testnet",
    {
      secretKey:
        "_sJ2MGzCQZDAYSO7yV_t18pk_Ee6Yyulawd1NWLgghlUF7Fk3SpEs-TJMmaYoem0caNnh3e_xyCZuF7kkMkJjg", // Use secret key if using on the server, get it from dashboard settings
    }
  );

  try {
    for (let i = lastId; i <= 3000; i++) {
      const userAddress = wallets[i].address;
      const userPrivateKey = wallets[i].privateKey;

      const userWallet = ThirdwebSDK.fromPrivateKey(
        userPrivateKey, // Your wallet's private key (only required for write operations)
        "fantom-testnet",
        {
          secretKey:
            "_sJ2MGzCQZDAYSO7yV_t18pk_Ee6Yyulawd1NWLgghlUF7Fk3SpEs-TJMmaYoem0caNnh3e_xyCZuF7kkMkJjg", // Use secret key if using on the server, get it from dashboard settings
        }
      );

      const TokenContract = await userWallet.getContract(
        TOKEN.address,
        TOKEN.abi
      );
      const GeniosClubContract = await userWallet.getContract(
        GeniosClub.address,
        GeniosClub.abi
      );

      const response = await axios.get(
        `http://localhost:8000/matrix/add/${refAddress}`
      );

      await refWallet.wallet.transfer(userAddress, 0.01);

      await TokenContract.call("mint", [userAddress, tokenAmount]);
      await TokenContract.call("approve", [GeniosClub.address, tokenAmount]);

      await GeniosClubContract.call("RegistrationExt", [
        refAddress,
        response.data.currentReferrer,
      ]);

      await axios.post(`http://localhost:8000/matrix/add/`, {
        userAddress: userAddress,
        referrerAddress: refAddress,
      });

      lastId++;

      console.log(i, userAddress, response.data.currentReferrer, refAddress);
    }
  } catch (error) {
    console.log(error);
    interactWithSmartContract();
  }
}

interactWithSmartContract();
