const { ethers, hre } = require("hardhat");

describe("King of the Fools", function () {
    it("test", async function () {
        const network = await ethers.getDefaultProvider().getNetwork();
        const [owner, user1, user2] = await ethers.getSigners();

        // dpeloy fool contract
        const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
        const kof = await KingOfTheFools.deploy();
        const tx1 = await kof.connect(user1).depositEth({ value: ethers.utils.parseEther("1") });
        await tx1.wait();
        const tx2 = await kof.connect(user2).depositEth({ value: ethers.utils.parseEther("1.5") });
        await tx2.wait();

        const user1Balance = await kof.balances(user1.address);
        console.log("user1 balance: " + ethers.utils.formatEther(user1Balance.ethAmount));
    });
});