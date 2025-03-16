const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const MyContract = await hre.ethers.getContractFactory("SimpleContract");
  const myContract = MyContract.attach(contractAddress);

  const data = await myContract.message();
  console.log("Data string:", data.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});