const hre = require("hardhat");

async function main() {
  const contractAddress = "0xE61ac625438c57aB11a6513bfB2BD18039F53706";

  const MyContract = await hre.ethers.getContractFactory("SimpleContract");
  const myContract = MyContract.attach(contractAddress);

  const tx = await myContract.setMessage("Alternate history");
  await tx.wait();
  console.log("Sem message Alternate history");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});