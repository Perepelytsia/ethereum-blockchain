import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

task("receipt", "Transaction Details:")
  .addParam("hash", "Hash")
  .setAction(async (taskArgs) => {
    const receipt = await ethers.provider.getTransactionReceipt(taskArgs.hash);

    if (receipt) {
        console.log("Transaction Details:", receipt);
        console.log("Status:", receipt.status === 1 ? "Success" : "Failed");
    } else {
        console.log("Transaction not found. It might still be pending.");
    }
});

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
