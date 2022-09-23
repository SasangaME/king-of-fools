const { ethers, hre } = require("hardhat");
const { expect } = require("chai");

describe("King of the Fools", function () {

    async function getUSDCContract() {
        const MockUSDC = await ethers.getContractFactory("MockUSDC");
        const usdc = await MockUSDC.deploy();
        return usdc;
    }

    async function getFoolContract(usdc) {

        const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
        const kof = await KingOfTheFools.deploy(usdc);
        return (usdc, kof);
    }

    it("eth not fool", async function () {
        // const network = await ethers.getDefaultProvider().getNetwork();
        const [user1, user2] = await ethers.getSigners();

        // deploy contracts
        const usdc = await getUSDCContract();
        const kof = await getFoolContract(usdc.address);

        await kof.connect(user1).depositEth({ value: ethers.utils.parseEther("1") });
        const tx2 = await kof.connect(user2).depositEth({ value: ethers.utils.parseEther("1.6") });
        const reciept2 = await tx2.wait();
        const event2 = await reciept2.events[0].args;
        const isFool = event2.isFool;
        expect(isFool).to.equal(false);
    });

    it("eth fool", async function () {
        const [user1, user2] = await ethers.getSigners();

        const usdc = await getUSDCContract();
        const kof = await getFoolContract(usdc.address);

        await kof.connect(user1).depositEth({ value: ethers.utils.parseEther("1") });
        const tx2 = await kof.connect(user2).depositEth({ value: ethers.utils.parseEther("1") });
        const reciept2 = await tx2.wait();
        const event2 = await reciept2.events[0].args;
        const isFool = event2.isFool;
        expect(isFool).to.equal(true);
    });

    it("usdc not fool", async function () {
        const [user1, user2] = await ethers.getSigners();

        const usdc = await getUSDCContract();
        const kof = await getFoolContract(usdc.address);

        const mintAmount1 = ethers.utils.parseUnits("1000", 6);
        const mintAmount2 = ethers.utils.parseUnits("3000", 6);
        await usdc.mint(mintAmount1);
        await usdc.mint(mintAmount2);

        const balance1 = await usdc.balanceOf(user1.address);
        const balance2 = await usdc.balanceOf(user2.address);
        await usdc.connect(user1).approve(kof.address, balance1);
        await usdc.connect(user2).approve(kof.address, balance2);

        await kof.connect(user1).depositUSDC(balance1);
        const tx = await kof.connect(user2).depositUSDC(balance2);
        const reciept = await tx.wait();
        const isFool = await reciept.events[reciept.events.length - 1].args.isFool;
        expect(isFool).to.equal(false);
    });

    it("usdc fool", async function () {
        const [user1, user2] = await ethers.getSigners();

        const usdc = await getUSDCContract();
        const kof = await getFoolContract(usdc.address);

        const mintAmount1 = ethers.utils.parseUnits("1000", 6);
        const mintAmount2 = ethers.utils.parseUnits("1000", 6);
        await usdc.mint(mintAmount1);
        await usdc.mint(mintAmount2);

        const balance1 = await usdc.balanceOf(user1.address);
        const balance2 = await usdc.balanceOf(user2.address);
        await usdc.connect(user1).approve(kof.address, balance1);
        await usdc.connect(user2).approve(kof.address, balance2);

        await kof.connect(user1).depositUSDC(balance1);
        const tx = await kof.connect(user2).depositUSDC(balance2);
        const reciept = await tx.wait();
        const isFool = await reciept.events[reciept.events.length - 1].args.isFool;
        expect(isFool).to.equal(true);
    });
});