import { expect } from "chai";
import { ethers } from "hardhat";
import { Okemonos } from "../typechain/Okemonos";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Okemonos - ownership", () => {
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
  beforeEach(async () => {
    const Okemonos = await ethers.getContractFactory("Okemonos");
    contract = (await Okemonos.deploy()) as Okemonos;
    await contract.deployed();
  });
  it("only owner can transfer ownership", async () => {
    const newOwner = signers[1].address;
    await expect(
      contract.transferOwnership(newOwner, { from: signers[2].address }),
    ).to.be.reverted;
  });

  it("should be able to transfer ownership", async () => {
    let contractOwner: string;
    contractOwner = await contract.owner();
    expect(contractOwner).to.equal(owner);
    const newOwner = signers[1].address;
    const changeOwnershipTx = await contract.transferOwnership(newOwner);
    await changeOwnershipTx.wait();
    contractOwner = await contract.owner();
    expect(contractOwner).to.equal(newOwner);
  });
});
