const { ethers } = require("hardhat");

async function main() {
  let geniosClub;
  let token;
  let pool;
  let accounts;
  let user1;
  let referrer;

  accounts = await ethers.getSigners();
  console.log("accounts:", accounts.length);
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

  // User 1 registration
  await token.transfer(
    user1.address,
    ethers.BigNumber.from("5000000000000000000")
  );
  await token
    .connect(user1)
    .approve(geniosClub.address, ethers.BigNumber.from("5000000000000000000"));
  await geniosClub
    .connect(user1)
    .RegistrationExt(referrer.address, { gasLimit: 6000000 });
  const user = await geniosClub.Users(user1.address);
  console.log("user1", user.Id, user1.address);

  // Register additional users
  const numUsers = 3000;
  const lastUserId = 1;

  for (let i = 0; i < numUsers; i++) {
    const user = accounts[i + lastUserId + 1];
    const levelPrice = ethers.BigNumber.from("5000000000000000000");
    await token.transfer(user.address, levelPrice);
    await token.connect(user).approve(geniosClub.address, levelPrice);
    await geniosClub
      .connect(user)
      .RegistrationExt(user1.address, { gasLimit: 6000000 });
    const userData = await geniosClub.Users(user.address);
    console.log(`user${i + 2}`, userData.Id, user.address);
  }
}

// token 0x5FbDB2315678afecb367f032d93F642f64180aa3
// pool 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512      
// geniosClub 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
