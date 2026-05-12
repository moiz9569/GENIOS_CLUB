export const ActiveChain = "polygon";

// Testnet Address
// export const PoolAddress = "0x4B5191EE2A074906FE9bE43be36f4F3Cb1571A23";
// export const GenAddress = "0x4152DF5D00e62dEa215222522DCEa5a1668b6E16";
// export const LucAddress = "0x977C72C8175a6F03fE1CaC4683599073BD44D3A0";

// Mainnet Address
// export const PoolAddress = "0x4B5191EE2A074906FE9bE43be36f4F3Cb1571A23";
export const GenAddress = "0x18642729d5770b18c108D0B991903e857f04497E";
export const LucAddress = "0x977C72C8175a6F03fE1CaC4683599073BD44D3A0";

export const GenAbi = [
  {
    inputs: [
      { internalType: "address", name: "id0", type: "address" },
      { internalType: "address", name: "tokenAddr", type: "address" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint8", name: "level", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint8", name: "level", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint8", name: "level", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "uint8", name: "matrix", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "MissedTokenReceive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
      { indexed: false, internalType: "uint8", name: "matrix", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "place", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "RankEarners",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
      { indexed: false, internalType: "uint8", name: "matrix", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "from", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      { indexed: false, internalType: "uint8", name: "matrix", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      { indexed: false, internalType: "uint8", name: "matrix", type: "uint8" },
      { indexed: false, internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "Upgrade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "ref", type: "address" },
      { indexed: true, internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "UserAdd",
    type: "event",
  },
  {
    inputs: [],
    name: "AcademyAndMarketingAddr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AcademyAndMarketingComm",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Id0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "IdToAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "IsUserExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LAST_LEVEL",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LastUserId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "LevelPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "LevelPricePercentage",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Platform",
    outputs: [
      { internalType: "uint256", name: "G3X2TotalEarnings", type: "uint256" },
      { internalType: "uint256", name: "G3X7TotalEarnings", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "RankReqTotalTeam",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "RankTeamPerLineLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RanksComm",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "refAddr", type: "address" }],
    name: "RegistrationExt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Users",
    outputs: [
      { internalType: "uint256", name: "Id", type: "uint256" },
      { internalType: "address", name: "Ref", type: "address" },
      { internalType: "uint256", name: "Amount", type: "uint256" },
      { internalType: "uint256", name: "TotalTeam", type: "uint256" },
      { internalType: "uint256", name: "DirectRefs", type: "uint256" },
      { internalType: "uint256", name: "G3X2Earnings", type: "uint256" },
      { internalType: "uint256", name: "G3X7Earnings", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "UsersTeams",
    outputs: [
      { internalType: "uint256", name: "G3x2FirstTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x2SecondTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x7FirstTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x7SecondTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x7ThirdTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x7FourthTeam", type: "uint256" },
      { internalType: "uint256", name: "G3x7FifthTeam", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "level", type: "uint8" },
      { internalType: "uint8", name: "matrix", type: "uint8" },
    ],
    name: "buyNewLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tAmount", type: "uint256" },
      { internalType: "uint8", name: "tPerc", type: "uint8" },
    ],
    name: "calPerc",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "findFreeG3X2Referrer",
    outputs: [{ internalType: "address", name: "refAddr", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "findFreeG3X7Referrer",
    outputs: [{ internalType: "address", name: "refAddr", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "userAddr", type: "address" }],
    name: "getDirectRefsIds",
    outputs: [{ internalType: "uint256[]", name: "refs", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersActiveG3X2Levels",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersActiveG3X7Levels",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersG3X2Matrix",
    outputs: [
      {
        components: [
          { internalType: "address", name: "CurrentRef", type: "address" },
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
          { internalType: "bool", name: "Blocked", type: "bool" },
          { internalType: "uint256", name: "ReinvestCount", type: "uint256" },
          { internalType: "uint256", name: "ReinvestTime", type: "uint256" },
          { internalType: "uint256", name: "Earnings", type: "uint256" },
        ],
        internalType: "struct GeniosClubDai.G3X2",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersG3X7Matrix",
    outputs: [
      {
        components: [
          { internalType: "address", name: "CurrentRef", type: "address" },
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
          { internalType: "bool", name: "Blocked", type: "bool" },
          { internalType: "uint256", name: "ReinvestCount", type: "uint256" },
          { internalType: "uint256", name: "ReinvestTime", type: "uint256" },
          { internalType: "uint256", name: "Earnings", type: "uint256" },
        ],
        internalType: "struct GeniosClubDai.IG3X7",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersRankTeams",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "G3x7FirstTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7SecondTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7ThirdTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7FourthTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7FifthTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7SixthTeam", type: "uint256" },
          { internalType: "uint256", name: "G3x7SeventhTeam", type: "uint256" },
        ],
        internalType: "struct GeniosClubDai.RankTeam",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "uint8", name: "level", type: "uint8" },
    ],
    name: "usersRanks",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "IsActive", type: "bool" },
          { internalType: "uint256", name: "TotalTeam", type: "uint256" },
          { internalType: "uint256", name: "DirectRefs", type: "uint256" },
        ],
        internalType: "struct GeniosClubDai.Rank",
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
];
