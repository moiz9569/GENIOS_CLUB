// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract GeniosClub {
    struct User {
        uint256 id;
        address referrer;
        uint256 partnersCount;
        /**
         *
         * @metrix
         */
        address currentReferrer;
        address[] firstLevel;
        address[] secondLevel;
        uint256 reinvestCount;
    }

    mapping(address => User) public users;

    uint256 public lastUserId = 2;
    address public id1 = 0x93a33efC878C6Ee5E8960B47Eb93f4296288b978;

    constructor() {
        users[id1].id = 1;
        users[id1].referrer = address(0);
        users[id1].partnersCount = uint256(0);
    }

    function registrationExt(address referrerAddress) external {
        registration(msg.sender, referrerAddress);
    }

    function registration(address userAddress, address referrerAddress) private {
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");

        users[userAddress].id = lastUserId;
        users[userAddress].referrer = referrerAddress;
        users[userAddress].partnersCount = uint256(0);

        lastUserId++;
        users[referrerAddress].partnersCount++;

        updateX12Referrer(userAddress, referrerAddress);
    }

    function updateX12Referrer(address userAddress, address referrerAddress) private {
        if (users[referrerAddress].firstLevel.length < 3) {
            users[referrerAddress].firstLevel.push(userAddress);

            //set current
            users[userAddress].currentReferrer = referrerAddress;

            if (referrerAddress == id1) return;

            address ref = users[referrerAddress].currentReferrer;
            users[ref].secondLevel.push(userAddress);

            return updateX12ReferrerSecondLevel(ref);
        }

        users[referrerAddress].secondLevel.push(userAddress);

        if (
            (
                users[users[referrerAddress].firstLevel[0]].firstLevel.length
                    <= users[users[referrerAddress].firstLevel[1]].firstLevel.length
            )
                && (
                    users[users[referrerAddress].firstLevel[1]].firstLevel.length
                        <= users[users[referrerAddress].firstLevel[2]].firstLevel.length
                )
        ) {
            updateX12(userAddress, referrerAddress, 0);
        } else if (
            users[users[referrerAddress].firstLevel[1]].firstLevel.length
                <= users[users[referrerAddress].firstLevel[2]].firstLevel.length
        ) {
            updateX12(userAddress, referrerAddress, 1);
        } else {
            updateX12(userAddress, referrerAddress, 2);
        }

        updateX12ReferrerSecondLevel(referrerAddress);
    }

    function updateX12(address userAddress, address referrerAddress, int256 x2) private {
        if (x2 == 0) {
            users[users[referrerAddress].firstLevel[0]].firstLevel.push(userAddress);

            //set current
            users[userAddress].currentReferrer = users[referrerAddress].firstLevel[0];
        } else if (x2 == 1) {
            users[users[referrerAddress].firstLevel[1]].firstLevel.push(userAddress);

            //set current
            users[userAddress].currentReferrer = users[referrerAddress].firstLevel[1];
        } else {
            users[users[referrerAddress].firstLevel[2]].firstLevel.push(userAddress);

            //set current
            users[userAddress].currentReferrer = users[referrerAddress].firstLevel[2];
        }
    }

    function updateX12ReferrerSecondLevel(address referrerAddress) private {
        if (users[referrerAddress].secondLevel.length < 9) return;

        users[referrerAddress].firstLevel = new address[](0);
        users[referrerAddress].secondLevel = new address[](0);

        users[referrerAddress].reinvestCount++;
        if (referrerAddress != id1) {
            updateX12Referrer(referrerAddress, referrerAddress);
        }
    }

    function usersX12Matrix(address userAddress) public view returns (address, address[] memory, address[] memory) {
        return (users[userAddress].currentReferrer, users[userAddress].firstLevel, users[userAddress].secondLevel);
    }

    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }
}
