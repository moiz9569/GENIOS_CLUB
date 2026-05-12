pragma solidity >=0.4.23 <0.6.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Ownable {
    address public owner;

    event onOwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0));
        emit onOwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

contract GeniosClub is Ownable {

    struct User {
        uint id;
        address referrer;
        mapping(uint8 => X12) x12Matrix;    
    }

    struct X12 {
        address currentReferrer;
        address[] referrals;
        uint reinvestCount;
    }

    mapping(address => User) public users;

    mapping(uint => address) public idToAddress;
    mapping(uint => address) public userIds;
    
    mapping(uint8 => uint) public levelPrice;

    IERC20 public tokenDAI;
    address public id1;
    uint public lastUserId = 2;
    uint8 public constant LAST_LEVEL = 9;
    
    event Registration(address indexed user, address indexed referrer, uint indexed userId, uint referrerId);
    event Upgrade(address indexed user, uint8 level);
    
    constructor(address _token) public {
        levelPrice[1] = 1000e8;
        levelPrice[2] = 2000e8;
        levelPrice[3] = 3000e8;
        levelPrice[4] = 5000e8;
        levelPrice[5] = 7000e8;
        levelPrice[6] = 10000e8;
        levelPrice[7] = 15000e8;
        levelPrice[8] = 20000e8;
        levelPrice[9] = 30000e8;

        id1 = msg.sender;
        tokenDAI = IERC20(_token);   

        User memory user = User({
            id: 1,
            referrer: address(0)
        });
        users[id1] = user;

        idToAddress[1] = id1;
        userIds[1] = id1; 
    }

    function registrationExt(address referrerAddress) external {
        tokenDAI.transferFrom(msg.sender, address(this), levelPrice[1]);
        registration(msg.sender, referrerAddress);
    }

    function buyNewLevel(uint8 level) external {
        tokenDAI.transferFrom(msg.sender, address(this), levelPrice[level]);  
        require(isUserExists(msg.sender), "user is not exists. Register first.");
        emit Upgrade(msg.sender, level);
    }

    function registration(address userAddress, address referrerAddress) private {
        require(!isUserExists(userAddress), "user exists");
        require(isUserExists(referrerAddress), "referrer not exists");

        User memory user = User({
            id: lastUserId,
            referrer: referrerAddress
        });
        users[userAddress] = user;

        idToAddress[lastUserId] = userAddress;
        users[userAddress].referrer = referrerAddress;
        
        userIds[lastUserId] = userAddress;
        lastUserId++;
        emit Registration(userAddress, referrerAddress, users[userAddress].id, users[referrerAddress].id);
    }

    function isUserExists(address user) public view returns (bool) {
        return (users[user].id != 0);
    }
}