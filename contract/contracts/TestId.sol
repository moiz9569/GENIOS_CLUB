// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract testids{
    mapping(uint => address[])public addr;
    function add(uint8 level, address _addr)public{
        addr[level].push(_addr);
    }
    function gerAddr(uint8 level) public view returns(address[] memory){
        return addr[level];
    }
} 