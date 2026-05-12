const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("GeniosClub", function () {
  let geniosClub;
  let token;
  let pool;
  let accounts;
  let user1;
  let referrer;

  before(async function () {
    accounts = await ethers.getSigners();
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
  });

  it("should register a new user", async function () {
    const level = 1;

    await token.transfer(user1.address, "5000000000000000000");
    await token
      .connect(user1)
      .approve(geniosClub.address, "5000000000000000000");

    await geniosClub.connect(user1).RegistrationExt(referrer.address);
    const user = await geniosClub.Users(user1.address);

    expect(user.Id).to.equal(1);
    expect(user.Ref).to.equal(referrer.address);
    expect(
      await geniosClub.usersActiveG3X2Levels(user1.address, level)
    ).to.equal(true);
    expect(
      await geniosClub.usersActiveG3X7Levels(user1.address, level)
    ).to.equal(true);
  });

  it("usersRanks", async function () {
    console.log(await geniosClub.usersRanks(user1.address, 1));
  });

  it("should register 15 users with a user1", async function () {
    const level = 1;
    const numUsers = 13;
    const lastUserId = 1;

    for (let i = 0; i < numUsers; i++) {
      const user = accounts[i + lastUserId + 1];

      const levelPrice = "5000000000000000000";
      await token.transfer(user.address, levelPrice);

      await token.connect(user).approve(geniosClub.address, levelPrice);
      await geniosClub.connect(user).RegistrationExt(user1.address);

      const userData = await geniosClub.Users(user.address);
      expect(userData.Ref).to.equal(user1.address);

      expect(
        await geniosClub.usersActiveG3X2Levels(user.address, level)
      ).to.equal(true);
      expect(
        await geniosClub.usersActiveG3X7Levels(user.address, level)
      ).to.equal(true);
    }
  });

  it("usersRanks", async function () {
    console.log(await geniosClub.usersRanks(user1.address, 1));
  });

  it("should buy a new level", async function () {
    const level = 2;

    const levelPrice = await geniosClub.LevelPrice(level);

    // await token.transfer(user1.address, levelPrice);
    // await token.connect(user1).approve(geniosClub.address, levelPrice);
    // await geniosClub.connect(user1).buyNewLevel(level, 1);

    await token.transfer(user1.address, levelPrice);
    await token.connect(user1).approve(geniosClub.address, levelPrice);
    await geniosClub.connect(user1).buyNewLevel(level, 2);

    expect(
      await geniosClub.usersActiveG3X2Levels(user1.address, level)
    ).to.equal(true);
    expect(
      await geniosClub.usersActiveG3X7Levels(user1.address, level)
    ).to.equal(true);
  });

  it("usersRanks", async function () {
    console.log(await geniosClub.usersRanks(user1.address, 1), "first");
    // console.log(await geniosClub.usersRanks(user1.address, 2), "sec");
    // console.log(await pool.IsUserExists(user1.address, 1));
    // console.log(await pool.Week(0, 1));
    // console.log(await pool.Week(1, 1));
    // console.log(await pool.Week(2, 1));
    // console.log(await pool.TotalAmount());
  });

  it("usersRanks", async function () {
    // console.log(await pool.IsUserExists(user1.address, 1));
    // console.log(await pool.CheckWithdrawAmount(1, user1.address));

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    await time.increaseTo(unlockTime);

    // console.log(await pool.CheckWithdrawAmount(1, user1.address));
  });

  it("should register 15 users with a user1", async function () {
    const level = 1;
    const numUsers = 14;
    const lastUserId = 1;

    const user = accounts[15];

    const levelPrice = "5000000000000000000";
    await token.transfer(user.address, levelPrice);

    await token.connect(user).approve(geniosClub.address, levelPrice);
    await geniosClub.connect(user).RegistrationExt(user1.address);

    const userData = await geniosClub.Users(user.address);
    expect(userData.Ref).to.equal(user1.address);

    expect(
      await geniosClub.usersActiveG3X2Levels(user.address, level)
    ).to.equal(true);
    expect(
      await geniosClub.usersActiveG3X7Levels(user.address, level)
    ).to.equal(true);
  });

  it("usersRanks", async function () {
    // console.log(
    //   "_____________________________________________________________________"
    // );
    // console.log(await pool.Week(0, 1));
    // console.log(await pool.Week(1, 1));
    // console.log(await pool.Week(2, 1));
    // console.log(await pool.CheckWithdrawAmount(1, user1.address));
    await pool.WithdrawAmount(1, user1.address);
    // console.log(await pool.CheckWithdrawAmount(1, user1.address));
  });
});
