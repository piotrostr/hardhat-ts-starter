import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, ContractTransaction } from "ethers";
import { parseEther } from "ethers/lib/utils";

describe("Okemonos - minting", () => {
  let signers: SignerWithAddress[];
  let owner: string;
  let ownerAcc: SignerWithAddress;
  let contract: Okemonos;

  before(async () => {
    signers = await ethers.getSigners();
    ownerAcc = signers[0];
    owner = await ownerAcc.getAddress();
  });

  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
    const toggleTx = await contract.toggleSalePublic();
    await toggleTx.wait();
    const isPublic = await contract.isSalePublic();
    expect(isPublic).to.be.true;
  });

  it("should be able to single mint", async () => {
    const quantity = ethers.BigNumber.from("1");
    const price = await contract.mintPrice();
    const value = price.mul(quantity);
    const initialBalance = await contract.balanceOf(owner);
    const mintTx = await contract.mint(owner, quantity, { value });
    await mintTx.wait();
    const postMintBalance = await contract.balanceOf(owner);
    expect(initialBalance.add(quantity)).to.equal(postMintBalance);
  });

  it("shouldn't be able to mint for not enough eth", async () => {
    const quantity = ethers.BigNumber.from("1");
    await expect(
      contract.mint(owner, quantity, {
        value: parseEther("0.01"),
      }),
    ).to.reverted;
  });

  it("should be able to mint multiple", async () => {
    const quantity = ethers.BigNumber.from("5");
    const price = await contract.mintPrice();
    const value = price.mul(quantity);
    const initialBalance = await contract.balanceOf(owner);
    const mintTx = await contract.mint(owner, quantity, { value });
    await mintTx.wait();
    const postMintBalance = await contract.balanceOf(owner);
    expect(initialBalance.add(quantity)).to.equal(postMintBalance);
  });

  it("should have max mint in single tx of 20", async () => {
    let price: BigNumber;
    let value: BigNumber;
    price = await contract.mintPrice();
    value = price.mul(20);
    const tx = await contract.mint(owner, 20, { value });
    const txReceipt = await tx.wait();
    expect(txReceipt).not.to.be.null;
    value = price.mul(21);
    expect(contract.mint(owner, 21, { value })).to.reverted;
  });

  /**
   * this is a bit of a stupid test case (takes like 2-3 mins)
   * but need that 100% coverage, and not sure how to do it
   * otherwise
   * */
  it("should not be able to mint more than total supply", async () => {
    const promises = Array<Promise<ContractTransaction>>();
    for (
      let i = 0;
      i < (await contract.totalSupply()).toNumber() - 1;
      i += 1
    ) {
      promises.push(
        contract.mint(owner, BigNumber.from("1"), {
          value: parseEther("0.024"),
        }),
      );
    }
    const waits = await Promise.all(promises);
    await Promise.all(waits.map(wait => wait.wait()));
    expect(await contract.currentTokenId()).to.eq(
      (await contract.totalSupply()).sub(1),
    );
    await expect(
      contract.mint(owner, BigNumber.from("1"), {
        value: parseEther("0.024"),
      }),
    ).to.revertedWith("All tokens have been minted");
  });

  it("it is possible to set the mint price", async () => {
    expect(await contract.mintPrice()).to.eq(parseEther("0.024"));
    const newPrice = parseEther("1");
    const set = await contract.setMintPrice(newPrice);
    await set.wait();
    expect(await contract.mintPrice()).to.eq(newPrice);
    const initialBalance = await contract.balanceOf(owner);
    const mintTx = await contract.mint(owner, "1", {
      value: newPrice,
    });
    await mintTx.wait();
    const postMintBalance = await contract.balanceOf(owner);
    expect(initialBalance.add(1)).to.equal(postMintBalance);
  });

  it("only owner can set the mint price", async () => {
    const bob = signers[3];
    contract = contract.connect(bob);
    const newPrice = parseEther("1");
    await expect(contract.setMintPrice(newPrice)).to.reverted;
  });

  describe("toggling", () => {
    it("should be able to toggle minting", async () => {
      const mintingEnabled = await contract.mintingEnabled();
      const tx = await contract.toggleMinting();
      await tx.wait();
      expect(await contract.mintingEnabled()).to.equal(!mintingEnabled);
    });

    it("should respect whether minting is toggled on/off", async () => {
      expect(await contract.mintingEnabled()).to.be.true;
      const initialBalance = await contract.balanceOf(owner);
      const mintTx = await contract.mint(owner, "1", {
        value: parseEther("0.024"),
      });
      await mintTx.wait();
      const postMintBalance = await contract.balanceOf(owner);
      expect(initialBalance.add(1)).to.equal(postMintBalance);
      const toggleOffTx = await contract.toggleMinting();
      await toggleOffTx.wait();
      expect(await contract.mintingEnabled()).to.be.false;
      expect(contract.mint(owner, "1", { value: parseEther("0.024") })).to
        .reverted;
    });
  });
});
