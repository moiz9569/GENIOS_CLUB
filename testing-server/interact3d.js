const ethers = require("ethers");
const fs = require("fs-extra");
// const axios = require("axios");
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
  address: "0xc745325bbBeED6bad19659980F38dC978414a344",
  abi: [
    {
      type: "constructor",
      name: "",
      inputs: [
        {
          type: "address",
          name: "id0",
          internalType: "address",
        },
        {
          type: "address",
          name: "tokenAddr",
          internalType: "address",
        },
        {
          type: "address",
          name: "poolAddr",
          internalType: "address",
        },
        {
          type: "address",
          name: "academyAndMarketingAddr",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "G3X7AcademyUpdated",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          indexed: true,
          internalType: "uint8",
        },
        {
          type: "uint256",
          name: "amount",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "G3X7ClubUpdated",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          indexed: true,
          internalType: "uint8",
        },
        {
          type: "uint256",
          name: "amount",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "G3X7RankUpdated",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          indexed: true,
          internalType: "uint8",
        },
        {
          type: "uint256",
          name: "amount",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "MissedTokenReceive",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "receiver",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "from",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "matrix",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "level",
          indexed: false,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "NewUserPlace",
      inputs: [
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "referrer",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "uint8",
          name: "matrix",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "level",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "place",
          indexed: false,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "RankEarners",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          indexed: true,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "Registration",
      inputs: [
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "referrer",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "referrerId",
          indexed: false,
          internalType: "uint256",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "Reinvest",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "CurrentRef",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "caller",
          indexed: false,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "matrix",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "level",
          indexed: false,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "SentExtraTokenDividends",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "from",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "receiver",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "matrix",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "level",
          indexed: false,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "Upgrade",
      inputs: [
        {
          type: "uint256",
          name: "userId",
          indexed: true,
          internalType: "uint256",
        },
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "referrer",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "matrix",
          indexed: false,
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "level",
          indexed: false,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "event",
      name: "UserAdd",
      inputs: [
        {
          type: "address",
          name: "user",
          indexed: true,
          internalType: "address",
        },
        {
          type: "address",
          name: "ref",
          indexed: true,
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          indexed: true,
          internalType: "uint8",
        },
      ],
      outputs: [],
      anonymous: false,
    },
    {
      type: "function",
      name: "AcademyAndMarketingAddr",
      inputs: [],
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "AcademyAndMarketingComm",
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
      name: "Id0",
      inputs: [],
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "IdToAddress",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "IsUserExists",
      inputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "LAST_LEVEL",
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
      name: "LastUserId",
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
      name: "LevelPrice",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
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
      name: "LevelPricePercentage",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
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
      name: "Platform",
      inputs: [],
      outputs: [
        {
          type: "uint256",
          name: "G3X2TotalEarnings",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3X7TotalEarnings",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "PoolAddr",
      inputs: [],
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "RankReqTotalTeam",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
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
      name: "RankTeamPerLineLimit",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
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
      name: "RanksComm",
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
      name: "RegistrationExt",
      inputs: [
        {
          type: "address",
          name: "refAddr",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "TOKEN",
      inputs: [],
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "Users",
      inputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "Id",
          internalType: "uint256",
        },
        {
          type: "address",
          name: "Ref",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "Amount",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "TotalTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "DirectRefs",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3X2Earnings",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3X7Earnings",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "UsersTeams",
      inputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "G3x2FirstTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x2SecondTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x7FirstTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x7SecondTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x7ThirdTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x7FourthTeam",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "G3x7FifthTeam",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "activateAllG3X2Levels",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "activateAllG3X7Levels",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "buyNewLevel",
      inputs: [
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
        {
          type: "uint8",
          name: "matrix",
          internalType: "uint8",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "calPerc",
      inputs: [
        {
          type: "uint256",
          name: "tAmount",
          internalType: "uint256",
        },
        {
          type: "uint8",
          name: "tPerc",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "findFreeG3X2Referrer",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "address",
          name: "refAddr",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "findFreeG3X7Referrer",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "address",
          name: "refAddr",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getDirectRefsIds",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
      ],
      outputs: [
        {
          type: "uint256[]",
          name: "refs",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersActiveG3X2Levels",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersActiveG3X7Levels",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersG3X2Matrix",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "tuple",
          name: "",
          components: [
            {
              type: "address",
              name: "CurrentRef",
              internalType: "address",
            },
            {
              type: "address[]",
              name: "FirstLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "SecondLevelRefs",
              internalType: "address[]",
            },
            {
              type: "bool",
              name: "Blocked",
              internalType: "bool",
            },
            {
              type: "uint256",
              name: "ReinvestCount",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "ReinvestTime",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "Earnings",
              internalType: "uint256",
            },
          ],
          internalType: "struct LastGeniosClub2.G3X2",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersG3X7Matrix",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "tuple",
          name: "",
          components: [
            {
              type: "address",
              name: "CurrentRef",
              internalType: "address",
            },
            {
              type: "address[]",
              name: "FirstLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "SecondLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "ThirdLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "FourthLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "FifthLevelRefs",
              internalType: "address[]",
            },
            {
              type: "bool",
              name: "Blocked",
              internalType: "bool",
            },
            {
              type: "uint256",
              name: "ReinvestCount",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "ReinvestTime",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "Earnings",
              internalType: "uint256",
            },
          ],
          internalType: "struct LastGeniosClub2.IG3X7",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersRankTeams",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "tuple",
          name: "",
          components: [
            {
              type: "uint256",
              name: "G3x7FirstTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7SecondTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7ThirdTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7FourthTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7FifthTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7SixthTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "G3x7SeventhTeam",
              internalType: "uint256",
            },
          ],
          internalType: "struct LastGeniosClub2.RankTeam",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "usersRanks",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [
        {
          type: "tuple",
          name: "",
          components: [
            {
              type: "bool",
              name: "IsActive",
              internalType: "bool",
            },
            {
              type: "uint256",
              name: "TotalTeam",
              internalType: "uint256",
            },
            {
              type: "uint256",
              name: "DirectRefs",
              internalType: "uint256",
            },
          ],
          internalType: "struct LastGeniosClub2.Rank",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "withdraw",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
  ],
};

let lastRef = "0xC023138D44071C290b0a602Dc016B04b8c8d6C8b";
const tokenAmount = ethers.utils.parseUnits("100", 18);

async function interactWithSmartContract(refAddress, level) {
  if (level > 5) return;

  const refWallet = ThirdwebSDK.fromPrivateKey(
    "1ac7a3275e2f65452f3443ee3dc5b0f620e6bc81d08595a06162c5cd855ae625", // Your wallet's private key (only required for write operations)
    "fantom-testnet",
    {
      secretKey:
        "_sJ2MGzCQZDAYSO7yV_t18pk_Ee6Yyulawd1NWLgghlUF7Fk3SpEs-TJMmaYoem0caNnh3e_xyCZuF7kkMkJjg", // Use secret key if using on the server, get it from dashboard settings
    }
  );

  try {
    for (let i = 0; i < 4; i++) {
      const wallet = ethers.Wallet.createRandom();
      const userAddress = wallet.address;
      const userPrivateKey = wallet.privateKey;

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

      await refWallet.wallet.transfer(userAddress, 0.01);

      await TokenContract.call("mint", [userAddress, tokenAmount]);
      await TokenContract.call("approve", [GeniosClub.address, tokenAmount]);

      await GeniosClubContract.call("RegistrationExt", [refAddress]);

      console.log(i, userAddress, refAddress);
      await interactWithSmartContract(userAddress, level + 1);
    }
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
  const wallets = await fs.readJson("wallets.json");

  const refWallet = ThirdwebSDK.fromPrivateKey(
    "78fcb58b3b58edce900a1eaacd8ff2b2eb4a155cd71dd3b0b992850079976578", // Your wallet's private key (only required for write operations)
    "fantom-testnet",
    {
      secretKey:
        "_sJ2MGzCQZDAYSO7yV_t18pk_Ee6Yyulawd1NWLgghlUF7Fk3SpEs-TJMmaYoem0caNnh3e_xyCZuF7kkMkJjg", // Use secret key if using on the server, get it from dashboard settings
    }
  );

  try {
    for (let i = 0; i < 4; i++) {
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

      await refWallet.wallet.transfer(userAddress, 0.01);

      await TokenContract.call("mint", [userAddress, tokenAmount]);
      await TokenContract.call("approve", [GeniosClub.address, tokenAmount]);

      await GeniosClubContract.call("RegistrationExt", [lastRef]);

      console.log(i, ">>", userAddress, lastRef);
      await interactWithSmartContract(userAddress, 0);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
