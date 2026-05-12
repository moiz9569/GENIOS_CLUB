// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("GeniosClub", function () {
//   let geniosClub;
//   let token;
//   let pool;
//   let accounts;
//   let user1;
//   let referrer;

//   before(async function () {
//     this.timeout(100000000);

//     accounts = await ethers.getSigners();
//     console.log("file: GeniosClub.js:19  accounts:", accounts.length);
//     referrer = accounts[0];
//     user1 = accounts[1];

//     const Token = await ethers.getContractFactory("MyToken");
//     token = await Token.deploy();
//     await token.deployed();

//     const Pool = await ethers.getContractFactory("Pool");
//     pool = await Pool.deploy(token.address);
//     await pool.deployed();

//     const GeniosClub = await ethers.getContractFactory("GeniosClub");
//     geniosClub = await GeniosClub.deploy(
//       referrer.address,
//       token.address,
//       pool.address,
//       referrer.address,
//       referrer.address
//     );
//     await geniosClub.deployed();

//     console.log("token", token.address);
//     console.log("pool", pool.address);
//     console.log("geniosClub", geniosClub.address);
//   });

//   it("should register a new user", async function () {
//     this.timeout(100000000);

//     const level = 1;

//     await token.transfer(user1.address, "5000000000000000000");
//     await token
//       .connect(user1)
//       .approve(geniosClub.address, "5000000000000000000");

//     await geniosClub.connect(user1).RegistrationExt(referrer.address);
//     const user = await geniosClub.Users(user1.address);

//     console.log("user1", String(user.Id), user1.address);

//     expect(user.Id).to.equal(1);
//     expect(user.Ref).to.equal(referrer.address);
//     expect(
//       await geniosClub.usersActiveG3X2Levels(user1.address, level)
//     ).to.equal(true);
//     expect(
//       await geniosClub.usersActiveG3X7Levels(user1.address, level)
//     ).to.equal(true);
//   });

//   it("should register 15 users with a user1", async function () {
//     this.timeout(100000000);

//     const level = 1;
//     const numUsers = 3400;

//     for (let i = 2; i < numUsers; i++) {
//       const user = accounts[i];

//       const levelPrice = "5000000000000000000";
//       await token.transfer(user.address, levelPrice);

//       await token.connect(user).approve(geniosClub.address, levelPrice);
//       await geniosClub.connect(user).RegistrationExt(user1.address);

//       const userData = await geniosClub.Users(user.address);
//       expect(userData.Ref).to.equal(user1.address);

//       console.log(`user${i}`, String(userData.Id), user.address);

//       expect(
//         await geniosClub.usersActiveG3X2Levels(user.address, level)
//       ).to.equal(true);
//       expect(
//         await geniosClub.usersActiveG3X7Levels(user.address, level)
//       ).to.equal(true);
//     }
//   });

//   it("should register 15 users with a user1", async function () {
//     console.log(await geniosClub.usersG3X7Matrix(user1.address, 1));
//   });
// });
