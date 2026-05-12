// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGeniosClub {
  event Registration(
    address indexed user,
    address indexed referrer,
    uint256 indexed userId,
    uint256 referrerId
  );

  event Reinvest(
    uint256 indexed userId,
    address indexed user,
    address indexed CurrentRef,
    address caller,
    uint8 matrix,
    uint8 level
  );

  event Upgrade(
    uint256 indexed userId,
    address indexed user,
    address indexed referrer,
    uint8 matrix,
    uint8 level
  );

  event NewUserPlace(
    address indexed user,
    address indexed referrer,
    uint256 indexed userId,
    uint8 matrix,
    uint8 level,
    uint8 place
  );

  event MissedTokenReceive(
    uint256 indexed userId,
    address indexed receiver,
    address indexed from,
    uint8 matrix,
    uint8 level
  );

  event SentExtraTokenDividends(
    uint256 indexed userId,
    address indexed from,
    address indexed receiver,
    uint8 matrix,
    uint8 level
  );

  event G3X7RankUpdated(
    uint256 indexed userId,
    address indexed user,
    uint8 indexed level,
    uint256 amount
  );

  event G3X7ClubUpdated(
    uint256 indexed userId,
    address indexed user,
    uint8 indexed level,
    uint256 amount
  );

  event G3X7AcademyUpdated(
    uint256 indexed userId,
    address indexed user,
    uint8 indexed level,
    uint256 amount
  );

  event RankEarners(
    uint256 indexed userId,
    address indexed user,
    uint8 indexed level
  );
}
