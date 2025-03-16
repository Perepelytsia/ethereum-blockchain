const hre = require("hardhat");

async function main() {
  const contractAddress = "0xE61ac625438c57aB11a6513bfB2BD18039F53706";

  const MyContract = await hre.ethers.getContractFactory("SimpleContract");
  const myContract = MyContract.attach(contractAddress);

  const data = await myContract.message();
  console.log("Data string:", data.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});