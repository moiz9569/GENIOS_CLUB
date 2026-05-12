// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "./IGeniosClub.sol";
import "./IPool.sol";

contract GeniosClub is IGeniosClub {
  address public Id0;
  address public TOKEN;

  struct User {
    uint256 Id;
    address Ref;
    uint256 Amount;
    uint256 TotalTeam;
    uint256 DirectRefs;
    uint256 G3X2Earnings;
    uint256 G3X7Earnings;
    uint256[] DirectRefsIds;
    mapping(uint8 => Rank) Ranks;
    mapping(uint8 => G3X2) G3X2Matrix;
    mapping(uint8 => G3X7) G3X7Matrix;
    mapping(uint8 => bool) ActiveG3X2Levels;
    mapping(uint8 => bool) ActiveG3X7Levels;
    mapping(uint8 => uint256) G3X7MatrixRecycleAmount;
  }

  struct Rank {
    bool IsActive;
    uint256 TotalTeam;
    uint256 DirectRefs;
  }

  struct G3X2 {
    address CurrentRef;
    address[] FirstLevelRefs;
    address[] SecondLevelRefs;
    bool Blocked;
    uint256 ReinvestCount;
    uint256 ReinvestTime;
    uint256 Earnings;
  }

  struct G3X7 {
    address CurrentRef;
    address[] FirstLevelRefs;
    address[] SecondLevelRefs;
    address[] ThirdLevelRefs;
    address[] FourthLevelRefs;
    address[] FifthLevelRefs;
    address[] SixthLevelRefs;
    address[] SeventhLevelRefs;
    bool Blocked;
    uint256 ReinvestCount;
    uint256 ReinvestTime;
    uint256 Earnings;
  }

  struct Teams {
    // G3x2
    uint256 G3x2FirstTeam;
    uint256 G3x2SecondTeam;
    // G3x7
    uint256 G3x7FirstTeam;
    uint256 G3x7SecondTeam;
    uint256 G3x7ThirdTeam;
    uint256 G3x7FourthTeam;
    uint256 G3x7FifthTeam;
    uint256 G3x7SixthTeam;
    uint256 G3x7SeventhTeam;
  }

  struct Plat {
    uint256 G3X2TotalEarnings;
    uint256 G3X7TotalEarnings;
  }
  Plat public Platform;

  uint256 public LastUserId = 1;

  mapping(address => User) public Users;
  mapping(address => Teams) public UsersTeams;
  mapping(address => bool) public IsUserExists;
  mapping(uint256 => address) public IdToAddress;

  uint8 public constant LAST_LEVEL = 8;
  uint256[9] public LevelPrice = [
    0,
    2.5e18,
    10e18,
    40e18,
    160e18,
    640e18,
    2560e18,
    10240e18,
    40960e18
  ];
  uint256[9] public RankReqTotalTeam = [
    0,
    10,
    40,
    160,
    640,
    2560,
    10240,
    40960,
    163840
  ];
  uint8[8] public LevelPricePercentage = [0, 5, 5, 5, 5, 5, 10, 15];

  uint8 public ClubComm = 10;
  uint8 public RanksComm = 15;
  uint8 public AcademyComm = 25;

  address public PoolAddr;
  address public ClubAddr;
  address public AcademyAddr;

  constructor(
    address id0,
    address tokenAddr,
    address poolAddr,
    address clubAddr,
    address academyAddr
  ) {
    Id0 = id0;
    TOKEN = tokenAddr;
    PoolAddr = poolAddr;
    ClubAddr = clubAddr;
    AcademyAddr = academyAddr;

    Users[Id0].Id = 0;
    IdToAddress[0] = Id0;
    IsUserExists[Id0] = true;
    for (uint8 i = 1; i <= LAST_LEVEL; i++) {
      Users[Id0].ActiveG3X2Levels[i] = true;
      Users[Id0].ActiveG3X7Levels[i] = true;
      Users[Id0].Ranks[i].IsActive = true;
    }

    IPool(PoolAddr).setContractAddr(address(this), Id0);
  }

  function RegistrationExt(address refAddr) external {
    TransferHelper.safeTransferFrom(
      TOKEN,
      msg.sender,
      address(this),
      LevelPrice[1] * 2
    );

    _registration(msg.sender, refAddr);
  }

  function buyNewLevel(uint8 level, uint8 matrix) external {
    require(matrix == 1 || matrix == 2, "GC: Invalid matrix");

    TransferHelper.safeTransferFrom(
      TOKEN,
      msg.sender,
      address(this),
      LevelPrice[level]
    );

    if (matrix == 1) {
      return _buyNewLevelG3X2(msg.sender, level);
    }

    _buyNewLevelG3X7(msg.sender, level);
  }

  function _registration(address userAddr, address refAddr) private {
    require(!IsUserExists[userAddr], "GC: User exists");
    require(IsUserExists[refAddr], "GC: Referrer not exists");

    uint8 level = 1;

    Users[userAddr].Id = LastUserId;
    Users[userAddr].Ref = refAddr;

    IdToAddress[LastUserId] = userAddr;
    Users[userAddr].Ref = refAddr;
    IsUserExists[userAddr] = true;
    LastUserId++;

    Users[refAddr].DirectRefs++;
    Users[refAddr].DirectRefsIds.push(LastUserId);

    Users[userAddr].ActiveG3X2Levels[level] = true;
    Users[userAddr].ActiveG3X7Levels[level] = true;

    if (!Users[refAddr].Ranks[level].IsActive)
      Users[refAddr].Ranks[level].DirectRefs++;

    address freeG3X2Ref = findFreeG3X2Referrer(userAddr, level);
    updateG3X2Referrer(userAddr, freeG3X2Ref, level);

    address freeG3X7Referrer = findFreeG3X7Referrer(userAddr, level);
    updateG3X7Referrer(userAddr, freeG3X7Referrer, level);

    emit Registration(userAddr, refAddr, Users[userAddr].Id, Users[refAddr].Id);
  }

  function _buyNewLevelG3X2(address userAddr, uint8 level) internal {
    require(IsUserExists[userAddr], "GC: Register first.");

    require(!Users[userAddr].ActiveG3X2Levels[level], "GC: Level activated");

    require(level > 1 && level <= LAST_LEVEL, "GC: Invalid level");

    require(
      Users[userAddr].ActiveG3X2Levels[level - 1],
      "GC: Previous level inactive"
    );

    Users[userAddr].ActiveG3X2Levels[level] = true;
    if (Users[userAddr].G3X2Matrix[level - 1].Blocked) {
      Users[userAddr].G3X2Matrix[level - 1].Blocked = false;
    }

    address freeG3X2Ref = findFreeG3X2Referrer(userAddr, level);
    updateG3X2Referrer(userAddr, freeG3X2Ref, level);
    emit Upgrade(Users[userAddr].Id, userAddr, freeG3X2Ref, 1, level);
  }

  function _buyNewLevelG3X7(address userAddr, uint8 level) internal {
    require(IsUserExists[userAddr], "GC: Register first.");

    require(!Users[userAddr].ActiveG3X7Levels[level], "GC: Level activated");

    require(level > 1 && level <= LAST_LEVEL, "GC: Invalid level");

    require(
      Users[userAddr].ActiveG3X7Levels[level - 1],
      "GC: Previous level inactive"
    );

    Users[userAddr].ActiveG3X7Levels[level] = true;
    if (Users[userAddr].G3X7Matrix[level - 1].Blocked) {
      Users[userAddr].G3X7Matrix[level - 1].Blocked = false;
    }

    if (
      !Users[userAddr].Ranks[level - 1].IsActive &&
      Users[userAddr].Ranks[level - 1].DirectRefs >= 3 &&
      Users[userAddr].Ranks[level - 1].TotalTeam >= RankReqTotalTeam[level - 1]
    ) {
      _activeUserRank(userAddr, level - 1);
    }

    address freeG3X7Referrer = findFreeG3X7Referrer(userAddr, level);
    updateG3X7Referrer(userAddr, freeG3X7Referrer, level);
    emit Upgrade(Users[userAddr].Id, userAddr, freeG3X7Referrer, 1, level);
  }

  function updateG3X2Referrer(
    address userAddr,
    address refAddr,
    uint8 level
  ) private {
    require(
      Users[refAddr].ActiveG3X2Levels[level],
      "GC: Referrer level inactive"
    );

    if (Users[refAddr].G3X2Matrix[level].FirstLevelRefs.length < 3) {
      Users[refAddr].G3X2Matrix[level].FirstLevelRefs.push(userAddr);
      UsersTeams[refAddr].G3x2FirstTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        1,
        level,
        uint8(Users[refAddr].G3X2Matrix[level].FirstLevelRefs.length)
      );

      //set current level
      Users[userAddr].G3X2Matrix[level].CurrentRef = refAddr;

      if (refAddr == Id0) {
        return sendG3X2TokenDividends(refAddr, userAddr, level);
      }

      address ref = Users[refAddr].G3X2Matrix[level].CurrentRef;
      Users[ref].G3X2Matrix[level].SecondLevelRefs.push(userAddr);
      UsersTeams[ref].G3x2SecondTeam++;

      emit NewUserPlace(
        userAddr,
        ref,
        Users[refAddr].Id,
        1,
        level,
        uint8(Users[refAddr].G3X2Matrix[level].FirstLevelRefs.length)
      );

      return updateG3X2RefSecondLevel(userAddr, ref, level);
    }

    Users[refAddr].G3X2Matrix[level].SecondLevelRefs.push(userAddr);
    UsersTeams[refAddr].G3x2SecondTeam++;

    if (
      (Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[0]]
        .G3X2Matrix[level]
        .FirstLevelRefs
        .length <=
        Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[1]]
          .G3X2Matrix[level]
          .FirstLevelRefs
          .length) &&
      (Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[1]]
        .G3X2Matrix[level]
        .FirstLevelRefs
        .length <=
        Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[2]]
          .G3X2Matrix[level]
          .FirstLevelRefs
          .length)
    ) {
      updateG3X2(userAddr, refAddr, level, 0);
    } else if (
      Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[1]]
        .G3X2Matrix[level]
        .FirstLevelRefs
        .length <=
      Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[2]]
        .G3X2Matrix[level]
        .FirstLevelRefs
        .length
    ) {
      updateG3X2(userAddr, refAddr, level, 1);
    } else {
      updateG3X2(userAddr, refAddr, level, 2);
    }

    updateG3X2RefSecondLevel(userAddr, refAddr, level);
  }

  function updateG3X2(
    address userAddr,
    address refAddr,
    uint8 level,
    uint8 x2
  ) private {
    Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[x2]]
      .G3X2Matrix[level]
      .FirstLevelRefs
      .push(userAddr);

    UsersTeams[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[x2]]
      .G3x2FirstTeam++;

    emit NewUserPlace(
      userAddr,
      Users[refAddr].G3X2Matrix[level].FirstLevelRefs[x2],
      Users[refAddr].Id,
      1,
      level,
      uint8(
        Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[x2]]
          .G3X2Matrix[level]
          .FirstLevelRefs
          .length
      )
    );

    emit NewUserPlace(
      userAddr,
      refAddr,
      Users[refAddr].Id,
      1,
      level,
      uint8(
        Users[Users[refAddr].G3X2Matrix[level].FirstLevelRefs[x2]]
          .G3X2Matrix[level]
          .FirstLevelRefs
          .length
      )
    );

    //set current level
    Users[userAddr].G3X2Matrix[level].CurrentRef = Users[refAddr]
      .G3X2Matrix[level]
      .FirstLevelRefs[x2];
  }

  function updateG3X2RefSecondLevel(
    address userAddr,
    address refAddr,
    uint8 level
  ) private {
    uint256 len = Users[refAddr].G3X2Matrix[level].SecondLevelRefs.length;

    if (len < 9) {
      if (
        !Users[refAddr].ActiveG3X2Levels[level + 1] &&
        level != LAST_LEVEL &&
        len > 4
      ) {
        Users[refAddr].Amount += LevelPrice[level];

        if (Users[refAddr].Amount >= LevelPrice[level + 1]) {
          _buyNewLevelG3X2(refAddr, level + 1);
          Users[refAddr].Amount -= LevelPrice[level + 1];
        }
        return;
      }

      return sendG3X2TokenDividends(refAddr, userAddr, level);
    }

    // recycle
    Users[refAddr].G3X2Matrix[level].FirstLevelRefs = new address[](0);
    Users[refAddr].G3X2Matrix[level].SecondLevelRefs = new address[](0);

    if (!Users[refAddr].ActiveG3X2Levels[level + 1] && level != LAST_LEVEL) {
      Users[refAddr].G3X2Matrix[level].Blocked = true;
    }

    Users[refAddr].G3X2Matrix[level].ReinvestCount++;
    Users[refAddr].G3X2Matrix[level].ReinvestTime = block.timestamp;

    if (refAddr != Id0) {
      address freeRefAddr = findFreeG3X2Referrer(refAddr, level);
      emit Reinvest(
        Users[refAddr].Id,
        refAddr,
        freeRefAddr,
        userAddr,
        1,
        level
      );

      updateG3X2Referrer(refAddr, freeRefAddr, level);
    } else {
      emit Reinvest(Users[Id0].Id, Id0, address(0), userAddr, 1, level);
      sendG3X2TokenDividends(Id0, userAddr, level);
    }
  }

  function findFreeG3X2Referrer(
    address userAddr,
    uint8 level
  ) public view returns (address refAddr) {
    while (true) {
      if (Users[Users[userAddr].Ref].ActiveG3X2Levels[level]) {
        return Users[userAddr].Ref;
      }
      userAddr = Users[userAddr].Ref;
    }
  }

  function _activeUserRank(address userAddr, uint8 level) private {
    if (
      !Users[Users[userAddr].Ref].Ranks[level].IsActive &&
      Users[userAddr].Ref != Id0 &&
      level != LAST_LEVEL
    ) Users[Users[userAddr].Ref].Ranks[level + 1].DirectRefs++;

    IPool(PoolAddr).AddUser(level, userAddr);
    Users[userAddr].Ranks[level].IsActive = true;
    emit RankEarners(Users[userAddr].Id, userAddr, level);
  }

  function updateG3X7Referrer(
    address userAddr,
    address refAddr,
    uint8 level
  ) private {
    require(
      Users[refAddr].ActiveG3X7Levels[level],
      "GC: Referrer level inactive"
    );

    Users[refAddr].TotalTeam++;

    // update
    if (!Users[refAddr].Ranks[level].IsActive)
      Users[refAddr].Ranks[level].TotalTeam++;

    if (
      !Users[refAddr].Ranks[level].IsActive &&
      Users[refAddr].Ranks[level].DirectRefs >= 3 &&
      Users[refAddr].Ranks[level].TotalTeam >= RankReqTotalTeam[level]
    ) {
      if (
        (Users[refAddr].ActiveG3X7Levels[level + 1] && level != LAST_LEVEL) ||
        level == LAST_LEVEL
      ) {
        _activeUserRank(refAddr, level);
      }
    }

    // Update the referrer's referrals based on the level
    if (Users[refAddr].G3X7Matrix[level].FirstLevelRefs.length < 3) {
      Users[refAddr].G3X7Matrix[level].FirstLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7FirstTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FirstLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].SecondLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7SecondTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FirstLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, ref_currentRef, level);
    } else if (Users[refAddr].G3X7Matrix[level].SecondLevelRefs.length < 9) {
      Users[refAddr].G3X7Matrix[level].SecondLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7SecondTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].SecondLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].ThirdLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7ThirdTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].SecondLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, refAddr, level);
    } else if (Users[refAddr].G3X7Matrix[level].ThirdLevelRefs.length < 27) {
      Users[refAddr].G3X7Matrix[level].ThirdLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7ThirdTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].ThirdLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].FourthLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7FourthTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].ThirdLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, refAddr, level);
    } else if (Users[refAddr].G3X7Matrix[level].FourthLevelRefs.length < 81) {
      Users[refAddr].G3X7Matrix[level].FourthLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7FourthTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FourthLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].FifthLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7FifthTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FourthLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, refAddr, level);
    } else if (Users[refAddr].G3X7Matrix[level].FifthLevelRefs.length < 243) {
      Users[refAddr].G3X7Matrix[level].FifthLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7FifthTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FifthLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].SixthLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7SixthTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].FifthLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, refAddr, level);
    } else if (Users[refAddr].G3X7Matrix[level].SixthLevelRefs.length < 729) {
      Users[refAddr].G3X7Matrix[level].SixthLevelRefs.push(userAddr);
      Users[userAddr].G3X7Matrix[level].CurrentRef = refAddr;
      UsersTeams[refAddr].G3x7SixthTeam++;

      emit NewUserPlace(
        userAddr,
        refAddr,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].SixthLevelRefs.length)
      );

      if (refAddr == Id0) {
        return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
      }

      address ref_currentRef = Users[refAddr].G3X7Matrix[level].CurrentRef;
      Users[ref_currentRef].G3X7Matrix[level].SeventhLevelRefs.push(userAddr);
      UsersTeams[ref_currentRef].G3x7SeventhTeam++;

      emit NewUserPlace(
        userAddr,
        ref_currentRef,
        Users[refAddr].Id,
        2,
        level,
        uint8(Users[refAddr].G3X7Matrix[level].SixthLevelRefs.length)
      );

      return updateG3X7RefLastLevel(userAddr, refAddr, level);
    }

    Users[refAddr].G3X7Matrix[level].SeventhLevelRefs.push(userAddr);
    UsersTeams[refAddr].G3x7SeventhTeam++;

    if (
      (Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[0]]
        .G3X7Matrix[level]
        .FirstLevelRefs
        .length <=
        Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[1]]
          .G3X7Matrix[level]
          .FirstLevelRefs
          .length) &&
      (Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[1]]
        .G3X7Matrix[level]
        .FirstLevelRefs
        .length <=
        Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[2]]
          .G3X7Matrix[level]
          .FirstLevelRefs
          .length)
    ) {
      updateG3X7(userAddr, refAddr, level, 0);
    } else if (
      Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[1]]
        .G3X7Matrix[level]
        .FirstLevelRefs
        .length <=
      Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[2]]
        .G3X7Matrix[level]
        .FirstLevelRefs
        .length
    ) {
      updateG3X7(userAddr, refAddr, level, 1);
    } else {
      updateG3X7(userAddr, refAddr, level, 2);
    }

    updateG3X7RefLastLevel(userAddr, refAddr, level);
  }

  function updateG3X7(
    address userAddr,
    address refAddr,
    uint8 level,
    uint8 x2
  ) private {
    Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[x2]]
      .G3X7Matrix[level]
      .FirstLevelRefs
      .push(userAddr);

    UsersTeams[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[x2]]
      .G3x7FirstTeam++;

    emit NewUserPlace(
      userAddr,
      Users[refAddr].G3X7Matrix[level].FirstLevelRefs[x2],
      Users[refAddr].Id,
      2,
      level,
      uint8(
        Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[x2]]
          .G3X7Matrix[level]
          .FirstLevelRefs
          .length
      )
    );

    emit NewUserPlace(
      userAddr,
      refAddr,
      Users[refAddr].Id,
      2,
      level,
      uint8(
        Users[Users[refAddr].G3X7Matrix[level].FirstLevelRefs[x2]]
          .G3X7Matrix[level]
          .FirstLevelRefs
          .length
      )
    );

    //set current level
    Users[userAddr].G3X7Matrix[level].CurrentRef = Users[refAddr]
      .G3X7Matrix[level]
      .FirstLevelRefs[x2];
  }

  function updateG3X7RefLastLevel(
    address userAddr,
    address refAddr,
    uint8 level
  ) private {
    uint256 len = Users[refAddr].G3X7Matrix[level].SeventhLevelRefs.length;
    uint256 amount = calPerc(LevelPrice[level], LevelPricePercentage[1]);

    if (len <= 2167) {
      if (
        !Users[refAddr].ActiveG3X7Levels[level + 1] &&
        level != LAST_LEVEL &&
        len >= 2087
      ) {
        Users[refAddr].Amount += amount;
        sendG3X7TokenDividends(refAddr, userAddr, level, 2);

        if (Users[refAddr].Amount >= LevelPrice[level + 1]) {
          _buyNewLevelG3X7(refAddr, level + 1);
          Users[refAddr].Amount -= LevelPrice[level + 1];
        }

        return;
      }

      return sendG3X7TokenDividends(refAddr, userAddr, level, 1);
    }

    if (len < 2187) {
      Users[refAddr].G3X7MatrixRecycleAmount[level] += amount;
      return sendG3X7TokenDividends(refAddr, userAddr, level, 2);
    }

    Users[refAddr].G3X7MatrixRecycleAmount[level] = 0;
    sendG3X7TokenDividends(refAddr, userAddr, level, 2);

    // recycle
    Users[refAddr].G3X7Matrix[level].FirstLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].SecondLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].ThirdLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].FourthLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].FifthLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].SixthLevelRefs = new address[](0);
    Users[refAddr].G3X7Matrix[level].SeventhLevelRefs = new address[](0);

    if (!Users[refAddr].ActiveG3X7Levels[level + 1] && level != LAST_LEVEL) {
      Users[refAddr].G3X7Matrix[level].Blocked = true;
    }

    Users[refAddr].G3X7Matrix[level].ReinvestCount++;
    Users[refAddr].G3X7Matrix[level].ReinvestTime = block.timestamp;

    if (refAddr != Id0) {
      address freeRefAddr = findFreeG3X7Referrer(refAddr, level);
      emit Reinvest(
        Users[refAddr].Id,
        refAddr,
        freeRefAddr,
        userAddr,
        2,
        level
      );

      updateG3X7Referrer(refAddr, freeRefAddr, level);
    } else {
      emit Reinvest(Users[Id0].Id, Id0, address(0), userAddr, 2, level);
      sendG3X7TokenDividends(Id0, userAddr, level, 1);
    }
  }

  function findFreeG3X7Referrer(
    address userAddr,
    uint8 level
  ) public view returns (address refAddr) {
    while (true) {
      if (Users[Users[userAddr].Ref].ActiveG3X7Levels[level]) {
        return Users[userAddr].Ref;
      }
      userAddr = Users[userAddr].Ref;
    }
  }

  function sendG3X2TokenDividends(
    address refAddr,
    address userAddr,
    uint8 level
  ) private {
    (address receiver, bool isExtraDividends) = findTokenReceiver(
      refAddr,
      userAddr,
      level
    );

    uint256 amount1 = LevelPrice[level];
    TransferHelper.safeTransfer(TOKEN, receiver, amount1);

    Platform.G3X2TotalEarnings += amount1;
    Users[receiver].G3X2Earnings += amount1;
    Users[receiver].G3X2Matrix[level].Earnings += amount1;

    if (isExtraDividends)
      emit SentExtraTokenDividends(
        Users[userAddr].Id,
        userAddr,
        receiver,
        1,
        level
      );
  }

  function sendG3X7TokenDividends(
    address refAddr,
    address userAddr,
    uint8 level,
    uint8 from
  ) private {
    (address receiver, bool isExtraDividends) = findTokenReceiver(
      refAddr,
      userAddr,
      level
    );

    updateG3X7Pool(receiver, level);
    updateG3X7Club(receiver, level);
    updateG3X7Academy(receiver, level);

    for (uint8 i = from; i <= 7; i++) {
      if (i > 1 && receiver != Id0)
        receiver = Users[receiver].G3X7Matrix[level].CurrentRef;

      uint256 amount2 = calPerc(LevelPrice[level], LevelPricePercentage[i]);
      TransferHelper.safeTransfer(TOKEN, receiver, amount2);

      Platform.G3X7TotalEarnings += amount2;
      Users[receiver].G3X7Earnings += amount2;
      Users[receiver].G3X7Matrix[level].Earnings += amount2;

      if (isExtraDividends)
        emit SentExtraTokenDividends(
          Users[userAddr].Id,
          userAddr,
          receiver,
          2,
          level
        );
    }
  }

  function findTokenReceiver(
    address refAddr,
    address userAddr,
    uint8 level
  ) private returns (address _receiver, bool _isExtraDividends) {
    address receiver = refAddr;
    bool isExtraDividends;

    while (true) {
      if (Users[receiver].G3X7Matrix[level].Blocked) {
        emit MissedTokenReceive(
          Users[receiver].Id,
          receiver,
          userAddr,
          2,
          level
        );
        isExtraDividends = true;
        receiver = Users[receiver].G3X7Matrix[level].CurrentRef;
      } else {
        return (receiver, isExtraDividends);
      }
    }
  }

  function updateG3X7Pool(address userAddr, uint8 level) private {
    uint256 commAmount = calPerc(LevelPrice[level], RanksComm);
    TransferHelper.safeTransfer(TOKEN, PoolAddr, commAmount);
    IPool(PoolAddr).DepositAmount(level, commAmount);
    emit G3X7RankUpdated(Users[userAddr].Id, userAddr, level, commAmount);
  }

  function updateG3X7Club(address userAddr, uint8 level) private {
    uint256 commAmount = calPerc(LevelPrice[level], ClubComm);
    TransferHelper.safeTransfer(TOKEN, ClubAddr, commAmount);
    emit G3X7ClubUpdated(Users[userAddr].Id, userAddr, level, commAmount);
  }

  function updateG3X7Academy(address userAddr, uint8 level) private {
    uint256 commAmount = calPerc(LevelPrice[level], AcademyComm);
    TransferHelper.safeTransfer(TOKEN, AcademyAddr, commAmount);
    emit G3X7AcademyUpdated(Users[userAddr].Id, userAddr, level, commAmount);
  }

  function activateAllG3X2Levels(address userAddr) public {
    require(Id0 == msg.sender, "GC: !Id0");

    for (uint8 i = 1; i <= LAST_LEVEL; i++) {
      Users[userAddr].ActiveG3X2Levels[i] = true;
      Users[userAddr].G3X2Matrix[i].Blocked = false;
    }
  }

  function activateAllG3X7Levels(address userAddr) public {
    require(Id0 == msg.sender, "GC: !Id0");

    for (uint8 i = 1; i <= LAST_LEVEL; i++) {
      Users[userAddr].ActiveG3X7Levels[i] = true;
      Users[userAddr].G3X7Matrix[i].Blocked = false;
    }
  }

  function usersActiveG3X2Levels(
    address userAddr,
    uint8 level
  ) public view returns (bool) {
    return Users[userAddr].ActiveG3X2Levels[level];
  }

  function usersActiveG3X7Levels(
    address userAddr,
    uint8 level
  ) public view returns (bool) {
    return Users[userAddr].ActiveG3X7Levels[level];
  }

  function usersRanks(
    address userAddr,
    uint8 level
  ) public view returns (Rank memory) {
    return
      Rank({
        IsActive: Users[userAddr].Ranks[level].IsActive,
        TotalTeam: Users[userAddr].Ranks[level].TotalTeam,
        DirectRefs: Users[userAddr].Ranks[level].DirectRefs
      });
  }

  function usersG3X2Matrix(
    address userAddr,
    uint8 level
  ) public view returns (G3X2 memory) {
    return
      G3X2({
        CurrentRef: Users[userAddr].G3X2Matrix[level].CurrentRef,
        FirstLevelRefs: Users[userAddr].G3X2Matrix[level].FirstLevelRefs,
        SecondLevelRefs: Users[userAddr].G3X2Matrix[level].SecondLevelRefs,
        Blocked: Users[userAddr].G3X2Matrix[level].Blocked,
        ReinvestCount: Users[userAddr].G3X2Matrix[level].ReinvestCount,
        ReinvestTime: Users[userAddr].G3X2Matrix[level].ReinvestTime,
        Earnings: Users[userAddr].G3X2Matrix[level].Earnings
      });
  }

  function usersG3X7Matrix(
    address userAddr,
    uint8 level
  ) public view returns (G3X7 memory) {
    return
      G3X7({
        CurrentRef: Users[userAddr].G3X7Matrix[level].CurrentRef,
        FirstLevelRefs: Users[userAddr].G3X7Matrix[level].FirstLevelRefs,
        SecondLevelRefs: Users[userAddr].G3X7Matrix[level].SecondLevelRefs,
        ThirdLevelRefs: Users[userAddr].G3X7Matrix[level].ThirdLevelRefs,
        FourthLevelRefs: Users[userAddr].G3X7Matrix[level].FourthLevelRefs,
        FifthLevelRefs: Users[userAddr].G3X7Matrix[level].FifthLevelRefs,
        SixthLevelRefs: Users[userAddr].G3X7Matrix[level].SixthLevelRefs,
        SeventhLevelRefs: Users[userAddr].G3X7Matrix[level].SeventhLevelRefs,
        Blocked: Users[userAddr].G3X7Matrix[level].Blocked,
        ReinvestCount: Users[userAddr].G3X7Matrix[level].ReinvestCount,
        ReinvestTime: Users[userAddr].G3X7Matrix[level].ReinvestTime,
        Earnings: Users[userAddr].G3X7Matrix[level].Earnings
      });
  }

  function withdraw() public {
    require(IsUserExists[msg.sender], "GC: Users not exists");
    require(Users[msg.sender].Amount > 0, "GC: Users didn't have any amount");

    TransferHelper.safeTransfer(TOKEN, msg.sender, Users[msg.sender].Amount);
    Users[msg.sender].Amount = 0;
  }

  function getDirectRefsIds(
    address userAddr
  ) public view returns (uint256[] memory refs) {
    return Users[userAddr].DirectRefsIds;
  }

  function calPerc(uint256 tAmount, uint8 tPerc) public pure returns (uint256) {
    uint256 perc = (tAmount * tPerc) / 100;
    return perc;
  }
}
