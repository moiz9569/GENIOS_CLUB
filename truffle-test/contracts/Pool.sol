// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "./IPool.sol";

contract Pool is IPool {
  struct WeekData {
    uint256 TUsers;
    uint256 TAmount;
  }

  struct UserData {
    uint256 LastWithdrawWeek;
    uint256 LastWithdrawAmount;
    uint256 TotalWithdrawAmount;
  }

  bool internal Locked;

  uint256 public CurrentWeek; // Current week counter
  uint256 public LastWeekStart; // Timestamp of the start of the last week
  uint256 public NextWeekStart; // Timestamp of the start of the next week
  uint256 public LastDepositWeek; // Week number of the last deposit

  uint256 public TotalAmount; // Total amount deposited
  uint256 public TotalRanksEarnings;
  uint256 public TotalDepositWeek; // Week number of the total deposit when amount was deposited

  mapping(address => uint256) public UserRanksEarnings;
  mapping(address => mapping(uint8 => UserData)) public User;
  mapping(address => mapping(uint8 => bool)) public IsUserExists;
  mapping(uint256 => mapping(uint8 => WeekData)) public Week;

  address public TOKEN;
  address public CONTRACT;

  constructor(address tokenAddr) {
    TOKEN = tokenAddr;

    CurrentWeek = 1; // Initialize current week counter to 1
    LastWeekStart = block.timestamp; // Initialize the timestamp of the start of the last week to the contract deployment time
    NextWeekStart = block.timestamp + 1 weeks; // Calculate the timestamp for the start of the next week
    LastDepositWeek = 0; // Initialize last deposit week to 0

    TotalAmount = 0; // Initialize total amount deposited to 0
    TotalDepositWeek = 0; // Initialize total amount deposited to 0
  }

  modifier noReentrant() {
    require(!Locked, "No re-entrancy");
    Locked = true;
    _;
    Locked = false;
  }

  modifier OnlyContract() {
    require(msg.sender == CONTRACT, "POOL: Not contract");
    _;
  }

  function setContractAddr(
    address contAddr,
    address userAddr
  ) external returns (bool) {
    require(CONTRACT == address(0));

    CONTRACT = contAddr;

    for (uint8 i = 1; i <= 8; i++) {
      User[userAddr][i] = UserData({
        LastWithdrawWeek: 0,
        LastWithdrawAmount: 0,
        TotalWithdrawAmount: 0
      });

      IsUserExists[userAddr][i] = true;
      Week[TotalDepositWeek][i].TUsers++;
    }

    return true;
  }

  function DepositAmount(
    uint8 level,
    uint256 amount
  ) external OnlyContract returns (bool) {
    if (amount == 0) return false;

    if (block.timestamp >= NextWeekStart) _updateNewWeek(level);

    TotalAmount += amount; // Add the deposit amount to the total amount deposited
    Week[TotalDepositWeek][level].TAmount += amount;

    emit Deposit(level, amount, TotalDepositWeek); // Emit the deposit event
    return true;
  }

  function _updateNewWeek(uint8 level) internal {
    // Update if a new week has started
    uint256 weeksPassed = (block.timestamp - LastWeekStart) / 1 weeks; // Calculate the number of weeks passed since the last week start
    CurrentWeek += weeksPassed; // Increment the current week counter by the number of weeks passed
    LastWeekStart += weeksPassed * 1 weeks; // Update the timestamp of the start of the last week
    NextWeekStart += weeksPassed * 1 weeks; // Update the timestamp of the start of the next week

    // Save the amount and update week if necessary
    if (LastDepositWeek != CurrentWeek) {
      LastDepositWeek = CurrentWeek; // Update the last deposit week to the current week

      Week[TotalDepositWeek + 1][level] = WeekData({
        TUsers: Week[TotalDepositWeek][level].TUsers,
        TAmount: 0
      });

      TotalDepositWeek++;
    }
  }

  function AddUser(
    uint8 level,
    address userAddr
  ) external OnlyContract returns (bool) {
    if (IsUserExists[userAddr][level]) return false;

    User[userAddr][level] = UserData({
      LastWithdrawWeek: TotalDepositWeek,
      LastWithdrawAmount: 0,
      TotalWithdrawAmount: 0
    });
    IsUserExists[userAddr][level] = true;
    Week[TotalDepositWeek][level].TUsers++;

    emit UserAdded(userAddr, level, TotalDepositWeek); // Emit the deposit event
    return true;
  }

  function WithdrawAmount(
    uint8 level,
    address userAddr
  ) external noReentrant returns (bool) {
    require(IsUserExists[userAddr][level], "POOL: User not exists");

    if (block.timestamp >= NextWeekStart) _updateNewWeek(level);

    require(
      User[userAddr][level].LastWithdrawWeek < TotalDepositWeek,
      "POOL: Invalid time to Withdraw"
    );

    uint256 amount;
    for (
      uint i = User[userAddr][level].LastWithdrawWeek;
      i < TotalDepositWeek;
      i++
    ) {
      amount += (Week[i][level].TAmount / Week[i][level].TUsers);
    }

    require(amount >= 25e18, "POOL: min amount shold be 25");

    TotalAmount -= amount;
    TotalRanksEarnings += amount;
    UserRanksEarnings[userAddr] += TotalDepositWeek;
    User[userAddr][level].LastWithdrawAmount = amount;
    User[userAddr][level].TotalWithdrawAmount += amount;
    User[userAddr][level].LastWithdrawWeek = TotalDepositWeek;

    TransferHelper.safeTransfer(TOKEN, userAddr, amount);

    emit Withdraw(userAddr, amount, TotalDepositWeek - 1);
    return true;
  }

  function CheckWithdrawAmount(
    uint8 level,
    address userAddr
  ) external view returns (uint256 lastWeekAmount, uint256 currentWeekAmount) {
    if (IsUserExists[userAddr][level]) return (0, 0);

    uint256 amount;
    for (
      uint i = User[userAddr][level].LastWithdrawWeek;
      i < TotalDepositWeek;
      i++
    ) {
      amount += (Week[i][level].TAmount / Week[i][level].TUsers);
    }

    return (
      amount,
      (Week[TotalDepositWeek][level].TAmount /
        Week[TotalDepositWeek][level].TUsers)
    );
  }

  function IsTimeToWithdraw(
    uint8 level,
    address userAddr
  ) external view returns (bool) {
    if (User[userAddr][level].LastWithdrawWeek < TotalDepositWeek) return true;
    if (block.timestamp >= NextWeekStart) return true;
    return false;
  }
}
