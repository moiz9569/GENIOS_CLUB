const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GeniosClub G3X7 new registration", function () {
  let geniosClub;
  let token;
  let pool;
  let accounts;
  let user1;
  let referrer;

  before(async function () {
    this.timeout(100000000);

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
      referrer.address
    );
    await geniosClub.deployed();
  });

  it("register a new user", async function () {
    this.timeout(100000000);

    const level = 1;

    await token.transfer(accounts[1].address, "5000000000000000000");
    await token
      .connect(accounts[1])
      .approve(geniosClub.address, "5000000000000000000");

    await geniosClub.connect(accounts[1]).RegistrationExt(referrer.address);
    const user = await geniosClub.Users(accounts[1].address);

    console.log(String(user.Id), accounts[1].address);

    expect(user.Id).to.equal(1);
    expect(user.Ref).to.equal(referrer.address);
    expect(
      await geniosClub.usersActiveG3X2Levels(accounts[1].address, level)
    ).to.equal(true);
    expect(
      await geniosClub.usersActiveG3X7Levels(accounts[1].address, level)
    ).to.equal(true);
  });

  async function checkRank() {
    console.log(
      "------------------------------------------------------------------"
    );
    console.log(
      (await geniosClub.usersRanks(accounts[1].address, 1)).IsActive,
      String((await geniosClub.usersRanks(accounts[1].address, 1)).TotalTeam),
      String((await geniosClub.usersRanks(accounts[1].address, 1)).DirectRefs)
    );
    console.log(
      "------------------------------------------------------------------"
    );
    console.log(
      (await geniosClub.usersRanks(accounts[1].address, 2)).IsActive,
      String((await geniosClub.usersRanks(accounts[1].address, 2)).TotalTeam),
      String((await geniosClub.usersRanks(accounts[1].address, 2)).DirectRefs)
    );
    console.log(
      "------------------------------------------------------------------"
    );
    console.log(
      (await geniosClub.usersRanks(accounts[1].address, 3)).IsActive,
      String((await geniosClub.usersRanks(accounts[1].address, 3)).TotalTeam),
      String((await geniosClub.usersRanks(accounts[1].address, 3)).DirectRefs)
    );
    console.log(
      "------------------------------------------------------------------"
    );
  }

  it("register 15 users with a user1", async function () {
    this.timeout(100000000);

    const level = 1;
    const numUsers = 363;

    for (let i = 2; i <= numUsers; i++) {
      const user = accounts[i];

      const levelPrice = "5000000000000000000";
      await token.transfer(user.address, levelPrice);

      await token.connect(user).approve(geniosClub.address, levelPrice);
      await geniosClub.connect(user).RegistrationExt(accounts[1].address);

      const userData = await geniosClub.Users(user.address);
      expect(userData.Ref).to.equal(accounts[1].address);

      console.log(
        String(userData.Id),
        await geniosClub.usersActiveG3X2Levels(accounts[1].address, 2),
        await geniosClub.usersActiveG3X7Levels(accounts[1].address, 2),
        String(
          (await geniosClub.usersG3X7Matrix(accounts[1].address, 1))
            .ReinvestCount
        ),
        String((await geniosClub.Users(accounts[1].address)).Amount),
        String(await token.balanceOf(geniosClub.address))
      );

      await checkRank();

      expect(
        await geniosClub.usersActiveG3X2Levels(user.address, level)
      ).to.equal(true);
      expect(
        await geniosClub.usersActiveG3X7Levels(user.address, level)
      ).to.equal(true);
    }
  });

  it("buyNewLevel 15 users with a user1", async function () {
    this.timeout(100000000);

    const level = 2;
    const numUsers = 363;

    for (let i = 2; i <= numUsers; i++) {
      const user = accounts[i];

      const levelPrice = "5000000000000000000";
      await token.transfer(user.address, levelPrice);

      await token.connect(user).approve(geniosClub.address, levelPrice);
      await geniosClub.connect(user).buyNewLevel(level, 2);

      const userData = await geniosClub.Users(user.address);
      expect(userData.Ref).to.equal(accounts[1].address);

      console.log(
        String(userData.Id),
        await geniosClub.usersActiveG3X2Levels(accounts[1].address, 2),
        await geniosClub.usersActiveG3X7Levels(accounts[1].address, 2),
        String(
          (await geniosClub.usersG3X7Matrix(accounts[1].address, 1))
            .ReinvestCount
        ),
        String((await geniosClub.Users(accounts[1].address)).Amount),
        String(await token.balanceOf(geniosClub.address))
      );

      await checkRank();

      expect(
        await geniosClub.usersActiveG3X2Levels(user.address, level)
      ).to.equal(true);
      expect(
        await geniosClub.usersActiveG3X7Levels(user.address, level)
      ).to.equal(true);
    }
  });
});
