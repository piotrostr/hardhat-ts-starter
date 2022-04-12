import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";

describe("Okemonos - OpenSea integration", () => {
  let contract: Okemonos;

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });
  it("isApprovedForAll works", async () => {
    const owner = await contract.owner();
    const operator = await contract.proxyRegistryAddress();
    const isApprovedForAll = await contract.isApprovedForAll(owner, operator);
    expect(isApprovedForAll);
  });

  it("isApprovedForAll works when registering beforehand", async () => {
    const hre = require("hardhat");
    const owner = await contract.owner();
    const proxyRegistry = await hre.ethers.getVerifiedContractAt(
      await contract.proxyRegistryAddress(),
    );
    const proxy = await proxyRegistry.callStatic.registerProxy();
    const register = await proxyRegistry.registerProxy();
    await register.wait();
    const isApprovedForAll = await contract.isApprovedForAll(owner, proxy);
    expect(isApprovedForAll);
  });
});
