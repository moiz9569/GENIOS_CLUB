// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GeniosClub {
    struct User {
        uint256 id;
        address referrer;
        uint256 partnersCount;
        address currentReferrer;
        uint256 reinvestCount;
        // matrix
        address[] firstLevel; // max 3
        address[] secondLevel; // max 9
    }

    mapping(address => User) public users;

    uint256 public lastUserId = 2;
    address public id1 = 0x93a33efC878C6Ee5E8960B47Eb93f4296288b978;

    constructor() {
        users[id1].id = 1;
    }

    function _registration(address userAddress, address referrerAddress) private {
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");

        users[userAddress].id = lastUserId;
        users[userAddress].referrer = referrerAddress;
        users[userAddress].partnersCount = 0;

        lastUserId++;
        users[referrerAddress].partnersCount++;

        _updateX12Referrer(userAddress, referrerAddress);
    }

    function _updateX12Referrer(address userAddress, address referrerAddress) private {
        if (getFirstLevelLength(referrerAddress) < 3) {
            users[referrerAddress].firstLevel.push(userAddress);

            //set current
            users[userAddress].currentReferrer = referrerAddress;

            if (referrerAddress != id1) {
                address ref = users[referrerAddress].currentReferrer;
                users[ref].secondLevel.push(userAddress);
                _updateX12ReferrerSecondLevel(ref);
            }

            return;
        }

        users[referrerAddress].secondLevel.push(userAddress);

        uint256[] memory firstLevelLengths = new uint256[](getFirstLevelLength(referrerAddress));
        for (uint256 i = 0; i < firstLevelLengths.length; i++) {
            firstLevelLengths[i] = getFirstLevelLength(users[referrerAddress].firstLevel[i]);
        }

        uint256 minIndex = 0;
        for (uint256 i = 1; i < firstLevelLengths.length; i++) {
            if (firstLevelLengths[i] < firstLevelLengths[minIndex]) {
                minIndex = i;
            }
        }

        _updateX12(userAddress, referrerAddress, minIndex);
        _updateX12ReferrerSecondLevel(referrerAddress);
    }

    function _updateX12(address userAddress, address referrerAddress, uint256 x2) private {
        address x2Address = users[referrerAddress].firstLevel[x2];

        users[x2Address].firstLevel.push(userAddress);

        //set current
        users[userAddress].currentReferrer = x2Address;
    }

    function _updateX12ReferrerSecondLevel(address referrerAddress) private {
        if (users[referrerAddress].secondLevel.length <= 9) return;

        users[referrerAddress].firstLevel = new address[](0);
        users[referrerAddress].secondLevel = new address[](0);

        users[referrerAddress].reinvestCount++;
        if (referrerAddress != id1) {
            _updateX12Referrer(referrerAddress, referrerAddress);
        }
    }

    function getFirstLevelLength(address addr) public view returns (uint256) {
        return users[addr].firstLevel.length;
    }

    function getSecondLevelLength(address addr) public view returns (uint256) {
        return users[addr].secondLevel.length;
    }

    function registrationExt(address referrerAddress) external {
        _registration(msg.sender, referrerAddress);
    }

    function usersX12Matrix(address userAddress) public view returns (address, address[] memory, address[] memory) {
        return (users[userAddress].currentReferrer, users[userAddress].firstLevel, users[userAddress].secondLevel);
    }

    function isUserExists(address user) public view returns (bool) {
        return users[user].id != 0;
    }
}
