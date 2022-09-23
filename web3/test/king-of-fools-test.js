const { ethers, hre } = require("hardhat");
const { expect } = require("chai");

describe("King of the Fools", function () {

    async function getContract() {
        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        const usdc = await MockUSDC.deploy();
        const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
        const kof = await KingOfTheFools.deploy(usdc.address);
        return kof;
    }

    it("eth not fool", async function () {
        // const network = await ethers.getDefaultProvider().getNetwork();
        const [user1, user2] = await ethers.getSigners();

        // dpeloy contracts
        const kof = await getContract();

        await kof.connect(user1).depositEth({ value: ethers.utils.parseEther("1") });
        const tx2 = await kof.connect(user2).depositEth({ value: ethers.utils.parseEther("1.6") });
        const reciept2 = await tx2.wait();
        const event2 = await reciept2.events[0].args;
        const isFool = event2.isFool;
        expect(isFool).to.equal(false);
    });

    it("eth fool", async function () {
        const [user1, user2] = await ethers.getSigners();

        // dpeloy contracts
        const kof = await getContract();

        await kof.connect(user1).depositEth({ value: ethers.utils.parseEther("1") });
        const tx2 = await kof.connect(user2).depositEth({ value: ethers.utils.parseEther("1") });
        const reciept2 = await tx2.wait();
        const event2 = await reciept2.events[0].args;
        const isFool = event2.isFool;
        expect(isFool).to.equal(true);
    });
});