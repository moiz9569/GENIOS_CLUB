// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPool {
  event Deposit(uint8 indexed level, uint256 amount, uint256 week);
  event Withdraw(address indexed account, uint256 amount, uint256 week);
  event UserAdded(address indexed account, uint8 indexed level, uint256 week);

  function DepositAmount(uint8 level, uint256 amount) external returns (bool);

  function AddUser(uint8 level, address userAddr) external returns (bool);

  function setContractAddr(
    address contAddr,
    address userAddr
  ) external returns (bool);
}
