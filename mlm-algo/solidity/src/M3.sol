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
        mapping(uint256 => address) firstLevel;
        mapping(uint256 => address) secondLevel;
        uint256 firstLevelLength;
        uint256 secondLevelLength;
    }

    mapping(address => User) public users;

    uint256 public lastUserId = 2;
    address public id1 = 0x93a33efC878C6Ee5E8960B47Eb93f4296288b978;

    constructor() {
        users[id1].id = 1;
    }

    function _registration(address userAddress, address referrerAddress) private {
        require(!isUserExists(userAddress), "User exists");
        require(isUserExists(referrerAddress), "Referrer does not exist");

        users[userAddress].id = lastUserId;
        users[userAddress].referrer = referrerAddress;
        users[userAddress].partnersCount = 0;

        lastUserId++;
        users[referrerAddress].partnersCount++;

        _updateX12Referrer(userAddress, referrerAddress);
    }

    function _updateX12Referrer(address userAddress, address referrerAddress) private {
        User storage referrer = users[referrerAddress];

        if (referrer.firstLevelLength < 3) {
            referrer.firstLevel[referrer.firstLevelLength] = userAddress;
            referrer.firstLevelLength++;

            users[userAddress].currentReferrer = referrerAddress;

            if (referrerAddress != id1) {
                User storage ref = users[referrer.currentReferrer];
                ref.secondLevel[ref.secondLevelLength] = userAddress;
                ref.secondLevelLength++;
            }

            return;
        }

        referrer.secondLevel[referrer.secondLevelLength] = userAddress;
        referrer.secondLevelLength++;

        if (
            referrer.firstLevelLength <= referrer.firstLevelLength
                && referrer.firstLevelLength <= referrer.firstLevelLength
        ) {
            _updateX12(userAddress, referrerAddress, 0);
        } else if (referrer.firstLevelLength <= referrer.firstLevelLength) {
            _updateX12(userAddress, referrerAddress, 1);
        } else {
            _updateX12(userAddress, referrerAddress, 2);
        }

        _updateX12ReferrerSecondLevel(referrerAddress);
    }

    function _updateX12(address userAddress, address referrerAddress, uint256 x2) private {
        User storage referrer = users[referrerAddress];
        address firstLevelReferrer = referrer.firstLevel[x2];

        users[firstLevelReferrer].firstLevel[users[firstLevelReferrer].firstLevelLength] = userAddress;
        users[firstLevelReferrer].firstLevelLength++;

        users[userAddress].currentReferrer = firstLevelReferrer;
    }

    function _updateX12ReferrerSecondLevel(address referrerAddress) private {
        User storage referrer = users[referrerAddress];

        if (referrer.secondLevelLength < 9) {
            return;
        }

        for (uint256 i = 0; i < referrer.firstLevelLength; i++) {
            delete referrer.firstLevel[i];
        }
        for (uint256 i = 0; i < referrer.secondLevelLength; i++) {
            delete referrer.secondLevel[i];
        }

        referrer.firstLevelLength = 0;
        referrer.secondLevelLength = 0;

        referrer.reinvestCount++;
        if (referrerAddress != id1) {
            _updateX12Referrer(referrerAddress, referrerAddress);
        }
    }

    function getFirstLevelLength(address addr) public view returns (uint256) {
        return users[addr].firstLevelLength;
    }

    function getSecondLevelLength(address addr) public view returns (uint256) {
        return users[addr].secondLevelLength;
    }

    function registrationExt(address referrerAddress) external {
        _registration(msg.sender, referrerAddress);
    }

    function usersX12Matrix(address userAddress) public view returns (address, address[] memory, address[] memory) {
        User storage user = users[userAddress];
        address[] memory firstLevel = new address[](user.firstLevelLength);
        address[] memory secondLevel = new address[](user.secondLevelLength);

        for (uint256 i = 0; i < user.firstLevelLength; i++) {
            firstLevel[i] = user.firstLevel[i];
        }
        for (uint256 i = 0; i < user.secondLevelLength; i++) {
            secondLevel[i] = user.secondLevel[i];
        }

        return (user.currentReferrer, firstLevel, secondLevel);
    }

    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }
}
