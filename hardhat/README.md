# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://sepolia.infura.io/v3/INFURA_KEY
https://sepolia.etherscan.io/address/0xE61ac625438c57aB11a6513bfB2BD18039F53706

npx hardhat compile
npx hardhat test

npx hardhat ignition deploy ignition/modules/SimpleContract.ts --network localhost
npx hardhat run scripts/GetSimpleContract2.ts --network localhost
npx hardhat run scripts/SetSimpleContract2.ts --network localhost

npx hardhat ignition deploy ignition/modules/SimpleContract.ts --network sepolia
npx hardhat run scripts/SetSimpleContract.ts --network sepolia
npx hardhat run scripts/GetSimpleContract.ts --network sepolia
npx hardhat verify --network sepolia 0xE61ac625438c57aB11a6513bfB2BD18039F53706 "Hello, Sepolia!"