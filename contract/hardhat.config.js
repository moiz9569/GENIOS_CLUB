require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: "https://mainnet.infura.io/v3/6e229f4813294430b5d96ab849977a77", // Replace with the RPC URL of the mainnet node you want to fork
  //     },
  //   },
  // },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        // count: 200,
        count: 500,
      },
    },
    running: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
  },
  // ====
  plugins: ["@nomiclabs/hardhat-ethers"],
  // ====
};
