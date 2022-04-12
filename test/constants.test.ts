import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";

describe("Okemonos - constants", () => {
  let contract: Okemonos;

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });

  it("should have a name of 'Okemonos'", async () => {
    const name = await contract.name();
    expect(name).to.equal("Okemonos");
  });

  it("should have a symbol of 'OKE'", async () => {
    const symbol = await contract.symbol();
    expect(symbol).to.equal("OKE");
  });

  it("should have total of 7777 pieces", async () => {
    const total = await contract.totalSupply();
    expect(total).to.equal(7777);
  });

  it("should have a starting minting price of 0.024 ethereum", async () => {
    const price = await contract.mintPrice();
    expect(ethers.utils.formatEther(price)).to.equal("0.024");
  });

  it("should start as private sale", async () => {
    const isPublic = await contract.isSalePublic();
    expect(isPublic).to.be.false;
  });
});
