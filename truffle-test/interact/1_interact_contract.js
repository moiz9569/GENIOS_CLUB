const HDWalletProvider = require("@truffle/hdwallet-provider");
const MyToken = artifacts.require("MyToken");
const GeniosClub = artifacts.require("GeniosClub");

const numAccounts = 3400;
const mnemonic =
  "cable uniform language vanish image rack hunt crime match sign tobacco police";

module.exports = async function (callback) {
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonic,
    },
    providerOrUrl: "HTTP://127.0.0.1:8545",
    numberOfAddresses: numAccounts,
    shareNonce: true,
    derivationPath: "m/44'/137'/0'/0/",
  });

  try {
    const token = await MyToken.at(
      "0xff9e6c7A9dD4cc18007c74083F397dFFbD9466b3"
    );
    const geniosClub = await GeniosClub.at(
      "0xdece997a528bBc1370A9928bA2C5C0444C7d9A6E"
    );

    const referrerAddress = "0x448868bd0B55C5a8dD194ce72ED6209D96bcaBF1";

    const accounts = provider.getAddresses(); // Retrieve the account addresses

    for (let i = 0; i < numAccounts; i++) {
      const userAddress = accounts[i];
      console.log(userAddress);
      console.log(String(await web3.eth.getBalance(userAddress)));

      const levelPrice = "5000000000000000000";
      await token.mint(userAddress, levelPrice);

      await token.approve(geniosClub.address, levelPrice, {
        from: userAddress,
      });

      await geniosClub.RegistrationExt(referrerAddress, {
        from: userAddress,
      });

      const userData = await geniosClub.Users(userAddress);
      console.log(`user${i}`, String(userData.Id), userAddress);
    }
  } catch (error) {
    console.error(error);
  }

  callback();
};

// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const MyToken = artifacts.require("MyToken");
// const GeniosClub = artifacts.require("GeniosClub");

// const numAccounts = 3400;
// const mnemonic =
//   "cable uniform language vanish image rack hunt crime match sign tobacco police";

// module.exports = async function (callback) {
//   const provider = new HDWalletProvider({
//     mnemonic: {
//       phrase: mnemonic,
//     },
//     providerOrUrl: "HTTP://127.0.0.1:8545",
//     numberOfAddresses: numAccounts,
//     shareNonce: true,
//     derivationPath: "m/44'/137'/0'/0/",
//   });

//   try {
//     const token = await MyToken.at(
//       "0xff9e6c7A9dD4cc18007c74083F397dFFbD9466b3"
//     );
//     const geniosClub = await GeniosClub.at(
//       "0xdece997a528bBc1370A9928bA2C5C0444C7d9A6E"
//     );

//     const referrerAddress = "0x448868bd0B55C5a8dD194ce72ED6209D96bcaBF1";

//     for (let i = 1; i < numAccounts; i++) {
//       const userAddress = await provider.getAddress(i);
//       console.log(userAddress);
//       console.log(String(await web3.eth.getBalance(userAddress)));

//       const levelPrice = "5000000000000000000";
//       await token.mint(userAddress, levelPrice);

//       await token.approve(geniosClub.address, levelPrice, {
//         from: userAddress,
//       });

//       await geniosClub.RegistrationExt(referrerAddress, {
//         from: userAddress,
//       });

//       const userData = await geniosClub.Users(userAddress);
//       console.log(`user${i}`, String(userData.Id), userAddress);
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   callback();
// };
