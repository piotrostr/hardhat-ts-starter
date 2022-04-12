import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";
import { randomBytes } from "crypto";

describe("Okemonos - proxy address", () => {
  let contract: Okemonos;

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });
  it("should retrieve the proxy address correctly", async () => {
    const address = await contract.proxyRegistryAddress();
    expect(address).to.equal("0xa5409ec958C83C3f309868babACA7c86DCB077c1");
  });

  it("should be able to update the proxy address", async () => {
    const privateKey = "0x" + randomBytes(32).toString("hex");
    const wallet = new ethers.Wallet(privateKey);
    const setProxyAddressTx = await contract.setProxyRegistryAddress(
      wallet.address,
    );
    await setProxyAddressTx.wait();
    expect(await contract.proxyRegistryAddress()).to.equal(wallet.address);
  });
});
