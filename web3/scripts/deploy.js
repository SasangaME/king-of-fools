
const hre = require("hardhat");

async function main() {

  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();

  const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
  const kof = await KingOfTheFools.deploy(usdc.address);

  console.log("usdc: " + usdc.address);
  console.log("kof: " + kof.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
