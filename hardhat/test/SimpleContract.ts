import { expect } from "chai";
import hre from "hardhat";

describe("SimpleContract", function () {
    let ContractFactory;
    let contract;
    let owner;
    let otherAccount;
    const initialMessage = "Hello, Hardhat!";
    beforeEach(async function () {
        [owner, otherAccount] = await hre.ethers.getSigners();
        ContractFactory = await hre.ethers.getContractFactory("SimpleContract");
        contract = await ContractFactory.deploy(initialMessage);
    });
    it("Should set the initial message correctly", async function () {
        expect(await contract.message()).to.equal(initialMessage);
    });
    it("Should update the message when setMessage is called", async function () {
        const newMessage = "Updated message";
        await contract.setMessage(newMessage);
        expect(await contract.message()).to.equal(newMessage);
    });
});
