//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract KingOfTheFools {
    mapping(address => Balance) public balances;
    address public prevAddress;
    uint256 public prevAmount;
    bool public isPrevUSDC;
    /// @dev dev env only for hardhat and ganache, eth -> usdc rate
    uint256 exchangeRate;
    IERC20 public USDC;
    uint256 private noOfTx;

    struct Balance {
        uint256 ethAmount;
        uint256 USDCAmount;
    }

    event Deposit(address account, bool isUSDC, uint256 amount, bool isFool);

    constructor(address _usdc) {
        exchangeRate = 10;
        USDC = IERC20(_usdc);
        prevAddress = address(0);
    }

    /// @dev deposit ETH to the contract
    function depositEth() external payable {
        bool isFool = _checkFool(false, msg.value);
        if (isFool) {
            payable(prevAddress).transfer(msg.value);
        } else {
            balances[msg.sender].ethAmount += msg.value;
        }
        noOfTx += 1;
        prevAddress = msg.sender;
        isPrevUSDC = false;
        prevAmount = msg.value;
        emit Deposit(msg.sender, false, msg.value, isFool);
    }

    /// @dev deposit USDC to the contract
    /// @param _amount USDC amount to be depositted
    function depositUSDC(uint256 _amount) external {
        uint256 usdcBalance = USDC.balanceOf(msg.sender);
        require(usdcBalance >= _amount, "not enough balance");
        uint256 allowance = USDC.allowance(msg.sender, address(this));
        require(allowance >= _amount, "not enough allowance");
        bool isFool = _checkFool(true, _amount);
        if (isFool) {
            USDC.transferFrom(msg.sender, prevAddress, _amount);
        } else {
            USDC.transferFrom(msg.sender, address(this), _amount);
            balances[msg.sender].USDCAmount += _amount;
        }
        noOfTx += 1;
        prevAddress = msg.sender;
        isPrevUSDC = true;
        prevAmount = _amount;
        emit Deposit(msg.sender, false, _amount, isFool);
    }

    /// @dev this will convert USDC value to ETH value
    /// @param _usdcAmount USDC amount which converts to the value of ETH
    /// @return ethAmount returns the amount in ETH
    function _calculateEthValue(uint256 _usdcAmount)
        internal
        view
        returns (uint256 ethAmount)
    {
        // 1 USDC = 10 Eth hypothetically
        ethAmount = exchangeRate / _usdcAmount;
    }

    function _calculateUSDCValue(uint256 _ethAmount)
        internal
        view
        returns (uint256 usdcAmount)
    {
        usdcAmount = exchangeRate * _ethAmount;
    }

    function _checkFool(bool _isUSDC, uint256 _amount)
        internal
        view
        returns (bool isFool)
    {
        require(
            noOfTx == 0 || prevAddress != address(0),
            "prev address is address(0)"
        );
        // check 04 scenarios
        uint256 notFoolAmount = 0;
        // 01 current ETH & prev ETH or 02 current USDC & prev USDC
        if ((!_isUSDC && !isPrevUSDC) || (_isUSDC && isPrevUSDC)) {
            notFoolAmount = (prevAmount * 15) / 10;
        }
        // 03 current ETH & prev USDC
        else if (!_isUSDC && isPrevUSDC) {
            notFoolAmount = (_calculateEthValue(prevAmount) * 15) / 10;
        }
        // 04 current USDC & prev ETH
        else {
            notFoolAmount = (_calculateUSDCValue(prevAmount) * 15) / 10;
        }
        isFool = (_amount < notFoolAmount) ? true : false;
    }
}
