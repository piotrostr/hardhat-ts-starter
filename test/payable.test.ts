import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";

const { provider } = waffle;

describe("Okemonos - payable", () => {
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
  });

  it("contract should be able to receive eth", async () => {
    const txValue = parseEther("3");
    const tx = await ownerAcc.sendTransaction({
      from: owner,
      to: contract.address,
      value: txValue,
    });
    await tx.wait();
    expect(await provider.getBalance(contract.address)).to.equal(txValue);
  });

  it("owner should be able to withdraw eth from contract", async () => {
    const txValue = parseEther("3");
    const tx = await ownerAcc.sendTransaction({
      to: contract.address,
      value: txValue,
    });
    await tx.wait();
    const contractBalance = await provider.getBalance(contract.address);
    expect(contractBalance).to.equal(txValue);

    const initialOwnerBalance = await provider.getBalance(owner);
    const withdrawTx = await contract.withdraw();
    const withdrawReceipt = await withdrawTx.wait();
    const ownerBalance = await provider.getBalance(owner);
    const gas = withdrawReceipt.gasUsed.mul(withdrawReceipt.effectiveGasPrice);
    expect(initialOwnerBalance.sub(gas).add(txValue)).to.equal(ownerBalance);
  });
});
