require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' });

const ganachePvtKey = process.env.GANACHE_ACCOUNT;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        ganachePvtKey
      ]
    }
  }
};
