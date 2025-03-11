const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
  it("should store the value 42", async () => {
    let instance = await SimpleStorage.deployed();
    await instance.set(42, { from: accounts[0] });
    let value = await instance.get();
    assert.equal(value, 42, "The stored value is not correct");
  });
});