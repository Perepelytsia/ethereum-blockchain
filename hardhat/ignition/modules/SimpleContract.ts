import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleContractModule = buildModule("SimpleContractModule", (m) => {
  const simpleContract = m.contract("SimpleContract", ["Hello, Sepolia!"]);
  return { simpleContract };
});

export default SimpleContractModule;
