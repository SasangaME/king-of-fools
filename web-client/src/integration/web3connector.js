import { ethers } from 'ethers';
import addresses from "../config/addresses.json";
import KingOfTheFools from "../config/KingOfTheFools.json";
import MockUSDC from "../config/MockUSDC.json";

export async function connectAccounts() {
    if (window.ethereum) {
        await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        alert("wallet connected");
    } else {
        alert("please connect metamask account");
    }
}

function getKofContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addresses.kof, KingOfTheFools.abi, signer);
    return contract;
}

function getUSDCContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addresses.usdc, MockUSDC.abi, signer);
    return contract;
}

export async function depositEth(amount) {
    try {
        const contract = getKofContract();
        const ethAmount = ethers.utils.parseEther(amount.toString());
        const tx = await contract.depositEth({ value: ethAmount });
        const reciept = await tx.wait();
        const event = await reciept.events[0].args;
        console.log(event);
        const isFool = event.isFool;
        if (isFool) {
            alert("new king of the fools detected.");
        } else {
            alert("amount deposited succefully");
        }
    } catch (err) {
        alert(err);
    }
}