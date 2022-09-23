//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    address public owner;

    constructor() ERC20("USDC", "USDC") {
        owner = msg.sender;
    }

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }
}
