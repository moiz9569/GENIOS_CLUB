// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  let geniosClub;
  let token;
  let pool;
  let accounts;
  let user1;
  let referrer;

  accounts = await ethers.getSigners();
  console.log("file: GeniosClub.js:19  accounts:", accounts.length);
  referrer = accounts[0];
  user1 = accounts[1];

  const Token = await ethers.getContractFactory("MyToken");
  token = await Token.deploy();
  await token.deployed();

  const Pool = await ethers.getContractFactory("Pool");
  pool = await Pool.deploy(token.address);
  await pool.deployed();

  const GeniosClub = await ethers.getContractFactory("GeniosClub");
  geniosClub = await GeniosClub.deploy(
    referrer.address,
    token.address,
    pool.address,
    referrer.address,
    referrer.address
  );
  await geniosClub.deployed();

  console.log("token", token.address);
  console.log("pool", pool.address);
  console.log("geniosClub", geniosClub.address);

  (async () => {
    await token.transfer(user1.address, "5000000000000000000");
    await token
      .connect(user1)
      .approve(geniosClub.address, "5000000000000000000");

    await geniosClub.connect(user1).RegistrationExt(referrer.address);
    console.log(
      "🚀 ~ file: deployandtest.js:51 ~ referrer.address:",
      referrer.address
    );
    const user = await geniosClub.Users(user1.address);
    console.log("user1", user.Id, user1.address);
  })();

  (async () => {
    const numUsers = 20;
    const lastUserId = 1;

    for (let i = 0; i < numUsers; i++) {
      const user = accounts[i + lastUserId + 1];

      const levelPrice = "5000000000000000000";
      await token.transfer(user.address, levelPrice);

      await token.connect(user).approve(geniosClub.address, levelPrice);
      await geniosClub.connect(user).RegistrationExt(user1.address);

      const userData = await geniosClub.Users(user.address);
      console.log("user1", userData.Id, user.address);
    }
  })();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
