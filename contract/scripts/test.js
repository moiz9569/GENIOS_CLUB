// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const { ethers } = require("hardhat");

// async function main() {
//   const TokenAddress = "0x970c6f35Fa4f86363cd18889499c74956000976A";
//   const Token = await ethers.getContractFactory("MyToken");
//   const token = await Token.attach(TokenAddress);

//   const PoolAddress = "0x59e40ceFe876341F766EF9c8Ee280CA830528C51";
//   const Pool = await ethers.getContractFactory("Pool");
//   const pool = await Pool.attach(PoolAddress);

//   const GeniosClubAddress = "0x5A4Fc1cbC5c9F52a53E19E6AC2d416837F38dEf8";
//   const GeniosClub = await ethers.getContractFactory("GeniosClub");
//   const geniosClub = await GeniosClub.attach(GeniosClubAddress);

//   const accounts = await ethers.getSigners();

//   (async () => {
//     try {
//       const user = accounts[0];
//       console.log("file: test.js:26  user:", user.address);

//       const referrer = {
//         address: "0xcC3E7D96D12b5694C9160f186410eD0593F465E9",
//       };

//       await token.transfer(user.address, "5000000000000000000");
//       await token
//         .connect(user)
//         .approve(geniosClub.address, "5000000000000000000");

//       await geniosClub.connect(user).RegistrationExt(referrer.address);
//     } catch (error) {
//       console.log("file: test.js:42  error:", error);
//     }
//   })();
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Kai environment se provider object retrieve kare
  const provider = Kai.provider;

  // Transactions bheje
  const tx = await deployer.sendTransaction({
    to: "<address>",
    value: ethers.utils.parseEther("1.0"),
  });

  // Transaction ka receipt retrieve kare
  const receipt = await provider.getTransactionReceipt(tx.hash);

  // Receipt aur transaction details ko print kare
  console.log("Transaction Hash:", tx.hash);
  console.log("Block Number:", receipt.blockNumber);
  console.log("Gas Used:", receipt.gasUsed.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

