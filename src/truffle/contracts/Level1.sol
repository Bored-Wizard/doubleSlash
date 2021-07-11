// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.6/Owned.sol";

contract VRFD20 is VRFConsumerBase, Owned {
    using SafeMathChainlink for uint256;

    uint256 private constant ROLL_IN_PROGRESS = 42;

    bytes32 private s_keyHash;
    uint256 private s_fee;
    
    struct User {
        address userAddress;
        bool isRolling;
        uint256 chosenNum;
        uint256 etherSent;
    }
    
    mapping(address => User) public users;
    mapping(bytes32 => address) private s_rollers;
    mapping(address => uint256) private s_results;

    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);
    event won(uint256 amount, address indexed roller);

    /**
     * @dev NETWORK: KOVAN
     * @dev   Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * @dev   LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * @dev   Key Hash:   0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     * @dev   Fee:        0.1 LINK (100000000000000000)
     */
    constructor(address vrfCoordinator, address link, bytes32 keyHash, uint256 fee)
        public
        VRFConsumerBase(vrfCoordinator, link)
    {
        s_keyHash = keyHash;
        s_fee = fee;
        
    }

   
    function initProcess(address _roller, uint256 _chosenNum) payable public returns (bytes32 requestId){
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");
        require(users[_roller].isRolling == false, "Already rolled");
        requestId = requestRandomness(s_keyHash, s_fee);
        s_rollers[requestId] = _roller;
        users[_roller] = User(_roller, true, _chosenNum, msg.value);
        emit DiceRolled(requestId, _roller);
    }
    
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 randomNumber = randomness.mod(4).add(1);
        s_results[s_rollers[requestId]] = randomNumber;
        users[s_rollers[requestId]].isRolling = false;
        if(users[s_rollers[requestId]].chosenNum == randomNumber){
            address payable wallet = payable(s_rollers[requestId]);
            uint256 amount = users[s_rollers[requestId]].etherSent * 99 / 100;
            wallet.transfer(amount);
            emit won(amount, s_rollers[requestId]);
        }
        users[s_rollers[requestId]] = User(s_rollers[requestId], false, 0, 0);
        emit DiceLanded(requestId, randomNumber);
    }
    function withdrawLINK(address to, uint256 value) public onlyOwner {
        require(LINK.transfer(to, value), "Not enough LINK");
    }

    function setKeyHash(bytes32 keyHash) public onlyOwner {
        s_keyHash = keyHash;
    }

    function keyHash() public view returns (bytes32) {
        return s_keyHash;
    }

    function setFee(uint256 fee) public onlyOwner {
        s_fee = fee;
    }

    function fee() public view returns (uint256) {
        return s_fee;
    }

}
