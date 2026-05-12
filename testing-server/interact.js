const ethers = require("ethers");
const fs = require("fs-extra");
const axios = require("axios");

const GeniosClub = {
  address: "0xABf63CA7Ce66894E7DaC64a258f04DDe84a52F22",
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
        {
          type: "address",
          name: "curRefaddr",
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
          type: "address",
          name: "curRefaddr",
          internalType: "address",
        },
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
      name: "buyNewLevelG3X7ById0",
      inputs: [
        {
          type: "address",
          name: "userAddr",
          internalType: "address",
        },
        {
          type: "address",
          name: "curRefaddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
          internalType: "uint8",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "buyNewLevelWithUserAmount",
      inputs: [
        {
          type: "address",
          name: "curRefaddr",
          internalType: "address",
        },
        {
          type: "uint8",
          name: "level",
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
          internalType: "struct GeniosClub.G3X2",
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
              type: "address[]",
              name: "SixthLevelRefs",
              internalType: "address[]",
            },
            {
              type: "address[]",
              name: "SeventhLevelRefs",
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
          internalType: "struct GeniosClub.G3X7",
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
          internalType: "struct GeniosClub.RankTeam",
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
          internalType: "struct GeniosClub.Rank",
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

const TOKEN = {
  address: "0x1dC9c9F373F2B93D0A1d3aab90314fA54B8D33E5",
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

const myKey =
  "0x4bd660d4bd7d70506a58cb17008b7174fea724c0c96484f26e703ae56a0f638d";

async function interactWithSmartContract() {
  // Read the wallets from the JSON file
  const wallets = await fs.readJson("wallets.json");

  // Connect to an Ethereum provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://fantom-testnet.rpc.thirdweb.com/a4dd70b7f2902f6e1a77073d42605471"
  );

  const tokenAmount = ethers.utils.parseUnits("100", 18);
  const ethAmount = ethers.utils.parseUnits("0.01", 18);

  // let refAddress = "0xe0A6C3595507186729FAF056893F8665173e2855";
  let refAddress = "0xB4Ac4f22AF5701082422192E1B088F2955352A06";
  const refWallet = new ethers.Wallet(myKey, provider);

  // for (let i = 0; i < wallets.length; i++) {
  try {
    for (let i = 31; i <= 32; i++) {
      const userAddress = wallets[i].address;
      const userPrivateKey = wallets[i].privateKey;

      // Define the transaction object
      const transaction = {
        to: userAddress,
        value: ethAmount,
        gasLimit: 21000000, // This is the standard gas limit for an ETH transfer
        gasPrice: 80000000000, // Use the retrieved gas price
        // gasLimit: 21000, // This is the standard gas limit for an ETH transfer
        // gasPrice: await provider.getGasPrice(), // Use the retrieved gas price
      };

      const signedTransaction = await refWallet.signTransaction(transaction);
      const txResponse = await provider.sendTransaction(signedTransaction);
      await txResponse.wait();

      const response = await axios.post(`http://localhost:8000/matrix/add/`, {
        userAddress: userAddress,
        referrerAddress: refAddress,
      });
      console.log("🚀  response:", response.data.matrix.currentReferrer);
      // const response = await axios.post(
      //   `http://localhost:3000/api/matrix/add/${refAddress}`
      // );
      const signer = new ethers.Wallet(userPrivateKey, provider);
      const TokenContract = new ethers.Contract(
        TOKEN.address,
        TOKEN.abi,
        signer
      );
      const GeniosClubContract = new ethers.Contract(
        GeniosClub.address,
        GeniosClub.abi,
        signer
      );

      const mintTransaction = await TokenContract.mint(
        userAddress,
        tokenAmount
      );
      await mintTransaction.wait();

      const approveTransaction = await TokenContract.approve(
        GeniosClub.address,
        tokenAmount
      );
      await approveTransaction.wait();

      const GeniosClubTransaction = await GeniosClubContract.RegistrationExt(
        refAddress,
        response.data.matrix.currentReferrer
      );
      await GeniosClubTransaction.wait();

      console.log(
        i,
        userAddress,
        refAddress,
        response.data.matrix.currentReferrer
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

interactWithSmartContract();
