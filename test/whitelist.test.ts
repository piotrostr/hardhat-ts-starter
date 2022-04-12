import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Okemonos - payable", () => {
  let signers: SignerWithAddress[];
  let contract: Okemonos;

  before(async () => {
    signers = await ethers.getSigners();
  });

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });

  it("should be able to set private/public sale", async () => {
    const isPublic = await contract.isSalePublic();
    expect(isPublic).to.be.false;
    const setPublicTx = await contract.toggleSalePublic();
    await setPublicTx.wait();
    const isPublicNow = await contract.isSalePublic();
    expect(isPublicNow).to.be.true;
  });

  it("should be able to whitelist address", async () => {
    const address = await signers[8].getAddress();
    const isWhitelisted = await contract.whitelist(address);
    expect(isWhitelisted).to.be.false;
    const whitelistTx = await contract.addToWhitelist(address);
    await whitelistTx.wait();
    const isWhitelistedNow = await contract.whitelist(address);
    expect(isWhitelistedNow).to.be.true;
  });

  it("whitelisted can mint during the private sale", async () => {
    const bob = signers[5];
    const price = await contract.mintPrice();
    const quantity = ethers.BigNumber.from("1");
    const value = price.mul(quantity);
    const bobIsWhitelisted = await contract.whitelist(bob.address);
    expect(bobIsWhitelisted).to.be.false;
    await expect(
      contract.connect(bob).mint(bob.address, quantity, { value }),
    ).to.be.revertedWith("Address is not on the whitelist");
  });

  it("non-whitelisted cannot mint during the private sale", async () => {
    const alice = signers[6];
    const price = await contract.mintPrice();
    const quantity = ethers.BigNumber.from("1");
    const value = price.mul(quantity);
    const whitelistTx = await contract.addToWhitelist(alice.address);
    await whitelistTx.wait();
    const initialBalance = await contract.balanceOf(alice.address);
    const mintTx = await contract
      .connect(alice)
      .mint(alice.address, quantity, { value });
    await mintTx.wait();
    const postMintBalance = await contract.balanceOf(alice.address);
    expect(initialBalance.add(quantity)).to.equal(postMintBalance);
  });
});
