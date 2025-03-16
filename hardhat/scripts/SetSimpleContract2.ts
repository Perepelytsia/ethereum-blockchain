const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const MyContract = await hre.ethers.getContractFactory("SimpleContract");
  const myContract = MyContract.attach(contractAddress);

  const tx = await myContract.setMessage("Bodo");
  await tx.wait();
  console.log("Set message to Bodo");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});